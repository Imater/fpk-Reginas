<?
$config = array(
   'themedir' => "themes/",     // path to dir with themes
   'mysql_host' => "localhost",
   'mysql_user' => "root",
  'mysql_password' => "See6thoh",
// 'mysql_password' => "",
//  'mysql_user' => "valentina",
// 'mysql_password' => "rehufy",
//  'ip_1' =>"10.81.20.112", 
//  'ip_2' =>"10.81.20.58" 
);
 header("Content-type: text/html; charset=windows-1251");


//////////////////////////////////////////////////////////////////////////////

//Вывод таблицы с шаблоном $theme
function displayNewsAll($theme,$sqlnews) { 
   global $config,$r;
   $result = mysql_query($sqlnews); 
   $TXT='';
   while (@$sql = mysql_fetch_object ($result))
     {
      $TXT.=displayNewsEntry($sql, $theme, $detail="no");
     } 
   return $TXT;
}

//Вывод одной строки
function displayNewsEntry($sql, $theme, $detail="no") { 
   global $config,$topic;     

   $fullbox=implode("", file($config['themedir'].$theme));
   preg_match_all("/#(.*)#/U",$fullbox,$matches);
   for ($i=0; $i<count($matches[0]); $i++) {
      $func_name="mod_".strtolower($matches[1][$i]);
      if (function_exists($func_name)) {
         $tag=call_user_func($func_name,$sql,66,$detail);
         $fullbox=str_replace($matches[0][$i],$tag,$fullbox);
      } else {
         echo "Func $func_name not exists<br>\n";
      }
   }                                                   
   return $fullbox;


}
function mod_text($sql) { 
 return $sql->text; }

function mod_id($sql)   { 
 return $sql->id;   }

function mod_f_name($sql) { 
 return $sql->f_name; }

function mod_f_claim_name($sql) { 
 return $sql->f_claim_name; }

function mod_f_arm_name($sql) { 
 return $sql->f_arm_name; }

function mod_f_line($sql) { 
 return $sql->f_line; }

function mod_f_creation_asetd($sql) { 
 return $sql->f_creation_asetd; }

function mod_f_input_rate($sql) { 
 return $sql->f_input_rate; }

function mod_f_department($sql) { 
 return $sql->f_department; }

function mod_f_instruction($sql) { 
 return $sql->f_instruction; }

function mod_f_order($sql) { 
 return $sql->f_order; }

function mod_f_comment($sql) { 
 return $sql->f_comment; }
 
function mod_f_1($sql) { 
 return $sql->f_1; } 

function mod_date($sql) { 
 return gmdate("Y-m-d H:i:s",time()); }

function mod_lnkedit($sql) {  
 return $sql->f_name; }
  
function mod_lnktotext($sql) {
 return "<a href=index.php?Page=".$sql->name."><b>Показать</b></a>"; }
 
 
function UpdateText()  {
  global $config;
  $sqlnews=" UPDATE  valentina.forms SET
        f_name ='".$GLOBALS['_POST']['f_name']."',
	f_short_name =  '".$GLOBALS['_POST']['f_short_name']."',
	f_claim_name =  '".$GLOBALS['_POST']['f_claim_name']."',
	f_arm_name =  '".$GLOBALS['_POST']['f_arm_name']."',
	f_creation_asetd =  '".$GLOBALS['_POST']['f_creation_asetd']."',
	f_line =  '".$GLOBALS['_POST']['f_line']."',
	f_input_rate =  '".$GLOBALS['_POST']['f_input_rate']."',
	f_department =  '".$GLOBALS['_POST']['f_department']."',
	f_instruction =  '".$GLOBALS['_POST']['f_instruction']."',
	f_order =  '".$GLOBALS['_POST']['f_order']."',
	f_comment =  '".$GLOBALS['_POST']['f_comment']."',
	f_1 =  '".$GLOBALS['_POST']['f_1']."'
    WHERE  forms.id ='".$GLOBALS['_POST']['f_id']."' LIMIT 1 ;";
	echo $sqlnews;
   $result = mysql_query($sqlnews); 

  }


function sql2json($sqlnews)
{
				 $result1 = mysql_query($sqlnews); 

	$j=0;
				 while (@$sql = mysql_fetch_array($result1, MYSQL_ASSOC))
					  {
					  preg_match_all("/#(.*)#/U",$sqlnews,$matches);

					   for ($i=0; $i<count($matches[0]); $i++) {
						  $func_name="mod_".strtolower($matches[1][$i]);
						  if (function_exists($func_name)) {
							 $tag=call_user_func($func_name,$sql,66,$detail);
							 $fullbox=str_replace($matches[0][$i],$tag,$fullbox);
							 
							 
							 
							 $sql[str_replace('#','',$matches[0][$i])]=$tag;
							 
							 
							 
                             
						  } else {
							 echo "Func $func_name not exists<br>\n";
						  }
						  }
//					  print_r($sql);
//echo "<p>результат sql= ". join(', ', $sql);
					  $sqlall[$j]=$sql;
					  $j++;


					  }
					
                $news=php2js($sqlall);
//echo "<br><br>функция news <p>".$news."<br><br>";
				return $news;
}



function php2js($a=false)
{
 // if (is_null($a)) return '[ { "id": " ","f_name": " ", "f_short_name": " ", "f_claim_name": " ", "f_arm_name": " ", "f_creation_asetd": " ", "f_line": " ", "f_input_rate": " ", "f_department": " ", "f_instruction": " ", "f_order": " ", "f_comment": " ", "f_1": " ", "f_delete": " ", "f_creation_asetd_": " ", "#date#": "#date#", "date": " " } ]';
  if (is_null($a)) return 'null';
  if ($a === false) return 'false';
  if ($a === true) return 'true';
  if (is_scalar($a))
  {
    if (is_float($a))
    {
      $a = str_replace(",", ".", strval($a));
    }
    static $jsonReplaces = array(array("\\", "/", "\n", "\t", "\r", "\b", "\f", '8"'),
    array('\\\\', '\\/', '\\n', '\\t', '\\r', '\\b', '\\f', '\"'));
    return '"' . str_replace($jsonReplaces[0], $jsonReplaces[1], $a) . '"';
  }
  $isList = true;
  for ($i = 0, reset($a); $i < count($a); $i++, next($a))
  {
    if (key($a) !== $i)
    {
      $isList = false;
      break;
    }
  }
  $result = array();
 

//echo "<p>переменная isList=".$isList;
  if ($isList)
  {
    foreach ($a as $v) $result[] = php2js($v); 
//echo "<p>ресульт1 <br>".'[ ' . join(', ', $result) . ' ]';
    return '[ ' . join(', ', $result) . ' ]'; 
  }
  else
  {
    foreach ($a as $k => $v) $result[] = php2js($k).': '.php2js($v); 
//echo "<p>ресульт2 <br>".'[ ' . join(', ', $result) . ' ]';
    return '{ ' . join(', ', $result) . ' }';  
  }
}


?>