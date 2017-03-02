

var dummyresult="";



//jquery 建立連結
 $(document).ready(function(event){
	 
		
	$('#jamLoginNormal').on("click",loginNormal);
	$('#jamLoginFB').on("click",loginFB)
	$("[name='loginSuccess']").on("change",showValue);
	 
	 
 });
 
 
 
 
 function loginNormal(){
		var str=$('#jamACC').val()+$('#jamPW').val();
		$("#responder").html(str);
		
		var info= new Object();
		info.userName=$("#jamACC").val();
		info.userPwd=$("#jamPW").val();
		getAccIden("normal",JSON.stringify(info),responseNormal);
		
 }
 


 function changeDummyResult(){
	 dummyresult="&dummyResult="+this.value;
 }
 
 function getAccIden(type,jsonData,responseFunction){
	
	 var callURL=loginURL+"?type="+type+dummyResult;
	 console.log("callURL   "+callURL);
	 var xhr=new XMLHttpRequest();

		xhr.onreadystatechange=function(){
		 console.log("sta"+this.readyState);
		if(xhr.readyState==1){xhr.send(jsonData);}
	 if(xhr.readyState==4&&xhr.status==200){
		responseFunction(JSON.stringify(xhr.responseText));
		}
	 };			 
		 xhr.open("post",callURL,true);
 }

 function responseNormal(data){
	 console.log("normal response"+data);
 }
 
 function responseFB(data){
	 console.log("FB response"+data);
 }
 
 function responseFBfailed(){
	 $("#responderFB").html("fb login failed");
 }
 
 
 
 function loginFB(){
			 
	 var fbLog=getLogin();
	 if(fbLog!="connected"){
		 FB.login(function(response){
			 var data=new Object();
			 data.fbID=response.authResponse.id;
			 console.log(data.fbID);
			 getAccIden("FB",data,responseFB);
		 });
	 }else{
		console.log("else");
	 }
 }
 
 
 
 function getLogin(){
 	 var sta="";
	FB.getLoginStatus(function(response){
	 sta=response.status
	});
	console.log("sta   d : "+sta);
	return sta;
 }
 
 
 
 
 
 
 
 
 


	
