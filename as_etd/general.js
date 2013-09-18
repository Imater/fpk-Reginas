/* By ilovecolors.com.ar
 * http://www.ilovecolors.com.ar/using-cookies-jquery/
 *
 */

jQuery(document).ready(function(){

	var cookieName = 'level';
	var cookieOptions = {expires: 7, path: '/'};
	
	$("#verbose").val("");
	$("#" + $.cookie(cookieName)).addClass("selected");

	$(".htabs a").click(function(e){
		e.preventDefault();
		$("#" + $.cookie(cookieName)).removeClass("selected");
		$.cookie(cookieName, $(this).attr("id"), cookieOptions);
		$("#" + $.cookie(cookieName)).addClass("selected");
	});
	
	$("#showCookie").click(function(e){
		e.preventDefault();
		$("#verbose").val("�������� ����: " + $.cookie(cookieName) + ".");
	});
	
	$("#deleteCookie").click(function(e){
		e.preventDefault();
		$("#verbose").val("���� 'level' �� ��������� \"" + $.cookie(cookieName) + "\" �������.");
		$("#" + $.cookie(cookieName)).removeClass("selected");
		$.cookie(cookieName, null, {path:'/'});
	});
});