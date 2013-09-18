//css("border", "2px dotted blue")
// url_ = document.location.search; n_sub=url_.indexOf('&client=')+8; url=url_.substring(n_sub); $(".pane[id="+url+"]").show();
var timeline_data=null;
var fontsize=10;
var searchtimeout='';
var alertmesage1=null;
var alertmesage2=null;
var onfoc = null;
var onf = null;
var st = null;
var iamblur=0;
var mycol_grid="le_table_dg";
var nchat=0;
var tttt=0;
var myt=0;
var tr=0;
var mousemove=0;
var tl;
var si=0;
var si2=0;
var typn;
var wastab=0;
var main_did=0;
var menu_id=0;
var menu_current=0;
var adddo=0;
var user = $.cookie('fpk_id');

function jsMakeDraggable()
{
$('h3').draggable({delay: "700", helper: "clone", opacity:"0.6"});

setTimeout( function()
  {
   $('h2').droppable({ hoverClass: 'droptome', drop: 
      function(dragobject,drag)
         {
         h3 = drag.draggable.attr('id');
         gr = $(this).html();
         
		 lnk = "do.php?h3="+h3+"&groupby=" + encodeURIComponent(gr);
		 console.log(lnk);
		 
		 $.getJSON( lnk ,function(data) 
		    {
			var current = $.cookie('menu-current');
		    jsSQLClients(current);
		    jsTitle('Статус изменен. Обновитесь'); 
		    } );
	         
         } });
  },1500);

}

function jsLeftDo()
{
 manager = encodeURIComponent($('#selectmanager').html()); 
 alldate = $('#datediv').html();

 type = $("* .left-bottom-top option:selected").attr('type');

 lnk = "do.php?leftdo="+type+"&manager="+manager+"&current="+menu_current+"&ALLDate="+ alldate;
 console.log(lnk);

 $.getJSON( lnk ,function(data)
	{
		    $('* .left-bottom-top option[type=today]').html('Сегодня (0 дел)');
		    $('* .left-bottom-top option[type=did]').html('Сделаны (0 дел)');
		    $('* .left-bottom-top option[type=past]').html('Просрочены (0 дел)');
		    $('* .left-bottom-top option[type=slave]').html('Поручено мной (0 дел)');
	$('.left_do li').remove();	
	j=0;
	$.each(data, function(i,data)
  		  {  
		  $('#leftdo-tmpl-mini').tmpl(data).appendTo(".left_do");
		  if (j==0)
		    {
		    if (data[0].cnt_past>0) $('* .left-bottom-top option[type=today]').html('Сегодня ('+data[0].cnt_today+'+'+data[0].cnt_past+' просроч.)');
		    else
		      $('* .left-bottom-top option[type=today]').html('Сегодня ('+data[0].cnt_today+' дел)');
		    $('* .left-bottom-top option[type=did]').html('Сделаны ('+data[0].cnt_did+' дел)');
		    $('* .left-bottom-top option[type=past]').html('Просрочены ('+data[0].cnt_past+' дел)');
		    $('* .left-bottom-top option[type=slave]').html('Поручено мной ('+data[0].cnt_slave+' дел)');
		    }
		  j=1;
		  });
    $('* .left_do li').css('font-size',fontsize+'px');
    if (type=='today')
    	{
    	height=0;
    	$('* .left_do li').each(function ()
     		 {
      		  name = $(this).find('#date_do').attr('class');
			  if (name=='shortdatepast-mini') height=height+$(this).height()+2;
			  last = $(this).height();
			  });
	    $(".left-bottom").scrollTop(height-last-10);
	    }
    //$('* .tabs li[id='+menu_current+']').addClass('current');
	});
}

function jsMenu(menu_parent)
{
 $.cookie('menu',menu_parent,{ expires: 30 });
 manager = encodeURIComponent($('#selectmanager').html()); 
 alldate = $('#datediv').html();
 
 lnk = "do.php?menu="+menu_parent+'&manager='+manager+'&current='+menu_current+'&ALLDate='+ alldate;

 if (menu_parent==0)
    {
    $('.home_back').hide();
    $('.home_menu').hide();
    }
   else
    {
//  $('.home_back').show();
    $('.home_menu').show();
    }
    


 $.getJSON( lnk ,function(data)
	{
	$('.tabs ul, .tabs li').remove();	

	$.each(data, function(i,data)
  		  {  
		  $('#menu-tmpl-mini').tmpl(data).appendTo(".tabs");
		  });
    //$('* .tabs li[id='+menu_current+']').addClass('current');
    radio=$('.tabs li[class=current] a').attr('id');
    
 height=$('#left-col').height()-$('#indented').height()-400;
 $('.left-bottom').css('height',height);
    
    
    
    
	var current = $.cookie('menu-current');
	$('* li a').removeClass('current');
	$('* li[id='+current+']').addClass('current');
	
    //jsSQLClients(current);

	});
}

function jsScroll()
{
		$('.tabs-right').height($('.tabs-left').height()+20);
		onResize();
		$('.tabs-left').animate({"margin-left": "0"}, 2000, function()
														{ 
														//$('.tabs-left').css("margin-left","253"); 
														});		
		$('.tabs-right').animate({"margin-left": "-253"}, 2000, function()
														{ 
														//$('.tabs-right').css("margin-left","0"); 
														});		
}

