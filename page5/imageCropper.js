

//全域變數-imageCropper
	//目標canvas的id，由於使用jquery請參考jquery的寫法
	var canvasName="#resizer";
	//切圓邊的圓半徑= canvas的寬或長(這邊是假設是正方形) / scale
	var scale=2.5;
	//預定承接 canvas.getContext(2d)
	var ctx=null;
//


 $(document).ready(function(){
	
	$('#btn1').on("change",loadIMG);
	spec=[$(canvasName)[0].width,$(canvasName)[0].height];
	ctx=$(canvasName)[0].getContext('2d');
	$("scaleInd").html("現在的圓圈半徑設定為寬的"+scale+"分之一");
	});
	
 
 
 function loadIMG(){
	 var fr=new FileReader();
	 fr.onload=putToCanvas;
	 fr.readAsDataURL($("#btn1")[0].files[0]);
 }
 
 
 function drawBackground(){
	 var canvas=$("#resizer")[0];
	 var context=canvas.getContext("2d");
	 context.fillStyle="#88aadd";
	 context.fillRect(0,0,canvas.width,canvas.height);
 }
 
 function putToCanvas(e){
	 var img=new Image();
	 img.src=e.target.result;
	 img.onload=putIn;
		
 }
 
 
 function putIn(){
	var specX=$(canvasName)[0].width;
	var specY=$(canvasName)[0].height;
	ctx.clearRect(0,0,specX,specY);
	 //調整大小後的圖片在畫布上要擺放的位置
	 var posi=[0,0];
	 var spec=[specX,specY];
	 //調整圖片大小跟位置
	 if(this.width>this.height){
		 spec[1]=Math.floor(this.height*(spec[0]/this.width));
		 posi[1]=Math.floor(spec[0]/2-spec[1]/2);	 
		 }
	 else if(this.width < this.height){
		spec[0]=Math.floor(this.width*(spec[1]/this.height));
		posi[0]=Math.floor(spec[1]/2-spec[0]/2);	 
	 }
	 
	ctx.beginPath();
	ctx.arc(specX/2,specY/2,Math.floor(specX/scale),Math.PI*2,0, false);
	ctx.clip("evenodd");
	
	ctx.drawImage(this,posi[0],posi[1],spec[0],spec[1]);

 }
 

 
 
 