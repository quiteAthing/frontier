//這個網站的背景作業

//系統參數區
var msgChkFrequent=30*1000;
//全域變數
var masterInterval=new Object();


function initBackgroundTask(){
	masterInterval.checkMsgInterval=setInterval(checkMessageBox,msgChkFrequent);
}

function disableInterval(){
	clearInterval(masterInterval.checkMsgInterval);
}




function checkMessageBox(){
	console.log("checking messages");
	
		//如果有新訊息，更新顯示的內容
		onNewMessage(message);
}
