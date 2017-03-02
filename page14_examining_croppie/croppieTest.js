


	
window.addEventListener("load",setup);


var c=undefined;

function setup(){
	var opts=new Object();
	opts.viewport={width : 144,height : 144 , type : "circle"};
	opts.showZoomer=false;
	c=new Croppie($("#cropArea")[0],opts);
	$("#setIMG").on("change",onImgSet);
}


function onImgSet(event){
	var fr=new FileReader();
	fr.readAsDataURL(event.target.files[0]);
	fr.onload=function (e){
		var stuff=new Object();
		stuff.url=e.target.result;
		stuff.points=[0,0,0,0];
		stuff.orientation=1;
		c.bind(stuff);
	}
}