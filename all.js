//css("border", "2px dotted blue")
// url_ = document.location.search; n_sub=url_.indexOf('&client=')+8; url=url_.substring(n_sub); $(".pane[id="+url+"]").show();
var timeline_data=null;
var searchtimeout='';
var alertmesage1=null;
var alertmesage2=null;
var onfoc = null;
var onf = null;
var st = null;
var iamblur=0;
var nchat=0;
var tttt=0;
var myt=0;
var tr=0;
var tl;
var si=0;
var typn;
var wastab=0;
var main_did=0;
var user = $.cookie('fpk_id');

function jsSms()
{
 alldate = $('#datediv').html();
   $("#rr1").load("do.php?news=0&date="+alldate);	
   $("#r1").load("do.php?news=1&date="+alldate);	
   $("#r2").load("do.php?news=2&date="+alldate);	
   $("#r3").load("do.php?news=3&date="+alldate);	
   $("#r4").load("do.php?news=4&date="+alldate);	
   $("#r5").load("do.php?news=5&date="+alldate);	
  
  clearInterval(si);
  si=setInterval(jsSms,10*60*1000);		

}

function jsAmount()
{
 manager = encodeURIComponent($('#selectmanager').html()); 
 model = $('#selectmodel option:selected').attr('value');
 radio=$('ul[class=tabs] li[class=current] a').attr('id');
 alldate = $('#datediv').html();
 filter='';
 jsSms();
   $(".left-amount").each(function()
		{
		var radio;
		radio=$(this).attr("id");
		//console.log(radio);
		
		 lnk = "do.php?ClientEmpty=24&json=2&Manager="+manager+"&Model="+model+"&Filter="+filter+"&Radio="+radio+"&ALLDate="+alldate+"&radarrange=";
        //console.info('Amount = '+lnk);
		$(".left-amount[id="+radio+"]").load(lnk);
		});
		
}

function jsTitle(title)
{
setTimeout( function()
             {
			  $('.title').css("margin-top",80).html('<b>'+title+'</b>').animate({"margin-top": 0}, 1000, function()
								{ 
								setTimeout(function()
   										{
   										$('.title').animate({"margin-top": 80}, 500, function(){});;
   										},30000);
								});
			 }, 200);

}