function jsMenuFirst(menu_parent)
{
//	document.title='| Новое сообщение!';
//	setInterval(function()
//	  {
//	  $title=document.title;
	  
//	  if ($title=='| Новое сообщение!') document.title='/';
//	  if ($title=='/') document.title='— Новое сообщение!';
//	  if ($title=='— Новое сообщение!') document.title="\\";
//	  if ($title=="\\") document.title='| Новое сообщение!';
//	  },500);

	 $('*').delegate("*[hint]","mouseover", function ()
	   {
	   hint = $(this).attr('hint');
	   if (hint) jsTitle(hint);
	   });

	 $('*').delegate("*[hint]","mouseout", function ()
	   {
	   setTimeout(jsTitle(''),0);
	   });

	 $('.opendo_icon').click(function(event)
	    {
 		event.stopPropagation();										    
		jsSQLClients(27);
	    return false;
	    });

  	 $('*').undelegate("#fast_do", "keyup").delegate("#fast_do", "keyup", function(event) 
		{
 		 event.stopPropagation();										    
		 if (event.keyCode=='13') 
		    {
			 var title = $("* #fast_do").val();
			 if (title) 
				{ 
				manager = encodeURIComponent($('#selectmanager').html()); 
				lnk="do.php?createdo="+encodeURIComponent(title)+"&after=15&manager="+manager;
				//console.log(lnk);
	 			$('#bubu').load(lnk, function ()
	 		    	{
	 		    	jsTitle('Создано дело "'+title+'" через 15 минут');
	 		    	jsLeftDo();
	 		    	});
	 		    }
	 		 }
	 	return false;
		});

  	 $("* #select_type_do").change(function(event) 
		{
			jsLeftDo();
			return false;
		});

  	 $('*').undelegate("* .paneto .roundmodel", "click").delegate("* .paneto .roundmodel", "click", function(event) 
		{
			event.stopPropagation();										
		    carid=$(this).attr('carid');
		    doid=$(this).attr('doid');
        	$('#front').remove();
        	$('#frontclose').remove();
        	$('<div id="front"></div>').appendTo('.accordion2');
        	$('<div id="frontclose">X</div>').appendTo('.accordion2');
        	$('#frontclose').click(function(){ $('* #front').remove();$('* #frontclose').remove(); });
        	$('#front').draggable();



 lnk = "do.php?ShowSQLcars="+radio+"&ALLDate="+alldate+"&manager="+manager+"&groupby="+groupby+"&order2="+order2+"&filter="+filter+"&vin="+carid;
 console.log(lnk);
 $.getJSON( lnk ,function(data)
	{
		$.each(data, function(i,data)
			{  
			console.log(i);
			$('#cars-tmpl-mini').tmpl(data).appendTo("* #front");
			});
			
	});



			return false;
		});


  	 $('*').undelegate("* .paneto2 .roundmodel", "click").delegate("* .paneto2 .roundmodel", "click", function(event) 
		{
			event.stopPropagation();										    
		    clientid=$(this).attr('clientid');
		    doid=$(this).attr('doid');
        	$('#front').remove();
        	$('#frontclose').remove();
        	$('<div id="front"></div>').appendTo('.accordion2');
        	$('<div id="frontclose">X</div>').appendTo('.accordion2');
        	$('#frontclose').click(function(){ $('* #front').remove();$('* #frontclose').remove(); });
        	$('<div class="paneto" id='+clientid+'></div>').appendTo('#front');
        	$('#front').draggable();
			jsRefreshClientJson(clientid,doid);
			return false;
		});


  	 $('*').undelegate("* .left_do a", "click").delegate("* .left_do a", "click", function(event) 
		{
			event.stopPropagation();										    
		    clientid=$(this).attr('clientid');
		    doid=$(this).attr('doid');
        	$('#front').remove();
        	$('#frontclose').remove();
        	$('<div id="front"></div>').appendTo('.accordion2');
        	$('<div id="frontclose">X</div>').appendTo('.accordion2');
        	$('#frontclose').click(function(){ $('* #front').remove();$('* #frontclose').remove(); });
        	$('<div class="paneto" id='+clientid+'></div>').appendTo('#front');
        	$('#front').draggable();
			jsRefreshClientJson(clientid,doid);
			return false;
		});

  	 jsLeftDo();
	 font = $.cookie('fontsize');
	 if (font>0) fontsize=font;
  	 $('*').undelegate(".font-plus", "click").delegate(".font-plus", "click", function(event) 
		{
		if ((fontsize<=40) && (fontsize>=3)) fontsize=Number(fontsize)+1;
		$.cookie('fontsize',fontsize,{ expires: 30 });
		$('* .left_do li').css('font-size',fontsize+'px');
		event.stopPropagation();										    
		return false;
		});

  	 $('*').undelegate(".font-minus", "click").delegate(".font-minus", "click", function(event) 
		{
		if ((fontsize<=41) && (fontsize>=5)) fontsize=Number(fontsize)-1;
		$.cookie('fontsize',fontsize,{ expires: 30 });
		$('* .left_do li').css('font-size',fontsize+'px');
		event.stopPropagation();										    
		return false;
		});


  	 $('*').undelegate(".home_menu, #top-left-menu", "click").delegate(".home_menu, #top-left-menu", "click", function(event) 
		{
		jsMenu(0);
		menu_id=0;
		//jsScroll();
		$('.home_title').html('ФПК');
		event.stopPropagation();										    
		});
		
  	 $('*').undelegate(".home_back", "click").delegate(".home_back", "click", function(event) 
		{
		parent_id = $(this).attr('id');
		jsMenu(parent_id);
		event.stopPropagation();										    
		});

    //При клике в клиента (h3) сворачиваем или разворачиваем содержимое
  	$('*').undelegate(".paneto2 h3", "click").delegate(".paneto2 h3", "click", function(event) 
        {
		event.stopPropagation();				
		$(this).next(".pane").slideToggle("fast"); 
		$(this).toggleClass("active"); 
		//$(this).siblings("h3").removeClass("active");
		
		return false;
		});

	
	 	//Клик в пункт меню
  	$('*').undelegate(".tabs li", "click").delegate(".tabs li", "click", function(event) 
		{
			event.stopPropagation();										    

			$(".tabs li").removeClass('current');
			$(this).addClass('current');
		    radio=$('* li[class=current] a').attr('id');
		    
		     $.cookie('menu-current',radio,{ expires: 30 });

		    
		    childs=$('* li[class=current] a').attr('childs');
			if (childs>0) 
			   { 
			   jsMenu(radio); 
			   shortcaption = $('* li[class=current] a').attr('shortcaption');
			   $('.home_title').html(shortcaption);
			   return false; 
			   }
			$('.roundfooter').css('background','#516f8f').removeClass('active');
			$("#textfilter").val('');
			
		    menu_current=radio;
		    menu_id=$(this).children('a').attr('parent_id');

			jsSQLClients(radio);
			$('.accordion2').show();			
			//setTimeout(doLoadUp2(),0);
	    });

    //Клик в круглую стрелку в левом меню    
  	 $('*').undelegate(".right-ico-1", "click").delegate(".right-ico-1", "click", function(event) 
		{
		event.stopPropagation();										    
		id = $(this).parent('a').attr('id');
		shortcaption = $(this).parent('a').attr('shortcaption');
		$('.home_title').html(shortcaption);
		menu_id=id;
		jsMenu(id);
		return false;
		});

	 $('.home_title').html('ФПК');
	 jsSms();
     jsReiting();


  	 $('*').undelegate("#abcnet", "click").delegate("#abcnet", "click", function(event) 
		{
		event.stopPropagation();	
		$('.accordion2').show().html('');
		$("<div style='width:85%;margin-top:64px;' ><div id='dropzone' style='align:center;padding:15px;background: #e9e7e7 url(../img/arrow-square.gif) no-repeat right -51px; width: 100%; height: 400px;-webkit-border-radius:10px;' ><center><font size=16px color=lightgray>Переместите файл  TXT из ABC-net<br>в данный контейнер<font></center></div> <div id='dropzone-info' style='width: 500px;background-color=#FFF' ></div></div>").appendTo('.accordion2');


				$.fn.dropzone.uploadStarted = function(fileIndex, file){
					var infoDiv = $("<div></div>");
					infoDiv.attr("id", "dropzone-info" + fileIndex);
					infoDiv.html("upload started: " + file.fileName);
					
					var progressDiv = $("<div></div>");
					progressDiv.css({
						'background-color': 'orange',
						'height': '20px',
						'width': '0%'
					});
					progressDiv.attr("id", "dropzone-speed" + fileIndex);

					var fileDiv = $("<div></div>");
					fileDiv.addClass("dropzone-info");
					fileDiv.css({
						'border' : 'thin solid black',
						'margin' : '5px'
					});
					fileDiv.append(infoDiv);				
					fileDiv.append(progressDiv);				
					
					$("#dropzone-info").after(fileDiv);
				};
				$.fn.dropzone.uploadFinished = function(fileIndex, file, duration){
				
				
				
				lnk="do.php?csv="+file.fileName;
	 			$('#dropzone').load(lnk, function () 
	 			   {
	 			   jsTitle('Данные обработаны');
	 			   });

				
				
					$("#dropzone-info" + fileIndex).html("Загрузка завершена: " + file.fileName + " ("+getReadableFileSizeString(file.fileSize)+") in " + (getReadableDurationString(duration)));
					$("#dropzone-speed" + fileIndex).css({
						'width': '100%',
						'background-color': 'green' 
					});
				};
				$.fn.dropzone.fileUploadProgressUpdated = function(fileIndex, file, newProgress){
					$("#dropzone-speed" + fileIndex).css("width", newProgress + "%");
				};
				$.fn.dropzone.fileUploadSpeedUpdated = function(fileIndex, file, KBperSecond){
					var dive = $("#dropzone-speed" + fileIndex);

					dive.html( getReadableSpeedString(KBperSecond) );
				};
				$.fn.dropzone.newFilesDropped = function(){
					$(".dropzone-info").remove();
				};
				$("#dropzone").dropzone({
					url : "do.php?csv-load=1",
					printLogs : true,
					uploadRateRefreshTime : 500,
					numConcurrentUploads : 2
				});



		return false;
		});


				










	 
}

function jsSQLClients(radio)
{
 var myTimeOut = null;
 //считываю данные из фильтров
 manager = encodeURIComponent($('#selectmanager').html()); 
 model = $('#selectmodel option:selected').attr('value');
 filter =  encodeURIComponent($('#textfilter').attr('value'));
 if (!radio) radio=$('* li[class=current] a').attr('id');
 alldate = $('#datediv').html();

 groupby='manager';
 order2='icon2';

 if ( radio==22 ) { jsShowCUP(); jsSmsCup(); return true; }
 if ( radio==23 ) { jsShowStat(); return true; }
 if ( radio==24 ) { jsShowStatMonth(); return true; }
 if ( radio==25 ) { jsShowTimeline(); return true; }
 if ( radio==26 ) { jsShowDay(); return true; }
 if ( radio==27 ) { jsShowDo(1); return true; } 
 if ( radio==17 ) { jsShowDo(2); return true; }
 if ( radio==18 ) { jsShowDo(3); return true; }
 if ( radio==30 ) { jsShowDo(4); return true; }
 if ( radio==28 ) { jsShowUsers(); return true; }
 if ( radio==29 ) { jsShowModels(); return true; }
 if ( radio==14 ) { jsSQLcars(radio); return true; }
 if ( radio==15 ) { jsSQLcars(radio); return true; }
 if ( radio==16 ) { jsSQLcars(radio); return true; }


//Загружаю разом Всех клиентов - одна из главных функций
 $('.accordion2').html('');
 lnk = "do.php?ShowSQL="+radio+"&ALLDate="+alldate+"&manager="+manager+"&groupby="+groupby+"&order2="+order2+"&filter="+filter;
 console.log(lnk);
 $.getJSON( lnk ,function(data)
	{
		$.each(data, function(i,data)
			{  
			//console.log(i);
			$('#clients-tmpl-mini').tmpl(data).appendTo(".accordion2");
			});
		jsCollapse();
		jsh1('groupby');
	});

}

