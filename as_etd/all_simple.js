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

		});
	
	$('td[id=f_order]').hide();
	

  
   setTimeout(function(t) 
    {
     var t;
     t=0;
//     $("#ready").hide();
//     $('#wait').css("display","none");
     $("#form_search").keyup(function () { if (event.keyCode==13) 
                                            {jsShowForms($("#form_search").val());} 


                                         });
//     $("#show_forms").hide();
     jsShowForms("%");
     setTimeout(function() { $("#show_forms").slideDown('slow');
                             $('#wait').css("visibility","hidden"); }, 5);
    }, 800);
    
}    

//отображение списка после написание символа в Поиск
function jsShowForms(search_f)
{
	$('td[id=f_order]').hide();
        $('#wait').css("visibility","visible");
	lnk = "do.php?Page="+encodeURIComponent(search_f)+"&SF1=1&SF2=0&SF3=1&SF4=1";
//        req.open("GET", "do.php?Page="+encodeURIComponent(search_f)+"&SF1=1&SF2=0&SF3=1&SF4=1, true);
//	console.info(lnk);
	$.getJSON( lnk ,function(data)
	     {
		$("#show_forms").html($('#movieTemplateHeader').tmpl());
		
		$.each(data, function(i,data)
			{  
			$('#movieTemplate').tmpl(data).appendTo("#show_forms");

			});
		$('td[id=f_order]').hide();

		$('#show_forms TR:even').css("background", "#F2F0EC");
                $('#wait').css("visibility","hidden");	
		//$('td[id=f_order]').hide();
	
		
	     });
 		
};
   	
