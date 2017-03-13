$(document).ready(setup);


var msgModel=null;
function setup(){
	msgModel=$("#msgModel");
	$("#msgArea").on("keyup",checkLength);
	$("#send_msg" ).on("click",sendMessage);
	$("#checkMail").on("click",chkMsg);
	$("#getMail").on("click",getMail);
	//基於測試需求複寫此方法
	$("#checkMail").on("click",chkMsg);
	msg.checkNewMessage=function(){
		var obj={servType : "newMsg"};
		msg.showOnCheck(liar.fakeMailbox(obj));
	};
	
	msg.showOnCheck=function(resp){
		if(resp.result!=-1){
			$("#newMessage").html("amount"+resp.result.toString());
		}
	}
	
	msg.getMessage=function(){
			var req=new Object();
			req={
				user_id : 1,
				servType : "getMsg",
				rngStart : 0
				};
				//這邊未來要以callback的方式呼叫
			msg.showOnNewMessage(liar.fakeMailbox(req));
		
	}
	
	msg.sendMessage=function(msg){
		console.log("success");
		console.log(msg);
		msg.showOnMsgSent;
	}
	
	msg.showOnMsgSent=function(){
		$("responder5").html("傳送成功");
	}
	
	
}


msg.showOnCheck=function(chk){
	$("#new_msg").html(chk.result);	
}

msg.msgIdstr="msgId_";
msg.showOnNewMessage=function(msg){
	var msgs=msg.msgs;
	for(var i=0;i<msgs.length;i++){
		r=msgModel.clone(true);
		r.find(".nxx_msgTitle").html(msgs[i].msgTitle);
		r.find(".nxx_msgBody").html(msgs[i].msgBody);
		r.find(".nxx_msgId").html(msgs[i].msgId);
		r.find(".nxx_msgSender").html(msgs[i].sendId);
		r.find(".nxx_msgSenderNk").html(msgs[i].sendNk);
		r.find(".nxx_msgDate").html(msgs[i].msgDate);
		r.find(".nxx_msgRead").html(msgs[i].msgState);
		r.css("display","table-row");
		r.addClass("nxx_msg");
		r.prop("id","msgId_"+msgs[i].msgId.toString());
		r.appendTo("#msgBox");
	}
		
	
}

function checkLength(){
	msg.checkMsgLength(this);
	$("#responder4").html("message length :"+msg.msgLng);
	console.log(msg.msgLng);
}

function sendMessage(){
	var data=mem.extractCookie(mem.cookieKey);

	var message={
	sender: data.user_id,//寄件者id
	toUser :$("#mailto").val() ,//傳送對象
	title : $("#mesTitle").val() ,//訊息標題
	msg : $("#msgArea").val() ,//訊息本體
		
	};
		if(msg.chkMsgBody(message)){
			msg.sendMessage(message)
		}else{console.log("blank in neccesary field");}
	console.log(message);
		msg.sendMessage(message);
	
}


function chkMsg(){
	msg.checkNewMessage();
}

function getMail(){
	msg.getMessage();
}