// 初始化拿掉了...

var login_Nav = function() {
    $('#nav-login').hide();
    $('#nav-signup').hide();
    $('.nav-pic').show().css("display", "block");
    $('#nav-myinbox-btn').show().css("display", "block");
    $('#nav-my-member-link').show().css("display", "block");
    $('#nav-logout').show().css("display", "block");

};

//登出後nav-bar右上角的顯示

var logout_Nav = function() {
    $('#nav-login').show().css("display", "block");
    $('#nav-signup').show().css("display", "block");
    $('.nav-pic').hide();
    $('#nav-myinbox-btn').hide();
    $('#nav-my-member-link').hide();
    $('#nav-logout').hide();

};
//close modal
var close_modal = function() {
    $('.user-modal').removeClass('is-visible');
};



jQuery(document).ready(function($) {
    var pic_base64 = '';
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

    //---------事件處理--------------

    //在頁面刷新時會執行此函式, 此函式前半段是前往/Jam/loadingMember撈資料
    //撈完後執行onMemberLoading(), 也就是讓撈到的會員資料顯示在畫面上


    //---------按註冊後--------------
    regSubmit.on("click", onSignupClick);
    //---------按登入後--------------
    loginSubmit.on("click", () => {
        onLoginClick().then((arg) => onMemberLoading(arg));
    });
    //-------- 按登出後--------------
    logoutButton.on("click", onLogoutClick);
    memberUpdateButton.on("click", () => {
        onMemberUpdateClick().then((arg) => onMemberLoading(arg));
    });
    editMemberButton.on("click", onEditMemberClick);
    //------------------------------
    $("#update-member-pic").change(function() {
        readImage(this);
    });
    //---------按下#my-jam時------------
    onMyJamButton.on('click', function() {
        onMemberPageClick(sessionStorage.getItem("LoginId"));
    });



    //---------------註冊ajax------------------

    //註冊帳號重複

    var delay = (function() {
        var timer = 0;
        return function(callback, ms) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
        };
    })();
    signupEmail.on('keyup', function() {
        var account = $(this).val();
        console.log(account);
        delay(function() {
            if (account != '') {
                $.ajax({
                        type: "POST",
                        url: `http://localhost:8080/Jam/checkAcc`,
                        data: { account },
                        dataType: 'json'
                    })
                    .done(response => { //function(response){...}
                        console.log(response);
                        if (response.accExt) {
                            signupEmail.next('span').addClass('is-visible');
                            return false;
                        } else {
                            signupEmail.next('span').removeClass('is-visible');
                        };

                    })
                    .fail();
            } else {
                signupEmail.removeClass('is-visible');
            }
        }, 1000);

    });




    function onSignupClick() {
        var account = signupEmail.val();
        var password = signupPassword.val();
        $.ajax({
            url: `http://localhost:8080/Jam/register`,
            data: { account, password },
            type: 'POST',
            cache: false,
            dataType: 'json'
        }).done(response => {
            console.log(response);
            if (response.regSuccess) {
                console.log('success');
                //呈現成功畫面
            } else {
                console.log('fail')
                    //呈現失敗畫面
            }
        });
    }

    // 登入方法，並沒有後半段的顯示會員資料，因為會串接onMemberLoading()登入方法，並沒有後半段的顯示會員資料，因為會串接onMemberLoading
    //來顯示會員資料
    function onLoginClick() {
        return new Promise((resolve, reject) => {
            var account = loginEmail.val();
            var password = loginPassword.val();
            //            console.log(account + ' ' + password);
            $.ajax({
                url: `/Jam/login`,
                cache: false,
                dataType: 'json',
                type: 'POST',
                data: { account, password }
            }).done((response) => {
                if (response.loginSuccess) {
                    console.log(response);
                    login_Nav();
                    close_modal();
                    sessionStorage.setItem("LoginId", response.LoginId || '');
                    sessionStorage.setItem("alias", response.alias || '');
                } else {
                    error_idps();
                }
            }).fail((reason) => {
                console.log('Ajax request 發生錯誤');
                console.log(reason);
            })
        });

    };

    //將會員資料顯示在螢幕上~!!接收一個引數arg, 內容是MemberBean的JS物件
    function onMemberLoading(arg) {
        return new Promise((resolve, reject) => {
            console.log(arg);
            $("#member-pic").attr("src", arg.Member.pic || '');
            $("#member-instrument").html(arg.Member.instrument);
            $("#member-name").html(arg.Member.alias);
            $("#member-intro").html(arg.Member.intro);
            // window.location.reload(false);
        });
    }


    function onLogoutClick() {
        $.post({
            url: '/logoutMember'
        });
        //登出畫面，以下寫程式碼
        console.log('logout');
        logout_Nav();
        window.location.reload(false);
        return;
    }


    function readImage(input) {
        console.log(input);
        if (input.files && input.files[0]) {
            // FileReader 文件
            // https://developer.mozilla.org/zh-TW/docs/Web/API/FileReader
            // http://www.javascripture.com/FileReader
            var FR = new FileReader();
            console.log(FR.readyState);
            FR.onload = function(e) {
                //e.target.result = base64 format picture
                $('#preview-pic').attr("src", e.target.result);
                pic_base64 = e.target.result;
            };
            FR.readAsDataURL(input.files[0]);
        }
    }

    function onMemberUpdateClick() {
        return new Promise((resolve, reject) => {
            let intro = $('#update-member-intro').val();
            let email = $('#update-member-email').val();
            let alias = $('#update-member-name').val();
            let instruments = [];
            for (let i = 1; i <= maxInstruments; i++) {
                instruments.push($(`#member-instrument${i}`).val());
            }
            console.log(instruments);
            let pic = pic_base64;
            $.ajax({
                url: `/Jam/updatePerson`,
                cache: true,
                dataType: 'json',
                type: 'POST',
                data: { instruments, intro, email, alias, pic }
            }).done((response) => {
                resolve(response);
            }).fail();
        });

    }


    function onEditMemberClick() {
        $.ajax({
            url: '/Jam/memberEdit',
            type: 'POST',
            datatype: 'json'
        }).done(response => {
            console.log(response);
            $('#preview-pic').attr('src', response.Member.pic);
            $('#update-member-name').html(response.Member.alias);
            $('#update-member-intro').html(response.Member.intro);
            // $().html();
        });
    }
    //本行測試用, 已成功, 會員頁面跳轉完成後可刪
    $('#nav-my-member-link').on('click', function() {
            onMemberPageClick(sessionStorage.getItem("LoginId"));
        })
        // 本方法是用會員ID去資料庫撈資料, 目前只對應到myjam按鈕, 但未來本方法可用在看其他會員資料
    function onMemberPageClick(memberId) {
        console.log(memberId);
        $.ajax({
            url: '/Jam/goMemberPage',
            type: 'POST',
            datatype: 'json',
            data: { memberId }
        }).done(response => {
            window.location.replace("http://localhost:8080/Jam/member.html");
        });

    }





    //-------------------------------------

    //open sign-up form
    navRight.on('click', '.signup', signup_selected);
    //open login-form form
    navRight.on('click', '.login', login_selected);


    formModal.on('click', function(event) {
        if ($(event.target).is(formModal) || $(event.target).is('.close-form')) {
            close_modal();
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

    //站內信modal彈出
    mailButton.on('click', function() {
        $('.mailbox-modal').addClass('is-visible');
    });

    //站內信modal關閉
    var mailModal = $('.mailbox-modal');
    mailModal.click(function(event) {
        if ($(event.target).is(mailModal)) {
            mailModal.removeClass('is-visible');
        }

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
        $('.member-edit-instruments').append(`<input type="text" class="member-input instruments" id="member-instrument${instrumentId}">`);
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


    //--------------------------------------收件匣mailbox page-----------------------------------------------
    //刪除全選
    var deleteAll = $('#mail-del-all');
    deleteAll.on('click', function() {
        if (deleteAll.prop('checked')) {
            $("input[name='mail-del']").prop('checked', true);
        } else {
            $("input[name='mail-del']").prop('checked', false);
        }

    });


    // ------------------待ajax+servlet整合的function----------------------
    //登入後nav-bar右上角的顯示

    // var test1 = $('.test-btn1');
    // var test2 = $('.test-btn2');
    // var navbarRight = $('.navbar-right');

    // test1.click(login_Nav);
    // test2.click(logout_Nav);

    // function login_Nav() {

    //     $('.login').remove();
    //     $('.signup').remove();
    //     navbarRight.append('<li><a href="#"><i class="fa fa-envelope-o" fa-5x aria-hidden="true" ></i><span class="badge">1<span></a></li>');
    //     navbarRight.append('<li><a href="member.html" class="member-link">我的 Jam</a></li>');
    //     navbarRight.append('<li><a href="#" class="logout">登出</a></li>');
    // }
    // //登出後nav-bar右上角的顯示
    // function logout_Nav() {
    //     $('.navbar-right li').remove();
    //     navbarRight.append('<li><a href="#" class="login">登入</a></li>');
    //     navbarRight.append('<li><a href="#" class="signup">註冊</a></li>');
    // }

    //註冊帳號重複


    // signupEmail.on('keyup', function() {
    //     if ($(this).val() !== '') {
    //         $.ajax({
    //             type: "POST",
    //             url: `http://localhost:8080/Jam/register`,
    //             data: { 'userEmail': $(this).val() },
    //             dataType: 'html'
    //         })
    //         .done(email_repeat(data))
    //         .fail();
    //     } else {
    //         signupEmail.removeClass('is-visible');
    //     }
    // });


    // function email_repeat(data) {
    //     if (data == 'exist') {
    //         signupEmail.next('span').addClass('is-visible');
    //         return false;
    //     } else {
    //         signupEmail.next('span').removeClass('is-visible');
    //     }

    // }

    //登入帳密錯誤
    function error_idps() {
        $('#remember-me').append('<div class="error-IdPs"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></div>');
    }
    // ------------------ajax+servlet整合的畫面function----------------------
    //登入後nav-bar右上角的顯示

    var test1 = $('.test-btn1');
    var test2 = $('.test-btn2');
    var navbarRight = $('.navbar-right');

    test1.click(login_Nav);
    test2.click(logout_Nav);



    //登入帳密錯誤動畫
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

    function error_idps() {
        $('.error-IdPs').addClass('is-visible');
        $('.user-modal-container').addClass('animated shake').one(animationEnd, function() {
            $(this).removeClass('animated shake');
        });
    }
    //mailbox 返回收件匣
    $('#return-to-mailbox-list-btn').on('click', function() {

        $('.mailbox-content-wrapper').hide();
        $('.mailbox-list-wrapper').show();
    });

    //mailbox-list點擊進入mailbox-content
    $('.mailbox-list-tr').on('click', function() {

        $('.mailbox-list-wrapper').hide();
        $('.mailbox-content-wrapper').show();
    });
});
