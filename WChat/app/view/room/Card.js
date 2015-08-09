Ext.define('WChat.view.room.Card', {

    extend: 'Ext.NavigationView',
    xtype: 'roomContainer',
    requires: ['WChat.view.room.List'],

    config: {

        
        tab: {
            title: '聊天室',
            iconCls: 'home'
        },

        autoDestroy: false,

        items: [
            {
                xtype: 'rooms',
                //grouped: false,
                pinHeaders: false
            }
        ]
    }
});