function jsDoFirst() //Исполняется только один раз
 {
	$('#chat1').hide();
	$('#whoonline').hide();
    $('.daterange').hide();
    $('#search').hide();
    $('#licup').hide();
    
    setTimeout( jsAmount(),20000);
    
		
		 $('*').undelegate("#textfilter", "keyup").delegate("#textfilter", "keyup", function(event) 
			{
				if (event.keyCode=='13') 
					{
					clearTimeout(tttt);
					tttt = setTimeout(function()
					         {
								$('.accordion2').html('');
	         					jsTitle("ПОИСК: Можно искать среди всех менеджеров. Если в поиске добавить символ '+'");
								if ( $('ul[class=tabs] li[class=current] a').attr('id') )
											wastab = $('ul[class=tabs] li[class=current] a').attr('id');
								$('ul[class=tabs] li').removeClass('current');
					        	jsShowClientsJson();
					         }, 0);
					
        		    //setTimeout(jsCollapse,200);
					}
				if (event.keyCode=='27') 
					{
					$('.accordion2').html('');
					$('#textfilter').val('');
					
				    $('#search').slideUp('fast');
	   				$('.search-ico').removeClass('active');
	    			
					clearTimeout(tttt);
					$('#'+wastab).parent('li').addClass('current');
					tttt = setTimeout(jsShowClientsJson, 50);
					}
			});
			

	$('#cup').click(function()
	    {
   			   $("#indented li").removeClass('current');
               $('#licup').slideDown('slow');
               $('#licup').addClass('current');
               $('.accordion2').load('do.php?cup=1&date='+$('#datediv').html(), jsRound );

		});
		
    $('*').undelegate(".roundfooter2", "click").delegate(".roundfooter2", "click", function() 
            {
    	    brand = $(this).parent('h3').attr('brand');
    	    id = $(this).attr('id');
    	    
		    $('#brand').html(brand);
		    $('#brand-ico').html('<img height="17px" src=".\\img\\logo-'+brand+'.png" style="padding-top:2px;">');
		    $('#selectmanager').html('Все');
			$.cookie('brand',brand,{ expires: 30 });
			$('#userlist').load('do.php?ShowManager=1');

            clearTimeout(tttt);
            tttt=setTimeout(function()
               {
	            $('.paneto, #h22').remove();
               
 				lnk = "do.php?ClientEmpty=24&json=1&Manager="+manager+"&Model="+model+"&Filter="+filter+"&Radio=statistic2&ALLDate="+alldate+"&radarrange=&type="+id+"&Brand="+brand;
 				//console.info(lnk);
 				$.getJSON( lnk ,function(data)
					{
					$.each(data, function(i,data)
						{  
						//console.log(i);
						$('#clients-tmpl-mini').tmpl(data).appendTo(".accordion2");
						});
					jsCollapse();
					});
				},200);
			});
		
		
		
		
		


	$('#stat').click(function()
	    {
	    		
                $('.accordion2').html('<div style="margin-top:15px;margin-right:15px;margin-bottom:30px; height:80%;width:100%;font-size:80%"><table id="le_table"></table><div id="le_tablePager" style="font-size:80%"></div></div>');
                
                $('#le_table').jqGrid({
                  url:'p1e1.php',
                  datatype: 'xml',
                  mtype: 'GET',
                  colNames:['Год','Месяц','<img src="img\\1vidacha.png" width="15px">', '<img src="img\\1dogovor.png" width="15px">','<img src="img\\1test-drive.png" width="15px">','<img src="img\\1vizit.png" width="15px">','<img src="img\\1zvonok.png" width="15px">'],
                  colModel :[
                    {name:'year', index:'year', width:15},
                    {name:'month', index:'date', width:30},
                    {name:'vd', index:'vd', width:7, align:"left", summaryType:'sum'},
                    {name:'dg', index:'dg', width:7, align:"left", summaryType:'sum'},
                    {name:'tst', index:'tst', width:7, align:"left", summaryType:'sum'},
                    {name:'vz', index:'vz', width:7, align:"left", summaryType:'sum'},
                    {name:'zv', index:'zv', width:7, align:"left", summaryType:'sum'}],

    grouping: true,
   	groupingView : {
   		groupField : ['year'],
   		groupColumnShow : [true],
   		groupText : ['<b>{0}</b>'],
   		groupCollapse : false,
		groupOrder: ['asc'],
		groupSummary : [true],
		showSummaryOnHide: true,
		groupDataSorted : true
   	},
   	viewrecords: true,
    footerrow: true,
    userDataOnFooter: true,
                  autowidth:true,
                  height:"100%",
                  hiddengrid:false,
                  //multiselect:true,
                  caption:"Статистика продаж",
                  pager: $('#le_tablePager'),
                  rowNum:365,
                  //shrinkToFit:true,
                  rowList:[10,20,30,100,365],
                  sortname: 'month',
                  sortorder: 'asc'
                });
    });




			
	$('.left-amount-do2').click(function()
	    {
	    main_did=1;
	    });		
	$('.left-amount-do').click(function()
	    {
	    main_did=3;
	    });		
	
    //Выбор бренда
	$("#selectbrand a").click(function()
		{
		    $('#brand').html($(this).attr('id2'));
		    $('#brand-ico').html('<img height="17px" src=".\\img\\logo-'+$(this).attr('id2')+'.png" style="padding-top:2px;">');
		    $('#selectmanager').html('Все');
			$.cookie('brand',$(this).attr('id2'),{ expires: 30 });
			$('#userlist').load('do.php?ShowManager=1');
			setTimeout(jsShowClientsJson, 0); 			
            setTimeout(jsCollapse,0);
            jsAmount();
		});

	$(".search-ico").click(function()
		{
	    $('#search').slideToggle('fast');
	    $('.search-ico').toggleClass('active');
	    if ($('.search-ico').hasClass('active')) $('#textfilter').focus();
		});
	
		

    //Клик в круглую стрелку в левом меню    
	$(".left-ico-2").click(function()
		{
				$("#indented").animate({"margin-left": -320}, 300, function()
								{ 
								$("#indented").css("margin-left",320);
								$("#indented li:last").remove();
								$("#indented").animate({"margin-left": 14}, 600);
								});
				event.stopPropagation();														
	    });

	//Клик в пункт меню
	$("#indented li").click(function()
		{
            $('#licup').slideUp('slow');
			$("#indented li").removeClass('current');
			$(this).addClass('current');
			$("#textfilter").val('');
			setTimeout(doLoadUp2(),0);
			if ( $(this).attr('id')!='do' ) { setTimeout(jsShowClientsJson, 0); 			
            setTimeout(jsCollapse,0); }
	    });

    //Подготовка чата
	jsChatRefresh();
    jsSetInterval(5000); //Запуск чата

	//Клик в список пользователей чата
	$('#online').click( 
				function(index) 
				  { 
				  if ($('#whoonline').css("display")=='none') $('#whoonline').load("do.php?online=1");
				  $('#whoonline').slideToggle('fast');
				  });
				  
	//Подготовка календаря
	$.datepicker.setDefaults($.datepicker.regional['ru']);
    $('.daterange').hide();
	$('#datepicker').datepicker({ inline: true, onSelect: function(dateText, inst) 
		   { 
		    radio=$('ul[class=tabs] li[class=current] a').attr('id');

		   $('#datediv').html(dateText);
		   doLoadUp2();
		    if(radio!='cup') jsShowClientsJson();
		   if ($('ul[class=tabs] li[class=current] a').attr('id')=='statistic')  tim1 = setTimeout(jsShowClientsJson, 0);
		   if ($('ul[class=tabs] li[class=current] a').attr('id')=='radar')  
				{ 
				tim1 = setTimeout(jsShowClientsJson, 0);  
				setTimeout( function() { $('.daterange').slideDown("fast"); $('.accordion2').slideDown("fast"); }, 0);
				}
					   }
				});
				
				$( "#datepicker" ).datepicker( "option", $.datepicker.regional[ 'ru' ] );				
				
				//hover states on the static widgets
				$('#dialog_link, ul#icons li').hover(
					function() { $(this).addClass('ui-state-hover'); }, 
					function() { $(this).removeClass('ui-state-hover'); }
				);

    //Обработка - активно окно или нет, нужно для чата (чтобы показать пользователь онлайн или нет
	window.onfocus = function() 
        {
		iamblur=0;
	 	document.title='ФПК';
	    clearTimeout(onfoc);
	    clearTimeout(onf);
	    onf = setTimeout(function() {
		   		clearInterval(alertmesage1);
		   		clearInterval(alertmesage2);
		   		document.title='ФПК';}, 1000);
	 	onfoc=setTimeout(	function()
			  	{
		  		$('#bubu').load("do.php?setonline=online", function ()
					{
					 $('#online').toggleClass("away");
					}); 
		  		}, 300);
		}
				
	window.onblur = function() 
			{
	 		 iamblur=1;
	 		 clearTimeout(onfoc);
	 		 onfoc=setTimeout(function()
		  			{
  		  			 $('#bubu').load("do.php?setonline=offline", function ()
								{
								 $('#online').toggleClass("away");
								}); 
		  			}, 20000);
			}

	//Настройка верхних панелей с фильтром, на затемнение если нет мышки сверху
	//Верхняя панель с НОВОСТЯМИ
	$(".btn-slide").click(function(){
		if ($('#panel').css("display")=='none')  
		 $('#panelin').load("do.php?news=1&date="+$('#datediv').html(), function ()
		   {															 
				$("#panel").slideDown("fast");
				clearTimeout(st);
				st = setTimeout( function() { $("#panel").slideUp("slow"); $(this).toggleClass("active"); }, 60000 );

				$(this).toggleClass("active"); return false;
		   }); 
		 else 
		   {
			   $("#panel").slideUp("fast");
			   $(this).toggleClass("active"); return false;

		   }
	
		});

  	 //Подготовка для отображения клиентов фильтр - менеджеров
    $('*').undelegate("#manager-menu a", "click").delegate("#manager-menu a", "click", function() 
      {
     clearTimeout(myt); 
      var man = $(this); 
     myt=setTimeout(function()
       {
       $('#selectmanager').html(man.html());
	   $.cookie('mymanager',man.html(),{ expires: 30 });
				$('#textfilter').attr('value',''); //обнуляем строку поиска при смене менеджера
				
			if ( $('ul[class=tabs] li[class=current] a').attr('id')!='do' ) setTimeout(jsShowClientsJson, 0); 			
				setTimeout(doLoadUp2,0);
				jsAmount();
	   },100);
      });
       
    $("#show-i a").click(function()
       {
	   $.cookie('showi',$(this).attr("id2"),{ expires: 30 });
       $("* #i1,#i2,#i3,#i4,#i5").hide();
       $("* #"+$(this).attr('id2')).show();
       });
       

    //css("border", "2px dotted blue");	
	jsShowClientsJson(); //Отобразить Всех клиентов в зависимости от фильтров
	setTimeout(doLoadUp2,0);
 }

