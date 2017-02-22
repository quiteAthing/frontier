




//jquery 建立連結
 $(document).ready(function(event){
	 
		
	$('#createCookie').on("click",createCookie);
	$('#viewCookie').on("click",viewCookie);
	$("#showDate").on("click",showDate);
	
	 
	 
 });
 
 
 function createCookie(){
	 document.cookie="sldnkwjekjfbsdljfbvlksj-qebrf5lkajsndlkfsdjblkj";
 }

 function viewCookie(){
	 console.log(document.cookie);
 }
 
 function showDate(){
	 
	 var min=1000*60;
	 var expiry=Date.now()+min*30;;
	 var e=new Date(expiry);
	 console.log(e.toUTCString());
	 var f=new Date(Date.now());
	 console.log("now  "+f.toUTCString());
 }