function setup(){$.getScript("/dummyServer.js"),$.getScript("/initFB.js"),$.getScript("/onDisplayInfo.js"),$.getScript("/backgroundTasks.js"),$.getScript("/frequebtUsedMthods.js"),$.getScript("/logging.js"),changeState()}function changeState(){checkLoggedIn()&&(sta=1,fetchUserData(),initBackgroundTask()),initElement()}function loginNormal(){console.log("asd");var e=new Object;e.type=c_lt_normal,e.acc=$(field_ACC).val(),e.pw=$(fieldPW).val(),console.log(e.pw),getLoginInfo(e,onLogIn)}function loginFb(){getLoginInfo(getFbInfo(),onLogIn)}function checkLoggedIn(){return!0}function initElement(){switch(sta){case 0:$(btn_login).on("click",loginNormal),$(btn_continueFB).on("click",loginFb),sta=1;break;case 1:$(btn_login).off("click",loginNormal),$(btn_continueFB).off("click",loginFb),$(btn_logout).on("click",onLogOut),sta=2;break;case 2:sta=0,initElement()}console.log("asd"+sta)}function onLogIn(e){e?(initElement(),fetchUserData()):(onLogFailed(),sta=0)}function onLogFailed(){showLogFailed()}function onLogOut(){initElement(),reload()}function fetchUserData(){var e=extractCookie(jam_cookie_key);showData(e)}function reload(){}function eraseData(){$("#statusMonitor").text("你登出了")}function extractCookie(e){for(var n=document.cookie,t=n.split(";"),o=void 0,i=0;i<t.length;i++){var a=t[i].split("=");if(a[0]=a[0].replace(" ",""),a[0]==e){o=JSON.parse(a[1]);break}}return o}function getCookieString(e,n){var t=e+"="+n+";";return t}function getFbInfo(){var e=new Object;return dummyResponse(!0)?(e.fbUid="fake facebook userID",e.type=c_lt_fb):e=null,e}function getLoginInfo(e,n){switch(e.type){case c_lt_normal:e.param=c_lt_normal,jamLogin(e,n);break;case c_lt_fb:jamLogin(getFbInfo(),n);break;default:alert("你是不是哪邊打錯了 \n from setLoginInfo")}}function jamLogin(e,n){dummyResponse(!0)&&(document.cookie=getCookieString(jam_cookie_key,JSON.stringify(dummyUinfo())),n(!0))}function initBackgroundTask(){masterInterval.checkMsgInterval=setInterval(checkMessageBox,30*secs)}function disableInterval(){clearInterval(masterInterval.checkMsgInterval)}function checkMessageBox(){console.log("checking messages"),onNewMessage(message)}function changeState(){checkLoggedIn()&&(sta=1,fetchUserData(),initBackgroundTask()),initElement()}function loginNormal(){console.log("asd");var e=new Object;e.type=c_lt_normal,e.acc=$(field_ACC).val(),e.pw=$(fieldPW).val(),console.log(e.pw),getLoginInfo(e,onLogIn)}function loginFb(){getLoginInfo(getFbInfo(),onLogIn)}function checkLoggedIn(){return!0}function initElement(){switch(sta){case 0:$(btn_login).on("click",loginNormal),$(btn_continueFB).on("click",loginFb),sta=1;break;case 1:$(btn_login).off("click",loginNormal),$(btn_continueFB).off("click",loginFb),$(btn_logout).on("click",onLogOut),sta=2;break;case 2:sta=0,initElement()}console.log("asd"+sta)}function onLogIn(e){e?(initElement(),fetchUserData()):(onLogFailed(),sta=0)}function onLogFailed(){showLogFailed()}function onLogOut(){initElement(),reload()}function fetchUserData(){var e=extractCookie(jam_cookie_key);showData(e)}function reload(){}function eraseData(){$("#statusMonitor").text("你登出了")}function extractCookie(e){for(var n=document.cookie,t=n.split(";"),o=void 0,i=0;i<t.length;i++){var a=t[i].split("=");if(a[0]=a[0].replace(" ",""),a[0]==e){o=JSON.parse(a[1]);break}}return o}function getFbInfo(){var e=new Object;return dummyResponse(!0)?(e.fbUid="fake facebook userID",e.type=c_lt_fb):e=null,e}function getLoginInfo(e,n){switch(e.type){case c_lt_normal:e.param=c_lt_normal,jamLogin(e,n);break;case c_lt_fb:jamLogin(getFbInfo(),n);break;default:alert("你是不是哪邊打錯了 \n from setLoginInfo")}}function jamLogin(e,n){dummyResponse(!0)&&(document.cookie=getCookieString(jam_cookie_key,JSON.stringify(dummyUinfo())),n(!0))}function showData(e){}function showLogFailed(){}function onNewMessage(e){}function getCookieString(e,n){var t=e+"="+n+";";return t}function dummyResponse(e){return e}function dummyUinfo(){var e=new Object;return e.userName="Maverick",e.success="true",e}function showData(e){}function showLogFailed(){}function onNewMessage(e){}$(document).ready(setup),window.fbAsyncInit=function(){FB.init({appId:"1423593324331860",xfbml:!0,version:"v2.8"}),FB.AppEvents.logPageView()},function(e,n,t){var o,i=e.getElementsByTagName(n)[0];e.getElementById(t)||(o=e.createElement(n),o.id=t,o.src="http://connect.facebook.net/en_US/sdk.js",i.parentNode.insertBefore(o,i))}(document,"script","facebook-jssdk");var checkMessageInterval=3e4,masterInterval=new Object;$(document).ready(changeState);const agree_to_term="accept-terms",btn_login="#login-submit",btn_logout="#logOut",btn_continueFB="#login-fb",btn_register="#reg-submit",field_ACC="#signup-email",fieldPW="#signup-password",fieldCPW="#signup-password-confirm",fieldRemember_me="remember-me",btn_uData_submit="#edit-submit",field_pic="#member-pic",field_instrument="#member-instruments",field_nickname="#member-name",field_uIntro="#member-edit-textarea",field_links="#member-media",btn_send_message="#send-message";var sta=0;const not_initialized=0,sta_notLoggedIn=1,sta_loggedIn=2,loginURL="",loginFbURL="",base_path="",c_loginType="loginType",c_lt_fb="FB",c_lt_normal="normal",jam_cookie_key="jamInfo",show_userName="",show_login="";