function jsSQLcars(radio)
{
 var myTimeOut = null;
 //считываю данные из фильтров
 manager = encodeURIComponent($('#selectmanager').html()); 
 model = $('#selectmodel option:selected').attr('value');
 filter =  encodeURIComponent($('#textfilter').attr('value'));
 if (!radio) radio=$('* li[class=current] a').attr('id');
 alldate = $('#datediv').html();

 groupby='manager';
 order2='icon2';

//Загружаю разом Все автомобили
 $('.accordion2').html('');
 lnk = "do.php?ShowSQLcars="+radio+"&ALLDate="+alldate+"&manager="+manager+"&groupby="+groupby+"&order2="+order2+"&filter="+filter;
 console.log(lnk);
 $.getJSON( lnk ,function(data)
	{
		$.each(data, function(i,data)
			{  
			$('#cars-tmpl-mini').tmpl(data).appendTo(".accordion2");
			});
		jsCollapse();
		jshCars('groupby');
	});

}
function jshCars( field )
{
	var old=null;
	//$('h3:last').css("-webkit-border-bottom-left-radius","10px 10px").css("-webkit-border-bottom-right-radius","10px 10px");
	clearTimeout(tr);
    radio=$('* li[class=current] a').attr('id');
 if (radio!='do')
	tr = setTimeout(function(){
			$('.paneto2').each( function()
					{
					c_manager=$(this).attr(field);
					if (c_manager!=old) 
					   {
					    vvvv = $('<h2 id="h22">' + c_manager + '</h2>').insertBefore($(this));
					   }
					
					old = $(this).attr(field);
					});
			//Закругляем углы


			$('h3:first').css("-webkit-border-top-left-radius","10px 10px").css("-webkit-border-top-right-radius","10px 10px");
			$('h2').next('.paneto2').find('h3').css("-webkit-border-top-left-radius","10px 10px").css("-webkit-border-top-right-radius","10px 10px");
            $('h2').prev('.paneto2').find('h3').css("-webkit-border-bottom-left-radius","10px 10px").css("-webkit-border-bottom-right-radius","10px 10px");
            $('h3:last').css("-webkit-border-bottom-left-radius","10px 10px").css("-webkit-border-bottom-right-radius","10px 10px");


            },300);
	
}