//////////////////////////Функция вывода клиентов/////////////////////////////////
function jsShowClientsJson(){ //Показать Всех клиентов в зависимости от фильтров
 var myTimeOut = null;
 $('.accordion2').hide();//скрываю общее поле клиентов, чтобы не мелькало
 //считываю данные из фильтров
 manager = encodeURIComponent($('#selectmanager').html()); 
 model = $('#selectmodel option:selected').attr('value');
 filter =  encodeURIComponent($('#textfilter').attr('value'));
// filter =  '';
 radio=$('ul[class=tabs] li[class=current] a').attr('id');
 alldate = $('#datediv').html();
// alldate = '2011-02-12';
 
 if (radio!='statistic') $('#my-timeline').hide(); 
 //console.log("Радио="+radio);
 if ( (radio=='statistic2') ) //статистика за день
    {
 	$('.accordion2').hide().html('');
	var    types=Array ("zv","vz","tst","dg","vd","OUT");
    var typename=Array ("Звонки","Визиты","Тестдрайвы","Договора","Выдачи","OUT");
	for (i=0;i<types.length;i++)
	    {
		 lnk = "do.php?ClientEmpty=24&json=1&Manager="+manager+"&Model="+
		        model+"&Filter="+filter+"&Radio="+radio+"&ALLDate="+alldate+"&radarrange="+"&type="+types[i];

		 $.ajaxSetup({async: false}); //отключаем асинхронность, чтобы данные были готовы вовремя для таймлайн
		 $.getJSON( lnk ,function(data)
				{
    			    $("<h2>"+typename[i]+":</h2>").appendTo(".accordion2");
					$.each(data, function(i,data)
						{  
						$('#clients-tmpl-mini').tmpl(data).appendTo(".accordion2");
						});
					jsCollapse();
				});
			 }
	$.ajaxSetup({ async: true });
 	return true; 
	}
	
 if ( (radio=='statistic') && ($("#textfilter").val()=='') ) //TimeLine
    {
	var eventSource1 = new Timeline.DefaultEventSource();		
     $('.accordion2').hide().html('');
	 $('#my-timeline').show();
	var bandInfos = [
       Timeline.createBandInfo({
         width:          "17%", 
         intervalUnit:   Timeline.DateTime.MONTH, 
         eventSource:    eventSource1,
         intervalPixels: 200,
		 overview : true
     	}),
     Timeline.createBandInfo({
         width:          "83%", 
         intervalUnit:   Timeline.DateTime.DAY, 
         eventSource:    eventSource1,
         intervalPixels: 33
     })
   ];
   bandInfos[1].syncWith = 0;
   bandInfos[1].highlight = true;


	tl = Timeline.create(document.getElementById("my-timeline"), bandInfos);
   	tl.loadJSON("do.php?Timeline=1&Manager="+ manager, function(json, url) {
   	    eventSource1.loadJSON(json, url);
   		});
   
	Timeline.OriginalEventPainter.prototype._showBubble = function(x, y, evt) {
   		$("#textfilter").val( evt.getText () );
   		jsShowClientsJson();
   		jsCollapse();
   		setTimeout( function () { $(".pane").slideDown('fast'); }, 800 );
	}   
    eventSource1.loadJSON(timeline_data, '.'); // The data was stored into the 
    tl.layout(); // display the Timeline


	 $('.accordion2').slideDown('fast');
	 manager="NullManager";
	}
 
//Загружаю разом Всех клиентов - одна из главных функций
 $('.accordion2').hide().html('');
 lnk = "do.php?ClientEmpty=24&json=1&Manager="+manager+"&Model="+model+"&Filter="+filter+"&Radio="+radio+"&ALLDate="+alldate+"&radarrange=";
 //console.info(lnk);
 $.getJSON( lnk ,function(data)
	{
		$.each(data, function(i,data)
			{  
			//console.log(i);
			$('#clients-tmpl-mini').tmpl(data).appendTo(".accordion2");
			});
		jsCollapse();
	});

}



