


$(document).ready(changeState);

function changeState(){
	//檢查是否登入過且未登出且cookie/session仍有效，若有，則顯示已登入畫面。
	if(checkLoggedIn())
	{
		sta=1;
		fetchUserData();
		initBackgroundTask();

		}
	initElement();
	//初始化背景作業，實際方法自backgroundTask.js
}
function loginNormal(){
	var accInfo=new Object();
	accInfo.type=c_lt_normal;
	accInfo.acc=$(field_ACC).val();
	accInfo.pw=$(fieldPW).val();
	getLoginInfo(accInfo,onLogIn);
}

function loginFb(){
	getLoginInfo(getFbInfo(),onLogIn);
}

//載入頁面時檢查是否有登入過且未登出之cookie，檢查完後return true或false
function checkLoggedIn(){
	//檢查cookie是否存在，若存在，向伺服器詢問，若伺服器回傳正常，回傳true
	//若不存在，回傳false。
	return false;
}

function initElement(){
		switch (sta){
		case 0:
			$(btn_login).on("click",loginNormal);
			$(btn_continueFB).on("click",loginFb);
			sta=1;
			break;
		case 1:
			$(btn_login).off("click",loginNormal);
			$(btn_continueFB).off("click",loginFb);
			$(btn_logout).on("click",onLogOut);
			sta=2;
			break;
		case 2:
		//這邊目前偷懶，很危險的寫法...
			sta=0;
			initElement();
			break;
	}
		console.log("asd"+sta);
	
 function doNothing(){
	 console.log("hahaha");
 }


	
}
	//成功登入後的處理
function onLogIn(success){
	if(success){
	initElement();
	fetchUserData();
	}
	else{
		onLogFailed();
		sta=0;
	}
}
	//登入失敗的處理，視狀況可能需要invalidate session/cookie之類的
function onLogFailed(){
	showLogFailed();
}


function onLogOut(){
	initElement();
	reload();
	//登出後重新載入葉面
}


function fetchUserData(){
	//實際運作的方法
	/*
	var xhr=new XMLHttpRequest();
	var data=null;
	xhr.onreadystatechange=function(){
		switch(xhr.readyState){
			case 1:xhr.send(info);break;
			case 4:
				if(xhr.status==200){
					showData(JSON.parse(xhr.responseText));
					}
				}
				else{
					showLogFailed();
				}
		};
	xhr.open("POST",base_url+service_addUdata,true);
	*/
	//測試用的假方法
	var data=extractCookie(jam_cookie_key);
	showData(data);
	
}


//重新載入頁面
function reload(){
	location.reload(true);
}

function extractCookie(key){
	var cookie=document.cookie;
	var dataSet=cookie.split(";");
	var result=undefined;
	for(var i=0;i<dataSet.length;i++){
		var dataPair=dataSet[i].split("=");
		dataPair[0]=dataPair[0].replace(" ","");
		if(dataPair[0]==key){
			result=JSON.parse(dataPair[1]);
			break;
		}
	}
		return result;
}
	