//Групировка
function jsh1( field )
{
	var old=null;
	//$('h3:last').css("-webkit-border-bottom-left-radius","10px 10px").css("-webkit-border-bottom-right-radius","10px 10px");
	clearTimeout(tr);
    radio=$('* li[class=current] a').attr('id');
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


function jsCollapse() //Загружаем клиентов и сворачиваем внутренности
 {
 radio=$('* li[class=current] a').attr('id');
 jsShowClientsPrepare();
 //Всё сворачиваем
 $(".pane").hide();	$(".pane2").hide(); $(".clientform").hide(); $(".clientformmini").show(); 
 
 $("* #i1,#i2,#i3,#i4,#i5").hide();
 $("* #"+$.cookie('showi')).show();
// if (radio==12) jsh1('creditmanager');
// else
// if ( ($('#selectmanager').html()=='Все') && (radio!='statistic')  && (radio!='cup')  && (radio!='statistic2')) jsh1('manager');
// else {
// 	    if ((radio!="statistic2") && (radio!="cup")) 
// 	       {
// 	        $('#myh2').remove();
// 	        $('<h2 id="myh2">'+$('#selectmanager').html()+'</h2>').prependTo('.accordion2');
// 	       }
//		jsRound();
//      }
 jsPrepareDate(); //Подготовка полей для изменения времени и даты
 jsMakeDraggable();
 $('.accordion2').slideDown(600);

 
 }

function jsShowModels()
{
         $('.accordion2').html('<div style="margin-top:15px;margin-right:15px;margin-bottom:30px; height:80%;width:100%;font-size:120%;"><table id="le_table"></table><div id="le_tablePager" style="font-size:80%"></div></div>');
        var lastSel;
	    var ls=jQuery("#le_table").jqGrid({
            url:'getmodel.php',
            datatype: 'json',
            mtype: 'POST',
            colNames:['id', 'Модель', 'Сокр.Модель', 'Средняя цена', '(1-показывать,0-скрыть)', 'Бренд'],
            colModel :[
                {name:'id', index:'id', width:30}
                ,{name:'model', index:'model', width:170, align:'left', editable:true, edittype:"text",search:true}
                ,{name:'short', index:'short', width:100, editable:true, edittype:"text"}
                ,{name:'cost', index:'cost', width:94, align:'right', editable:true, edittype:"text"}
                ,{name:'show', index:'show', width:160, align:'center', editable:true, edittype:"text"}
                ,{name:'brand', index:'brand', width:90, align:'left', editable:true, edittype:"text"}
                ],
            pager: jQuery('#le_tablePager'),
            rowNum:100,
            rowList:[5,10,30,100],
            height:"500px",
            sortname: 'model',
            sortorder: "asc",
            
            viewrecords: true,
            imgpath: 'jqgrid_edit/themes/basic/images',
            caption: 'Модели автомобилей',
            ondblClickRow: function(id) {
                if (id && id != lastSel) {
                    jQuery("#le_table").restoreRow(lastSel);
                    jQuery("#le_table").editRow(id, true);
                    lastSel = id;
                }
            },
            editurl: 'do.php?savemodel=1'
        }).navGrid('#le_tablePager',{}, //options
		{height:280,width:450,reloadAfterSubmit:true}, // edit options
		{height:280,width:450,reloadAfterSubmit:true}, // add options
		{reloadAfterSubmit:true}, // del options
		{}); 

}

function jsShowUsers()
{
         $('.accordion2').html('<div style="margin-top:15px;margin-right:15px;margin-bottom:30px; height:80%;width:100%;font-size:120%;"><table id="le_table"></table><div id="le_tablePager" style="font-size:80%"></div></div>');
        var lastSel;
	   
	    var ls=jQuery("#le_table").jqGrid({
            url:'getdata.php',
            datatype: 'json',
            mtype: 'POST',
            colNames:['id', 'ФИО', 'Должность', 'Клиентов', 'Бренд', 'Email', 'День рождения', 'Последний визит'],
            colModel :[
                {name:'id', index:'id', width:50}
                ,{name:'fio', index:'fio', width:260, align:'left', editable:true, edittype:"text",search:true}
                ,{name:'job', index:'job', width:190, editable:true, edittype:"text"}
                ,{name:'clients', index:'clients', width:85, align:'left', editable:true, edittype:"text"}
                ,{name:'brand', index:'brand', width:100, align:'left', editable:true, edittype:"text"}
                ,{name:'email', index:'email', width:280, align:'left', editable:true, edittype:"text"}
                ,{name:'birthday', index:'birthday', width:130, align:'left', editable:true, edittype:"text"}
                ,{name:'lastvizit', index:'lastvizit', width:150, align:'left', editable:true, edittype:"text"}
                ],
            pager: jQuery('#le_tablePager'),
            rowNum:100,
            rowList:[5,10,30,100],
            height:"500px",
            sortname: 'job',
            sortorder: "asc",
            
            viewrecords: true,
            imgpath: 'jqgrid_edit/themes/basic/images',
            caption: 'Данные пользователей ФПК',
            ondblClickRow: function(id) {
                if (id && id != lastSel) {
                    jQuery("#le_table").restoreRow(lastSel);
                    jQuery("#le_table").editRow(id, true);
                    lastSel = id;
                }
            },
            editurl: 'do.php?saveuser=1'
        }); 


}


function jsShowStatMonth()
{
	    		
                $('.accordion2').html('<div style="margin-top:15px;margin-right:15px;margin-bottom:30px; height:80%;width:100%;font-size:120%"><table id="le_table"></table><div id="le_tablePager" style="font-size:80%"></div></div>');
                
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
}

function jsShowDay()
{
 	$('.accordion2').hide().html('');
	var    types=Array ("zv","vz","tst","dg","vd","OUT");
    var typename=Array ("Звонки","Визиты","Тестдрайвы","Договора","Выдачи","OUT");
	for (i=0;i<=types.length;i++)
	    {
	     //console.info(i+' : '+lnk);
		 lnk = "do.php?ShowSQL=888&json=1&manager="+manager+"&Model="+
		        model+"&Filter="+filter+"&Radio="+radio+"&ALLDate="+alldate+"&brand="+$('#brand').html()+"&type="+types[i];

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
	jsRound();
	$('.accordion2').slideDown('fast');
 	return true; 
}

function jsShowCUP()
{
   $('.accordion2').load('do.php?cup=1&date='+$('#datediv').html(), function() 
       { 
		//if ($.cookie('fpk_mobile')==1) $('.roundfooter2[id=vd2]').remove();
		jsShowPlotCUP(); 
        $('.pane-stat').hide();
		$('#detstat').click(function()
		    {
	   		jsShowStat();
	   		});	

    $('.roundfooter2').unbind("click").click(function() 
            {
			event.stopPropagation();														
    	    brand = $(this).parent('h5').attr('id');
    	    id = $(this).attr('id');
			$.cookie('brand',brand,{ expires: 30 });
			var but = $(this);
				$('.roundfooter2').css('background','#516f8f');
	    	    but.css('background','#bc4b25');
			    $('#brand').html(brand);
			    $('#brand-ico').html('<img height="17px" src=".\\img\\logo-'+brand+'.png" style="padding-top:2px;">');
		    	$('#selectmanager').html('Все');
		    	manager = 'Все'; 
                //jsAmount();
                jsSms();
				$('#userlist').load('do.php?ShowManager=1');
	            $('.paneto, #h22').remove();
 				lnk = "do.php?ShowSQL=-1&json=1&Manager="+manager+"&Model="+model+"&Filter="+filter+"&Radio=statistic2&ALLDate="+alldate+"&radarrange=&type="+id+"&brand="+brand;
 				console.info('Roundfooter='+lnk);
 				$.getJSON( lnk ,function(data)
					{
					$.each(data, function(i,data)
						{  
						//console.log(i);
						$('#clients-tmpl-mini').tmpl(data).appendTo(".accordion2");
						});
					jsCollapse();
					jsRound();
					});
			  return false;
			});



           $(".accordion2 h5").unbind('click').click(function()
		        {
        		if ($(this).hasClass('notloaded')) 
          		 {
        			jsLoadStatistic($(this).attr('id'));
        			$(this).removeClass('notloaded');
           		 }
				$(this).next(".pane-stat").slideToggle("fast"); $(this).toggleClass("active"); $(this).siblings("h5").removeClass("active");
		
				});
				
				
				
			$('h5:first').css("-webkit-border-top-left-radius","10px 10px").css("-webkit-border-top-right-radius","10px 10px");
            $('h5:last').css("-webkit-border-bottom-left-radius","10px 10px").css("-webkit-border-bottom-right-radius","10px 10px");
       });

   return true;

}

function jsLoadStatistic(h3_brand)
{
//alert(h3_brand);
}

function jsShowStat()
{
		var d1=$.cookie('d1');
		var d2=$.cookie('d2');

		if(!d1) d1='2011-01-01';
		if(!d2) d2='2012-01-01';

         $('.accordion2').html('<h6 style="color:white">Детальная статистика от <input id="d1" value="'+d1+'"> до <input id="d2" value="'+d2+'"></h6><div style="margin-top:15px;margin-right:15px;margin-bottom:30px; height:300px;width:600px;"><table id="le_table"></table><div id="le_tablePager" style="font-size:80%"></div></div><div id="placeholder" style="width:941px;height:400px;"></div>');
        var lastSel;
	   
	    var ls=jQuery("#le_table").jqGrid({
            url:'do.php?ShowStat=1&d1='+d1+'&d2='+d2,
            datatype: 'json',
            mtype: 'POST',
            colNames:['id', 'Менеджер', 'Выдачи', 'Договора', 'Тесты', 'Визиты', 'Звонки', 'Зв.внимания', 'Out', 'Расторжения', 'Длина выдачи', '% кредитов', 'Ср.цена'],
            colModel :[
                {name:'id', index:'id', width:30}
                ,{name:'line', index:'line', width:123, align:'left', editable:true, edittype:"text",search:true}
                ,{name:'vd', index:'vd', width:80,  align:'center', editable:true, edittype:"text"}
                ,{name:'dg', index:'dg', width:80,  align:'center', editable:true, edittype:"text"}
                ,{name:'tst', index:'tst', width:80, align:'center', editable:true, edittype:"text"}
                ,{name:'vz', index:'vz', width:80, align:'center', editable:true, edittype:"text"}
                ,{name:'zv', index:'zv', width:80, align:'center', editable:true, edittype:"text"}
                ,{name:'zv2', index:'zv2', width:80, align:'center', editable:true, edittype:"text"}
                ,{name:'out', index:'out', width:80, align:'center', editable:true, edittype:"text"}
                ,{name:'out2', index:'out2', width:80, align:'center', editable:true, edittype:"text"}
                ,{name:'days', index:'days', width:80, align:'center', editable:true, edittype:"text"}
                ,{name:'credits', index:'credits', width:80, align:'center', editable:true, edittype:"text"}
                ,{name:'cost', index:'cost', width:105, align:'center', editable:true, edittype:"text"}
                ],
            pager: jQuery('#le_tablePager'),
            rowNum:100,
            rowList:[5,10,30,100],
            height:"250px",
            width:"950",
            sortname: 'dg',
            sortorder: "asc",
            multiselect: true,
            viewrecords: true,
            imgpath: 'jqgrid_edit/themes/basic/images',
            caption: 'Статистика'
        }); 
        
		$( "#d1, #d2" ).datepicker({
			changeMonth: true,
			changeYear: true,
			onSelect: function(dateText, inst) 
			   {
			   var d1=$('#d1').val();
	   		   var d2=$('#d2').val();
			   $.cookie('d1',d1,{ expires: 30 });
			   $.cookie('d2',d2,{ expires: 30 });
	   		   setTimeout( ls.trigger("reloadGrid"), 100 ); 		

			   }

		});
        
        

  	 $('*').undelegate("#showclients", "click").delegate("#showclients", "click", function(event) 
  	     {
 		 event.stopPropagation();										
 		 $('.paneto, h2').remove();				

 		 lnk = "do.php?ClientEmpty=24&json=1&id="+$(this).attr('title');
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
   		});

//////////////////////////

jsShowPlot('le_table_dg');
 
 $('th').click( function()
    {
	if ($(this).attr('id')!='le_table_cb') { jsShowPlot( $(this).attr('id') ); mycol_grid=$(this).attr('id'); }
    //alert();
    });
 
 $('*').undelegate(".cbox", "click").delegate(".cbox", "click", function(event) 
	{
//	event.stopPropagation();										    

	clearTimeout(tttt);
	tttt = setTimeout(function()
	    {
		var s;
		s = $("* #le_table").jqGrid('getGridParam','selarrrow');
		jsShowPlot( mycol_grid );
		},1500);
	});
//////////////////////////
}


function jsShowPlotCUP()
{
  alldate = $('#datediv').html();

  $('#placeholder2').remove();
  $('<div id="placeholder2" style="width:944px;height:200px;">').appendTo('.accordion2');

   $.getJSON( "do.php?ShowStatPlotCUP=dg&date="+alldate ,function(data)
	{
    var d = [];
   
	d.push(data);

    // first correct the timestamps - they are recorded as the daily
    // midnights in UTC+0100, but Flot always displays dates in UTC
    // so we have to add one hour to hit the midnights in the plot
    for (var i = 0; i < d.length-1; ++i)
      d[i][0] += 60 * 60 * 1000;
    // helper for returning the weekends in a period
    function weekendAreas(axes) {
        var markings = [];
        var d = new Date(axes.xaxis.min);
        // go to the first Saturday
        d.setDate(d.getUTCDate() - ((d.getUTCDay() + 1) % 7))
        d.setUTCSeconds(0);
        d.setUTCMinutes(0);
        d.setUTCHours(0);
        var i = d.getTime();
        do {
            // when we don't set yaxis, the rectangle automatically
            // extends to infinity upwards and downwards
            markings.push({ xaxis: { from: i-1 * 24 * 60 * 60 * 1000, to: i } });
            i += 60 * 60 * 1000;
        } while (i < axes.xaxis.max);

        return markings;
    }
    
    var options = {
        xaxis: { mode: "time" , monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]},
        selection: { mode: "x" },
        grid: { markings: weekendAreas },
        points: {show:false},
        legend: {position: "sw", backgroundOpacity:0.4 }
    };
   // console.log(d);
    var plot = $.plot($("#placeholder2"), data , options);
    });
  
}



function jsShowPlot(type)
{
   s = $("* #le_table").jqGrid('getGridParam','selarrrow');
   //alert(s);

   $.getJSON( "do.php?ShowStatPlot="+type+"&mans="+s ,function(data)
	{
    var d = [];
   
	d.push(data[0]);

    // first correct the timestamps - they are recorded as the daily
    // midnights in UTC+0100, but Flot always displays dates in UTC
    // so we have to add one hour to hit the midnights in the plot
    for (var i = 0; i < d.length-1; ++i)
      d[i][0] += 60 * 60 * 1000;
    // helper for returning the weekends in a period
    function weekendAreas(axes) {
        var markings = [];
        var d = new Date(axes.xaxis.min);
        // go to the first Saturday
        d.setDate(d.getUTCDate() - ((d.getUTCDay() + 1) % 7))
        d.setUTCSeconds(0);
        d.setUTCMinutes(0);
        d.setUTCHours(0);
        var i = d.getTime();
        do {
            // when we don't set yaxis, the rectangle automatically
            // extends to infinity upwards and downwards
            markings.push({ xaxis: { from: i-7 * 24 * 60 * 60 * 1000, to: i } });
            i += 30 * 24 * 60 * 60 * 1000;
        } while (i < axes.xaxis.max);

        return markings;
    }
    
    var options = {
        xaxis: { mode: "time" , monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]},
        selection: { mode: "x" },
        grid: { markings: weekendAreas },
        points: {show:false},
        legend: {position: "nw"}
    };
    
    var plot = $.plot($("#placeholder"), data , options);
    
    var overview = $.plot($("#overview"), data, {
        series: {
            lines: { show: true, lineWidth: 1 },
            
            shadowSize: 0
        },
        legend: {show:false},
        xaxis: { ticks: [], mode: "time"},
        
        yaxis: { ticks: [], min: 0, autoscaleMargin: 0.1 },
        selection: { mode: "x" }
    });

    // now connect the two
    
    $("#placeholder").bind("plotselected", function (event, ranges) {
        // do the zooming
        plot = $.plot($("#placeholder"), data,
                      $.extend(true, {}, options, {
                          xaxis: { min: ranges.xaxis.from, max: ranges.xaxis.to }
                      }));

        // don't fire event on the overview to prevent eternal loop
        overview.setSelection(ranges, true);
    });
    
    $("#overview").bind("plotselected", function (event, ranges) {
        plot.setSelection(ranges);
    });
 });

}

