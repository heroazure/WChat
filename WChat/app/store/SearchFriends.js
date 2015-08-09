Ext.define('WChat.store.SearchFriends', {
    extend: 'Ext.data.Store',
    config: {
        //storeId: 'Friends',
        model: 'WChat.model.User',
        sorters: [
            {
                property: 'userName',
                direction: 'ASC'
            }
        ]
    }
});
