Ext.define('WChat.store.Messages', {
    extend: 'Ext.data.Store',
    //alias: 'store.messages',
    //requires: 'Ext.DateExtras',
    //requires: ['WChat.model.Message'],
    config: {
        //storeId: 'Messages',
        model: 'WChat.model.Message',
        //data : [
        //{ roomId: "Ed", title: "Spencer",ownerId:'424224',createDate:'2015/6/10' }
        //],
        //autoLoad: true,
        sorters: [
            {
                property: 'timestamp',
                direction: 'ASC'
            }
        ]
    }
});
