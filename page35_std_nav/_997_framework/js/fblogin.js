window.fbAsyncInit = function() {
    FB.init({
        appId      : "1215937141808423",
        cookie     : true,  // enable cookies to allow the server to access 
                            // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.8' // use version 2.2
    });


    FB.getLoginStatus(function(response) {
        console.log(response)
     if (response.status === 'connected') {
        // showName();
        // login_Nav();
        // Logged into your app and Facebook.
        console.log('connected');
    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        console.log('The person is logged into Facebook, but not your app');
    } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        console.log("The person is not logged into Facebook ");
    }
  });

  };
// Load the SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/zh_TW/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

 function showName() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', {fields: 'first_name'}, function(response) {
      console.log('Successful login for: ' + response.first_name);
      document.getElementById('fb-loging-name').innerHTML =
        'Hi, ' + response.first_name + '!';
        document.getElementById('nav-pic').setAttribute("src", "http://graph.facebook.com/" + response.id + "/picture?type=small");
    });
  }

function check_user(fbId, fbName, fbpicture){
    //這裡要寫ajax 傳值進server
    console.log(fbId);
    console.log(fbName);
    console.log(fbpicture);

}
// 按fb登入鍵時做事
document.getElementById('fb-login-btn').addEventListener('click', function() {
    //do the login
    FB.login(function(response) {
        if (response.status === 'connected') {
        // Logged into your app and Facebook.
        showName();
        login_Nav();
        close_modal();
        FB.api('/me', {fields: 'first_name,picture'},function(response) {
        check_user(response.id,response.first_name,response.picture);
    });
    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        console.log('The person is logged into Facebook, but not your app');
    } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        console.log("The person is not logged into Facebook ");
    }
    }, {scope: 'email,public_profile', return_scopes: true});
}, false);

document.getElementById('fb-login-btn2').addEventListener('click', function() {
    //do the login
    FB.login(function(response) {
        if (response.status === 'connected') {
        // Logged into your app and Facebook.
        showName();
        login_Nav();
        close_modal();
        FB.api('/me', {fields: 'first_name,picture'},function(response) {
        check_user(response.id,response.first_name, response.picture);
    });
    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        console.log('The person is logged into Facebook, but not your app');
    } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        console.log("The person is not logged into Facebook ");
    }
    }, {scope: 'email,public_profile', return_scopes: true});
}, false);

//按登出時也fb登出
document.getElementById('nav-logout').addEventListener('click', function(){
    console.log(262626);
    FB.getLoginStatus(function(response){
        console.log(response);
        if(response.status==='connected'){
             FB.logout(function(response){
                console.log(response);

        location.replace('http://localhost:8080/Jam');
    });
         }else {
            //這裡只有畫面的呈現 

            logout_Nav();
         }
    });
   
});