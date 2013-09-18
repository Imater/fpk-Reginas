<?php   header ("Content-Type: text/html; charset=windows-1251");?>
<html>
<head><title>Главная страница</title>
<meta http-equiv="Content-Type" content="text/html; charset=windows-1251">
 	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>

<!-- <script src="src/js/jquery.js"></script>-->

 <script src="jquery-1.4.2.min.js"></script>
 <script src="src/js/jquery.tools.min.js"></script>
 <script src="src/js/jquery-ui-1.8.6.custom.min.js"></script>

 <script src="src/js/jquery.tmpl.min.js"></script>
 
 <script src="jquery.cookie.js"></script>

 <script src="all.js"></script>
 <script src="general.js"></script>



 <link rel="stylesheet" href="src/css/adm/reset.css" type="text/css" media="screen" />
 <link rel="stylesheet" href="src/css/adm/style.css" type="text/css" media="screen" />
<!-- <script type="text/javascript">$(document).ready(jsDoFirst); </script> -->

<script type="text/javascript">
 jQuery(document).ready(function(){

	var cookieName = 'level';
	var cookieOptions = {expires: 7, path: ''};
	
	$("#verbose").val("");
	$("#" + $.cookie(cookieName)).addClass("selected");

	$(".htabs a").click(function(e){
		e.preventDefault();
		$("#" + $.cookie(cookieName)).removeClass("selected");
		$.cookie(cookieName, $(this).attr("id"), cookieOptions);
		$("#" + $.cookie(cookieName)).addClass("selected");
	});
	
	$("#showCookie").click(function(e){
		e.preventDefault();
		$("#verbose").val("Значение куки: " + $.cookie(cookieName) + ".");
	});
	
	$("#deleteCookie").click(function(e){
		e.preventDefault();
		$("#verbose").val("Куки 'level' со значением \"" + $.cookie(cookieName) + "\" удалено.");
		$("#" + $.cookie(cookieName)).removeClass("selected");
		$.cookie(cookieName, null, {path:'/'});
	});
 });
</script> 


</head>

<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
<div id="block">
   <ul class="htabs">	
     <li><h2><a href="#basic" id="basic">Базовая</a></h2></li>
     <li><h2><a href="#intermediate" id="intermediate">Стандартная</a></h2></li>
     <li><h2><a href="#advanced" id="advanced">Расширенная</a></h2></li>
   </ul>
   <a href="#" id="showCookie" class="doCookie">Показать куки</a>
   <a href="#" id="deleteCookie" class="doCookie">Удалить куки</a>
   <input disabled id="verbose" type="text" />
</div>

</body>
</html></div>
</body>
</html>


