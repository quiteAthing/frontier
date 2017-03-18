


var extFrame=function(){
	var methods={
		setupExtFrame : setupExtFrame,
		login_Nav :login_Nav,
		logout_Nav :logout_Nav,
		modalDisp : modalDisp,
	};
	
	function setupExtFrame(){
		
		
		
	}
	
	
	function login_Nav() {
		$('#nav-login').hide();
		$('#nav-signup').hide();
		$('.nav-pic').show().css("display", "block");
		$('#nav-myinbox-btn').show().css("display", "block");
		$('#nav-my-member-link').show().css("display", "block");
		$('#nav-logout').show().css("display", "block");
			}
			
			
	function logout_Nav() {
		$('#nav-login').show().css("display", "block");
		$('#nav-signup').show().css("display", "block");
		$('.nav-pic').hide();
		$('#nav-myinbox-btn').hide();
		$('#nav-my-member-link').hide();
		$('#nav-logout').hide();
			}
			
	function modalDisp(){
		
		
		
	}






	return methods;
}


