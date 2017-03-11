$(document).ready(setup);


var msgModel=null;
function setup(){
	msgModel=$("#msgModel");
	msgModel.find("Input").click(reportDelete);
	$("#selectAll").on("click",onSelectAll);
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
	
	function reportDelete(){
		var msgId=$(this).siblings(".nxx_msgId").html();
		if(this.checked){
			msg.msgSelected.push(msgId);
		}
		else{
			msg.msgSelected.splice(msg.msgSelected.indexOf(msgId),1);
			}
		
	}
	
	function onSelectAll(event){
		var selection=$("[id^='msgId_']").find(".nxx_msgId").get();
		console.log("x:"+event.target.checked);
		console.log("y:"+this.checked)
		if(event.target.checked){
				msg.msgSelected=[];
				console.log("deleted");
		}
		else{
			for(var i=0;i<selection.length;i++){
					msg.msgSelected.push(selection[i].innerHTML);
					selection[i].checked=true;
				}
			console.log(msg.msgSelected);
			}

			
		
	}
	
	
}


msg.showOnCheck=function(chk){
	$("#new_msg").html(chk.result);	
}

msg.msgIdstr="msgId_";
msg.showOnNewMessage=function(message){
	var messages=message.msgs;
	for(var i=0;i<messages.length;i++){
		if(msg.msgRng[0]>messages[i].msgId){msg.msgRng[0]=messages[i].msgId;}
		if(msg.msgRng[1]<messages[i].msgId){msg.msgRng[1]=messages[i].msgId;}
		r=msgModel.clone(true);
		r.find(".nxx_msgTitle").html(messages[i].msgTitle);
		r.find(".nxx_msgBody").html(messages[i].msgBody);
		r.find(".nxx_msgId").html(messages[i].msgId);
		r.find(".nxx_msgSender").html(messages[i].sendId);
		r.find(".nxx_msgSenderNk").html(messages[i].sendNk);
		r.find(".nxx_msgDate").html(messages[i].msgDate);
		r.find(".nxx_msgRead").html(messages[i].msgState);
		r.css("display","block");
		r.addClass("nxx_msg");
		r.prop("id","msgId_"+messages[i].msgId.toString());
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