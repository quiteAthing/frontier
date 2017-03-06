jQuery(document).ready(function($) {
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
		//動作內容
        signupEmail=$(field_ACC),
        signupPassword = $(fieldPW),
        passwordConfirm = $(fieldCPW),
        termsAccept = $(agree_to_term),
        regSubmit = $(btn_register);


    //open sign-up form
    navRight.on('click', '.signup', signup_selected);
    //open login-form form
    navRight.on('click', '.login', login_selected);

    //close modal
    formModal.on('click', function(event) {
        if ($(event.target).is(formModal) || $(event.target).is('.close-form')) {
            formModal.removeClass('is-visible');
        }
    });
    //close modal when clicking the esc keyboard button
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

    //hide or show password
    // $('.hide-password').on('click', function(){
    //  var togglePass= $(this),
    //      passwordField = togglePass.prev('input');

    //  ( 'password' == passwordField.attr('type') ) ? passwordField.attr('type', 'text') : passwordField.attr('type', 'password');
    //  ( '隱藏密碼' == togglePass.text() ) ? togglePass.text('顯示密碼') : togglePass.text('隱藏密碼');
    //  //focus and move cursor to the end of input field
    //  passwordField.putCursorAtEnd();
    // });

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
    //註冊密碼不符合規則

    signupPassword.on('keyup', this, password_rule);
    signupPassword.on('keyup', this, submit_able);

    //註冊確認密碼不一致
    passwordConfirm.on('keyup', this, password_different);
    signupPassword.on('keyup', this, password_different);
    passwordConfirm.on('keyup', this, submit_able);

    //勾選同意條款
    termsAccept.on('click', this, submit_able);




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
        $('#bs-example-navbar-collapse-1').removeClass('in').attr('aria-expanded', 'false');
    }

    function signup_selected() {
        navRight.children('ul').removeClass('is-visible');
        formModal.addClass('is-visible');
        formLogin.removeClass('is-selected');
        formSignup.addClass('is-selected');
        formForgotPassword.removeClass('is-selected');
        tabLogin.removeClass('selected');
        tabSignup.addClass('selected');
        $('#bs-example-navbar-collapse-1').removeClass('in').attr('aria-expanded', 'false');

    }

    function forgot_password_selected() {
        formLogin.removeClass('is-selected');
        formSignup.removeClass('is-selected');
        formForgotPassword.addClass('is-selected');
    }

    function terms_Ischecked() {
        if (termsAccept.prop("checked")) {
            return true;
        } else {
            return false;
        }
    }

    function submit_able() {
        if (terms_Ischecked() && password_rule() && password_different()) {
            regSubmit.removeAttr('disabled');
        } else {
            regSubmit.attr('disabled', 'disabled');
        }
    }


    function password_rule() {
        var rule = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]).{7,15}$/;
        if (rule.test(signupPassword.val())) {
            signupPassword.next('span').removeClass('is-visible');
            return true;
        } else {
            signupPassword.next('span').addClass('is-visible');
            return false;
        }

    }

    function password_different() {
        if (signupPassword.val() != passwordConfirm.val()) {

            passwordConfirm.next('span').addClass('is-visible');
            return false;
        } else {
            passwordConfirm.next('span').removeClass('is-visible');
            return true;
        }
    }



    //--------------------------------------Member Page--------------------------------------------
    // myJamEvent 收合
    var myJamEvent = $('.my-jam-event-title');
    var linkDiv = $('.my-jam-event-link');

    myJamEvent.on('mouseover', function() {
        myJamEvent.addClass('isopen');
        linkDiv.fadeIn("slow");
    });

    linkDiv.on('mouseleave', function() {
        myJamEvent.removeClass('isopen');
        linkDiv.fadeOut("slow");
    });



    //..........會員資料展開收合...........
    $('.abtbtn.show').on('click', function() {
        $('.profolio-about-me-defualt').hide();
        $('.profolio-about-me-show').show();
    });

    $('.abtbtn.hide').on('click', function() {
        $('.profolio-about-me-show').hide();
        $('.profolio-about-me-defualt').show();
    });

    //編輯按鈕
    var editModal = $('.member-edit-modal');
    $('.edit-btn').click(function() {
        editModal.addClass('is-visible');
    });
    //關掉編輯modal

    editModal.click(function(event) {
        if ($(event.target).is(editModal)) {
            editModal.removeClass('is-visible');
        }

    });
    $('.form-btn.submit').click(function() {
        editModal.removeClass('is-visible');
    });
    $(document).keyup(function(event) {
        if (event.which == '27') {
            editModal.removeClass('is-visible');
        }
    });


    //新增樂器專長欄位
    var maxInstruments = 0,
        instrumentId = 1;
    $('.form-btn.instruments-plus').on('click', function() {
        if (maxInstruments >= 5) return;
        maxInstruments++;
        $('.member-edit-instruments').append('<input type="text" class="member-input instruments" name="member-instruments' + instrumentId + '" id="member-instruments' + instrumentId + '">');
        instrumentId++;
    });
    //刪除樂器專長欄位
    $('.form-btn.instruments-minus').on('click', function() {
        $('.member-input.instruments').last().remove();
        if (maxInstruments > 0) maxInstruments--;
        if (instrumentId > 1) instrumentId--;
    });


    //新增個人影音連結
    var mediaId = 1,
        maxMedia = 0;
    $('.form-btn.media-plus').click(function() {
        if (maxMedia >= 6) return;
        maxMedia++;
        $('.member-edit-media').append('<input type="text" class="member-input media" name="member-media' + mediaId + '" id="member-media' + mediaId + '">');
        mediaId++;
    });
    //刪除個人影音連結
    $('.form-btn.media-minus').on('click', function() {
        $('.member-input.media').last().remove();
        if (maxMedia > 0) maxMedia--;
        if (mediaId > 1) mediaId--;
    });


// ------------------待ajax+servlet整合的function----------------------
//登入後nav-bar右上角的顯示

var test1 =$('.test-btn1');
var test2 =$('.test-btn2');
var navbarRight = $('.navbar-right');

test1.click(login_Nav);
test2.click(logout_Nav);

function login_Nav(){
    
    $('.login').remove();
    $('.signup').remove();
    navbarRight.append('<li><a href="#"><i class="fa fa-envelope-o" fa-5x aria-hidden="true" ></i><span class="badge">1<span></a></li>');
    navbarRight.append('<li><a href="member.html" class="member-link">我的 Jam</a></li>');
    navbarRight.append('<li><a href="#" class="logout">登出</a></li>');
}
//登出後nav-bar右上角的顯示
function logout_Nav(){
    $('.navbar-right li').remove();
    navbarRight.append('<li><a href="#" class="login">登入</a></li>');
    navbarRight.append('<li><a href="#" class="signup">註冊</a></li>');
}

//註冊帳號重複

signupEmail.on('keyup',function(){
    if ($(this).val() !==''){
        $.ajax({
            type:"POST",
            url:"",
            data:{'userEmail':$(this).val()},
            dataType:'html'
        }).done(email_repeat(data)).fail();
    }else{
        signupEmail.removeClass('is-visible');
    }
});


function email_repeat(data){
    if(data=='exist'){
        signupEmail.next('span').addClass('is-visible');
        return false;
    }else{
        signupEmail.next('span').removeClass('is-visible');
    }
    
}

});
