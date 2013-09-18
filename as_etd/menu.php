<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=windows-1251">

<title>Меню</title>

<script src="jquery-1.4.2.min.js" type="text/javascript"></script>
<script src="jquery.cookie.js"></script>
<script type="text/javascript">
var menu1 = null;
//var menu2 = null;
$(document).ready(function(){
	menu1 = parseInt($(".right").css("top").substring(0,$(".right").css("top").indexOf("px")));
//	menu2 = $(window).height() - 96;
	
//	$(window).scroll(function () { 
//		offset1 = menu1 + $(document).scrollTop() + "px";
//		offset2 = menu2 - $('.left .panel').height() + $(document).scrollTop() + "px";
//				
//		$('.right').animate({top:offset1},{duration:500,queue:false});
//		$('.left').animate({top:offset2},{duration:1000,queue:false});
//	});
        	$("#verbose").val("");
	$(".panel a").click(function(e){
		e.preventDefault();
		$("#" + $.cookie(cookieName)).removeClass("selected");
		$.cookie(cookieName, $(this).attr("id"), cookieOptions);
		$("#" + $.cookie(cookieName)).addClass("selected");
$("#verbose").val("Значение куки: " + $.cookie(cookieName) + ".");
	});




	
	$('.panel ul li ul').hide();
       
    $('.panel ul li:has(ul) > a').click(function() {
        $('.panel ul li ul').hide();
        $('img.ul_title').attr("src","images/but_b.gif");
        $(this).parent().find('ul').slideToggle();
        $(this).find('img.ul_title').attr("src","images/but_br.gif");     
        return false;      
    });

	 
    $('a.plus').click(function(){
       $(this).parent().next().find('ul li ul').slideUp('fast');
//       $('a.ul_title').attr("id","1"); 

       $('a.ul_title').each(function(){
                                        $('a.ul_title').attr("id","1");
                                        $('img.ul_title').attr("src","images/but_b.gif");
                                       });

       return false; 
    });
    
    $('a.minus').click(function(){
       $(this).parent().next().find('ul li ul').slideDown('slow');
       $('a.ul_title').each(function(){
                                        $('a.ul_title').attr("id","2");
                                        $('img.ul_title').attr("src","images/but_br.gif");
                                       });
       return false; 
    });
    
});
</script>

<style type="text/css">
body {
	margin: 0 auto;
	padding: 0;
	font: 75%/120% Arial, Helvetica, sans-serif;
	background-color:#fff;   
        height:2000px; 
}

.float {
    position:absolute;
    width:190px;
    z-index:10; 
	padding-top:0px;
    background: #fff url(images/btn-slide-2.gif) no-repeat center top;
}
.right {
    left: 0px;
    top:195px;
}
.left {
    left: 0px;
    bottom: 0px;
}

.panel{
	margin-top:20px;
	padding-bottom:15px;
	background: #fff url(images/btn-slide.gif) no-repeat center bottom;
}

.panel ul{
    list-style:none;
    margin:0 5px;
    padding:0 2px;
    border-left:1px solid #BFBFBF;
    border-right:1px solid #BFBFBF;
    font-weight: bold;

}

.panel li ul{
	list-style-type: none;	
	margin: 0 0px;
	padding: 0 0px;	
        display: none;
        border:0;
}

