/**
 * 
 */
 //iife

 (window.ss=function(){
		 var methods={
			 getDog : getDog,
			 shotBird : shotBird,
			 cat : "garfield",
			 shotDeer : shotDeer
		 }
		 
		 function getDog(){
			 console.log("dog");
			 console.log(this.cat);
		 }
		 
		 function shotBird(){
			 console.log("bird");
			 console.log(methods.cat);
			 console.log(this.cat);
			 
		 }
		 
		 function shotDeer(){
			 shoot();
		 }
		 
		 function shoot(){
			 console.log("correct");
		 }
		 
		 return methods;
	 }())
 

window.addEventListener("load",setup);

function setup(){
	var but=document.getElementById("service")
	but.addEventListener("click",function(){
		document.getElementById("responder").innerHTML=ss;
		ss.getDog();
	});
	
	function shoot(){
		console.log("warning");
		
	}
	
}



	