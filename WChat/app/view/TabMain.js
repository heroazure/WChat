Ext.define('WChat.view.TabMain', {

    extend: 'Ext.tab.Panel',
    //alias: 'widget.main',
    xtype: 'tabmain',
    requires: ['WChat.view.room.Card'],
    config: {
        //title: '聊天室2',
        tabBarPosition: 'bottom',
        tabBar: {
            ui: 'light',
            scrollable: {
                direction: 'horizontal',
                indicators: false
            }
        },
        //ui: 'light',
        defaults: {
            scrollable: true
        },
        items: [
			
            { xtype: 'rooms' },
            { xtype: 'friends' },
            {xtype:'stack',title:'发现',iconCls:'team'}
        ]
    }
});