.panel li ul li {
	margin: 0 0 0 20px;
	padding: 0 0 0 0;
}
.panel a{
	display: block; 
	padding: 0px 5px;
	text-decoration: none;
	color: #252321;
}
.links {
    margin-top:3px;
    margin-left: 159px;
    margin-bottom:-10px;

}
.links a{
        font-size:12px;
        color: #6E675F;
        text-decoration:none;
}
a:hover   {color:#E41A0A;}
a.ul_sup:hover   {color:#E41A0A;}


a.ul_sup{
        font-size:12px;
        color: #4C4742;
        text-decoration:none;
}


</style>
</head>

<body>

<div class="float right">
<!--    <div id="debug"></div> -->
    <p class="links"><a href="#" class="plus"> </a> <a href="#" class="minus"> </a></p>
    <div class="panel">
        <ul>
            <li><a id=1 class=ul_title href="#" title="Новости"><img class=ul_title src="images/but_b.gif" width="9" height="11" border="0"> Новости</a>            </li>

            <li><a id=2  class=ul_title href="#" title="Информация о службе"><img class=ul_title src="images/but_b.gif" width="9" height="11" border="0"> О службе</a>
                <ul>                                    
            	   <li><a class=ul_sup href="javascript:self.parent.location='?p=a1'" title="Положение о службе">Положение о службе</a></li>
            	   <li><a class=ul_sup href="javascript:self.parent.location='?p=a2'" title="Телефны НОТ и НОТЛ">Телефны НОТ и НОТЛ</a></li>
            	   <li><a class=ul_sup href="#" title="Телефоны работников по труду">Телефоны работников по труду</a></li>
            	</ul>
            </li>
            <li><a id=3 class=ul_title href="#"  title="Официальные Документы"><img class=ul_title src="images/but_b.gif" width="9" height="11" border="0"> Документы</a>
                <ul>
            	   <li><a class=ul_sup href="#" title="Трудовой кодекс">Трудовой кодекс</a></li>
            	   <li><a class=ul_sup href="#" title="Коллективный договор">Коллективный договор</a></li>
            	   <li><a class=ul_sup href="#" title="Классификаторы, сборники">Классификаторы, сборники</a></li>
            	</ul>
            </li>
            <li><a id=4 class=ul_title href="#" title="Оплата труда"><img class=ul_title src="images/but_b.gif" width="9" height="11" border="0"> Оплата труда</a>
                <ul>
            	   <li><a class=ul_sup href="#" title="Положение, индексация">КСОТ</a></li>
            	   <li><a class=ul_sup href="#" title="Текущее премирование">Текущее премирование</a></li>
            	   <li><a class=ul_sup href="#" title="Дополнительное премирование">Дополнительное премирование</a></li>
            	   <li><a class=ul_sup href="#" title="Единовременное поощрение">Единовременное поощрение</a></li>
            	   <li><a class=ul_sup href="#" title="Преданность компании">Преданность компании</a></li>
            	   <li><a class=ul_sup href="#" title="Доплаты и надбавки">Доплаты и надбавки</a></li>
            	   <li><a class=ul_sup href="#" title="Оплата командировок">Оплата командировок</a></li>
            	   <li><a class=ul_sup href="#" title="Средний заработок">Средний заработок</a></li>
            	   <li><a class=ul_sup href="#" title="Инструкции о составе ФЗП">Инструкции о составе ФЗП</a></li>
            	   <li><a class=ul_sup href="#" title="Анализ ЗП">Анализ ЗП</a></li>
            	</ul>
            </li>
            <li><a id=5 class=ul_title href="#" title="Рабочее время и время отдыха"><img class=ul_title src="images/but_b.gif" width="9" height="11" border="0"> Трудовое право</a>
                <ul>
            	   <li><a class=ul_sup href="#" title="Рабочее время">Рабочее время</a></li>
            	   <li><a class=ul_sup href="#" title="Время отдыха">Время отдыха</a></li>
            	</ul>
            </li>
            <li><a id=6 class=ul_title href="#" title="Нормирование труда"><img class=ul_title src="images/but_b.gif" width="9" height="11" border="0"> Нормирование труда</a>
                <ul>
            	   <li><a class=ul_sup href="#" title="Нормативные документы ОАО "РЖД"">Нормативные документы ОАО "РЖД"</a></li>
            	   <li><a class=ul_sup href="#" title="Нормативные документы дороги">Нормативные документы дороги</a></li>
            	   <li><a class=ul_sup href="#" title="Нормативы">Нормативы</a></li>
            	   <li><a class=ul_sup href="#" title="Анализ по нормированию">Анализ по нормированию</a></li>
            	</ul>
            </li>

            <li><a id=7 class=ul_title href="#" title="Информатизация НОТ"><img class=ul_title src="images/but_b.gif" width="9" height="11" border="0"> Информатизация НОТ</a>
                <ul>
            	   <li><a class=ul_sup href="#" title="Схема информатизации НОТ">Схема информатизации НОТ</a></li>
            	   <li><a class=ul_sup href="#" title="ЕК АСУТР">ЕК АСУТР</a></li>
            	   <li><a class=ul_sup href="#" title="АС АФОТ">АС АФОТ</a></li>
            	   <li><a class=ul_sup href="#" title="АС АФОТ">АС АФОТ</a></li>
            	   <li><a class=ul_sup href="#" title="ИАС ТиЗ">ИАС ТиЗ</a></li>
            	   <li><a class=ul_sup href="#" title="Прочие системы">Прочие системы</a></li>
             	</ul>
            </li>

            <li><a id=8 class=ul_title href="#" title="Вопросы и ответы"><img class=ul_title src="images/but_b.gif" width="9" height="11" border="0"> Вопросы и ответы</a>            </li>


        </ul>
       <input disabled id="verbose" type="text" />
    </div>
</div>



</body>
</html>
