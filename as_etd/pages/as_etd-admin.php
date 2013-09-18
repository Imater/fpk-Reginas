<script type="text/javascript">$(document).ready(jsDoFirst); </script>
 
 <label>Поиск <input id="form_search" type="text" name="textfield"></label>  
          <IMG id="wait" SRC="images/wait.gif" height=25>


<!-- <img id="box_delete" src="images/box_delete.png" width="100" style="visibility:hidden"> -->
 <table border=1 id="show_forms" class="TABLE_2">
 </table>

<script id="movieTemplateHeader" type="text/x-jquery-tmpl">
   <tr id="${id}">
	 <th width="20px"  id="f_line">Очередь</td>
	 <th width="30px"  id="f_department">Служба</td>
         <th width="160px" id="f_short_name"> Форма </td>	 
	 <th width="750px" id="f_name" width="300">Полное название формы</td>
	 <th width="30px"  id="f_creation_asetd">АСЭТД</td>
	 <th width="30px"  id="f_creation_asetd_">Создание в ручном режиме</td>
 	 <th width="30px"  id="f_arm_name">отраслевой_АРМ</td>
 	 <th width="30px"  id="f_1">Передача</td>
	 <th width="350px" id="f_input_rate">Нормы заполнения</td>
	 <th width="200px" id="f_instruction">Инструкция и тех.задания (TZ)</td>
	 <th width="350px" id="f_claim_name">Роли данной формы</td>
 	 <th width="350px" id="f_comment">Комментарий</td>
	 
     <td width="30px"  id="f_order">order</td>
     <td width="30px"  id="f_order">id</td>
   </tr>
</script>



<script id="movieTemplate" type="text/x-jquery-tmpl">
   <tr id="${id}">
	 <td width="20px"  id="f_line">${f_line}</td>
	 <td width="30px"  id="f_department">${f_department}</td>
         <td width="160px" id="f_short_name"><b>${f_short_name}</b></td>	 
	 <td width="750px" id="f_name" width="300">${f_name}</td>
	 <td width="30px"  id="f_creation_asetd">${f_creation_asetd}</td>
	 <td width="30px"  id="f_creation_asetd_">${f_creation_asetd_}</td>
 	 <td width="30px"  id="f_arm_name">${f_arm_name}</td>
 	 <td width="30px"  id="f_1">${f_1}</td>
	 <td width="350px" id="f_input_rate">${f_input_rate}</td>
	 <td width="200px" id="f_instruction">
	 <a href=http://www.icc.surw.rzd/projects/as_etd/form/${f_instruction}>${f_instruction}</a></td>
	 <td width="350px" id="f_claim_name">${f_claim_name}</td>
 	 <td width="350px" id="f_comment">${f_comment}</td>

     <td width="30px"  id="f_order">${f_order}</td>
     <td width="30px"  id="f_order">${id}</td>	

   </tr>
</script>
