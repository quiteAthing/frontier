

var red=new Object();
red.getColor=function(){
	console.log("red");
	cat();
	
	function cat(){
		console.log("red cat");
	}
}

function cat(){
	console.log("dog");
}