///////////////////////////////////////////////////////////////////////////////////////////////////
function jsShowClients(){ //Показать Всех клиентов в зависимости от фильтров
 var myTimeOut = null;
 $('.accordion2').hide();//сворачиваю общее поле клиентов, чтобы не мелькало
 //считываю данные из фильтров
 manager = encodeURIComponent($('#selectmanager').html());
 model = $('#selectmodel option:selected').attr('value');
 filter =  encodeURIComponent($('#textfilter').attr('value'));
 radio=$('ul[class=tabs] li[class=current] a').attr('id');
 
 alldate = $('#datediv').html();
 radarrange = encodeURIComponent($('#selectdaterange option:selected').attr('value'));
 
//Загружаю разом Всех клиентов
 $('.accordion2').hide().html('');
 $('.accordion2').load("do.php?ClientEmpty=24&Manager="+manager+"&Model="+model+"&Filter="+filter+"&Radio="+radio+"&ALLDate="+alldate+"&radarrange="+radarrange, function ()
   {															 
		jsCollapse();	//через задержку сворачиваю Все панели
   }); 
setTimeout(doLoadUp2,10);	//Загружаю дела менеджера
}


function jsCollapse() //Загружаем клиентов и сворачиваем внутренности
 {
 jsShowClientsPrepare();
 //Всё сворачиваем
 $(".pane").hide();	$(".pane2").hide(); $(".clientform").hide(); 
 
 $("* #i1,#i2,#i3,#i4,#i5").hide();
 $("* #"+$.cookie('showi')).show();
 
 if (radio=='credits') jsh1('creditmanager');
 else
 if ( ($('#selectmanager').html()=='Все') && (radio!='statistic')  && (radio!='statistic2')) jsh1('manager');
 else {
 	    if (radio!="statistic2") 
 	       {
 	        $('#myh2').remove();
 	        $('<h2 id="myh2">'+$('#selectmanager').html()+'</h2>').prependTo('.accordion2');
 	       }
		jsRound();
      }
 jsPrepareDate(); //Подготовка полей для изменения времени и даты

 $('.accordion2').slideDown("slow");

 radio=$('ul[class=tabs] li[class=current] a').attr('id');
 
 }


function jsShowClientsPrepare(onlyid) {
    $(".clientform").hide();
    
    
   	$("* #phone").unbind('blur').blur(function(event){ 
	  		var dataString = 'CheckPhone='+ $(this).val()+'&client='+$(this).parents('.paneto').attr('id');
	  		var phone = $(this).val();
	  	 if (($(this).val().length)>5)
		  	$txt = $.ajax({type: "GET",url: "do.php", data: dataString, success: function()
		  		{
		  		if ($txt.responseText!=0)
		  		 {
			     jsTitle('Клиент с телефоном '+phone+' уже есть в базе ('+$txt.responseText+' раз). Воспользуйтесь поиском.');
			     $('#search').slideDown('fast');
	    		 $('.search-ico').addClass('active');
	    		 $('#textfilter').val(phone+'+').focus();
	    		 }
 				}
			  });
			});
    
    
    //При клике в клиента (h3) сворачиваем или разворачиваем содержимое
    $(".accordion2 h3").unbind('click').click(function()
        {
        if ($(this).hasClass('notloaded')) 
           {
        	jsRefreshClientJson($(this).attr('id'));
        	$(this).removeClass('notloaded');
           }
		$(this).next(".pane").slideToggle("fast"); $(this).toggleClass("active"); $(this).siblings("h3").removeClass("active");
		
		});
    //При клике в дело (h4) сворачиваем или разворачиваем содержимое
    $("h4").unbind('click').click(function(){ 
		$(this).next(".pane2").slideToggle("fast");	$(this).toggleClass("active"); $(this).siblings("h4").removeClass("active");});
    //При клике в кнопку свернуть всё сворачиваем и скрываем кнопку
    $(".colapseall").unbind('click').click(function(){
	$(".accordion2 h3").removeClass("active"); $(".accordion2 .pane").slideUp("fast"); $(this).hide(); $(".expandall").show();});
	$(".clientformmini").unbind('click').click(function(){
					doid = $(this).attr('id');
                    $(".clientform[id="+doid+"]").slideToggle("fast");
                    $(".clientformmini[id="+doid+"]").slideToggle("fast");
					});
	$("img[class=dotype]").unbind('click').click(function(event){ 
				event.stopPropagation();														
				doid = $(this).parents('div').parents('div').attr('id');
    			client=$(this).parent('div').parent('div').attr("id");
		  		var dataString = 'Adddo='+ doid + '&Type=' + $(this).attr('title');
		  		$txt = $.ajax({type: "GET",url: "do.php", data: dataString, success: function()
						{ 
						//alert(dataString);
						jsRefreshClientJson(doid,$txt.responseText);
						} });
				
				
				
	});
  //Прогрессбар клиентов
	$("img[class=icon]").unbind('click').click(function(event){ 
				event.stopPropagation();														
				doid=$(this).attr('id');
				img=$(this);
		  		var dataString = 'Icon='+ doid;
		  		$txt = $.ajax({type: "GET",url: "do.php", data: dataString, success: function()
						{ 
						img.attr({'src':'img/progres-'+$txt.responseText+'.gif'});
						} });
					});
    //При клике в кнопку Развернуть всё сворачиваем и скрываем кнопку
	$(".expandall").unbind('click').click(function(){
	$(".accordion2 h3").addClass("active");	$(".accordion2 .pane").slideDown("fast"); $(this).hide(); $(".colapseall").show();});
 $("* #i1,#i2,#i3,#i4,#i5").hide();
 $("* #"+$.cookie('showi')).show();

	jsInputClick();
	
	

}

