Ext.define('WChat.model.Room', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field',
        'Ext.data.proxy.Rest'
    ],

    config: {
        fields: [
			'roomId',
			'title',
			'ownerId',
			'createDate'
        ],
        proxy: {
            type: 'rest',
            url: '../api/rooms'
        }
    }
});
