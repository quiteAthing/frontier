
$(document).ready(setup_member);


function setup_member(){
	
	stater.checkState(loggedin,loggedout);
	function loggedin(){
		if(sessionStorage.getItem("requestUser")!="myself"){
				mem.getMemberData(sessionStorage.getItem("requestUser"),insertData);
		}else{mem.getMemberData("",insertData);}
		
			
	}
			
		
		
	}
	
	function loggedout(){
		mem.getMemberData(sessionStorage.getItem("requestUser"),insertData);
	}

	
	
	function insertData(data){
		//insert data into tags
		fetchTag(showForm);
		if(data.myself){fetchTag(editForm);}
		
		function fetchTag(formRoot){
			
			
			
		}
		
		
		
	}

	
	
	
	
	
}