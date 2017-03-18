
$(document).ready(setup_message);


function setup_message(){
	//設置相關監聽器
	$("#selectAll").on("click",msg.onSelectAll);
	$("#lastPage").on("click",msg.lastPage);
	$("#nextPage").on("click",msg.nextPage);
	$("#deleteMsg").on("click",msg.deleteMsg);
	$("#mail-del-all").on("click",onSelectAll);
	$("#msgArea").on("keyup",checkLength);
	$("#send_msg" ).on("click",sendMessage);
	
	$("#mail-del-all").prop("checked",false);
	//把方法放全域變數中方便取用。
	msg.showNewMessage=function(message){
			var msgModel=$("#msgModel");
			var messages=message.msgs;
			msgModel.find(".mail-td-delete").click(onSelectOne);
			msg.totalInbox=message.result;
				for(var i=0;i<messages.length;i++){
					if(msg.msgRng[0]>messages[i].msgId){msg.msgRng[0]=messages[i].msgId;}
					if(msg.msgRng[1]<messages[i].msgId){msg.msgRng[1]=messages[i].msgId;}
					msg.msgAll.push(messages[i].msgId);
					r=msgModel.clone(true);
					msg.msgLocal+=1;
					$(r).find(":checkbox").prop("checked",false);
					r.find(".nxx_msgTitle").html(messages[i].msgTitle);
					r.find(".nxx_msgBody").html(messages[i].msgBody);
					r.find(".nxx_msgId").html(messages[i].msgId);
					r.find(".nxx_msgSender").html(messages[i].sendId);
					r.find(".nxx_msgSenderNk").html(messages[i].sendNk);
					r.find(".nxx_msgDate").html(messages[i].msgDate);
					r.find(".nxx_msgRead").html(messages[i].msgState);
					r.css("display","none");
					r.addClass("nxx_msg");
					r.attr("value","onHidden");
					$(".nxx_pages").html(Math.ceil(i/10));
					r.prop("id",msg.idStr+messages[i].msgId.toString());
					r.appendTo("#msgBox");
					
				}
				
				msg.msgOnScr();
				
			
		};
		
	//檢查登入狀況並取得信件
	stater.checkState(onLoggedIn,onLoggedOut);
	
	
	
	function onLoggedIn(){
		bgts.activateBgt(30000,[getMsgEveryTYsec]);
				function getMsgEveryTYsec(){
					msg.checkNewMessage(function(resp){
						console.log(resp);
						if(resp.result<0){
							$("#msgNum").html("ds");
							console.log(resp);
						}else{
							$("#msgNum").html(resp.result);
							console.log(resp);
							}
					});				
				}
		msg.getMessage(msg.showNewMessage);		
	}
	
	function onLoggedOut(){
		bgts.deActivateBgts();
		alert("您尚未登入");
		window.location="index.html";
	}
	
	function checkLength(){
		msg.checkMsgLength(this);
		$("#msg_length").html("訊息長度 : "+msg.msgLng+" /3000 ");

	}
	
	function sendMessage(){
		var data=kie.getCookieJson(mem.cookieKey);

		var message={
			sender: data.user_id,//寄件者id
			toUser :$("#mailto").html() ,//傳送對象
			title : $("#mesTitle").html() ,//訊息標題
			msg : $("#msgArea").val() ,//訊息本體
			
		};
			if(msg.chkMsgBody(message)){
				msg.sendMessage(message)
			}else{console.log("blank in neccesary field");}
				console.log(message);
				msg.sendMessage(message);
		
	}
	
		
	function onSelectOne(event){
		var tgt=$(event.target).siblings(".nxx_msgId").html();
		if(!event.target.checked){
			msg.msgSelected.splice(msg.msgSelected.indexOf(tgt),1);
		}
		else{
		msg.msgSelected.push($(event.target).siblings(".nxx_msgId").html());
		}
		
	}
	
	function onSelectAll(event){
		var selection=$("[value='onDisplay']").find(".nxx_msgId").toArray();
		if(!event.target.checked){
				for(var i=0;i<selection.length;i++){
				var msgr="#"+msg.idStr+selection[i].innerHTML;
				$(msgr).find(":checkbox").attr("checked",false);
				}
				msg.msgSelected=[];
		}
		else{
			for(var i=0;i<selection.length;i++){
				var msgr="#"+msg.idStr+selection[i].innerHTML;
				$(msgr).find(":checkbox").attr("checked",true);
				msg.msgSelected.push(selection[i].innerHTML);
				}
			}

			
		
	}
	
	
	
	

	
}