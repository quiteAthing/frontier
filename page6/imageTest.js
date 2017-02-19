/**
 * 
 */


 $(document).ready(function(event){
	 
	$('#btn1').on("change",loadIMG);
	});
 
 
 function loadIMG(event){
	 var img=document.getElementById("testImg");
	 var fr=new FileReader();
	 var file=document.getElementById("btn1").files[0];
	 fr.readAsDataURL(file);
	 fr.addEventListener("load",function(){
		 img.src=fr.result;
	 },false);
	 
	 
	 
	 
 }