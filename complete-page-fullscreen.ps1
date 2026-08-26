$headerButton='<button id="page-fullscreen" class="icon-btn" type="button" aria-label="Toàn màn hình" title="Toàn màn hình">⛶</button>'
$floatingButton='<button id="page-fullscreen" class="icon-btn fullscreen-float" type="button" aria-label="Toàn màn hình" title="Toàn màn hình">⛶</button>'
$inline='<script>(function(){var b=document.getElementById("page-fullscreen");if(!b)return;b.addEventListener("click",function(){var e=document.documentElement;if(document.fullscreenElement){(document.exitFullscreen||document.webkitExitFullscreen).call(document)}else{(e.requestFullscreen||e.webkitRequestFullscreen).call(e)}});document.addEventListener("fullscreenchange",function(){var on=!!document.fullscreenElement;b.textContent=on?"×":"⛶";b.setAttribute("aria-label",on?"Thoát toàn màn hình":"Toàn màn hình")})})();</script>'
Get-ChildItem -File -Filter '*.html' | ForEach-Object {
  $p=$_.FullName
  $s=Get-Content -Raw -Encoding UTF8 $p
  if($s -notmatch 'id="page-fullscreen"') {
    if($s -match 'class="nav-actions"') {
      $s=$s.Replace('<div class="nav-actions">','<div class="nav-actions">'+ $headerButton)
    } elseif($s -match 'script\.js') {
      $s=$s.Replace('</body>',$floatingButton+'</body>')
    } else {
      $s=$s.Replace('</body>',$floatingButton+$inline+'</body>')
    }
    Set-Content -Path $p -Value $s -Encoding UTF8
  }
}
Write-Output 'ALL_PAGE_FULLSCREEN_ADDED'
