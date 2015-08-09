Ext.define('WChat.helpers', {
    singleton: true,
    
    config: {
        userId: null,
        wchat: null,
        roomId:null
    },
    
    //getCurrency: function(currencyId) {
    //    var store = Ext.getStore('Currencies'),
    //        record = store.getById(currencyId);
        
    //    if (record !== null) {
    //        return record.get('Name');
    //    }
    //    else {
    //        return '';
    //    }
    //},
    //setUserId:function(userId){
    //    this.set("userId",userId);
    //},

    
    //getCurrencyFromReportId: function(reportId) {
    //    var reportStore = Ext.getStore('Reports'),
    //        reportRecord = reportStore.getById(reportId),
    //        store = Ext.getStore('Currencies'),
    //        record = store.getById(reportRecord.get('CurrencyID'));
        
    //    if (record !== null) {
    //        return record.get('Name');
    //    }
    //    else {
    //        return '';
    //    }
    //}
    constructor: function (config) {
        this.initConfig(config);
    }
});

//Ext.define('ExtOverride.data.Field', {
//    override: 'Ext.data.Field',
    
//    config: {
//        dateFormat: 'c' 
//    },

//    constructor: function(config) {
//        this.initConfig(config);
//    }
//});