<script type="text/javascript">$(document).ready(jsDoFirst); </script>

 <label>�����
    <input id="form_search" type="text" name="textfield">
 </label>    <div id=ready></div>
<!-- <img id="box_delete" src="images/box_delete.png" width="100" style="visibility:hidden"> -->
 <table border=1 id="show_forms" class="TABLE_2">
 </table>

<script id="movieTemplateHeader" type="text/x-jquery-tmpl">
   <tr >
	 <th width="20px"  >�������</td>
	 <th width="30px"  >������</td>
         <th width="160px" >����� </td>	 
	 <th width="750px" width="300">������ �������� �����</td>
	 <th width="30px"  >�����</td>
	 <th width="30px"  >�������� � ������ ������</td>
 	 <th width="30px"  >����������_���</td>
 	 <th width="30px"  >��������</td>
	 <th width="350px" >����� ����������</td>
	 <th width="200px" >����������</td>
	 <th width="350px" >���� ������ �����</td>
 	 <th width="350px" >�����������</td>
	 
     <td width="30px"  id="f_order">order</td>
     <td width="30px"  id="f_order">id</td>
   </tr>
</script>



<script id="movieTemplate" type="text/x-jquery-tmpl">
   <tr >
	 <td width="20px"  >${f_line}</td>
	 <td width="30px"  >${f_department}</td>
         <td width="160px" ><b>${f_short_name}</b></td>	 
	 <td width="750px" width="300">${f_name}</td>
	 <td width="30px"  >${f_creation_asetd}</td>
	 <td width="30px"  >${f_creation_asetd_}</td>
 	 <td width="30px"  >${f_arm_name}</td>
 	 <td width="30px"  >${f_1}</td>
	 <td width="350px" >${f_input_rate}</td>
	 <td width="200px" >
	 <a href=http://www.icc.surw.rzd/projects/as_etd/form/${f_instruction}>${f_instruction}</a></td>
	 <td width="350px" >${f_claim_name}</td>
 	 <td width="350px" >${f_comment}</td>

     <td width="30px"  id="f_order">${f_order}</td>
     <td width="30px"  id="f_order">${id}</td>	

   </tr>
</script>






