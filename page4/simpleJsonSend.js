/**
 * 
 */


 $(document).ready(function(event){
	 
	$('#btn1').on("click",function(event){
		var data=new Object();
		data.userName=$('#testField1').val();
		
		console.log(JSON.stringify(data));
		
	}
	
	);
	
 });
 
 


	
