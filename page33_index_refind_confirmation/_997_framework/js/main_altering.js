

jQuery(document).ready(function($) {
	
	var index_methods=new Object();

	index_methods.login_Nav = function() {
		$(".nav").find(".nav_li").show();
		$(".nav").find(".nav_lt").hide();
	};

	//登出後nav-bar右上角的顯示

	index_methods.logout_Nav = function() {
		$(".nav").find(".nav_li").hide();
		$(".nav").find(".nav_lt").show();

	};

	index_methods.close_modal = function() {
		$('.user-modal').removeClass('is-visible');
	};
	
	
	
    //------變數------------
    var formModal = $('.user-modal'),
        formLogin = formModal.find('#login'),
        formSignup = formModal.find('#signup'),
        formForgotPassword = formModal.find('#reset-password'),
        formModalTab = $('.switcher'),
        tabLogin = formModalTab.children('li').eq(0).children('a'),
        tabSignup = formModalTab.children('li').eq(1).children('a'),
        forgotPasswordLink = formLogin.find('.form-bottom-message a'),
        backToLoginLink = formForgotPassword.find('.form-bottom-message a'),
        mainNav = $('.main-nav'),
        navRight = $('.nav'),
        signupEmail = $('#signup-email'),
        signupPassword = $('#signup-password'),
        loginEmail = $('#signin-email'),
        loginPassword = $('#signin-password'),
        passwordConfirm = $('#signup-password-confirm'),
        termsAccept = $('#accept-terms'),
        regSubmit = $('#reg-submit'),
        loginSubmit = $('#login-submit'),
        mailButton = $('.mail-btn'),
        memberUpdateButton = $('#update-member'),
        navSignButton = $('#nav-sign-button'),
        navLogoutButton = $('#nav-logout-button'),
        logoutButton = $('.nav-logout'),
        editMemberButton = $('#edit-member-btn'),
        onMyJamButton = $('#my-jam');


	stater.checkState(index_methods.login_Nav,index_methods.logout_Nav);
    regSubmit.on("click", onSignupClick);
    loginSubmit.on("click",onLoginClick);
    logoutButton.on("click", onLogoutClick);

    signupEmail.on('keyup', function() {
        console.log(account);
		var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		var vAcc=document.getElementById(field_ACC).value;
			if(re.test(vAcc)){
					mem.validateAcc(vAcc,function(response){
					  if (response.accExt) {
							signupEmail.next('span').addClass('is-visible');
							  return false;
						 } else {
							signupEmail.next('span').removeClass('is-visible');
						 };	
					});				
			}else{
				signupEmail.next('span').addClass('is-visible');
				console.log("wrong email format");	
			}
    });




    function onSignupClick() {
		
		var rInfo={
			type : "normal",
			acc : signupEmail.val(),
			pw :signupPassword.val()
		}
		mem.register(rInfo,function(resp){
			if(resp.regSuccess){
				index_methods.close_modal()
				alert("Register Success");
					}
				});
        
    }

    // 登入方法，並沒有後半段的顯示會員資料，因為會串接onMemberLoading()登入方法，並沒有後半段的顯示會員資料，因為會串接onMemberLoading
    //來顯示會員資料
    function onLoginClick() {
		
			var info={
				type : "normal",
				acc :loginEmail.val(),
				pw :loginPassword.val()
			};
			
			mem.login(info,function(resp){
				if (response.loginSuccess) {
                    console.log(response);
                    index_methods.index_methods.login_Nav();
                   index_methods.close_modal();
                    kie.setCookieObj(jam_cookie_key,{ user_id : resp.id, user_alias : resp.alias});
				    stater.checkState(index_methods.login_Nav,index_methods.logout_Nav);
                } else{
					alert("login failed");
				}				
			})

    }

    function onLogoutClick() {
		mem.logout();
		//reload的時候就會觸發 $(document).ready裡的方法重新判斷登入狀態。
        window.location.reload(true);
        return;
    }

    navRight.on('click', '.signup', signup_selected);
    navRight.on('click', '.login', login_selected);


    formModal.on('click', function(event) {
        if ($(event.target).is(formModal) || $(event.target).is('.close-form')) {
           index_methods.close_modal();
        }
    });
    //close modal when pressing the keyboard esc button
    $(document).keyup(function(event) {
        if (event.which == '27') {
            formModal.removeClass('is-visible');
        }
    });

    //switch from a tab to another
    formModalTab.on('click', function(event) {
        event.preventDefault();
        ($(event.target).is(tabLogin)) ? login_selected(): signup_selected();
    });


    //show forgot-password form 
    forgotPasswordLink.on('click', function(event) {
        event.preventDefault();
        forgot_password_selected();
    });

    //back to login from the forgot-password form
    backToLoginLink.on('click', function(event) {
        event.preventDefault();
        login_selected();
    });
    //確認註冊密碼是否符合規則
    signupPassword.on('keyup',function(){
		password_rule(this.value);
	});

    //註冊確認密碼不一致
    passwordConfirm.on('keyup',function(){
		console.log(password_different([this.value,signupPassword.val()]));
		
		
		
	});
	
    termsAccept.on('click', function(){	
	
        if ($(this).prop("checked") && password_different([signupPassword.val(),passwordConfirm.val()])) {
            regSubmit.removeAttr('disabled');
        } else {
            regSubmit.attr('disabled', 'disabled');
			}	
	});

	
	function password_rule(value) {
        var rule = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]).{7,15}$/;
        if (rule.test(value)) {
            $(this).next('span').removeClass('is-visible');
            return true;
        } else {
            $(this).next('span').addClass('is-visible');
            return false;
        }

    }

    function password_different(val) {
		var pwsu=signupPassword.val();
		var pwcfn=passwordConfirm.val();
		
		if(pwsu.length==pwcfn.length){
			if(!password_rule(pwsu) || !password_rule(pwcfn)){
				console.log("a");
				return false;}
			if (val[0].toString() === val[1].toString()) {
				console.log("b");
			passwordConfirm.next('span').removeClass('is-visible');
            return true;
			} else {
				console.log("c");
				passwordConfirm.next('span').addClass('is-visible');
				return false;}
		}else{
			console.log("d");
			return false;	}
    }
	

    
    //登入帳密錯誤
    function error_idps() {
        $('#remember-me').append('<div class="error-IdPs"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></div>');
    }


    //驗證畫面按確認後回到主畫面
    $('.confirm-button').on('click', function() {
        $('.confirm-success').toggleClass('is-visible');
    });

    function login_selected() {
        navRight.removeClass('is-visible');
        formModal.addClass('is-visible');
        formLogin.addClass('is-selected');
        formSignup.removeClass('is-selected');
        formForgotPassword.removeClass('is-selected');
        tabLogin.addClass('selected');
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

    function forgot_password_selected() {
        formLogin.removeClass('is-selected');
        formSignup.removeClass('is-selected');
        formForgotPassword.addClass('is-selected');
    }


});
