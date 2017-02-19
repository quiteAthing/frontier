




//jquery 建立連結
 $(document).ready(function(event){
	 
		
	$('#jamLoginNormal').on("click",testPW);
	$('#jamLoginFB').on("click",getFbLogin)
	 
	 
 });
 
 var isWaiting=false;
 
 function testPW(event){
		var str=$('#jamACC').val()+$('#jamPW').val();
		$("#responder").html(str);
		
		var info= new Object();
		info.userName=$("#jamACC").val();
		info.userPwd=$("#jamPW").val();
		getAccIden("normal",JSON.stringify(info));
		
 }
 
 function getAccIden(type,jsonData){
	 var callURL=loginURL+"?type="+type;
	 console.log("callURL   "+callURL);
	 var xhr=new XMLHttpRequest();

		xhr.onreadystatechange=function(){
		 console.log("sta"+this.readyState);
		if(xhr.readyState==1){xhr.send(jsonData);}
	 if(xhr.readyState==4&&xhr.status==200){console.log("receive : "+xhr.responseText);}
	 };			 
		 xhr.open("post",callURL,true);
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
	 isWaitng=!isWaiting;
	 if(isWaiting){
	 $("#indicator").html("正在檢查帳號狀態");
	 }else{
		 $("#indicator").html("檢查完成");
	 }
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
 
 
 
 
 
 
 
 
 


	
