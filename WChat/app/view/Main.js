Ext.define('WChat.view.Main', {

    extend: 'Ext.NavigationView',
    //alias: 'widget.main',
    xtype: 'mainContainer',
    //requires:['WChat.view.TabMain'],
    config: {
        autoDestroy: false,
        navigationBar: {
            ui: 'light',
            defaults: {
                ui: 'plain'
            },
            items: [
                { html: 'WChat' },
                { iconCls: 'search', align: 'right', itemId: 'search' },
                { iconCls: 'add', align: 'right', itemId: 'add' },
                { text: '确定', align: 'right', itemId: 'sure',hidden:true }
            ]
        },
        items: [

            { xtype: 'tabmain' }
        ]
    }
});