$button='<button id="page-fullscreen" class="icon-btn" type="button" aria-label="Toàn màn hình" title="Toàn màn hình">⛶</button>'
Get-ChildItem -File -Filter '*.html' | ForEach-Object {
  $p=$_.FullName
  $s=Get-Content -Raw -Encoding UTF8 $p
  if($s -match 'class="nav-actions"' -and $s -notmatch 'id="page-fullscreen"') {
    $s=$s.Replace('<button id="theme-btn" class="icon-btn" type="button" aria-label="Đổi giao diện">☾</button>','<button id="theme-btn" class="icon-btn" type="button" aria-label="Đổi giao diện">☾</button>'+ $button)
    Set-Content -Path $p -Value $s -Encoding UTF8
  }
}
Write-Output 'PAGE_FULLSCREEN_MARKUP_ADDED'
