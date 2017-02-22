

//這個檔案包含所有與處理cookie資料相關的內容
//且與處理cookie資料相關的內容都應該被寫在這個檔案中。

//取得儲存在cookie中以key值作為標記的json物件
function getJSON(cookie,key){
	
	
}

//取得第N組數值，假設cookie是經過加密或使用者不遵照cookie標準格式時
function getNthValue(cookie,nth){
	var i=0;
	var result=new Array(0);
	var content="";
	while(i<nth){
		
	if(cookie.charAt[i]==";"){
		nth+=1;
		result.push(content);
		content="";
	}else{
		content+=cookie.charAt(i);
		}
		
		
	}
}
