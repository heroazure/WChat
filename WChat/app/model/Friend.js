Ext.define('WChat.model.Friend', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field',
        'Ext.data.proxy.Rest'
    ],

    config: {
        
        fields: [
			'friendUserId',
            'friendName',
			'nickName',
            'isOnLine'
        ],
        proxy: {
            type: 'rest',
            url: '../api/friends'
        }
    }
});
