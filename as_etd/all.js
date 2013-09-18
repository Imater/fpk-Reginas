//css("border", "2px dotted blue")

function jsDoFirst()
{
	$("*").keyup( function(event) 
		{ 
//		console.log(event.keyCode);
//		if (event.keyCode==107)
//		  {
//		   $("td").css('font-size','+1');
//		  }
//		if (event.keyCode==109)
//		  {
//		   $("td").css('font-size','-1');
//		  }
		if (event.keyCode==118)
		  {
		   $("#form_search").focus();
		  }
		if (event.keyCode==45)
		  {
//добавление формы		   
    	   $("#bububu").load("do.php?AddForm=1", function()
			{
			jsShowForms("%");
			});	  
		   return false;
		  }
		});
	
	$("#AddForm").click(function ()
	  {
	   $("#bububu").load("do.php?AddForm=1", function()
			{
			jsShowForms("%");
			});	  
	  });
	
	
	
	$('td[id=f_order]').hide();
	
	
//отображение f_order
	$("#show_id").css('cursor','pointer');	
	$("#show_id").click(function ()
      {
		$('td[id=f_order]').hide();  });								  
								  
	$("#show_id").dblclick(function ()
      {
		$('td[id=f_order]').show();  });								  
    								  
	
	
//отображение textarea при двойном целчке мыши	после запуска функции textarea
    $("#show_forms").delegate("#show_forms td", "dblclick", function ()
	  {
		showtextarea($(this));				
	   });
	
//сохранение содержимого textarea при нажатии "enter" после запуска функции savetextarea
     $("#show_forms").delegate("#show_forms textarea", "keydown", function (event)
	  {
		//$(this).parent('td').text($(this).text());
		if ((event.keyCode=='13'))
		  {		
		  th = $(this);
		  savetextarea(th);

		  }
		if (event.keyCode=='40')
		  {
			event.stopPropagation();
			showtextarea(th);
		  }
		  
	  });  
		  
   setTimeout(function(t) 
    {
     var t;
     t=0;
     $("#ready").hide();
     $("#form_search").keyup(function () {   jsShowForms($("#form_search").val());     });
//     $("#show_forms").hide();
     jsShowForms("%");
     setTimeout(function() { $("#show_forms").slideDown('slow'); 
                             $('#wait').css("visibility","hidden");	 }, 5);
    }, 1000);
    
}    

//функция сохранения содержимого textarea в базу
function savetextarea(th)
{
		  f_id=th.parents('tr').attr("id");
		  f_field=th.parent('td').attr("id");
		  f_val=encodeURIComponent(th.val());
		  
		  lnk = "do.php?UpdateForm="+f_id+"&field="+f_field+"&value="+f_val;
	//	  console.info(lnk);
  		  th.parent('td').html( th.val() );
		  $("#bububu").load(lnk, function(){});
}

//функция отображения textarea  с вычислением её размеров
function showtextarea(th)
{
		length=th.text().length;
		rows=1
		cols=length;
		width=th.width()/8;
		if (length>width) 
		   {
			   rows = parseInt(length/width)+2;
			   cols=width;
		   }
		th.html("<textarea id='f_edit' style='overflow: hidden;width:100%' rows='"+rows+"' cols='"+cols+"'>"+th.text()+"</textarea>");
//		$('textarea').hide().slideDown('fast').focus();
}

//отображение списка после написание символа в Поиск
function jsShowForms(search_f)
{
	$('td[id=f_order]').hide();
        $('#wait').css("visibility","visible");	
	lnk = "do.php?Page="+encodeURIComponent(search_f)+"&SF1=1&SF2=0&SF3=1&SF4=1";
	console.info(lnk);
	$.getJSON( lnk ,function(data)
		{
		$("#show_forms").html($('#movieTemplateHeader').tmpl());
		
		$.each(data, function(i,data)
			{  
			$('#movieTemplate').tmpl(data).appendTo("#show_forms");
			});
		$('td[id=f_order]').hide();
		
		$('#show_forms TR:even').css("background", "#F2F0EC");
		//$('td[id=f_order]').hide();
		$('#wait').css("visibility","hidden");	
		
		
		
		$( "tr" ).draggable({ revert: "valid", helper:"clone" });
		$( "img" ).droppable({
			drop: function( event, ui ) {

				$( this ).attr('alt','hello!');
				delid = ui.draggable.attr('id');
				console.log('Меня удалили!!! - '+delid+' - '+ui);
				
	   if (confirm("Вы действительно хотите удалить №"+ delid +"?")) 				
	               {
					$("tr[id="+delid+"]").css('background','red');
					$("tr[id="+delid+"]").fadeOut('slow');
					   $("#bububu").load("do.php?DeleteForm="+delid, function()
							{
							console.log('do.php?DeleteForm='+delid);	
							jsShowForms("%");

							});	  
					
			   }
			}
		});
		});	
};
   



