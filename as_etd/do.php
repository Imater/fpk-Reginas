<?

 include("db.php");
 @ $db = mysql_connect ($config[mysql_host], $config[mysql_user], $config[mysql_password]);
 if (!$db) { echo "Ошибка подключения к SQL :("; exit();}
 mysql_select_db('valentina',$db);  

 mysql_query("SET NAMES cp1251",$db);   //тут еще раз указываю кодировку
 mysql_query("set character_set_client=cp1251",$db);
 mysql_query("set character_set_results=cp1251",$db);
 mysql_query("set collation_connection=cp1251",$db);

                  //добавление новой формы
 if (isset($GLOBALS['_GET']['AddForm'])) 
   {             
   $sqlnews="INSERT INTO `valentina`.`forms` (`id`, `f_name`, `f_short_name`, `f_claim_name`, `f_arm_name`, `f_creation_asetd`, `f_line`, `f_input_rate`, `f_department`, `f_instruction`, `f_order`, `f_comment`, `f_1`, `f_delete`) VALUES (NULL,  NOW(), 'new', '', '', '', '*', '', '', '', '0', '', '', '');";
   
   echo $sqlnews;
   $result = mysql_query($sqlnews);
   exit;
   }

//пометка формы признаком - удалена
 if (isset($GLOBALS['_GET']['DeleteForm'])) 
   {
   $sqlnews="UPDATE  `valentina`.`forms` SET  `f_delete` =  '1' WHERE  `forms`.`id` =".$GLOBALS['_GET']['DeleteForm']." LIMIT 1 ;";
   echo $sqlnews;
   $result = mysql_query($sqlnews);
   exit;
   }


//перезаписывание данных из textarea в базу
 if (isset($GLOBALS['_GET']['UpdateForm'])) 
   {
   $val=iconv('UTF-8','windows-1251', $GLOBALS['_GET']['value'] );
    $sqlnews=" UPDATE  valentina.forms SET
    ".$GLOBALS['_GET']['field']."='".$val."'
    WHERE  forms.id ='".$GLOBALS['_GET']['UpdateForm']."' LIMIT 1 ;";
	echo $sqlnews;
   $result = mysql_query($sqlnews);
   
   exit;
   }




 if (isset($GLOBALS['_GET']['Page'])) 
   {
   $page = iconv('UTF-8','windows-1251', $GLOBALS['_GET']['Page'] ); 
   
    $fields = array ('forms.f_name', 'forms.f_short_name', 'forms.f_claim_name', 'forms.f_comment', 'forms.f_arm_name', 'forms.f_line', 'forms.f_department');
	$in1="FALSE ";
	
	for($j=0; $j<count($fields); $j++)
	   {
			$explodeFilter = explode("/", $page);
			for ($i=0; $i<count($explodeFilter); $i++) 
			     { 
     if ( substr($explodeFilter[i],0,1)=="+" ) {$in1 .= " AND ".$fields[$j]." LIKE '%".trim($explodeFilter[$i])."%'";}
      	 $in1 .= " OR ".$fields[$j]." LIKE '%".trim($explodeFilter[$i])."%'";
				 }
	   }

    $sqlnews="SELECT *, '#date#' from forms WHERE forms.f_delete=0 AND ($in1) ORDER BY f_order";
//echo "<p>результат sqlnews= ".$sqlnews;

   echo sql2json($sqlnews);
   exit;
   }

   
   
?>