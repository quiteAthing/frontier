/**
 * 
 */


 $(document).ready(function(event){
	 
	$('#btn1').on("click",function(event){

		$.ajax({url: "http://localhost:8080/TestResponder/PurpleAlcohol", 
			success: function(result){
	        $('#responder').html(result);},
			contentType:"text/plain"
			
		});
	}
	
	);
	
 });
 
 


	
