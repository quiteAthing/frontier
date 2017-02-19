/**
 * 
 */


 $(document).ready(function(event){
	 
	$('#btn1').on("click",jsonSend);
	});
 
 function jsonSend(){
	 console.log("ok");
	 var callURL=loginURL+"?type=normal"
	 var xhr=new XMLHttpRequest();
	 xhr.onreadystatechange=sendLogin;
	 xhr.open("post",callURL,true);
	 
 }
 
 function sendLogin(response){
	 console.log("sd"+this.readyState);
	 if(this.readyState==1)
	 {
		this.send("hello");
		console.log("sen");
	 }
	 
	 if(this.readyState==4 && this.status ==200)
	 {
		 console.log("ssss"+this.responseText);
	 }
	 
 }
 


	