function jsRefreshClientJson(doid,maxid)
{
   $(".paneto[id="+doid+"]").each(function()
		{
		var client;
		client=$(this).attr("id");
		pan=$(this);
		
		lnk = "do.php?Clientid2="+client+"&json=8&Did=0";
		//console.log(lnk);
 //setTimeout(doLoadUp2,70);	

 $.getJSON( lnk ,function(data)
	{ 
		$.each(data, function(i,data)
			{  
			pan.html('');
			$('#clients-tmpl').tmpl(data).appendTo(pan);
			jsShowClientsPrepare();
						    //Всё сворачиваем
			$(".pane2").hide();
//			alert(maxid);
			if (maxid) $(".paneto[id="+doid+"] .pane2[id="+maxid+"]").slideDown('fast');
			if (maxid) $(".paneto[id="+doid+"] .pane2[id="+maxid+"] input[id=TEXT]").focus();
		    jsPrepareDate();
			});
		jsRound();
		//jsCollapse();
	});
							
		});

}





function jsRefreshClient(doid,maxid)
{
   $(".paneto[id="+doid+"]").each(function()
		{
		var client;

		client=$(this).attr("id");
    	$(this).load("do.php?Clientid2="+client+"&Did=0&Template=fpk-do-acordion.php", function()
						{
							jsShowClientsPrepare();
						    //Всё сворачиваем
							$(".pane2").hide(); //css("border", "2px dotted blue")
							if (maxid) $(".paneto[id="+doid+"] .pane2[id="+maxid+"]").slideDown('slow');
							if (maxid) $(".paneto[id="+doid+"] .pane2[id="+maxid+"] input[id=TEXT]").focus();
						    jsPrepareDate();
							setTimeout(doLoadUp2,700);	

						});
							
		});

}




