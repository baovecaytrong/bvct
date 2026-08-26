$button='<button id="page-fullscreen" class="icon-btn" type="button" aria-label="Toàn màn hình" title="Toàn màn hình">⛶</button>'
Get-ChildItem -File -Filter '*.html' | ForEach-Object {
  $p=$_.FullName
  $s=Get-Content -Raw -Encoding UTF8 $p
  if($s -match 'class="nav-actions"' -and $s -notmatch 'id="page-fullscreen"') {
    $s=$s.Replace('<button id="menu-btn"', $button+'<button id="menu-btn"')
    Set-Content -Path $p -Value $s -Encoding UTF8
  }
}
Write-Output 'HEADER_FULLSCREEN_POSITION_FINALIZED'
