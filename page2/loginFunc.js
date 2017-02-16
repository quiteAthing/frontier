
//fbAPI init 開始

   window.fbAsyncInit = function() {
    FB.init({
      appId      : '1423593324331860',
      xfbml      : true,
      version    : 'v2.8'
    });
    FB.AppEvents.logPageView();
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "http://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

   
   
//fbAPI init 結束



//jquery 建立連結
 $(document).ready(function(event){
	 
		
	$('#jamLoginNormal').on("click",testPW);
	$('#jamLoginFB').on("click",getFbLogin)
	 
	 
 });
 
 
 function testPW(event){
		var str=$('#jamACC').val()+$('#jamPW').val();
		$("#responder").html(str); 
 }
 
 //像伺服器取得資訊的方法A
 //因為可能用BCD所以先加個A來保留
 function getAccIden(){
	 
 }
 
 
 //fb使用的方法
 function getFbLogin(){
		
 }
 
 
 
 
 
 
 
 
 


	
