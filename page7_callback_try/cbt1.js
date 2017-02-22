/**
 * 
 */

var a=0;
 $(document).ready(function(event){
	 
	$('#btn1').on("click",initial);

	 
 });
 
 function initial(content){
	 console.log(content);
	 if(content instanceof Event){
		a+=1;
		console.log("a = "+a);
		 console.log("callback success"+content);
	 }
	 else{
		 callbackTry(initial);
		 
	 }
	 
 }
 
 function callbackTry(callback){
		callback("this is a callback from function callbacktry");
	 
 }
 
 


	
