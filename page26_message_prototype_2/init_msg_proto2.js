$(document).ready(setup);


var msgModel=null;
var currentPage=0;
function setup(){
	msgModel=$("#msgModel");
	msgModel.find(".nxx_msgSelected").change(onSelectOne);
	$("#selectAll").on("click",onSelectAll);
	$(".nxx_pagecontrol").on("click",swapPage);
	$("#deleteMail").on("click",deleteMsg);
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
				rngStart : msg.msgRng[1]
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
	
	function deleteMsg(){
		var amtSelected=msg.msgSelected.length;
		if(msg.msgSelected.length==0){
			console.log("nothing to delete");
			return null;
		}
		if(confirm("確定刪除所選訊息?")){
				for(var r=0;r<amtSelected;r++){
				var msgId="#msgId_"+msg.msgSelected[r];
				$(msgId).remove();
				msg.msgSelected.splice(r,1);
			}
			
		}
		msgOnScreen();
		
		

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
	
	function onSelectOne(event){
		var tgt=$(this).siblings(".nxx_msgId").html();
		if(!event.target.checked){
			msg.msgSelected.splice(msg.msgSelected.indexOf(tgt),1);
			console.log("del : "+msg.msgSelected);
		}
		else{
		msg.msgSelected.push($(this).siblings(".nxx_msgId").html());
		console.log("add : "+msg.msgSelected);
		}
		
	}
	
	
}


msg.showOnCheck=function(chk){
	$("#new_msg").html(chk.result);	
}

msg.msgIdstr="msgId_";
msg.showOnNewMessage=function(message){
	var messages=message.msgs;
	msg.totalInbox=message.result;
	for(var i=0;i<messages.length;i++){
		if(msg.msgRng[0]>messages[i].msgId){msg.msgRng[0]=messages[i].msgId;}
		if(msg.msgRng[1]<messages[i].msgId){msg.msgRng[1]=messages[i].msgId;}
		msg.msgAll.push(messages[i].msgId);
		r=msgModel.clone(true);
		
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
		r.prop("id","msgId_"+messages[i].msgId.toString());
		r.appendTo("#msgBox");
		
	}
	msgOnScreen()
	
	

		
	
}

	function msgOnScreen(){
		var onScr=$(".nxx_msg[value=onDisplay]").length;
		var onHid=$(".nxx_msg[value=onHidden]").toArray();
		var count=10-onScr;
		var page=0;
			//把抓回來，需要顯示出來的訊息設成可見
		if(onScr==0 || onScr<10){
			for(var p=0;p<count;p++){
				console.log("asvs");
				$(onHid[p]).css("display","block");
				$(onHid[p]).attr("value","onPage");
				$(onHid[p]).attr("value","onDisplay");
			}		
		}
		//把抓回來，不需要顯示出來的訊息設成不可見
		/*for(var k=onScr;k<count;k++){
			console.log("poaaa");
			$(onHid[k]).attr("value","onHidden");
		}*/
	}


function deleteMsg(){
	//刪除訊息
	for(var i=0;i<msg.msgSelected;i++){
		var id="#msgId_"+msg.msgSelected[i];
		$(id).remove();
		var tgt=msg.msgAll.indexOf(msg.msgSelected[i])
		msg.msgAll.splice(tgt,1);
		mag.totalInbox-1;
	}
	msgOnScreen();
	
	
	
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


function swapPage(event){

	switch(event.target.value){
			case "上一頁":lastPage();break;
			case "下一頁":nextPage();break;
	}
	
	function nextPage(){
		var onScr=$(".nxx_msg[value=onDisplay]").toArray();
		var seek=parseInt($(onScr[onScr.length-1]).find(".nxx_msgId").html());
		var start=msg.msgAll.indexOf(seek);
		console.log("ss "+start);
		var limit=msg.msgAll.length-start-1;
		if(limit>10){limit=10;}
		if(limit==0){
			console.log("nomore");return;
		}
		for(var g=0;g<onScr.length;g++){
			$(onScr[g]).css("display","none");
			$(onScr[g]).attr("value","onHidden");			
		}
		var st=start+limit;
		for(var i=start;i<=st;i++){
				var msgId="#msgId_"+msg.msgAll[i];
				$(msgId).css("display","block");
				$(msgId).attr("value","onDisplay");
				
		}
		
		
		
	}
	function lastPage(){
		var onScr=$(".nxx_msg[value=onDisplay]").toArray();
		var seek=parseInt($(onScr[0]).find(".nxx_msgId").html());
		var start=msg.msgAll.indexOf(seek);
		var stop=0;
		if(start==0){console.log("return"); return;}
		if(start-10>0){
			stop=start-10;
		}else{
			stop=-1;
		}
		
		
		for(var g=0;g<onScr.length;g++){
			$(onScr[g]).css("display","none");
			$(onScr[g]).attr("value","onHidden");			
		}
		for(var q=start;q>stop;q--){
			var msgId="#msgId_"+msg.msgAll[q];
			$(msgId).css("display","block");
			$(msgId).attr("value","onDisplay");
		}
		
	}
	
	
}



