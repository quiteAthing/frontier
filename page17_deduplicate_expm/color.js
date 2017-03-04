

var color=new Object();
color.getColor=function(){
	console.log("color");
	this.cat();
}

color.cat=function (par){
	console.log("par-"+par+" -par")
	console.log("cat");
}