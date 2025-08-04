/**
 * Script to extract all active pages, their classes, and associated styles
 * Run with: node scripts/extract-page-styles.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use promises directly from fs
const readFileAsync = fs.promises.readFile;
const writeFileAsync = fs.promises.writeFile;
const readdirAsync = fs.promises.readdir;
const statAsync = fs.promises.stat;

// Configuration
const ROOT_DIR = path.resolve(__dirname, '..');
const PAGES_DIR = path.join(ROOT_DIR, 'src', 'pages');
const STYLES_DIR = path.join(ROOT_DIR, 'src', 'styles');
const OUTPUT_FILE = path.join(ROOT_DIR, 'page-styles-analysis.md');

// Helper function to recursively get all files in a directory
async function getAllFiles(dir, fileList = []) {
  const files = await readdirAsync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = await statAsync(filePath);
    
    if (stat.isDirectory()) {
      fileList = await getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }
  
  return fileList;
}

// Helper function to extract class names from JSX/TSX files
async function extractClassesFromFile(filePath) {
  const content = await readFileAsync(filePath, 'utf8');
  const classRegex = /className=["']([^"']+)["']/g;
  const classes = new Set();
  let match;
  
  while ((match = classRegex.exec(content)) !== null) {
    // Split multi-class strings and add each class
    match[1].split(/\s+/).forEach(cls => classes.add(cls));
  }
  
  return Array.from(classes);
}

// Helper function to extract CSS rules for a given class
async function extractCssRulesForClass(className) {
  const cssFiles = await getAllFiles(STYLES_DIR).then(files => 
    files.filter(file => file.endsWith('.css'))
  );
  
  const rules = [];
  
  for (const cssFile of cssFiles) {
    const content = await readFileAsync(cssFile, 'utf8');
    
    // More robust CSS parsing
    // This handles direct class selectors, nested selectors, and media queries
    let inMediaQuery = false;
    let mediaQueryText = '';
    let mediaQueryBraceCount = 0;
    
    // Split content by closing braces to handle nested rules better
    const sections = content.split('}');
    
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      
      // Check if this is a media query
      if (section.includes('@media') && !inMediaQuery) {
        inMediaQuery = true;
        mediaQueryText = section + '}';
        mediaQueryBraceCount = 1; // Starting with one opening brace
        continue;
      }
      
      // Process media query content
      if (inMediaQuery) {
        mediaQueryText += section + '}';
        
        // Count braces to determine if we're still in the media query
        mediaQueryBraceCount += (section.match(/{/g) || []).length;
        mediaQueryBraceCount -= 1; // We split by '}' so each section ends with one
        
        // Check if this section contains our class
        if (section.includes(`.${className}`)) {
          // Extract just the rule part
          const rulePart = section.substring(section.indexOf(`.${className}`));
          
          rules.push({
            file: path.relative(ROOT_DIR, cssFile),
            rule: mediaQueryText.trim(),
            isMediaQuery: true
          });
        }
        
        if (mediaQueryBraceCount === 0) {
          inMediaQuery = false;
          mediaQueryText = '';
        }
        
        continue;
      }
      
      // Regular class selectors
      if (section.includes(`.${className}`)) {
        // Handle different selector patterns
        const selectorPatterns = [
          new RegExp(`\\.${className}\\s*\\{`, 'g'), // Direct: .class-name {
          new RegExp(`\\.${className}\\s*,`, 'g'),    // Group: .class-name, .other {
          new RegExp(`\\.${className}\\s+[^{]*\\{`, 'g'), // Descendant: .class-name .child {
          new RegExp(`[^\\s.]\\.${className}\\s*\\{`, 'g'), // Chained: element.class-name {
          new RegExp(`\\.${className}:`, 'g'),         // Pseudo: .class-name:hover {
          new RegExp(`\\.${className}\\[`, 'g')       // Attribute: .class-name[attr] {
        ];
        
        let hasMatch = false;
        for (const pattern of selectorPatterns) {
          if (pattern.test(section)) {
            hasMatch = true;
            break;
          }
        }
        
        if (hasMatch) {
          rules.push({
            file: path.relative(ROOT_DIR, cssFile),
            rule: (section + '}').trim(),
            isMediaQuery: false
          });
        }
      }
    }
  }
  
  return rules;
}

// Helper function to extract HTML structure from a page component
async function extractHtmlStructure(filePath) {
  const content = await readFileAsync(filePath, 'utf8');
  
  // Extract the JSX return statement
  const returnRegex = /return\s*\(([\s\S]*?)\);?\s*\}/m;
  const returnMatch = content.match(returnRegex);
  
  if (!returnMatch) return 'Could not extract JSX structure';
  
  // Clean up the JSX to make it more readable
  let jsx = returnMatch[1].trim();
  
  // Remove comments
  jsx = jsx.replace(/\{\s*\/\*[\s\S]*?\*\/\s*\}/g, '');
  
  // Simplify by removing some React-specific attributes
  jsx = jsx.replace(/\{[^{}]*?\}/g, '{...}'); // Replace complex expressions
  
  return jsx;
}

// Main function to analyze pages and their styles
async function analyzePageStyles() {
  try {
    // Get all page files
    const pageFiles = await getAllFiles(PAGES_DIR).then(files => 
      files.filter(file => file.endsWith('.tsx') && !file.includes('index.ts'))
    );
    
    // Extract App.tsx to find active pages
    const appTsxPath = path.join(ROOT_DIR, 'src', 'App.tsx');
    const appTsxContent = await readFileAsync(appTsxPath, 'utf8');
    
    // Find the renderPage function to identify active pages
    const renderPageMatch = appTsxContent.match(/const renderPage[\s\S]*?\{([\s\S]*?)\}/m);
    const activePages = [];
    
    if (renderPageMatch) {
      const renderPageContent = renderPageMatch[1];
      const caseRegex = /case ['"](.*?)['"]:\s*return\s*<(\w+)/g;
      let caseMatch;
      
      while ((caseMatch = caseRegex.exec(renderPageContent)) !== null) {
        activePages.push({
          route: caseMatch[1],
          component: caseMatch[2]
        });
      }
    }
    
    // Get all CSS files for reference
    const cssFiles = await getAllFiles(STYLES_DIR).then(files => 
      files.filter(file => file.endsWith('.css'))
    );
    
    // Create a map of all CSS classes in the project
    const allCssClasses = new Map();
    
    for (const cssFile of cssFiles) {
      const content = await readFileAsync(cssFile, 'utf8');
      const relativePath = path.relative(ROOT_DIR, cssFile);
      
      // Extract class names from CSS
      const classRegex = /\.([-_a-zA-Z0-9]+)\s*[,{:]/g;
      let match;
      
      while ((match = classRegex.exec(content)) !== null) {
        const className = match[1];
        if (!allCssClasses.has(className)) {
          allCssClasses.set(className, []);
        }
        
        allCssClasses.get(className).push(relativePath);
      }
    }
    
    // Analyze each page file
    const pageAnalysis = [];
    
    for (const pageFile of pageFiles) {
      const fileName = path.basename(pageFile);
      const componentName = fileName.replace('.tsx', '');
      
      // Check if this page is active in the app
      const isActive = activePages.some(page => 
        page.component === componentName || 
        page.component === componentName.replace('Page', '')
      );
      
      // For this analysis, include all pages but mark which ones are active
      const pageRoute = activePages.find(page => 
        page.component === componentName || 
        page.component === componentName.replace('Page', '')
      )?.route || null;
      
      // Extract classes from the page
      const classes = await extractClassesFromFile(pageFile);
      
      // Get CSS rules for each class
      const classRules = {};
      for (const className of classes) {
        classRules[className] = await extractCssRulesForClass(className);
      }
      
      // Extract the component's HTML structure
      const htmlStructure = await extractHtmlStructure(pageFile);
      
      pageAnalysis.push({
        page: componentName,
        route: pageRoute,
        isActive,
        file: path.relative(ROOT_DIR, pageFile),
        htmlStructure,
        classes,
        classRules
      });
    }
    
    // Generate markdown report
    let markdown = '# Page Styles Analysis\n\n';
    markdown += 'This document lists all pages in the application, their CSS classes, and associated styles.\n\n';
    markdown += '## Active Routes\n\n';
    markdown += 'These are the routes currently active in the application:\n\n';
    
    const activeRoutes = activePages.map(page => `- \`${page.route}\` → ${page.component}`);
    markdown += activeRoutes.join('\n') + '\n\n';
    
    markdown += '## Page Analysis\n\n';
    
    // Sort pages: active pages first, then alphabetically
    pageAnalysis.sort((a, b) => {
      if (a.isActive && !b.isActive) return -1;
      if (!a.isActive && b.isActive) return 1;
      return a.page.localeCompare(b.page);
    });
    
    for (const analysis of pageAnalysis) {
      markdown += `## ${analysis.page}${analysis.isActive ? ` (Active: \`${analysis.route}\`)` : ' (Inactive)'}\n\n`;
      markdown += `File: \`${analysis.file}\`\n\n`;
      
      markdown += '### Component Structure\n\n';
      markdown += '```jsx\n';
      markdown += analysis.htmlStructure;
      markdown += '\n```\n\n';
      
      markdown += '### CSS Classes\n\n';
      markdown += 'Classes used in this component:\n\n';
      markdown += analysis.classes.map(cls => `- \`.${cls}\``).join('\n') + '\n\n';
      
      for (const className of analysis.classes) {
        markdown += `#### .${className}\n\n`;
        
        if (analysis.classRules[className].length === 0) {
          markdown += 'No CSS rules found for this class.\n\n';
        } else {
          // Group rules by file
          const rulesByFile = {};
          
          for (const rule of analysis.classRules[className]) {
            if (!rulesByFile[rule.file]) {
              rulesByFile[rule.file] = [];
            }
            rulesByFile[rule.file].push(rule);
          }
          
          for (const file in rulesByFile) {
            markdown += `From \`${file}\`:\n\n`;
            
            // First show non-media query rules
            const standardRules = rulesByFile[file].filter(r => !r.isMediaQuery);
            if (standardRules.length > 0) {
              markdown += '```css\n';
              for (const rule of standardRules) {
                markdown += rule.rule + '\n\n';
              }
              markdown += '```\n\n';
            }
            
            // Then show media queries
            const mediaQueries = rulesByFile[file].filter(r => r.isMediaQuery);
            if (mediaQueries.length > 0) {
              markdown += 'Media Queries:\n\n';
              markdown += '```css\n';
              for (const rule of mediaQueries) {
                markdown += rule.rule + '\n\n';
              }
              markdown += '```\n\n';
            }
          }
        }
      }
      
      markdown += '---\n\n';
    }
    
    // Add a section about unused CSS classes
    markdown += '## Potentially Unused CSS Classes\n\n';
    markdown += 'These CSS classes are defined in stylesheets but not found in any analyzed page components:\n\n';
    
    // Collect all classes used in pages
    const usedClasses = new Set();
    pageAnalysis.forEach(page => {
      page.classes.forEach(cls => usedClasses.add(cls));
    });
    
    // Find unused classes
    const unusedClasses = [];
    for (const [className, files] of allCssClasses.entries()) {
      if (!usedClasses.has(className)) {
        unusedClasses.push({ className, files });
      }
    }
    
    if (unusedClasses.length === 0) {
      markdown += 'No unused CSS classes found.\n\n';
    } else {
      // Group by file for better organization
      const unusedByFile = {};
      
      for (const { className, files } of unusedClasses) {
        for (const file of files) {
          if (!unusedByFile[file]) {
            unusedByFile[file] = [];
          }
          unusedByFile[file].push(className);
        }
      }
      
      for (const file in unusedByFile) {
        markdown += `### In \`${file}\`\n\n`;
        markdown += unusedByFile[file].map(cls => `- \`.${cls}\``).join('\n') + '\n\n';
      }
    }
    
    // Write the report to a file
    await writeFileAsync(OUTPUT_FILE, markdown);
    console.log(`Analysis complete! Report saved to ${OUTPUT_FILE}`);
    
  } catch (error) {
    console.error('Error analyzing page styles:', error);
  }
}

// Run the analysis
analyzePageStyles();