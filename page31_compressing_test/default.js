window.mem=function(){function e(a){var b=new XMLHttpRequest;b.onreadystatechange=function(c){switch(b.readyState){case 1:b.send(a);break;case 4:200==b.status&&(c=JSON.parse(b.responseText),cbf(c.regSuccess))}};b.open("POST",base_url+service_register,!0)}function f(){var a={};FB.getLoginStatus(function(b){"connected"===b.status?a.fbUID=b.authResponse.userID:"not_authorized"===b.status?FB.login(function(a){f()}):(FB.louout(function(){console.log("fbLogOut")}),a=null)});return a}function g(a,b){var c=
new XMLHttpRequest;c.onreadystatechange=function(){switch(c.readyState){case 1:c.send(a);break;case 4:if(200==c.status){var d=c.responseText;JSON.parse(d).loginSuccess&&(kie.setCookieJson(mem.cookieKey,d),b(!0))}else b(!1)}};null!=a?c.open("POST",base_url+service_login,!0):b(!1)}return{cookieKey:jam_cookie_key,login:function(a,b){switch(a.type){case "FB":g(f(),b);break;case "normal":g(a,b)}},logout:function(){kie.cleanCookie(mem.cookieKey,"")},loggedin:function(a){if(""!=kie.getCookieString(mem.cookieKey))if(void 0!=
a)a(document.cookie);else return!0;else return!1},validateAcc:function(a){var b={};b.acc=document.getElementById(field_ACC).value;var c=new XMLHttpRequest;c.onreadystatechange=function(d){switch(c.readyState){case 1:c.send(b);break;case 4:200==c.status&&(d=SON.parse(c.responseText),a(d.accExt))}};c.open("POST",base_url+service_checkACC,!0)},register:function(a,b){switch(a.type){case "FB":a.fbUID=this.getFbInfo();e(a);break;case "normal":e(a)}}}}();