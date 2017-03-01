function doFirst(){
	var login = document.getElementById('login');
	login.addEventListener("click",onLogin,false);
}
function onLogin(){
	// login.style.color="black";
	// var header= document.getElementsByTagName('header');
	var header= document.querySelector('header');
	header.style.backgroundImage= "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(images/index1.jpg)";
	 // header.style.backgroundImage= "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8))";
}





window.addEventListener('load',doFirst,false);