function jsInputClick() {
	
	$("* #addclient").unbind('click').click(function()
		{ 
		 manager = encodeURIComponent($('#selectmanager').html());

		  		var dataString = 'AddClient='+$(this).attr('id2')+'&Manager='+manager;
		  		$txt = $.ajax({type: "GET",url: "do.php", data: dataString, success: function()
						{ 
						$txt2 = $.ajax({type: "GET",url: "do.php?UpdateIcons="+$txt.responseText });
						$('<div class="paneto" id="'+$txt.responseText+'"></div>').appendTo($(".accordion2"));
						jsRefreshClientJson($txt.responseText,$(".paneto:last").attr('id'));

setTimeout(function() { $('.clientformmini').slideUp('fast'); $('.clientform').slideDown('fast'); $(".paneto[id="+$txt.responseText+"] input[id=FIO]").focus(); } ,700);										

						} });
		});

		
		
		


	$("input").unbind('click').click(function()
		{
		mydiv=$(this); 
		doid = $(this).parents('div').attr('id');
	
    	if ($(this).attr('name') == 'clientadddo')
	    		{
    			client=$(this).parent('div').attr("id");
		  		var dataString = 'Adddo='+ doid;
		  		$txt = $.ajax({type: "GET",url: "do.php", data: dataString, success: function()
						{ 
						jsRefreshClientJson(doid,$txt.responseText)
						} });
		  		} 

    	
	
	//alert ($(this).val());
	
    if ($(this).val() == 'Снять выполнение')
	   {
	  var dataString = 'notDone='+ doid;
	  $txt = $.ajax({type: "GET",url: "do.php", data: dataString, success: function() 
			{			//Обновляю информацию по датам дел этого клиента   
			$txt2 = $.ajax({type: "GET",url: "do.php?UpdateIcons="+$('.pane2[id='+doid+']').attr('id2') });
$('h4[id='+doid+'] .mystrike').css({"text-decoration":"none"}).next('.pane2').slideUp("fast");
			$('h4[id='+doid+']').next('.pane2').slideUp("fast");							
			setTimeout(doLoadUp2,700);	

			$('input[idd='+doid+']').attr({'name':'Done', 'value':'Выполнить'});
			jsRefreshClientJson($('.pane2[id='+doid+']').attr('id2'));
			
			}});
       }

   if ($(this).val()== 'Выполнить')
	   {
	  var dataString = 'Done='+ doid;
	  $txt = $.ajax({type: "GET",url: "do.php", data: dataString, success: function() 
			{			//Обновляю информацию по датам дел этого клиента   
			$txt2 = $.ajax({type: "GET",url: "do.php?UpdateIcons="+$('.pane2[id='+doid+']').attr('id2') });
$('h4[id='+doid+'] .mystrike').css({"text-decoration":"line-through"});
			$('h4[id='+doid+']').next('.pane2').slideUp("fast");
			setTimeout(doLoadUp2,700);	
			$('input[idd='+doid+']').attr({'name':'notDone', 'value':'Снять выполнение'});

			}});
       }

    //Редактирую дело
    if ( ($(this).attr('name') == 'Save') || ($(this).attr('name') == 'Done'))
	   {
		date3 = $('.pane2[id='+doid+'] input[name=DATE2]').attr('title') + ' ' + $('.pane2[id='+doid+'] input[name=test]').val() + ':' + $('.pane2[id='+doid+'] input[name=test2]').val() + ':00';

		sr=$('.pane2[id='+doid+'] input, .pane2[id='+doid+'] textarea, .pane2[id='+doid+'] select').serialize();   
  		  var dataString = 'Update='+ doid + '&'+ sr + '&DATE3=' + date3;
          $txt = $.ajax({type: "GET",url: "do.php", data: dataString, success: function() 
					   {			//Обновляю информацию по датам дел этого клиента   
			$txt2 = $.ajax({type: "GET",url: "do.php?UpdateIcons="+$('.pane2[id='+doid+']').attr('id2') });
$('h4[id='+doid+'] .text').html($('.pane2[id='+doid+'] input[id=TEXT]').attr('value'));   
						$('h4[id='+doid+']').next('.pane2').slideUp("fast");
						setTimeout(doLoadUp2,700);	
    					jsRefreshClientJson($('.pane2[id='+doid+']').attr('id2'));

					   } });
	   }

    //Удаляю дело
    if ($(this).attr('name') == 'Delete') 
	   if (confirm("Вы действительно хотите удалить дело №"+ doid +"?")) 
	      {  
  		  var dataString = 'Delete='+ doid;
		  $txt = $.ajax({type: "GET",url: "do.php", data: dataString, success: function() 
							{			//Обновляю информацию по датам дел этого клиента   
			$txt2 = $.ajax({type: "GET",url: "do.php?UpdateIcons="+$('.pane2[id='+doid+']').attr('id2') });
mydiv.parent('div').animate({height: "0",width: "0", opacity: "0"}, 1000, function()
														{ 
														mydiv.parent('div').hide(); 
														});
							
							$('h4[id='+doid+']').animate({height: "0",width: "0", opacity: "0"}, 1000, function()
														{ 
													    $('h4[id='+doid+']').hide();
														});
							setTimeout(doLoadUp2,700);	
			jsRefreshClientJson($('.pane2[id='+doid+']').attr('id2'));
							
							} });
		  }


    //Редактирую клиента
    if ($(this).attr('name') == 'clientsave')
	   {
		sr=$('.clientform[id='+doid+'] input, .clientform[id='+doid+'] textarea').serialize();   
//		$('.clientform[id='+doid+'] input, .clientform[id='+doid+'] textarea').remove();   
	    manager = encodeURIComponent($('.clientform[id='+doid+'] #selectmanagerclient option:selected').attr('value'));
	    creditmanager = encodeURIComponent($('.pane[id='+doid+'] #selectcredit option:selected').attr('value'));
		

  		  var dataString = 'UpdateClient='+ doid + '&'+ sr + '&manager=' + manager + '&creditmanager=' + creditmanager;
		  //console.info(dataString);
		  $txt = $.ajax({type: "GET",url: "do.php", data: dataString, success: function() 
					   {
						$('h3[id='+doid+'] .text').html($('.pane[id='+doid+'] input[id=FIO]').attr('value')); 
						setTimeout(doLoadUp2,700);	
						$(".clientform").slideUp('fast');
						$(".clientformmini").slideDown('fast');
    					jsRefreshClientJson(doid);
					   } });
	   }

    //Удаляю клиента
    if ($(this).attr('name') == 'clientdelete') 
	   if (confirm("Вы действительно хотите удалить клиента №"+ doid +"?")) 
	      {  
  		  var dataString = 'DeleteClient='+ doid;
		  $txt = $.ajax({type: "GET",url: "do.php", data: dataString, success: function() 
							{ 
							$('.paneto[id='+doid+']').slideUp('fast');
							mydiv.parent('div').animate({height: "0",width: "0", opacity: "0"}, 1000, function()
														{ 
														mydiv.parent('div').hide(); 
    													});
							setTimeout(doLoadUp2,700);	
							$('h3[id='+doid+']').animate({height: "0",width: "0", opacity: "0"}, 1000, function()
														{ 
													    $('h4[id='+doid+']').hide();
														});
							} });
		  }
    });

}







function doClear() 
{
		if ($('#textfilter').val=='Поиск') $('#textfilter').val = '';
		
}

var timeout = null;

function doLoadUp() 
{
		
        if (document.getElementById('query').value=='') $("#debug").hide();
		if (timeout) clearTimeout(timeout);
		if (document.getElementById('query').value=='') ; else timeout = setTimeout(doload, 500);
}

function doload() 
{
       query=document.getElementById('query').value;

//do.php?Search=%8%
  		  var dataString = 'Search=%'+ encodeURIComponent(query) +'%';

		  $("#debug").load('do.php?'+dataString, function()
								{
									$('#debug a').click(function ()
											{
											$(".accordion2 .pane").hide();	
											$(".accordion2 .pane[id="+ $(this).attr('id2') +"]").slideDown("fast");
										    $(".pane2[id="+ $(this).attr('id') +"]").slideDown("fast");	
											$("*[value*="+query+"]").animate({opacity: "0"}, 500, function()
														{ 
														$("*[value*="+query+"]").animate({opacity: "1"}, 700);
														});
											//alert($(this).attr('id2'));
											});
								});
   	      $('#debug').slideDown('fast');
}

