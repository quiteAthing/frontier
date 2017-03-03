


	
window.addEventListener("load",setup);


var c=undefined;

function setup(){
	var opts=new Object();
	opts.viewport={width : 144,height : 144 , type : "circle"};
	opts.showZoomer=false;
	c=new Croppie($("#cropArea")[0],opts);
	$("#setIMG").on("change",onImgSet);
	$("#getIMG").on("click",onImgCropped);
}


function onImgSet(event){
	var fr=new FileReader();
	fr.readAsDataURL(event.target.files[0]);
	fr.onload=function (e){
		var stuff=new Object();
		stuff.url=e.target.result;
		stuff.points=[200,200,400,400];
		stuff.orientation=1;
		c.bind(stuff);
	}
}

function onImgCropped(){
	var rAttr=new Object();
	rAttr.type="base64";
	rAttr.format="jpeg";	
	rAttr.size="viewport";	
	rAttr.quality=1;	
	rAttr.circle=true;	
	
	c.result(rAttr).then(function(rs){
		var img=new Image();
		img.src=rs;
		img.onload=putIn;
	});
}



 function putIn(){
	 console.log(this);
	var cns=document.getElementById("rst");
	var ctx=cns.getContext("2d");
	ctx.clearRect(0,0,cns.width,cns.height);
	ctx.beginPath();
	ctx.arc(72,72,cns.width/2.25,Math.PI*2,0, false);
	ctx.clip("evenodd");
	ctx.drawImage(this,0,0,144,144);

 }
 
 