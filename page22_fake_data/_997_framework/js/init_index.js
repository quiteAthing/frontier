
$(document).ready(setup);



function setup(){
	stater.checkState();
	$(field_ACC).on("keyup",validateEM);
	$(fieldCPW).on("keyup",checkPW);
	$(btn_login).on("click",onLoginDown);
	$(btn_continueFB).on("click",onLoginFBDown);
	$(".nxx_login").on("click",tologin);
	$(".nxx_signup").on("click",tosignup);
	
	function onLoginDown(){
		var info=new Object();
		info.type="normal";
		info.acc=$(field_ACC).val();
		info.pw=$(fieldPW).val();
		mem.login(info,stater.onLogIn);
	}
	
	function onLoginFBDown(){
		var info=new Object();
		info.type="FB";
		mem.login(info,stater.onLogIn);
	}
	
	function tologin(){
		stater.em_for_login=true;
	}

	function tosignup(){
		stater.em_for_login=false;
	}
	function validateEM(){
		var em=this.value;
		console.log("asd  "+em);
		function validateEMcharacter(){
			// 假設沒有奇怪字元，回傳true
			return true;
		}
		
		function validateEMOnReg(){
			if(validateEMcharacter()){
				mem.validateAcc(onValidate);
			}
		}

		// 完成後要做的動作
		function onValidate(rst){
			if(rst){
				console.log("帳號已存在");
				}else{
				console.log("帳號不存在");
					}
		}
		
		if(stater.em_for_login){
			if(validateEMcharacter()){
					console.log("fine email");
			}else{
					console.log("not fine email");}
		}else{
				validateEMOnReg();
		}
		
	}
		function checkPW(){
			if($(fieldPW).val()==this.value){
				console.log("same");
			}else{
				console.log("not same");
				}
			}
	

}

	

	

	

	

		
		


		

		
	
	





