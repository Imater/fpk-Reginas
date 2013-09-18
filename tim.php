 <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
 <html>
   <head>
     <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
      <script src="./timeline/timeline_js/timeline-api.js?bundle=true" type="text/javascript"></script>
	<link rel="stylesheet" href="./timeline/timeline_js/timeline-bundle.css" type="text/css">
   </head>
<body onload="onLoad();" onresize="onResize();">
     ...


<div id="my-timeline" style="height: 150px; border: 1px solid #aaa"></div>
<noscript>
This page uses Javascript to show you a Timeline. Please enable Javascript in your browser to see the full page. Thank you.
</noscript>


   </body>
 </html>






<script>

 var tl;
 function onLoad() {
   var bandInfos = [
     Timeline.createBandInfo({
         width:          "70%", 
         intervalUnit:   Timeline.DateTime.MONTH, 
         intervalPixels: 100
     }),
     Timeline.createBandInfo({
         width:          "30%", 
         intervalUnit:   Timeline.DateTime.YEAR, 
         intervalPixels: 200
     })
   ];
   bandInfos[1].syncWith = 0;
   bandInfos[1].highlight = true;

   tl = Timeline.create(document.getElementById("my-timeline"), bandInfos);
 }

 var resizeTimerID = null;
 function onResize() {
     if (resizeTimerID == null) {
         resizeTimerID = window.setTimeout(function() {
             resizeTimerID = null;
             tl.layout();
         }, 500);
     }
 }

</script> tl.layout();
         }, 500);
     }
 }

</script>