Ext.define('WChat.store.Users', {
    extend: 'Ext.data.Store',
    config: {
        //storeId: 'Users',
        model: 'WChat.model.User',
        //data : [
        //{ roomId: "Ed", title: "Spencer",ownerId:'424224',createDate:'2015/6/10' }
        //],
        //autoLoad: true,
        sorters: [
            {
                property: 'userName',
                direction: 'ASC'
            }
        ]
    }
});
