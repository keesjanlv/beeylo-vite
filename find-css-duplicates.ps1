# Script om echte CSS duplicaten te vinden
$cssFile = "src\App.css"
$lines = Get-Content $cssFile

Write-Host "Zoeken naar echte CSS duplicaten..." -ForegroundColor Green

# Vind CSS blokken (selector + properties)
$cssBlocks = @{}
$currentSelector = ""
$currentBlock = @()
$inBlock = $false

for ($i = 0; $i -lt $lines.Count; $i++) {
    $line = $lines[$i].Trim()
    
    if ($line -match "^\.[a-zA-Z0-9_-]+\s*\{$") {
        # Nieuwe selector gevonden
        if ($currentSelector -and $currentBlock.Count -gt 0) {
            $blockContent = $currentBlock -join "`n"
            if ($cssBlocks.ContainsKey($blockContent)) {
                $cssBlocks[$blockContent] += @(@{Selector=$currentSelector; Line=$i-$currentBlock.Count})
            } else {
                $cssBlocks[$blockContent] = @(@{Selector=$currentSelector; Line=$i-$currentBlock.Count})
            }
        }
        $currentSelector = $line
        $currentBlock = @()
        $inBlock = $true
    }
    elseif ($line -eq "}" -and $inBlock) {
        # Einde van blok
        if ($currentSelector -and $currentBlock.Count -gt 0) {
            $blockContent = $currentBlock -join "`n"
            if ($cssBlocks.ContainsKey($blockContent)) {
                $cssBlocks[$blockContent] += @(@{Selector=$currentSelector; Line=$i-$currentBlock.Count})
            } else {
                $cssBlocks[$blockContent] = @(@{Selector=$currentSelector; Line=$i-$currentBlock.Count})
            }
        }
        $currentSelector = ""
        $currentBlock = @()
        $inBlock = $false
    }
    elseif ($inBlock -and $line -ne "") {
        # CSS property binnen blok
        $currentBlock += $line
    }
}

# Toon echte duplicaten
Write-Host "`nEchte CSS duplicaten (identieke content):" -ForegroundColor Yellow
$duplicateCount = 0
$cssBlocks.GetEnumerator() | Where-Object { $_.Value.Count -gt 1 } | ForEach-Object {
    $duplicateCount++
    Write-Host "`nDuplicaat $duplicateCount :" -ForegroundColor Red
    $_.Value | ForEach-Object {
        Write-Host "  $($_.Selector) (regel $($_.Line))" -ForegroundColor Cyan
    }
    Write-Host "  Content:" -ForegroundColor Gray
    $_.Key -split "`n" | ForEach-Object { Write-Host "    $_" -ForegroundColor DarkGray }
}

if ($duplicateCount -eq 0) {
    Write-Host "Geen echte duplicaten gevonden!" -ForegroundColor Green
} else {
    Write-Host "`nTotaal $duplicateCount echte duplicaten gevonden." -ForegroundColor Yellow
}