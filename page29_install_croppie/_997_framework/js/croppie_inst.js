

//這個腳本是專為member.html撰寫，沒有考慮移植性。


var cropper=undefined;

$(document).ready(setup);

function setup(){
		$("#update-member-pic").on("change",startCroppie);
		$("#crop").on("click",endCroppie);
	
		function setupCroppie(){
				var opts={
					viewport : {width : 140,height : 140 , type : "circle"},
					showZommer :true
				}
				 cropper=new Croppie($("#cropArea")[0],opts);
				 

			
		}
	


		function startCroppie(event){
				setupCroppie();
				console.log("on");
				$("#cropArea").css("display","block");
				fr=new FileReader();
				fr.onload=function(e){
					var pic={
						url : e.target.result,
						points : [200,200,400,400],
						orientation : 1
					};
					cropper.bind(pic);
				};
				fr.readAsDataURL(event.target.files[0]);
		}


		function endCroppie(){
				console.log("no");
				var opts={
					type : "base64",
					format :"jpeg",
					size : "viewport",
					quality :1,
					circle : true
					}
				cropper.result(opts).then(function(e){
				var img=new Image();
				img.src=e;
				img.onload=function(){
				var cns=$("#cropboard")[0];
				var ctx=cns.getContext("2d");
				ctx.clearRect(0,0,cns.width,cns.height);
				ctx.beginPath();
				ctx.arc(70,70,cns.width/2.25,Math.PI*2,0, false);
				ctx.clip("evenodd");
				ctx.drawImage(this,0,0,140,140);
				var rst=cns.toDataURL();
				$("#member-pic").attr("src",rst);
				$("#update-member-pic").attr("src",rst);
				cropper.destroy();
					}
				});
				$("#cropArea").css("display","none");
			}
	
	
	
	
}