function jsShowTimeline()
{
$('.accordion2').html('');
$('<div id="my-timeline" style="overflow-x:hidden; overflow-y:scroll; height:97%; margin-top:15px; border: 1px solid #aaa; font-size:9px"></div>').appendTo('.accordion2');

	var eventSource1 = new Timeline.DefaultEventSource();		
     //$('.accordion2').hide().html('');
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
        	$('#front').remove();
        	$('#frontclose').remove();
        	$('<div id="front"></div>').appendTo('.accordion2');
        	$('<div id="frontclose">X</div>').appendTo('.accordion2');
        	$('#front').draggable();
        	$('#frontclose').click(function(){ $('* #front').remove();$('* #frontclose').remove(); });
        	$('<div class="paneto" id='+evt.getDescription()+'></div>').appendTo('#front');
			jsRefreshClientJson(evt.getDescription(),0);
	}   
    eventSource1.loadJSON(timeline_data, '.'); // The data was stored into the 
    tl.layout(); // display the Timeline


	 $('.accordion2').slideDown('fast');
	 manager="NullManager";
}

function jsShowDo(version)
{
var vers=version;
   $('.accordion2').show().html("<div id='calendar' style='background:#FFF;margin-top:20px;margin-bottom:10px;padding:10px;-webkit-border-radius:9px;-webkit-box-shadow: #000 0px 5px 30px;color:#000;font-size:10px;margin-bottom:20px;'></div><div id='loading' style='display:none'>Загрузка...</div>");
		var date = new Date();
		var h = date.getHours();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();
   
   
		var calendar = $('#calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay,basicWeek,basicDay'
			},
		
			editable: true,
			firstDay: 1,
			//height:700,
			defaultView:'agendaWeek',
			timeFormat: 'H(:mm) ',
			//height:'auto',
			axisFormat:'H(:mm):00',
			selectable:true,
			slotMinutes:15,
			defaultEventMinutes:30,
			firstHour:h,
			minTime:8,
			maxTime:23,
			'agendaDay':'H(:mm) ',
			agenda: 'H:mm{ - H:mm} ',
			
			events: "json-events-do.php?Manager="+manager+"&version="+vers,
			windowResize: function(view) {
			//alert($('#calendar').height());
        $('#calendar').fullCalendar('option', 'height', $('#left-col').height()-60);
    },
			eventDrop: function(event, delta, minutedelta, allday) {
			  //console.log(event.id + ' was moved '+ delta +' days '+ minutedelta + ' minutes');
			  
			  if (allday) 
			     {
			     lnk="do.php?movedo="+event.id+"&days="+delta+"&minutes="+minutedelta+"&allday=1";
			     }
			     else
			     {
			     lnk="do.php?movedo="+event.id+"&days="+delta+"&minutes="+minutedelta+"&allday=0";
			     }
			   
	 		$('#bubu').load(lnk, function ()
	 		    {
	 		    jsTitle($('#bubu').html());
	 		    //jsTitle('Дело №'+event.id+' перенесли на '+ delta +' дней '+ minutedelta + ' минут');
	 		    jsLeftDo();
	 		    });

			  
			},
			eventClick: function(calEvent, jsEvent, view) {
			if(!calEvent.clientid) { if (confirm("Вы действительно хотите удалить дело №"+ calEvent.id +"?")) 
	      				{
				  		  var dataString = 'Delete='+ calEvent.id;
		  				  $.ajax({type: "GET",url: "do.php", data: dataString});
	  					calendar.fullCalendar('removeEvents', calEvent.id);

	      				jsTitle('Дело удалено.');
	      				jsLeftDo();
	      				}  
	      		return true;
	      		}
			
		        //alert('Event: ' + calEvent.clientid);
        		//alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
        		//alert('View: ' + view.name);

        		// change the border color just for fun
        		//$(this).css('border-color', 'red');
        	$('#front').remove();
        	$('#frontclose').remove();
        	$('<div id="front"></div>').appendTo('.accordion2');
        	$('<div id="frontclose">X</div>').appendTo('.accordion2');
        	$('#frontclose').click(function(){ $('* #front').remove();$('* #frontclose').remove(); });
        	$('#front').draggable();
        	$('<div class="paneto" id='+calEvent.clientid+'></div>').appendTo('#front');
			jsRefreshClientJson(calEvent.clientid,calEvent.id);

            },
			loading: function(bool) {
        $('#calendar').fullCalendar('option', 'height', $('#left-col').height()-90);
				if (bool) $('#loading').show();
				else $('#loading').hide();
			},
			selectable: true,
			selectHelper: true,
			select: function(start, end, allDay) {
				var title = prompt('Название события:');
				if (title) { 
				manager = encodeURIComponent($('#selectmanager').html()); 
				lnk="do.php?createdo="+encodeURIComponent(title)+"&start="+encodeURIComponent(start.toUTCString())+"&end="+encodeURIComponent(end.toUTCString())+"&allday="+allDay+"&manager="+manager;
				//console.log(lnk);
	 			$('#bubu').load(lnk, function ()
	 		    	{
	 		    	jsTitle('Создано дело "'+title+'" на дату '+ start);
	 		    	jsLeftDo();
					calendar.fullCalendar('renderEvent',
						{
							id: $('#bubu').html(),
							title: title,
							start: start,
							end: end,
							className: 'did2',
							allDay: allDay
						},
						true // make the event "stick"
					);
	 		    	});


				}
				calendar.fullCalendar('unselect');
			}
			
			
		});
		
   
	   return true;
}			

function jsSmsCup()
{
 alldate = $('#datediv').html();
 var refreshPlot=0;

   $.getJSON( "do.php?newscup=888&date="+alldate ,function(data)
	{
	$.each(data, function(i,data)
		{
        if ($('#'+i).children('.roundfooter2[id="dg"]').html() != data.amount[0] && ($('#'+i).children('.roundfooter2[id="dg"]').html()!='')) { $('#'+i).children('.roundfooter2[id="dg"]').css("background","#da5700"); n=1; $('#placeholder2').remove(); $refreshPlot=1; }
		$('#'+i).children('.roundfooter2[id="dg"]').html(data.amount[0]);

if ($('#'+i).children('.roundfooter2[id="vd"]').html() != data.amount[1] && ($('#'+i).children('.roundfooter2[id="vd"]').html()!='')) { $('#'+i).children('.roundfooter2[id="vd"]').css("background","#da5700"); n=1; $('#placeholder2').remove(); $refreshPlot=1; }
		$('#'+i).children('.roundfooter2[id="vd"]').html(data.amount[1]);

if ($('#'+i).children('.roundfooter2[id="zv"]').html() != data.amount[2] && ($('#'+i).children('.roundfooter2[id="zv"]').html()!='')) { $('#'+i).children('.roundfooter2[id="zv"]').css("background","#712115"); n=1;}
		$('#'+i).children('.roundfooter2[id="zv"]').html(data.amount[2]);

if ($('#'+i).children('.roundfooter2[id="vz"]').html() != data.amount[3] && ($('#'+i).children('.roundfooter2[id="vz"]').html()!='')) { $('#'+i).children('.roundfooter2[id="vz"]').css("background","#712115"); n=1;}
		$('#'+i).children('.roundfooter2[id="vz"]').html(data.amount[3]);

if ($('#'+i).children('.roundfooter2[id="tst"]').html() != data.amount[4] && ($('#'+i).children('.roundfooter2[id="tst"]').html()!='')) { $('#'+i).children('.roundfooter2[id="tst"]').css("background","#712115"); n=1;}		
		$('#'+i).children('.roundfooter2[id="tst"]').html(data.amount[4]);
		});

  if (refreshPlot==1) jsShowPlotCUP();

  if (n==1)
   window.onmousemove = function ()
      {
      setTimeout( function () { $('.roundfooter2, .roundfooter').css('background','#516f8f') }, 1000 );
      window.onmousemove = function () {};
      }



	});
	
  
  
  clearInterval(si2);
  si2=setInterval(jsSmsCup,1*60*1000);		

}


