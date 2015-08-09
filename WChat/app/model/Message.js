Ext.define('WChat.model.Message', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field',
        'Ext.data.proxy.Rest',
        'Ext.DateExtras'
    ],

    config: {
        fields: [
			'messageId',
			'text',
            {
                name: 'timestamp',
                type: 'date',
                convert: function (value, record) {
                    if (value) {
                        return Ext.Date.format(new Date(value), 'o-m-d')
                        
                    } else {
                        return Ext.Date.format(new Date(), 'o-m-d')
                    }
                }
            },
			'userId',
            'roomId'
        ],
        proxy: {
            type: 'rest',
            url: '../api/messages'
        }
    }
});
