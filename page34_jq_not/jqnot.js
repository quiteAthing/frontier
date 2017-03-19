/**
 * 
 */


 $(document).ready(function(event){
	 
	$("#msgModel").children().not(".mail-td-delete").css("color","red");
	$("#msgModel").children().not(".mail-td-delete").click(function(ev){
		console.log($(ev.target).siblings(".nxx").children(".nxx_msgId").html());
	})
	for(var i=0;i<5;i++){
		var newMsg=$("#msgModel").clone(true);
		newMsg.show();
		newMsg.find(".nxx_msgId").html(i);
		newMsg.attr("id",i);
		newMsg.appendTo("#msgBox");
	}
	

	 
	 
	 
 });
 
 


	
