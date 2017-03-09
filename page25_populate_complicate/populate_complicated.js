/**
 * 
 */

 
 var msgCount=0;
 var msgid="msgs_";
 
var pp=function(){
	var methods={
		duplicate :duplicate, //複製一個既存標籤並放入某個div裡
		init :init,//手動製造事件
		pmsg :pmsg //模擬將訊息放入
	}
	
	function duplicate(){
		cid($("#msgModel").clone(true)).appendTo("#msgBox");
		
	}
	
	
	function init(){
			var s=document.getElementById("msgBox");
			$(s).click(function(){console.log("dfg");});
			//s[0].addEventListener("click",function(){console.log("sdf")});
	}
	

	//populate message
	function pmsg(msg){
		var r=$("#msgModel").clone(true)
		r.find(".nxx_msgTitle").html(msg.msgTitle);
		r.find(".nxx_msgBody").html(msg.msgBody);
		r.find(".nxx_msgId").html(msg.msgId);
		r.find(".nxx_msgSender").html(msg.sendId);
		r.find(".nxx_msgSenderNk").html(msg.sendNk);
		r.find(".nxx_msgDate").html(msg.msgDate);
		r.find(".nxx_msgRead").html(msg.msgState);
		r.css("display","block");
		cid(r).appendTo("#msgBox");
		
	}
	
	return methods;
	
	
}();

var tmsg={
	sendId :"a123",
	sendNk :"bJohn",
	msgBody :"cHello msg system",
	msgDate :"d1999 10 23",
	msgState :"e0",
	msgTitle :"fI want to discuss",
	msgId :"g2"
	
}
 
 


	
