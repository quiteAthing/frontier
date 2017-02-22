




//jquery 建立連結
 $(document).ready(function(event){
	 
		
	$('#jamLoginNormal').on("click",loginNormal);
	$('#jamLoginFB').on("click",loginFB);
	 
	 
 });
 
 var isWaiting=false;
 
 function loginNormal(){
	 
		var str=$('#jamACC').val()+$('#jamPW').val();
		$("#responder").html(str);
		
		var info= new Object();
		info.userName=$("#jamACC").val();
		info.userPwd=$("#jamPW").val();
		getAccIden("normal",JSON.stringify(info));
		
 }
 
 function getAccIden(type,jsonData){
	 var callURL=loginURL+"?type="+type+"&dummyResult="+$("#dummySta").is(":checked");
	 console.log("callURL   "+callURL);
	 var xhr=new XMLHttpRequest();

		xhr.onreadystatechange=function(){
		 console.log("sta"+this.readyState);
		if(this.readyState==1){this.send(jsonData);}
	 if(this.readyState==4&&xhr.status==200){
		 var resp=JSON.parse(this.responseText);
		 $("#responder").html(resp["logStatus"]);
		 console.log("receive : "+xhr.responseText);}
	 };			 
		 xhr.open("post",callURL,true);
 }

 
 
 
 //fb使用的方法
 function loginFB(){
	 var data=new Object();
	 data.fbID="123456789";
	 getAccIden("FB",JSON.stringify(data));
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
 
 
 
 
 
 
 
 
 


	