function doLoadUp2(radiodo)
{ 
 manager = encodeURIComponent($('#selectmanager').html()); 
 model = $('#selectmodel option:selected').attr('value');
 radio=$('ul[class=tabs] li[class=current] a').attr('id');
 alldate = $('#datediv').html();
 filter='';
 lnk = "do.php?AmountDo=1&Manager="+manager+"&date2="+alldate;
 $('.left-amount-do2').load(lnk);

 lnk = "do.php?AmountDo=2&Manager="+manager+"&date2="+alldate;
 $('.left-amount-do').load(lnk);
 
 if(radio=='cup')
   {
   $('.accordion2').load('do.php?cup=1&date='+$('#datediv').html(), jsRound );

   return true;
   }
 
   jsSms();

    if ( ($('ul[class=tabs] li[class=current] a').attr('id'))!='do' ) return true;

	query = $('#datediv').html();
    manager = encodeURIComponent($('#selectmanager').html());
    if (!manager) manager = encodeURIComponent('%');

    var dataString = 'Did='+main_did+'&Date='+ query+'&Manager='+manager;
    main_did=0;

	
    $(".accordion2").load('do.php?'+dataString, function() 
                 {
           		 $('h3').hide();
				$('.linkdo a').unbind('click').click(function ()
											{
						        			client = $(this).attr('id2');
						        			pn = $(".paneto[id="+client+"]");
				        					//$.ajaxSetup({async: false}); //отключаем асинхронность

						        			if(pn.hasClass("notloaded"))
						        			  { 
							        		
											   $('.paneto[id='+client+']').each( function()
        											{
        											$(this).removeClass("notloaded");
        											client = $(this).attr('id');
    												jsRefreshClientJson(client);
    												//alert(client);
        											});
							           		   //pn.css('display','none');
							           		   //return true;

						        			  }
						        			//$.ajaxSetup({async: true}); //включаем асинхронность

						        			
						        			dsp = pn.css('display');
						        			$('.paneto').hide();
						        			if ( dsp=='none' )
						        			   {
  										        $('.pane').slideDown('fast');
  										        pn.slideDown('fast');
  										       }
  										       else
  										       {
  										        $('.pane').slideUp('fast');
  										        pn.slideUp('fast');
  										       }
					               		    

											});
 				jsRoundDo();
 	 	        $('#myh2').remove();
 		        $('<h2 id="myh2">'+$('#selectmanager').html()+'</h2>').prependTo('.accordion2');

				 });

}


function jsPrepareDate()
 {
    if ( ($('#selectmanager').html()!='Все') && 
         ($('#textfilter').attr('value')=='') ) $('* #showmemanager').hide();
	

	$.datetimeEntry.setDefaults({spinnerImage: 'css/images/spinnerDefault.png'});
    $('*[name=defaultEntry]').each( function()
        { 
	x='#'+$(this).attr('id');
	$(x).datetimeEntry({datetimeFormat: 'W N Y / H:M', 
                   altField: '#alt'+$(this).attr('id'), 
				   altFormat: 'Y-O-D H:M:S'}).datetimeEntry('setDatetime', new Date( $('#alt'+$(this).attr('id')).val() ));
        });

}




//Очистка строки поиска при клике в "очистить"
function cleansearch() 
{ 
$('#textfilter').attr('value',''); 
setTimeout(jsShowClientsJson,50);

}
//Запускается при наборе данных в строке поиска запускается
function jsRefreshclientSearch()
{
    clearTimeout(searchtimeout); 
	searchtimeout = setTimeout(jsShowClientsJson,600);	
}



//Инициализация событий чата, автоматически делигируются вновь созданым чатам
function jsChatRefresh()
{	
	  	$('*').undelegate("#chatminimize, #chatname", "click").delegate("#chatminimize,  #chatname", "click", function() 
				{ 
				setTimeout( function() {
				 clearInterval( alertmesage1);
				 clearInterval( alertmesage2);
				 document.title='ФПК';}, 6000);

				who2 = $(this).parents('#chat');
  		        who2.find("#chattop").css('background','#006600');

				if (who2.height()==300)
						who2.animate({"height": 24}, 700, 'easeInOutBack', function()
														{ 
														});

				else who2.animate({"height": 300}, 700, 'easeInOutBack', function()
														{ 
														who2.find('#content').focus();
														});
				});

		$('*').undelegate("#chatclose", "click").delegate("#chatclose", "click", function() 
				{ 
				who2 = $(this).parents('#chat');
				who2.fadeOut(700, function() {
				   who2.remove(); 
				   nchat=0;
				   $('* #chat').each(function()
		 			{
					//console.info(nchat+' / '+$(this).attr('who'));
					$(this).animate({"margin-right": 20+246*nchat}, 700+150*nchat, 'easeInOutBack', function()
														{ 
														});
					nchat=nchat+1;
					});
				  });
				});

		 $('*').undelegate("#content", "keydown").delegate("#content", "keydown", function(event) 
			{
				if (event.keyCode=='13') 
					{
					who = $(this).parents('#chat').attr('who');
					event.stopPropagation();														
							  var user = $.cookie('fpk_id');
			 				  var touser = who;
							  var boxval = $("* #chat[who='"+who+"'] #content").val();
							  //console.info(user+' to '+touser+':'+boxval);
							  var dataString = 'user='+ encodeURIComponent(user) + '&msg=' + encodeURIComponent(boxval)+'&touser=' + encodeURIComponent(touser);
							  $.ajax({
								     type: "POST",
            						 url: "chatajax.php",
									 data: dataString,
									 cache: false,
									 success: function(html)
									          {
											  $("* #chat[who='"+who+"'] #chattext").append(html);
											  $("* #chat[who='"+who+"'] #chattext").scrollTop(10000);
											  $("* #chat[who='"+who+"'] p:last").css({"margin-top": "20px"}).animate({"margin-top": "4px"}, 300);
											  $("* #chat[who='"+who+"'] #content").val('');
											  $("* #chat[who='"+who+"'] #content").focus();
											  }
									 });
					}
			});

//Клик на фио менеджера для чата в списке юзеров онлайн
			$('#whoonline').undelegate("#username", "click").delegate("#username", "click",
										function(index) 
										  { jsSetInterval(1500);
										  	iduser = $(this).attr('iduser'); 
											if ( $('* #chat[who="'+iduser+'"]').attr("who")==null )
											     {
												 jsCreateChat(iduser,$(this).html(),300);

												 }
											else { 
											      $('* #chat[who="'+iduser+'"]').hide();
												  $('* #chat[who="'+iduser+'"]').slideDown('fast');
											      $('* #chat[who="'+iduser+'"] #content').focus();
												 }
										  });



}


