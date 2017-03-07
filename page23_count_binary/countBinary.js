/**
 * 
 */
window.addEventListener("load",setup);

var cmmt=null;
var rsp=null;
var rsp2=null;
var total=0;
function setup(){
	cmmt=document.getElementById("ta");
	cmmt.addEventListener("keyup",countLength);
	
	rsp=document.getElementById("responder");
	rsp2=document.getElementById("responder2");
	
	
	
	function countLength(event){
		var cmt=cmmt.value;
		var count=0;
		
		}
		if(event.keyCode>=37& event.keyCode<=40){
			console.log("prevent");
			return null;
		}

		for(var i=0;i< cmt.length;i++){
			if(cmt.charCodeAt(i)>127){
				count+=3;
			}else{
				count+=1;
			}
		}

		total+=count;
		rsp2.innerHTML=cmt.length;
		
		
	}
	
	
	
	
}

	
