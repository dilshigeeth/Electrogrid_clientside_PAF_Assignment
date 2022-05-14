$(document).ready(function()
{ 
 $("#alertSuccess").hide();
 $("#alertError").hide();
});
// SAVE ============================================
$(document).on("click", "#btnSave", function(event)
{
// Clear alerts---------------------
 $("#alertSuccess").text("");
 $("#alertSuccess").hide();
 $("#alertError").text("");
 $("#alertError").hide();
// Form validation-------------------
var status = validateBillForm();
if (status != true)
 {
 $("#alertError").text(status);
 $("#alertError").show();
 return;
 }
// If valid------------------------
 var type = ($("#hidBillIDSave").val() == "") ? "POST" : "PUT";
$.ajax(
{
 url : "BillsAPI",
 type : type,
 data : $("#formBill").serialize(),
 dataType : "text",
 complete : function(response, status)
 {
 onBillSaveComplete(response.responseText, status);
 }
});
});
function onBillSaveComplete(response, status)
{
if (status == "success")
 {
 var resultSet = JSON.parse(response);
 if (resultSet.status.trim() == "success")
 {
 $("#alertSuccess").text("Successfully saved.");
 $("#alertSuccess").show();
 $("#divItemsGrid").html(resultSet.data);
 } else if (resultSet.status.trim() == "error")
 {
 $("#alertError").text(resultSet.data);
 $("#alertError").show();
 }
 } else if (status == "error")
 {
 $("#alertError").text("Error while saving.");
 $("#alertError").show();
 } else
 {
 $("#alertError").text("Unknown error while saving..");
 $("#alertError").show();
 } 
 $("#hidBillIDSave").val("");
 $("#formBill")[0].reset();
}

// UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event)
{
 $("#hidBillIDSave").val($(this).closest("tr").find('#hidBillIDUpdate').val());
 $("#billNo").val($(this).closest("tr").find('td:eq(0)').text());
 $("#billName").val($(this).closest("tr").find('td:eq(1)').text());
 $("#billPrice").val($(this).closest("tr").find('td:eq(2)').text());
 $("#billMonth").val($(this).closest("tr").find('td:eq(3)').text());
});

//delete
$(document).on("click", ".btnRemove", function(event)
{
 $.ajax(
 {
 url : "BillsAPI",
 type : "DELETE",
 data : "billID=" + $(this).data("billid"),
 dataType : "text",
 complete : function(response, status)
 {
 onBillDeleteComplete(response.responseText, status);
 }
 });
});
function onBillDeleteComplete(response, status)
{
if (status == "success")
 {
 var resultSet = JSON.parse(response);
 if (resultSet.status.trim() == "success")
 {
 $("#alertSuccess").text("Successfully deleted.");
 $("#alertSuccess").show();
 $("#divItemsGrid").html(resultSet.data);
 } else if (resultSet.status.trim() == "error")
 {
 $("#alertError").text(resultSet.data);
 $("#alertError").show();
 }
 } else if (status == "error")
 {
 $("#alertError").text("Error while deleting.");
 $("#alertError").show();
 } else
 {
 $("#alertError").text("Unknown error while deleting..");
 $("#alertError").show();
 }
}
// CLIENT-MODEL================================================================
function validateBillForm()
{
// CODE
if ($("#billNo").val().trim() == "")
 {
 return "Insert Bill Number.";
 }
// NAME
if ($("#billName").val().trim() == "")
 {
 return "Insert Bill Name.";
 } 
 // PRICE-------------------------------
if ($("#billPrice").val().trim() == "")
 {
 return "Insert Bill Price.";
 }
// is numerical value
var tmpPrice = $("#billPrice").val().trim();
if (!$.isNumeric(tmpPrice))
 {
 return "Insert a numerical value for Bill Price.";
 }
// convert to decimal price
 $("#billPrice").val(parseFloat(tmpPrice).toFixed(2));
// DESCRIPTION------------------------
if ($("#billMonth").val().trim() == "")
 {
 return "Insert Bill Month.";
 }
return true;
}
