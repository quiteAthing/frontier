/**
 * 
 */


 $(document).ready(function(event){
	setup_system();
	setup();
	 
	 
 });
 
	//修改系統內容，
	function setup_system(){
		setup_fakeCookie();
		stater.checkState();
		function  setup_fakeCookie(){
			//覆寫mem.jamLogin
			
			var data={
				login_success : true,
				user_id : 1,
				nickname :"Josh"
					};
				var resp=JSON.stringify(data);
				document.cookie=mem.getCookieString(mem.cookieKey,resp);
		}
			
			stater.showOnLogIn=function(){
				var biscuit=mem.extractCookie(mem.cookieKey);
				$("#responder").html("login success  :  "+biscuit.login_success);
				$("#responder1").html("user id  :  "+biscuit.user_id);
				$("#responder2").html("user nickname    :   "+biscuit.nickname);

			}
			
			bgts.activateBgt(5000,msg.che)
			
			
			
		
	}
	
	function setup(){
			
	}
 
 


	
