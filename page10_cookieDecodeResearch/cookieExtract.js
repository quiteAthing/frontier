/**
 * 
 */


 $(document).ready(function(event){
 checkState(); });
	
	
	
function checkState(){
	if(document.cookie==""){
		console.log("nothing");
	}
}

//所有用來顯示資料的欄位預定以〝jam_info_XXX〞命名以方便查找
function refreshPageContent(){
	$("#information").html("refreshed");
}
 
 

	
