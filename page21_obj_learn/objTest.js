/**
 * 
 */
 //iife

 var ss=methodGenerate();
 
 
 function methodGenerate(){
	 var methods={
		 getDog : getDog,
		 shotBird : shotBird,
		 cat : "garfield"
	 }
	 
	 function getDog(){
		 console.log("dog");
		 console.log(this.cat);
	 }
	 
	 function shotBird(){
		 console.log("bird");
		 console.log(methods.cat);
		 
	 }
	 
	 return methods;
 }

window.addEventListener("load",setup);

function setup(){
	var but=document.getElementById("service")
	but.addEventListener("click",function(){
		document.getElementById("responder").innerHTML=ss;
		ss.getDog();
	});
}

	