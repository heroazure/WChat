Ext.define('WChat.model.User', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field',
        'Ext.data.proxy.Rest'
    ],

    config: {
        idProperty: 'userId',
        fields: [
			'userId',
			'userName',
            'password',
			'emailAddress',
			'nickName',
            'approverID',
            'isOnLine'
        ],
        proxy: {
            type: 'rest',
            url: '../api/users'
        }
    }
});
