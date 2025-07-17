# CSS Cleanup Script
# Dit script identificeert dubbele CSS regels in App.css

$cssFile = "src\App.css"
$content = Get-Content $cssFile -Raw

Write-Host "Analyseren van dubbele CSS regels in $cssFile..." -ForegroundColor Green

# Lees alle CSS regels
$lines = Get-Content $cssFile
$duplicates = @()

# Zoek naar dubbele selectors
$selectors = @{}
for ($i = 0; $i -lt $lines.Count; $i++) {
    $line = $lines[$i].Trim()
    if ($line -match "^\.[a-zA-Z0-9_-]+\s*\{$") {
        $selector = $line
        if ($selectors.ContainsKey($selector)) {
            $selectors[$selector] += @($i + 1)
        } else {
            $selectors[$selector] = @($i + 1)
        }
    }
}

# Toon dubbele selectors
Write-Host "`nDubbele CSS selectors gevonden:" -ForegroundColor Yellow
$selectors.GetEnumerator() | Where-Object { $_.Value.Count -gt 1 } | ForEach-Object {
    Write-Host "$($_.Key) - Lijnen: $($_.Value -join ', ')" -ForegroundColor Red
}

# Bereken bestandsgrootte
$fileSize = (Get-Item $cssFile).Length
$fileSizeKB = [math]::Round($fileSize / 1024, 2)
$lineCount = $lines.Count

Write-Host "`nBestandsstatistieken:" -ForegroundColor Cyan
Write-Host "Totaal aantal regels: $lineCount"
Write-Host "Bestandsgrootte: $fileSizeKB KB"

Write-Host "`nVoorgestelde acties:" -ForegroundColor Green
Write-Host "1. Verwijder dubbele selectors"
Write-Host "2. Groepeer gerelateerde CSS secties"
Write-Host "3. Splits grote secties in aparte bestanden"