function jsSms()
{
 alldate = $('#datediv').html();

   $.getJSON( "do.php?news=888&date="+alldate ,function(data)
	{
   $("#rr1").html(data.amount[0]);	
   n=0;
   if ($("#r1").html() != data.amount[1] && ($("#r1").html()!='')) { $("#r1").css("background","#da5700"); n=1;}
   $("#r1").html(data.amount[1]);
   if ($("#r2").html() != data.amount[2] && ($("#r2").html()!='')) { $("#r2").css("background","#da5700"); n=1; }
   $("#r2").html(data.amount[2]);
   if ($("#r3").html() != data.amount[3] && ($("#r3").html()!='')) { $("#r3").css("background","#da5700"); n=1; }
   $("#r3").html(data.amount[3]);
   if ($("#r4").html() != data.amount[4] && ($("#r4").html()!='')) { $("#r4").css("background","#da5700"); n=1;}
   $("#r4").html(data.amount[4]);	
   if ($("#r5").html() != data.amount[5] && ($("#r5").html()!='')) { $("#r5").css("background","#da5700"); n=1;}
   $("#r5").html(data.amount[5]);	

   $("#r6").html(data.amount[6]);
   
   $("#r6").attr('title',data.amount[7]);

  if (n==1)
   window.onmousemove = function ()
      {
      setTimeout( function () { $('.roundfooter').css('background','#516f8f') }, 1000 );
      window.onmousemove = function () {};
      }

	});
	
  
  
  clearInterval(si);
  si=setInterval(jsSms,1*30*1000);		

}

function jsAmount()
{
 return true;
 manager = encodeURIComponent($('#selectmanager').html()); 
 model = $('#selectmodel option:selected').attr('value');
 radio=$('* li[class=current] a').attr('id');
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
			  if ( $('.title').html() != ('<b>'+title+'</b>') ) $('.title').css("opacity",'0').html('<b>'+title+'</b>').animate({"opacity": '0.7'}, 1000, function()
								{ 
								});
			 }, 200);

}

function jsReiting()
{
 alldate = $('#datediv').html();
 manager = encodeURIComponent($('#selectmanager').html()); 

lnk = "do.php?reiting=1&date="+alldate+"&days=15&manager="+ manager;

$('.reiting1').load(lnk);
lnk = "do.php?reiting=2&date="+alldate+"&days=15&manager="+ manager;
$('.reiting2').load(lnk);

lnk = "do.php?reiting=3&date="+alldate+"&days=15&manager="+ manager;
$('#reiting3').load(lnk,function()
    {
    
	lnk = "do.php?reiting=3&date="+alldate+"&days=30&manager="+ manager;
	$('#bubu2').load(lnk, function()
	    {
		$($('#bubu2').html()).appendTo('#reiting3');
		
		lnk = "do.php?reiting=3&date="+alldate+"&days=888&manager="+ manager;
		$('#bubu2').load(lnk, function()
	    	{
			$($('#bubu2').html()).appendTo('#reiting3');
   			});
		
   		});
    
    
    
    });

}

function jsDoFirst() //Исполняется только один раз
 {

    //$('li').removeClass('current');
    
    //if ((user==11) || (user==18) || (user==64)) $('#cup').addClass('current');
    //else $('#lidogovors').addClass('current'); 

    //$('input[title!=""]').hint();

	$('#chat1').hide();
	$('#whoonline').hide();
    $('.daterange').hide();
    $('#search').hide();
        
	//jsReiting();


    //setTimeout( jsAmount(),2000);
    
		 $('*').undelegate("#r6", "click").delegate("#r6", "click", function(event) 
			{
			event.stopPropagation();										    
			jsTitle($('#r6').attr('title'));
			});
		 //Поиск
		 $('*').undelegate("#textfilter", "keyup").delegate("#textfilter", "keyup", function(event) 
			{
				if (event.keyCode=='13') 
					{
					clearTimeout(tttt);
					tttt = setTimeout(function()
					         {
								$('.accordion2').html('');
	         					jsTitle("ПОИСК: Можно искать среди всех менеджеров. Если в поиске добавить символ '+'");
								if ( $('* li[class=current] a').attr('id') )
											wastab = $('* li[class=current] a').attr('id');
								$('ul[class=tabs] li').removeClass('current');
					        	//jsShowClientsJson();
					        	jsSQLClients(1000);

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
		$('#cup').addClass('current');
	    setTimeout( doLoadUp2(),50 );
		});
		
		


    $('*').undelegate(".roundfooter", "click").delegate(".roundfooter", "click", function() 
            {
			event.stopPropagation();										    
			alldate = $('#datediv').html();
    	    id = $(this).attr('id3');
			var but = $(this);
            clearTimeout(tttt);
            tttt=setTimeout(function()
               {
               $('li').removeClass('current');
               $('#lidogovors').addClass('current'); 
               if(!but.hasClass('active'))
                  {
					but.addClass('active');
				  }
				else 
				  {
				  but.removeClass('active');
				  alldate = alldate[0]+alldate[1]+alldate[2]+alldate[3]+alldate[4]+alldate[5]+alldate[6];

				  }

				$('.roundfooter').css('background','#516f8f');
	    	    but.css('background','#bc4b25');
    	    
		    	$('#selectmanager').html('Все');
		    	$('.accordion2').html('');
	            $('.paneto, #h22').remove();
               
 				lnk = "do.php?ShowSQL=24&json=1&manager="+manager+"&Model="+model+"&Filter="+filter+"&Radio=statistic2&ALLDate="+alldate+"&brand="+$('#brand').html()+"&type="+id+"&groupby=manager&downmenu=1";
 				console.info(lnk);
 				$.getJSON( lnk ,function(data)
					{
					$.each(data, function(i,data)
						{  
						//console.log(i);
						$('#clients-tmpl-mini').tmpl(data).appendTo(".accordion2");
						});
					jsCollapse();
					jsh1('groupby');
					$('.accordion2').slideDown('fast');
					});
				},200);
			});

		
				
	$('#AllStat').click(function()
	   {
	   jsShowStat();
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
//			setTimeout(jsShowClientsJson, 0); 			
//            setTimeout(jsCollapse,0);
//            setTimeout(doLoadUp2,1000);
			jsMenu(menu_id);
			var current = $.cookie('menu-current');
		    jsSQLClients(current);
			jsSms();
		 	jsLeftDo();
			jsReiting();
			
            //jsAmount();
		});

	$(".search-ico").click(function()
		{
	    $('#search').slideToggle('fast');
	    $('.search-ico').toggleClass('active');
	    if ($('.search-ico').hasClass('active')) $('#textfilter').focus();
		});
	
jsMenuFirst(0);		
menu = $.cookie('menu');


if(!menu) menu=0;
var current = $.cookie('menu-current');

if (($.cookie('fpk_job')=='Генеральный директор') && (user!=11))
{
menu=4; 
var current=22;
setTimeout( function()
    {
	$('* li').removeClass('current');
	$('* li[id='+current+']').addClass('current');
	},3000);
}

/////////////////////Первая загрузка/////////////////////////
jsMenu(menu);	
//console.log(menu+' '+current);
    jsSQLClients(current);

//////////////////////////////////////////////////////////////////////////

    //Подготовка чата
	jsChatRefresh();
    jsSetInterval(30000); //Запуск чата

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
		    radio=$('* li[class=current] a').attr('id');

		   $('#datediv').html(dateText);
		   //doLoadUp2();
		   jsSQLClients(radio);
		   jsLeftDo();
		    //if(radio!='cup') jsShowClientsJson();
		   if ($('* li[class=current] a').attr('id')=='statistic')  tim1 = setTimeout(jsShowClientsJson, 0);
		   if ($('* li[class=current] a').attr('id')=='radar')  
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
      event.stopPropagation();										    

      var man = $(this); 
       $('#selectmanager').html(man.html());
	   $.cookie('mymanager',man.html(),{ expires: 30 });
	   $('#textfilter').attr('value',''); //обнуляем строку поиска при смене менеджера
	   jsMenu(menu_id);
	   var current = $.cookie('menu-current');
	   jsSQLClients(current);
 	   jsLeftDo();
	   jsReiting();
      });
       

	

    $("#show-i a").click(function()
       {
	   $.cookie('showi',$(this).attr("id2"),{ expires: 30 });
       $("* #i1,#i2,#i3,#i4,#i5").hide();
       $("* #"+$(this).attr('id2')).show();
       });
       


    //css("border", "2px dotted blue");	
    ////////////////////////////////////////////////////////////////////////////
	//jsShowClientsJson(); //Отобразить Всех клиентов в зависимости от фильтров
	//setTimeout(doLoadUp2,0);
 }

//////////////////////////Функция вывода клиентов/////////////////////////////////
function jsShowClientsJson(){ //Показать Всех клиентов в зависимости от фильтров
 var myTimeOut = null;
 //считываю данные из фильтров
 manager = encodeURIComponent($('#selectmanager').html()); 
 model = $('#selectmodel option:selected').attr('value');
 filter =  encodeURIComponent($('#textfilter').attr('value'));
// filter =  '';
 radio=$('* li[class=current] a').attr('id');
 alldate = $('#datediv').html();
 //alert(radio);
 if (!radio) return true;
// alldate = '2011-02-12';
  clearInterval(si2);
			if ( radio=='do' ) { jsShowDo(1); return true; }
			if ( radio=='journal_v' ) { jsShowDo(2); return true; }
			if ( radio=='journal_t' ) { jsShowDo(3); return true; }
			if ( radio=='statistic' ) { jsShowTimeline(); return true; }
			if ( radio=='cup' ) 
			   { 
			   jsSmsCup(); 
				
			   return true; 
			   }
			if ( radio=='stat' ) { return true; }
			if ( radio=='SetupUser' ) { return true; }
			if ( radio=='SetupModels' ) { return true; }
			if ( radio=='AllStat' ) { jsShowStat(); return true; }

// $('.accordion2').hide();//скрываю общее поле клиентов, чтобы не мелькало

 
 if (radio!='statistic') $('#my-timeline').hide(); 
 //console.log("Радио="+radio);
 
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
 radio=$('* li[class=current] a').attr('id');
 
 alldate = $('#datediv').html();
 radarrange = encodeURIComponent($('#selectdaterange option:selected').attr('value'));
 
//Загружаю разом Всех клиентов
 $('.accordion2').hide().html('');
 $('.accordion2').load("do.php?ClientEmpty=24&Manager="+manager+"&Model="+model+"&Filter="+filter+"&Radio="+radio+"&ALLDate="+alldate+"&radarrange="+radarrange, function ()
   {															 
		jsCollapse();	//через задержку сворачиваю Все панели
   }); 
//setTimeout(doLoadUp2,10);	//Загружаю дела менеджера
}




function jsShowClientsPrepare(onlyid) {
    $(".clientform").hide();  $(".clientformmini").show();
    
   // $('input[title!=""]').hint();
    
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
    $(".accordion2 .paneto h3").unbind('click').click(function()
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
						clearTimeout(adddo);
						adddo = setTimeout(jsRefreshClientJson(doid,$txt.responseText),500);
						} });
				return false;
				
				
	});
  //Прогрессбар клиентов
	$(".ic").unbind('click').click(function(event){ 
				event.stopPropagation();														
				doid=$(this).attr('id2');
				img=$(this);
		  		var dataString = 'Icon='+ doid;
		  		$txt = $.ajax({type: "GET",url: "do.php", data: dataString, success: function()
						{ 
						//img.attr({'src':'img/progres-'+$txt.responseText+'.gif'});
						$('* .icon[id2='+doid+']').attr({'src':'img/progres-'+$txt.responseText+'.gif'});
						//alert('* #'+doid);
						} });
					});
					
	$(".ic2").unbind('click').click(function(event){ 
				event.stopPropagation();
				doid=$(this).attr('id2');
				img=$(this);
		  		var dataString = 'Icon2='+ doid;
		  		$txt = $.ajax({type: "GET",url: "do.php", data: dataString, success: function()
						{ 
						//alert($txt.responseText+' : '+dataString);														
						//img.attr({'src':'img/progres-'+$txt.responseText+'.gif'});
						$('* .icon2[id2='+doid+']').attr({'src':'img/progres-'+$txt.responseText+'.gif'});
						jsSms();
						setTimeout( function() 
						   {
						   jsTitle($('#r6').attr('title'));
						   },1000);

						//alert('* #'+doid);
						} });
					});
					
	    $("* #i1,#i2,#i3,#i4,#i5").unbind("click").click(function(event)
        {
		event.stopPropagation();														

        clearTimeout(myt);
        var th1=$(this);
        myt = setTimeout( function()
           {
	       $("* #i1,#i2,#i3,#i4,#i5").hide();
	       iii = (th1.attr('id')[1]);
	       if (iii==1) myi = 2;
	       if (iii==2) myi = 3;
	       if (iii==3) myi = 4;
	       if (iii==4) myi = 5;
	       if (iii==5) myi = 1;
	       $.cookie('showi','i'+myi);
    	   //$("* #i1").show();
    	   $("* #i"+myi).show();
           },300);
        });
				
					
    //При клике в кнопку Развернуть всё сворачиваем и скрываем кнопку
	$(".expandall").unbind('click').click(function(){
	$(".accordion2 h3").addClass("active");	$(".accordion2 .pane").slideDown("fast"); $(this).hide(); $(".colapseall").show();});
 $("* #i1,#i2,#i3,#i4,#i5").hide();

 if($.cookie('showi')==null) $.cookie('showi','i1');

 $("* #"+$.cookie('showi')).show();

	jsInputClick();
	
	

}

