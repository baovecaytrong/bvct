$button='<button id="page-fullscreen" class="icon-btn" type="button" aria-label="Toàn màn hình" title="Toàn màn hình">⛶</button>'
Get-ChildItem -File -Filter '*.html' | ForEach-Object {
  $p=$_.FullName
  $s=Get-Content -Raw -Encoding UTF8 $p
  $s=$s -replace '<button id="page-fullscreen" class="icon-btn( fullscreen-float)?" type="button" aria-label="Toàn màn hình" title="Toàn màn hình">⛶</button>',''
  if($s -match 'class="nav-actions"') {
    $s=$s.Replace('<button id="theme-btn" class="icon-btn" type="button" aria-label="Đổi giao diện">☾</button>','<button id="theme-btn" class="icon-btn" type="button" aria-label="Đổi giao diện">☾</button>'+ $button)
  } elseif($s -match 'script\.js') {
    $s=$s.Replace('</body>','<button id="page-fullscreen" class="icon-btn fullscreen-float" type="button" aria-label="Toàn màn hình" title="Toàn màn hình">⛶</button></body>')
  } else {
    $s=$s.Replace('</body>','<button id="page-fullscreen" class="icon-btn fullscreen-float" type="button" aria-label="Toàn màn hình" title="Toàn màn hình">⛶</button>'+ '<script>(function(){var b=document.getElementById("page-fullscreen");if(!b)return;b.addEventListener("click",function(){var e=document.documentElement;if(document.fullscreenElement){document.exitFullscreen()}else{e.requestFullscreen()}})})();</script></body>')
  }
  Set-Content -Path $p -Value $s -Encoding UTF8
}
Write-Output 'FULLSCREEN_POSITION_FIXED'