//Создает новое окно чата
function jsCreateChat(iduser,nameuser, height1)
{
	
	  newchat = $('#chat1').clone();
	  //newchat.each('#chat', function() { alert(this.attr('id')); });
	  nn = newchat.insertBefore('#chat1').end().css("margin-right", 20+246*nchat);
	  nchat=nchat+1;
	  //$('#chat').hide();										  
	  nn.attr('who',iduser).attr('id','chat');
	  $("* #chat[who='"+iduser+"']").height(300).hide().animate({"height": height1}, 400);
	  $("* #chat[who='"+iduser+"'] #chatname").html(nameuser);
	  $('#whoonline').slideUp('slow');
	  
	  $('* #chat[who="'+iduser+'"] #content').focus().click( function() 
		{
		$('* #chat[who="'+iduser+'"] #chattop').css('background','#006600');	
	    } );
	
}

function jsSetInterval(sec)
{		
	    clearInterval(auto_refresh);
		var auto_refresh = setInterval(function ()
   			{
			  var touser = $('#chat').attr('who');
			$.getJSON("chat_json.php?user="+encodeURIComponent(user)+"&touser="+encodeURIComponent(touser),function(data)
					{
						$.each(data.posts, function(i,data)
							{  
								var div_data="<p  id='"+data.m.id+"'><b>"+data.m.firstname+"</b>: "+data.m.msg+"</p>";
								var chat_user = $("* #chat[who='"+data.m.user+"']");
								height = chat_user.height();
								if (height==null) 
								   {
									//Если окна чата нет, создаем его
									jsCreateChat(data.m.user,data.m.name,24);
								   }
	   								var chat_user = $("* #chat[who='"+data.m.user+"']");

								   chat_user.find("#chattop").css('background','#009900');
								   chat_user.find("#chattext").append(div_data).scrollTop(10000);
								   chat_user.find("p:last").css({"margin-left": "300px"}).animate({"margin-left": "0px"}, 200,
									function()
									  {
										$("* #chat[who='"+data.m.user+"'] #chattop").css('background','darkred');
										  if (iamblur==1) 
												 {
												 alertmesage1 = setInterval ( function() 
													   { document.title=data.m.name+' - сообщение'; },500);
												 alertmesage2 = setInterval ( function() 
													   { document.title='ФПК'; },800);
												 }
									  });
								//Моргаем.
							});
					});
				}, sec);	

	
}

function jsh1( field )
{
	var old=null;
	//$('h3:last').css("-webkit-border-bottom-left-radius","10px 10px").css("-webkit-border-bottom-right-radius","10px 10px");
	clearTimeout(tr);
    radio=$('ul[class=tabs] li[class=current] a').attr('id');
 if (radio!='do')
	tr = setTimeout(function(){
			$('.paneto').each( function()
					{
					c_manager=$(this).attr(field);
					if (c_manager!=old) 
					   {
					    vvvv = $('<h2 id="h22">' + c_manager + '</h2>').insertBefore($(this));
					   }
					
					old = $(this).attr(field);
					});
			//Закругляем углы
            jsRound();
            },300);
	
}

function jsRound()
{
			$('h3:first').css("-webkit-border-top-left-radius","10px 10px").css("-webkit-border-top-right-radius","10px 10px");
			$('h2').next('.paneto').find('h3').css("-webkit-border-top-left-radius","10px 10px").css("-webkit-border-top-right-radius","10px 10px");
            $('h2').prev('.paneto').find('h3').css("-webkit-border-bottom-left-radius","10px 10px").css("-webkit-border-bottom-right-radius","10px 10px");
            $('h3:last').css("-webkit-border-bottom-left-radius","10px 10px").css("-webkit-border-bottom-right-radius","10px 10px");

}
function jsRoundDo()
{
			$('.mystrike2:first').css("-webkit-border-top-left-radius","10px 10px").css("-webkit-border-top-right-radius","10px 10px");
            $('.mystrike2:last').css("-webkit-border-bottom-left-radius","10px 10px").css("-webkit-border-bottom-right-radius","10px 10px");

}


 var resizeTimerID = null;
 function onResize() {
     if (resizeTimerID == null) {
         resizeTimerID = window.setTimeout(function() {
             resizeTimerID = null;
             //tl.layout();
         }, 500);
     }
 }
