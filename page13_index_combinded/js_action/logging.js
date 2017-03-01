

function getFbInfo(){
	//FB登入相關程序
	var fbUinfo=new Object();

	//實際運作的方法，需要被放置在伺服器上才能運作
	/*
		FB.getLoginStatus(function(response) {
		if (response.status === 'connected') {
			fbUinfo.fbUID = response.authResponse.userID;
		} else if (response.status === 'not_authorized') {
			//如果FB用戶沒有授權這個app，則請求授權
			FB.login(function(response){
				getFbInfo();
				});
		} else {
			如果FB用戶沒有同意，設定fbUinfo=null;
			fbUinfo=null;
			}
		});
	*/	
	//測試用的方法，沒在伺服器上時使用此處。
	if(dummyResponse(true)){
		fbUinfo.fbUid="fake facebook userID";
		fbUinfo.type=c_lt_fb;
	}else{
		fbUinfo=null;
		}
	
	return fbUinfo;
}

//info:用來傳遞資料參數的物件，cbf="c"all"b"ack"f"unction
function getLoginInfo(info,cbf){
	switch(info.type){
		case c_lt_normal:
			info.param=c_lt_normal;
			jamLogin(info,cbf);break;
		case c_lt_fb:jamLogin(getFbInfo(),cbf);break;
		default: alert("你是不是哪邊打錯了 \n from setLoginInfo");break;
	}
	
}
	//實際login到jam中
function jamLogin(info,cbf){
	
	//送出一個xhr到jam的伺服器，然後等待回應
	//實際運作內容，沒有在伺服器上時請註解
	/*
	
	var xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function(){
		switch(xhr.readyState){
			case 1:xhr.send(info);break;
			case 4:
				if(xhr.status==200){
					var resp=xhr.responseText;
					var info=JSON.parse(resp);
					if(info["loginSuccess"]){
						document.cookie=getCookieString(jam_cookie_key,resp);
						cbf(true);
					}
				}
				else{
					cbf(false);
				}
			
		}
	}
	if(info!=null){
		xhr.open("POST",base_url+service_login,true);
	}
	else{
		cbf(false);
		}

	*/

	//測試用內容，沒有在伺服器上時使用下方
	if(dummyResponse(true)){
		//把假資料寫進cookie
		document.cookie=getCookieString(jam_cookie_key,JSON.stringify(dummyUinfo()));
		cbf(true);
	}
	
}

