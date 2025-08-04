/*! CSS Used from: Embedded */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:var(--space-2);border:1px solid transparent;border-radius:var(--radius-md);font-family:'Satoshi', -apple-system, BlinkMacSystemFont, sans-serif;font-weight:var(--font-normal);text-decoration:none;cursor:pointer;transition:all 0.2s ease-in-out;white-space:nowrap;user-select:none;position:relative;overflow:hidden;}
.btn-md{height:var(--button-height-md);padding:0 var(--space-4);font-size:var(--text-base);}
.btn-primary{background-color:var(--primary);color:var(--primary-foreground);border-color:var(--primary);}
.btn-primary:hover:not(.btn-disabled){background-color:var(--primary-hover);border-color:var(--primary-hover);}
.btn-primary:active:not(.btn-disabled){background-color:var(--primary-active);border-color:var(--primary-active);}
.input-group{display:flex;flex-direction:column;gap:var(--space-1);width:100%;}
.input-wrapper{position:relative;display:flex;align-items:center;}
.input{width:100%;border:1px solid var(--input-border);border-radius:var(--radius-md);background-color:var(--input-background);color:var(--text-primary);font-size:var(--text-base);transition:all 0.2s ease-in-out;}
.input:focus{outline:none;border-color:var(--input-border-focus);box-shadow:0 0 0 3px rgba(255, 215, 0, 0.1);}
.input::placeholder{color:var(--input-placeholder);font-size:var(--text-xs);}
.input:disabled{opacity:0.5;cursor:not-allowed;background-color:var(--surface-secondary);}
.input-md{height:var(--input-height-md);padding:0 var(--space-4);font-size:var(--text-xs);}
.buttonv2{color:#090909;padding:0.7em 1.7em;font-size:14px;border-radius:0.5em;background:#ffffff;cursor:pointer;border:1px solid #e0e0e0;transition:all 0.3s;box-shadow:2px 2px 4px rgba(0, 0, 0, 0.08),      -2px -2px 4px rgba(255, 255, 255, 0.9);display:inline-flex;align-items:center;justify-content:center;text-decoration:none;font-family:inherit;font-weight:500;}
.buttonv2:hover{background:#e8e8e8;border:1px solid #d0d0d0;transform:translateY(-1px);box-shadow:3px 3px 6px rgba(0, 0, 0, 0.1),      -3px -3px 6px rgba(255, 255, 255, 0.95);}
.buttonv2:active{transform:translateY(0);background:#e0e0e0;box-shadow:inset 2px 2px 4px rgba(0, 0, 0, 0.08),      inset -2px -2px 4px rgba(255, 255, 255, 0.9);}
.buttonv2.buttonv2-yellow{background:#FBBF16;border:1px solid #e6ac00;color:#000000;box-shadow:2px 2px 4px rgba(0, 0, 0, 0.08),      -2px -2px 4px rgba(255, 255, 255, 0.6);}
.buttonv2.buttonv2-yellow:hover{background:#e6ac00;border:1px solid #cc9900;box-shadow:3px 3px 6px rgba(0, 0, 0, 0.1),      -3px -3px 6px rgba(255, 255, 255, 0.7);}
.buttonv2.buttonv2-yellow:active{background:#d99e00;box-shadow:inset 2px 2px 4px rgba(0, 0, 0, 0.08),      inset -2px -2px 4px rgba(255, 255, 255, 0.6);}
.no-scroll-share-social-section .no-scroll-input-copy-group{display:flex;gap:clamp(12px, 2vh, 20px);align-items:center;margin-bottom:min(1vh, 8px);width:100%;}
.no-scroll-share-social-section .no-scroll-input-copy-group .no-scroll-input{flex:2;height:clamp(40px, 6vh, 48px);padding:clamp(8px, 1.5vh, 12px) clamp(12px, 2vh, 16px);font-size:clamp(0.875rem, 2vh, 1rem);border-radius:clamp(8px, 1vh, 12px);border:1px solid var(--border);background:var(--canvas);color:var(--text-primary);box-sizing:border-box;}
.no-scroll-share-social-section .no-scroll-input-copy-group .no-scroll-button{flex:1;}
.no-scroll-share-social-section .no-scroll-button{flex:1;height:100%;font-size:clamp(0.8rem, 1.8vh, 1rem);border-radius:min(1.5vh, 12px);cursor:pointer;transition:all 0.2s ease;display:flex;align-items:center;justify-content:center;box-sizing:border-box;padding:0 min(1.5vh, 12px);font-weight:500;border:1px solid var(--border);background:var(--surface);color:var(--text-primary);}
.no-scroll-button.buttonv2{flex:1;}
.no-scroll-share-social-section .no-scroll-button.btn-primary{background-color:var(--primary);color:var(--primary-foreground);border-color:var(--primary);}
.no-scroll-share-social-section .no-scroll-button.btn-primary:hover{background-color:var(--primary-hover);border-color:var(--primary-hover);transform:translateY(-1px);}
.no-scroll-share-social-section .no-scroll-input:focus{outline:none;border-color:var(--primary);box-shadow:0 0 0 3px rgba(255, 215, 0, 0.1);}
.no-scroll-share-social-section .no-scroll-input:hover{border-color:var(--border-hover);}
.no-scroll-share-social-section .no-scroll-button.buttonv2{color:#090909;background:#ffffff;border:1px solid #e0e0e0;box-shadow:2px 2px 4px rgba(0, 0, 0, 0.08),     -2px -2px 4px rgba(255, 255, 255, 0.9);}
.no-scroll-share-social-section .no-scroll-button.buttonv2:hover{background:#e8e8e8;border:1px solid #d0d0d0;transform:translateY(-1px);box-shadow:3px 3px 6px rgba(0, 0, 0, 0.1),     -3px -3px 6px rgba(255, 255, 255, 0.95);}
.no-scroll-share-social-section .no-scroll-button.buttonv2-yellow{background:linear-gradient(135deg, #FBBF16, #E6AC14);color:white;border:1px solid #FBBF16;box-shadow:2px 2px 4px rgba(251, 191, 22, 0.3),     -2px -2px 4px rgba(255, 255, 255, 0.1);}
.no-scroll-share-social-section .no-scroll-button.buttonv2-yellow:hover{background:linear-gradient(135deg, #FDD835, #FBBF16);border:1px solid #FDD835;transform:translateY(-1px);box-shadow:3px 3px 6px rgba(251, 191, 22, 0.4),     -3px -3px 6px rgba(255, 255, 255, 0.15);}
.no-scroll-input{height:100%;padding:min(1vh, 8px) min(1.5vh, 12px);font-size:clamp(0.8rem, 1.8vh, 1rem);border-radius:min(1.5vh, 12px);border:1px solid var(--border);background:var(--canvas);color:var(--text-primary);box-sizing:border-box;}
.no-scroll-button{flex:1;height:100%;padding:0 min(1.5vh, 12px);font-size:clamp(0.8rem, 1.8vh, 1rem);font-weight:500;border-radius:min(1.5vh, 12px);border:none;cursor:pointer;transition:all 0.2s ease;display:flex;align-items:center;justify-content:center;box-sizing:border-box;}
.no-scroll-input:focus{outline:none;border-color:var(--primary);box-shadow:0 0 0 2px var(--primary-alpha);}
.no-scroll-input::placeholder{color:var(--text-muted);}
.no-scroll-button:hover{transform:translateY(-1px);box-shadow:0 4px 12px var(--shadow);}
.no-scroll-button:active{transform:translateY(0);}
*{margin:0;padding:0;box-sizing:border-box;}
button{border-radius:12px;border:2px solid transparent;padding:12px 24px;font-size:1rem;font-weight:500;font-family:inherit;background-color:var(--primary);color:var(--primary-foreground);cursor:pointer;transition:all 0.2s ease;outline:none;}
button:hover{background-color:var(--primary-hover);transform:translateY(-1px);}
input{background-color:var(--surface);border:2px solid var(--border);border-radius:12px;padding:12px 16px;font-size:1rem;font-family:inherit;color:var(--text-primary);transition:border-color 0.2s ease;outline:none;}
input:focus{border-color:var(--primary);}
input::placeholder{color:var(--text-secondary);}
::-webkit-scrollbar{width:6px;}
::-webkit-scrollbar-track{background:var(--surface);}
::-webkit-scrollbar-thumb{background:var(--border);border-radius:3px;}
::-webkit-scrollbar-thumb:hover{background:var(--text-secondary);}
@media (max-width: 768px){
button{padding:10px 20px;font-size:0.9rem;}
}
/*! CSS Used fontfaces */
@font-face{font-family:'Satoshi';src:url('http://localhost:5173/fonts/Satoshi-Light.woff2') format('woff2'),        url('http://localhost:5173/fonts/Satoshi-Light.woff') format('woff'),        url('http://localhost:5173/fonts/Satoshi-Light.ttf') format('truetype');font-weight:300;font-display:swap;font-style:normal;}
@font-face{font-family:'Satoshi';src:url('http://localhost:5173/fonts/Satoshi-LightItalic.woff2') format('woff2'),        url('http://localhost:5173/fonts/Satoshi-LightItalic.woff') format('woff'),        url('http://localhost:5173/fonts/Satoshi-LightItalic.ttf') format('truetype');font-weight:300;font-display:swap;font-style:italic;}
@font-face{font-family:'Satoshi';src:url('http://localhost:5173/fonts/Satoshi-Regular.woff2') format('woff2'),        url('http://localhost:5173/fonts/Satoshi-Regular.woff') format('woff'),        url('http://localhost:5173/fonts/Satoshi-Regular.ttf') format('truetype');font-weight:400;font-display:swap;font-style:normal;}
@font-face{font-family:'Satoshi';src:url('http://localhost:5173/fonts/Satoshi-Italic.woff2') format('woff2'),        url('http://localhost:5173/fonts/Satoshi-Italic.woff') format('woff'),        url('http://localhost:5173/fonts/Satoshi-Italic.ttf') format('truetype');font-weight:400;font-display:swap;font-style:italic;}
@font-face{font-family:'Satoshi';src:url('http://localhost:5173/fonts/Satoshi-Medium.woff2') format('woff2'),        url('http://localhost:5173/fonts/Satoshi-Medium.woff') format('woff'),        url('http://localhost:5173/fonts/Satoshi-Medium.ttf') format('truetype');font-weight:500;font-display:swap;font-style:normal;}
@font-face{font-family:'Satoshi';src:url('http://localhost:5173/fonts/Satoshi-MediumItalic.woff2') format('woff2'),        url('http://localhost:5173/fonts/Satoshi-MediumItalic.woff') format('woff'),        url('http://localhost:5173/fonts/Satoshi-MediumItalic.ttf') format('truetype');font-weight:500;font-display:swap;font-style:italic;}
@font-face{font-family:'Satoshi';src:url('http://localhost:5173/fonts/Satoshi-Bold.woff2') format('woff2'),        url('http://localhost:5173/fonts/Satoshi-Bold.woff') format('woff'),        url('http://localhost:5173/fonts/Satoshi-Bold.ttf') format('truetype');font-weight:700;font-display:swap;font-style:normal;}
@font-face{font-family:'Satoshi';src:url('http://localhost:5173/fonts/Satoshi-BoldItalic.woff2') format('woff2'),        url('http://localhost:5173/fonts/Satoshi-BoldItalic.woff') format('woff'),        url('http://localhost:5173/fonts/Satoshi-BoldItalic.ttf') format('truetype');font-weight:700;font-display:swap;font-style:italic;}
@font-face{font-family:'Satoshi';src:url('http://localhost:5173/fonts/Satoshi-Black.woff2') format('woff2'),        url('http://localhost:5173/fonts/Satoshi-Black.woff') format('woff'),        url('http://localhost:5173/fonts/Satoshi-Black.ttf') format('truetype');font-weight:900;font-display:swap;font-style:normal;}
@font-face{font-family:'Satoshi';src:url('http://localhost:5173/fonts/Satoshi-BlackItalic.woff2') format('woff2'),        url('http://localhost:5173/fonts/Satoshi-BlackItalic.woff') format('woff'),        url('http://localhost:5173/fonts/Satoshi-BlackItalic.ttf') format('truetype');font-weight:900;font-display:swap;font-style:italic;}