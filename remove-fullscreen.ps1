Get-ChildItem -File -Filter '*.html' | ForEach-Object {
  $p=$_.FullName
  $s=Get-Content -Raw -Encoding UTF8 $p
  $s=$s -replace '<button id="fullscreen-btn" class="fullscreen-btn" type="button" aria-label="Mở toàn màn hình" title="Toàn màn hình">⛶</button>',''
  $s=$s -replace '<button id="fullscreen-btn" class="fullscreen-btn fullscreen-float" type="button" aria-label="Mở toàn màn hình" title="Toàn màn hình">⛶</button><script>.*?</script>',''
  Set-Content -Path $p -Value $s -Encoding UTF8
}
$style=Get-Content -Raw -Encoding UTF8 .\style.css
$style=[regex]::Replace($style,'\r?\n/\* Nút toàn màn hình dùng chung \*/.*?\.fullscreen-float\{[^}]*\}\r?\n','\n')
Set-Content -Path .\style.css -Value $style -Encoding UTF8
$script=Get-Content -Raw -Encoding UTF8 .\script.js
$script=[regex]::Replace($script,'\r?\n/\* Điều khiển toàn màn hình cho các trang dùng script chung \*/.*?\}\)\(\);\r?\n','\n')
Set-Content -Path .\script.js -Value $script -Encoding UTF8
Remove-Item .\add-fullscreen.ps1 -Force -ErrorAction SilentlyContinue
Write-Output 'FULLSCREEN_REMOVED'
