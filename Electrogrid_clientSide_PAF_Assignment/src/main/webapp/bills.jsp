<%@page import="com.Bill"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Bills Management</title>
<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.6.0.min.js"></script>
<script src="Components/bills.js"></script>
</head>
<body>
<div class="container"><div class="row"><div class="col-6">
<h1>Bills Management</h1>
<form id="formBill" name="formBill">
 Bill No:
 <input id="billNo" name="billNo" type="text"
 class="form-control form-control-sm">
 <br> Bill name:
 <input id="billName" name="billName" type="text"
 class="form-control form-control-sm">
 <br> Bill price:
 <input id="billPrice" name="billPrice" type="text"
 class="form-control form-control-sm">
 <br> Bill Month:
 <input id="billMonth" name="billMonth" type="text"
 class="form-control form-control-sm">
 <br>
 <input id="btnSave" name="btnSave" type="button" value="Save"
 class="btn btn-primary">
 <input type="hidden" id="hidBillIDSave"
 name="hidBillIDSave" value="">
</form>
<div id="alertSuccess" class="alert alert-success"></div>
<div id="alertError" class="alert alert-danger"></div>
<br>
<div id="divItemsGrid">
 <%
 Bill billObj = new Bill();
 out.print(billObj.readBills());
 %>
</div>
</div> </div> </div>
</body>
</html>