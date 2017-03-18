

$(document).ready(setup_index);


function setup_index(){
	
	stater.checkState(onLoggedIn,onLoggedOut);
	setupFunctions();
	
	function onLoggedIn(){
		$("#fb-loggin-name").html(kie.getCookieJson(jam_cookie_key));
		
		

 
	}

	function onLoggedOut(){
		console.log("you are not logged in");
		
				 
	}
	
	
	
	
	
	
}


function setupFunctions(){
	
	
	//設置登入|註冊按鈕
	$("#nav-login").on("click",login_selected);
	$("#nav-signup").on("click",signup_selected);
	$("#login_tab").on("click",;login_selected);
	$("#register_tab").on("click",register_selected);
	    function login_selected() {
			//navRight.removeClass('is-visible');
			formModal.addClass('is-visible');
			$("#login_tab").addClass('is-selected');
			formSignup.removeClass('is-selected');
			//formForgotPassword.removeClass('is-selected');
			//tabLogin.addClass('selected');
			tabSignup.removeClass('selected');
			$('#nav-sign-button').removeClass('in').attr('aria-expanded', 'false');
				}

		function signup_selected() {
			navRight.children('ul').removeClass('is-visible');
			formModal.addClass('is-visible');
			formLogin.removeClass('is-selected');
			formSignup.addClass('is-selected');
			formForgotPassword.removeClass('is-selected');
			tabLogin.removeClass('selected');
			tabSignup.addClass('selected');
			$('#nav-sign-button').removeClass('in').attr('aria-expanded', 'false');

		}
	
	
	
	
	
	
	
}