function jsRefreshClientJson(doid,maxid)
{
 radio=$('* li[class=current] a').attr('id');

   $(".paneto[id="+doid+"]:last").each(function()
		{
		var client;
		client=$(this).attr("id");
		pan=$(this);
		
		lnk = "do.php?Clientid2="+client+"&json=8&Did=0";
		//console.log(lnk);
 //setTimeout(doLoadUp2,70);	

 $.getJSON( lnk ,function(data)
	{ 
			pan.html('');
			$('#clients-tmpl').tmpl(data).appendTo(pan);
			jsShowClientsPrepare();
						    //Всё сворачиваем
			$(".pane2").hide();
//			alert(maxid);
			console.log('maxid='+maxid);
			if (maxid) $(".paneto[id="+doid+"] .pane2[id="+maxid+"]").slideDown('fast');
			if ((maxid) && (radio!='do')) $(".paneto[id="+doid+"] .pane2[id="+maxid+"] input[id=TEXT]").focus();
		    jsPrepareDate();
			jsMenu(menu_id);
		jsRound();
		jsMakeDraggable();
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
							//setTimeout(doLoadUp2,700);	

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
						jsRefreshClientJson(doid,$txt.responseText);
						} });
		  		} 

    	
	
	//alert ($(this).val());
	
    if ($(this).val() == 'Снять выполнение')
	   {
	    if ($(this).attr('readonly')) { jsTitle('Недостаточно прав для редактирования дела. Обратитесь к руководителю или ответственному.'); 
	    	return false; }

	  var dataString = 'notDone='+ doid;
	  $txt = $.ajax({type: "GET",url: "do.php", data: dataString, success: function() 
			{			//Обновляю информацию по датам дел этого клиента   
			$txt2 = $.ajax({type: "GET",url: "do.php?UpdateIcons="+$('.pane2[id='+doid+']').attr('id2') });
$('h4[id='+doid+'] .mystrike').css({"text-decoration":"none"}).next('.pane2').slideUp("fast");
			$('h4[id='+doid+']').next('.pane2').slideUp("fast");							
			//setTimeout(doLoadUp2,700);	

			$('input[idd='+doid+']').attr({'name':'Done', 'value':'Выполнить'});
			jsRefreshClientJson($('.pane2[id='+doid+']').attr('id2'));
			jsLeftDo();			
			}});
       }

   if ($(this).val()== 'Выполнить')
	   {
	    if ($(this).attr('readonly')) { jsTitle('Недостаточно прав для редактирования дела. Обратитесь к руководителю или ответственному.'); 
	    	return false; }
	  var dataString = 'Done='+ doid;
	  $txt = $.ajax({type: "GET",url: "do.php", data: dataString, success: function() 
			{			//Обновляю информацию по датам дел этого клиента   
			$txt2 = $.ajax({type: "GET",url: "do.php?UpdateIcons="+$('.pane2[id='+doid+']').attr('id2') });
$('h4[id='+doid+'] .mystrike').css({"text-decoration":"line-through"});
			$('h4[id='+doid+']').next('.pane2').slideUp("fast");
			jsLeftDo();			
			$('input[idd='+doid+']').attr({'name':'notDone', 'value':'Снять выполнение'});

			}});
       }

    //Редактирую дело
    if ( ($(this).attr('name') == 'Save') || ($(this).attr('name') == 'Done'))
	   {
	    if ($(this).attr('readonly')) { jsTitle('Недостаточно прав для редактирования дела. Обратитесь к руководителю или ответственному.'); 
	    	return false; }

		date3 = $('.pane2[id='+doid+'] input[name=DATE2]').attr('title') + ' ' + $('.pane2[id='+doid+'] input[name=test]').val() + ':' + $('.pane2[id='+doid+'] input[name=test2]').val() + ':00';

		sr=$('.pane2[id='+doid+'] input, .pane2[id='+doid+'] textarea, .pane2[id='+doid+'] select').serialize();   
  		  var dataString = 'Update='+ doid + '&'+ sr + '&DATE3=' + date3 + '&slave=' + $('.pane2[id='+doid+'] #SLAVE option:selected').html();
  		  console.log('Savedo='+dataString);
          $txt = $.ajax({type: "GET",url: "do.php", data: dataString, success: function() 
					   {			//Обновляю информацию по датам дел этого клиента   
			$txt2 = $.ajax({type: "GET",url: "do.php?UpdateIcons="+$('.pane2[id='+doid+']').attr('id2') });
$('h4[id='+doid+'] .text').html($('.pane2[id='+doid+'] input[id=TEXT]').attr('value'));   
						$('h4[id='+doid+']').next('.pane2').slideUp("fast");
						jsLeftDo();			
    					jsRefreshClientJson($('.pane2[id='+doid+']').attr('id2'));

					   } });
	   }

    //Удаляю дело
    if ($(this).attr('name') == 'Delete') 
	   if (confirm("Вы действительно хотите удалить дело №"+ doid +"?")) 
	      {  
	    if ($(this).attr('readonly')) { alert('Недостаточно прав для удаления дела. Обратитесь к руководителю или ответственному.'); 
	    	return false; }
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
							jsLeftDo();			
			jsRefreshClientJson($('.pane2[id='+doid+']').attr('id2'));
							
							} });
		  }

    if ($(this).attr('name') == 'clientclose')
	   {
						$(".clientform").slideUp('fast');
						$(".clientformmini").slideDown('fast');
	   }
    //Редактирую клиента
    if ($(this).attr('name') == 'clientsave')
	   {
	    if ($(this).attr('readonly')) { jsTitle('Недостаточно прав для редактирования клиента. Обратитесь к руководителю или ответственному.'); 
			$(".clientform").slideUp('fast');
			$(".clientformmini").slideDown('fast');
	    	return false; }
		sr=$('.clientform[id='+doid+'] input, .clientform[id='+doid+'] textarea').serialize();   
//		$('.clientform[id='+doid+'] input, .clientform[id='+doid+'] textarea').remove();   
	    manager = encodeURIComponent($('.clientform[id='+doid+'] #selectmanagerclient option:selected').attr('value'));
	    creditmanager = encodeURIComponent($('.pane[id='+doid+'] #selectcredit option:selected').attr('value'));
	    model = encodeURIComponent($('.pane[id='+doid+'] #selectmodel option:selected').attr('modelid'));
	    status = encodeURIComponent($('.pane[id='+doid+'] #selectstatus option:selected').attr('value'));
	    commercial = encodeURIComponent($('.pane[id='+doid+'] #selectcommercial option:selected').attr('value'));

  		  var dataString = 'UpdateClient='+ doid + '&'+ sr + '&manager=' + manager + '&creditmanager=' + creditmanager+'&model='+model+'&status='+status+'&commercial='+commercial;
		  //console.info(dataString);
		  $txt = $.ajax({type: "GET",url: "do.php", data: dataString, success: function() 
					   {
						$('h3[id='+doid+'] .text').html($('.pane[id='+doid+'] input[id=FIO]').attr('value')); 
						jsLeftDo();			
						$(".clientform").slideUp('fast');
						$(".clientformmini").slideDown('fast');
    					jsRefreshClientJson(doid);
					   } });
	   }

    //Удаляю клиента
    if ($(this).attr('name') == 'clientdelete') 
	   if (confirm("Вы действительно хотите удалить клиента №"+ doid +"?")) 
	      {  
	    if ($(this).attr('readonly')) { alert('Недостаточно прав для удаления клиента. Обратитесь к руководителю или ответственному.'); 
			$(".clientform").slideUp('fast');
			$(".clientformmini").slideDown('fast');
	    	return false; }
  		  var dataString = 'DeleteClient='+ doid;
		  $txt = $.ajax({type: "GET",url: "do.php", data: dataString, success: function() 
							{ 
							jsMenu(menu_id);
							$('.paneto[id='+doid+']').slideUp('fast');
							mydiv.parent('div').animate({height: "0",width: "0", opacity: "0"}, 1000, function()
														{ 
														mydiv.parent('div').hide(); 
    													});
							jsLeftDo();			
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
 return true;
 manager = encodeURIComponent($('#selectmanager').html()); 
 model = $('#selectmodel option:selected').attr('value');
 radio=$('* li[class=current] a').attr('id');
 if (radio=='do') return true;
 alldate = $('#datediv').html();
 filter='';
 lnk = "do.php?AmountDo=1&Manager="+manager+"&date2="+alldate;
 $('.left-amount-do2').load(lnk);
 //alert(lnk);
 jsReiting();

 lnk = "do.php?AmountDo=2&Manager="+manager+"&date2="+alldate;
 $('.left-amount-do').load(lnk);
 
 
//   clearInterval(si2);

   jsSms();

    if ( ($('* li[class=current] a').attr('id'))!='do' ) return true;

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
				event.stopPropagation();										    
 
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
				event.stopPropagation();										    
 
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
										  { event.stopPropagation();										    
											jsSetInterval(1500);
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
	  
	  $("* #chat[who='"+iduser+"'] #chattext").load('История чата');
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
												 document.focus();
												 //alert('Вам сообщение.');
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
		  height=$('#left-col').height()-$('#indented').height()-400;
		  $('.left-bottom').css('height',height);

     if (resizeTimerID == null) {
         resizeTimerID = window.setTimeout(function() {
             resizeTimerID = null;
             //tl.layout();
         }, 500);
     }
 }





(function($) {

        var opts = {};

        $.fn.dropzone = function(options) {

                // Extend our default options with those provided.
                opts = $.extend( {}, $.fn.dropzone.defaults, options);

                var id = this.attr("id");
                var dropzone = document.getElementById(id);

                log("adding dnd-file-upload functionalities to element with id: " + id);

                if ($.client.browser == "Safari" && $.client.os == "Windows") {
                        var fileInput = $("<input>");
                        fileInput.attr( {
                                type : "file"
                        });
                        fileInput.bind("change", change);
                        fileInput.css( {
                                'opacity' : '0',
                                'width' : '100%',
                                'height' : '100%'
                        });
                        fileInput.attr("multiple", "multiple");
                        fileInput.click(function() {
                                return false;
                        });
                        this.append(fileInput);
                } else {
                        dropzone.addEventListener("drop", drop, true);
                        var jQueryDropzone = $("#" + id);
                        jQueryDropzone.bind("dragenter", dragenter);
                        jQueryDropzone.bind("dragover", dragover);
                }

                return this;
        };

        $.fn.dropzone.defaults = {
                url : "",
                method : "POST",
                numConcurrentUploads : 3,
                printLogs : false,
                // update upload speed every second
                uploadRateRefreshTime : 1000
        };

        // invoked when new files are dropped
        $.fn.dropzone.newFilesDropped = function() {
        };

        // invoked when the upload for given file has been started
        $.fn.dropzone.uploadStarted = function(fileIndex, file) {
        };

        // invoked when the upload for given file has been finished
        $.fn.dropzone.uploadFinished = function(fileIndex, file, time) {
        };

        // invoked when the progress for given file has changed
        $.fn.dropzone.fileUploadProgressUpdated = function(fileIndex, file,
                        newProgress) {
        };

        // invoked when the upload speed of given file has changed
        $.fn.dropzone.fileUploadSpeedUpdated = function(fileIndex, file,
                        KBperSecond) {
        };

        function dragenter(event) {
                event.stopPropagation();
                event.preventDefault();
                return false;
        }

        function dragover(event) {
                event.stopPropagation();
                event.preventDefault();
                return false;
        }

        function drop(event) {
                var dt = event.dataTransfer;
                var files = dt.files;

                event.preventDefault();
                uploadFiles(files);

                return false;
        }

        function log(logMsg) {
                if (opts.printLogs) {
                        // console && console.log(logMsg);
                }
        }

        function uploadFiles(files) {
                $.fn.dropzone.newFilesDropped();
                for ( var i = 0; i < files.length; i++) {
                        var file = files[i];

                        // create a new xhr object
                        var xhr = new XMLHttpRequest();
                        var upload = xhr.upload;
                        upload.fileIndex = i;
                        upload.fileObj = file;
                        upload.downloadStartTime = new Date().getTime();
                        upload.currentStart = upload.downloadStartTime;
                        upload.currentProgress = 0;
                        upload.startData = 0;

                        // add listeners
                        upload.addEventListener("progress", progress, false);
                        upload.addEventListener("load", load, false);

                        xhr.open(opts.method, opts.url);
                        xhr.setRequestHeader("Cache-Control", "no-cache");
                        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                        xhr.setRequestHeader("X-File-Name", file.fileName);
                        xhr.setRequestHeader("X-File-Size", file.fileSize);
                        xhr.setRequestHeader("Content-Type", "multipart/form-data");
                        xhr.send(file);

                        $.fn.dropzone.uploadStarted(i, file);
                }
        }

        function load(event) {
                var now = new Date().getTime();
                var timeDiff = now - this.downloadStartTime;
                $.fn.dropzone.uploadFinished(this.fileIndex, this.fileObj, timeDiff);
                log("finished loading of file " + this.fileIndex);
        }

        function progress(event) {
                if (event.lengthComputable) {
                        var percentage = Math.round((event.loaded * 100) / event.total);
                        if (this.currentProgress != percentage) {

                                // log(this.fileIndex + " --> " + percentage + "%");

                                this.currentProgress = percentage;
                                $.fn.dropzone.fileUploadProgressUpdated(this.fileIndex, this.fileObj, this.currentProgress);

                                var elapsed = new Date().getTime();
                                var diffTime = elapsed - this.currentStart;
                                if (diffTime >= opts.uploadRateRefreshTime) {
                                        var diffData = event.loaded - this.startData;
                                        var speed = diffData / diffTime; // in KB/sec

                                        $.fn.dropzone.fileUploadSpeedUpdated(this.fileIndex, this.fileObj, speed);

                                        this.startData = event.loaded;
                                        this.currentStart = elapsed;
                                }
                        }
                }
        }

        // invoked when the input field has changed and new files have been dropped
        // or selected
        function change(event) {
                event.preventDefault();

                // get all files ...
                var files = this.files;

                // ... and upload them
                uploadFiles(files);
        }

})(jQuery);