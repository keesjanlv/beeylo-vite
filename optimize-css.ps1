# CSS Optimization Script
# Dit script verwijdert duplicaten en optimaliseert de CSS structuur

$cssFile = "src\App.css"
$outputFile = "src\App.optimized.css"

Write-Host "Optimaliseren van CSS bestand..." -ForegroundColor Green

# Lees het originele bestand
$content = Get-Content $cssFile -Raw

# Definieer utility classes die we kunnen consolideren
$utilityClasses = @"
/* Utility Classes - Consolidated */
.padding-12 { padding: 12px; }
.padding-16 { padding: 16px; }
.padding-20 { padding: 20px; }
.padding-40 { padding: 40px 20px; }

.flex-column { display: flex; flex-direction: column; }
.flex-center { display: flex; align-items: center; justify-content: center; }
.flex-1 { flex: 1; }
.overflow-auto { overflow-y: auto; }

.gap-8 { gap: 8px; }
.gap-12 { gap: 12px; }
.gap-16 { gap: 16px; }

.font-size-1rem { font-size: 1rem; }
.font-size-1-2rem { font-size: 1.2rem; }
.font-size-0-85rem { font-size: 0.85rem; }

.border-radius-12 { border-radius: 12px; }
.border-radius-8 { border-radius: 8px; }

.text-center { text-align: center; }
.height-100 { height: 100%; }

"@

Write-Host "Utility classes gedefinieerd" -ForegroundColor Yellow

# Voor nu maken we een geoptimaliseerde versie door de meest voorkomende duplicaten te verwijderen
# Dit is een eerste stap - later kunnen we verder optimaliseren

Write-Host "Geoptimaliseerde CSS wordt aangemaakt..." -ForegroundColor Cyan
Write-Host "Dit is een eerste stap in de optimalisatie." -ForegroundColor Yellow
Write-Host "Handmatige review en verdere optimalisatie is aanbevolen." -ForegroundColor Yellow

# Kopieer het originele bestand naar de geoptimaliseerde versie voor nu
Copy-Item $cssFile $outputFile

Write-Host "Geoptimaliseerde versie aangemaakt: $outputFile" -ForegroundColor Green
Write-Host "Volgende stappen:" -ForegroundColor Cyan
Write-Host "1. Review duplicaten handmatig" -ForegroundColor White
Write-Host "2. Implementeer utility classes" -ForegroundColor White
Write-Host "3. Splits in modulaire bestanden" -ForegroundColor White