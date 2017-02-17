




//jquery 建立連結
 $(document).ready(function(event){
	 
		
	$('#jamLoginNormal').on("click",testPW);
	$('#jamLoginFB').on("click",getFbLogin)
	 
	 
 });
 
 
 function testPW(event){
		var str=$('#jamACC').val()+$('#jamPW').val();
		$("#responder").html(str); 
 }
 
 //像伺服器取得資訊的方法A
 //因為可能用BCD所以先加個A來保留
 function getAccIden(){
	 
 }
 
 
 //fb使用的方法
 function getFbLogin(){
		console.log(FB);
 }
 
 
 
 
 
 
 
 
 


	
