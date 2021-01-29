({
	COLUMNS: [
        {label: 'Account Name', fieldName: 'linkName', type: 'url',
             typeAttributes: { label: { fieldName: 'Name' }, target: '_blank', tooltip: { fieldName: 'Name' } },  editable: true },
        { label: 'Owner', fieldName: 'OwnerName', type: 'text', editable: true},
        { label: 'Phone', fieldName: 'Phone', type: 'phone', editable: true },
        { label: 'Website', fieldName: 'Website', type: 'url', editable: true },
        { label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'decimal', editable: true },
    ],
	
    getAccountData: function(component, event, helper) {
        var action = component.get("c.getAccountData");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
         		var records =response.getReturnValue();
                records.forEach(function(record){
                    record.linkName = '/'+record.Id;
        			record.OwnerName = record.Owner.Name;
                });

                component.set("v.accountData", records);
        		console.log(records);
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action);
    },
        
    setColumns: function(component) {
    	component.set('v.columns', this.COLUMNS);
    },
  
    toastMsg : function( strType, strMessage ) {            
        var showToast = $A.get( "e.force:showToast" );   
        showToast.setParams({   
        
        message : strMessage,  
        type : strType,  
        mode : 'sticky'  
        
        });   
        showToast.fire();             
    }  
})