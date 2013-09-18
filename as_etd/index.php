<?php   header ("Content-Type: text/html; charset=windows-1251");
 include "db.php";
?>
<html>
<head><title>Главная страница</title>
<meta http-equiv="Content-Type" content="text/html; charset=windows-1251">


 <script src="./src/js/jquery.js"></script>

 <script src="./src/js/jquery.tools.min.js"></script>
 <script src="./src/js/jquery-ui-1.8.6.custom.min.js"></script>

 <script src="./src/js/jquery.tmpl.min.js"></script>
 
  <script src='./all.js'></script>
  

 <link  rel="stylesheet" type=text/css href="images/style.css">
<?
 @ $db = mysql_connect ($config[mysql_host], $config[mysql_user], $config[mysql_password]);
 if (!$db) { echo "Ошибка подключения к SQL :("; exit();}
 mysql_select_db('valentina',$db);  
?>
</head>

<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">

<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
 <tr><td width="100%" height="10"><? include("images/top.php") ?></td></tr>
<!-- <tr><td height="80">Фильтры</td></tr> -->
 <tr><td colspan=2 valign=top>
<?             //Главная страница выбирается по параметру $r, если пусто, открывается pages/fpk-main.php
  $r=$GLOBALS['_GET']['r'];
  if (@$r=='') include "pages/as_etd-admin.php"; else 
  include "pages/as_etd-".$r.".php"; 
 ?>
 </td></tr>
 <tr><td width="100%"height="109" ><?include("./images/bottom.php");?></td></tr>
</table>
<div id="bububu" style="visibility:hidden"></div>
</body>
</html></div>
</body>
</html>