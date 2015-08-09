Ext.define('WChat.store.Rooms', {
    extend: 'Ext.data.Store',
    alias: 'store.rooms',
    //requires: ['WChat.model.Room'],
    config: {
        //storeId: 'Rooms',
        model: 'WChat.model.Room',
        //data : [
        //{ roomId: "Ed", title: "Spencer",ownerId:'424224',createDate:'2015/6/10' }
        //],
        //autoLoad: true,
        sorters: [
            {
                property: 'createDate',
                direction: 'ASC'
            },
            {
                property: 'title',
                direction: 'ASC'
            }
        ]
    }
});
