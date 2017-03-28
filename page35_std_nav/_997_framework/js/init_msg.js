
$(document).ready(init_message);


function init_message(){
	stater.checkState(onLoggedIn,onLoggedOut);

	function onLoggedOut(){
		alert("you are not logged in");
		kie.cleanCookie(jam_cookie_key);
		sessionStorage.clear();
		localStorage.clear();
		//window.location="index.html";
	}
	
	function onLoggedIn(){
		setup_nav();
		setup_msg();
		}
}


function setup_msg(){
	//設置相關監聽器
	$("#selectAll").on("click",msg.onSelectAll);
	$("#lastPage").on("click",msg.lastPage);
	$("#nextPage").on("click",msg.nextPage);
	$("#deleteMsg").on("click",msg.deleteMsg);
	$("#mail-del-all").on("click",onSelectAll);
	$("#msgArea").on("keyup",checkLength);
	$("#send_msg" ).on("click",sendMessage);
	$("#mail-del-all").prop("checked",false);
	$("#deleteThisMsg").click(deleteOnRead);
	$("#fastReply").click(onFastReply);
	$("#return-to-mailbox-list-btn").click(hideMessage);
	$("#mail-reply-content").on("keyup",checkLength);
	
	function deleteOnRead(ev){
		msg.deleteCurMsg($(ev.target).siblings(".nxx_msgId").html());
		hideMessage();
	}
	
	function onFastReply(ev){
		//檢查完所有內容後送出。
		var msgId="#msg_Id"+$(ev.target).siblings(".nxx_msgId").html();
		var rMsg={
			title : "Re :"+$(msgId).find(".nxx_msgId").html(),
			toUser : $(msgId).find(".nxx_msgSender").html(),
			msg : $("#mail-reply-content").val()
		}
		if(msg.chkMsgBody(rMsg)){
			msg.sendMessage(rMsg,function(resp){
			console.log(resp);
			});
			console.log("sent   "+resp)
		}else{
			console.log("problem2");
		}
		
		
	}
	
	function hideMessage(){
			$('.mailbox-list-wrapper').show();
			$('.mailbox-content-wrapper').hide();
		}

	
	var msgModel=$("#msgModel");
	msgModel.find(":checkbox").on("change",onSelectOne);
	msgModel.children().not(".mail-td-delete").click(showMessage);
	
	
	
	function showMessage(ev){
		msg.msgLng=0;
		$('.mailbox-list-wrapper').hide();
        $('.mailbox-content-wrapper').show();
		var panel=$("#msgContent");
		var src=$(ev.target).parent();
		console.log(src);
		//panel.find(".nxx_msgTitle").html(src.find(".nxx_msgTitle").html());
		panel.find(".nxx_msgTitle").html(src.find(".nxx_msgTitle").html());
		panel.find(".nxx_msgId").html(src.find(".nxx_msgId").html());
		panel.find(".nxx_msgSenderNk").html(src.find(".nxx_msgSenderNk").html());
		panel.find(".nxx_msgBody").html(src.find(".nxx_msgBody").html());
		panel.find(".nxx_msgDate").html(src.find(".nxx_msgDate").html());
		
    };
	
	//把方法放全域變數中方便取用。
	msg.showNewMessage=function(message){
			var messages=message.msgs;
			
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
	
	function checkLength(){
		msg.checkMsgLength(this);
		console.log("訊息長度 : "+msg.msgLng+" /3000 ");

	}
	
	function sendMessage(){
		var data=kie.getCookieJson(mem.cookieKey);

		var message={
			sender: data.user_id,//寄件者id
			toUser :$("#mailto").html() ,//傳送對象
			title : $("#mesTitle").html() ,//訊息標題
			msg : $("#msgArea").val() //訊息本體
			
		};
			if(msg.chkMsgBody(message)){
				msg.sendMessage(message)
			}else{
				console.log("problem");
			}

		
	}
	
		
	function onSelectOne(event){
		var tgt=$(event.target).parent().find(".nxx_msgId").html();
		
		console.log(tgt);
		console.log($(event.target).parent());
		if(!event.target.checked){
			msg.msgSelected.splice(msg.msgSelected.indexOf(tgt),1);
		}
		else{
			msg.msgSelected.push(tgt);
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