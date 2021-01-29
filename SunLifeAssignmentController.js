({

    init: function(component, event, helper) {
        helper.getAccountData(component, event, helper)
        helper.setColumns(component);
    },

    handleSort: function(component, event, helper) {
        helper.handleSort(component, event);
    },
    
    handleSaveEdition : function( component, event, helper ) {   
         var updatedRecords = component.find( "acctTable" ).get( "v.draftValues" );  
         var data = component.get("v.accountData");
         updatedRecords.Id = component.get("v.accountData");
         console.log(updatedRecords);
            var action = component.get( "c.updateAccts" );  
            action.setParams({  
                'updatedAccountList' : updatedRecords  
            });  
            action.setCallback( this, function( response ) {        
                var state = response.getState();   
                alert(state);
                alert(response.getReturnValue());
                if ( state === "SUCCESS" ) {  
                    if ( response.getReturnValue() === true ) {  
                        helper.toastMsg( 'success', 'Records Saved Successfully.' );  
                        component.find( "acctTable" ).set( "v.draftValues", null );  
                          
                    } else {   
                        helper.toastMsg( 'error', 'Something went wrong. Contact your system administrator.' );       
                    }  
                      
                } else {  
                    helper.toastMsg( 'error', 'Something went wrong. Contact your system administrator.' );                    
                }  
                  
            });  
            $A.enqueueAction(action);  
        },
});