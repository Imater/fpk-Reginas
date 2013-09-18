
<?
$sqlnews="SELECT * from forms WHERE f_name like '".$GLOBALS['_GET']['Page']."'";

//$sqlnews="SELECT * from svnews WHERE text LIKE '%$search%'";
//echo $sqlnews."<hr>";
$news=displayNewsAll("as_etd-news.php",$sqlnews);
?>
<table>
<tr>
<? echo $news; ?>
</tr>
</table>



