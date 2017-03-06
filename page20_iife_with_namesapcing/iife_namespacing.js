/**
 * 
 */
 //iife
var ss=null;
(function (){
	ss=1;
	//window.ss="pig";
}
	
	
	

());

window.addEventListener("load",setup);

function setup(){
	var but=document.getElementById("service")
	but.addEventListener("click",function(){
		document.getElementById("responder").innerHTML=ss;
		console.log(ss);
	});
}

	