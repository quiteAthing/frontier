




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
	 console.log(loginFbURL);
	 /* 
	 var fbLog=getLogin();
	 if(fbLog=="connected"||fbLog=="not_authorized"){
		 FB.login(function(response){
			 showIsCheck();
			 getOneClickUser(response.authResponse.userID);
		 });
	 }
 */		
 }
 
 function showIsCheck(){
	 $("#indicator").html("正在檢查帳號狀態");
 }

 
 function getOneClickUser(fbUid){
/* 	 	$.ajax(
			{url: loginURL, 
			success: function(result){  
				var jsonResult=JSON.parse(result);
				if(jsonResult.get("suceess")=="success"){
					func1();
				}else{
					func2();
				}
			  },
			data:{"fbID",fbUid},
			type:"POST"}
			); */
	 
 }
 
 
 function getLogin(){
/* 	 var sta="";
	FB.getLoginStatus(function(response){
	 status=response.status
	});
	return sta; */
 }
 
 
 
 
 
 
 
 
 


	
