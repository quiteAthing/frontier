<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
	<form
		action="${pageContext.request.contextPath }/_999_test/tx/controller/TXServlet.do"
		method="get">
		<table border="1">
			<tr>
				<td>account</td>
				<td><input type="text" name="account"></td>
			</tr>
			<tr>
				<td>password</td>
				<td><input type="password" name="password"></td>
			</tr>
			<tr>
				<td>number</td>
				<td><input type="number" name="number"></td>
			</tr>
			<tr>
				<td>longNumber</td>
				<td><input type="number" name="longNumber"></td>
			</tr>
			<td><input type="submit" value="OK"></td>
		</table>
	</form>
</body>
</html>