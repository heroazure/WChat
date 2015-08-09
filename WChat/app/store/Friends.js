Ext.define('WChat.store.Friends', {
    extend: 'Ext.data.Store',
    config: {
        //storeId: 'Friends',
        model: 'WChat.model.Friend',
        sorters: [
            {
                property: 'friendName',
                direction: 'ASC'
            }
        ]
    }
});
