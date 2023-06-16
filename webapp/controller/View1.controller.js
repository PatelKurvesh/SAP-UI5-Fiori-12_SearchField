		sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("GithubSAP-UI5-Fiori-12_SearchField.controller.View1", {
		
		onInit : function(){
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData("model/fruits.json");
			this.getView().setModel(oModel);
		},
		
		onSearchItem : function(oEvent){
			
			//Step 1) Get input Parameter.
			var queryString = oEvent.getParameter("query");
			
			//Step 2) Use Filter Operator.
			// In this filter we have 3 parameter.
			//oprand 1(in which you want to search) / opretor/ oprand 2(search query)
			// var oName = new sap.ui.model.Filter("Oprand1",Opretor,"Oprand2");
			var oName = new sap.ui.model.Filter("name",sap.ui.model.FilterOperator.Contains,queryString);
			//if you need to search all property than you need to create a master filter.
			var oColor = new sap.ui.model.Filter("color",sap.ui.model.FilterOperator.Contains,queryString);
			var oTaste = new sap.ui.model.Filter("taste",sap.ui.model.FilterOperator.Contains,queryString);
			var oPrice = new sap.ui.model.Filter("price",sap.ui.model.FilterOperator.Contains,queryString);
			
			var masterFilter = new sap.ui.model.Filter({
				filters:[oName,oColor,oTaste,oPrice],
				and : false
			});
			
			
			//Step 3) Create a filter array.
			//List filter function work with array.
			// var filter = [oName];
			var filter = [masterFilter];     //if you use master filter.
			
			var fruitList = this.getView().byId("fruits");
			fruitList.getBinding("items").filter(filter);
		}

	});
});