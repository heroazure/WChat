Ext.define('WChat.view.discover.Stack', {

    extend: 'Ext.Container',
    requires: ['Ext.Button'
        ],
    xtype: 'stack',

    config: {

        layout: {
            type: 'vbox',
            pack: 'center',
            align:'left'
        },
        scrollable:true,
        style:'background-color:#eee;',
        defaults: {
            xtype:'button',
            //flex: 2,
            //style: '',
            ui: 'plain',
            width:'100%',
            height:'50px'
        },
        items: [
            {
                text: '朋友圈',
                //text: '朋友圈',
                iconCls: 'team',
                cls: 'x-button-find',
            },
            {
                xtype: 'component',
                style: 'background-color:#eee;',
                height:'20px'
            },
            {
                //html: '<h4>扫一扫</h4>',
                text: '扫一扫',
                iconCls: 'team',
                cls: 'x-button-find',
            },
            {
                //html: '<h4>摇一摇</h4>',
                text: '摇一摇',
                iconCls: 'team',
                cls: 'x-button-find',
            },
            {
                xtype: 'component',
                style: 'background-color:#eee;',
                height: '20px'
            },
            {
                //html: '<h4>附近的人</h4>',
                text: '附近的人',
                iconCls: 'team',
                cls: 'x-button-find',
            },
            {
                //html: '<h4>漂流瓶</h4>',
                text: '漂流瓶',
                iconCls: 'team',
                cls: 'x-button-find',
            },
            {
                xtype: 'component',
                style: 'background-color:#eee;',
                height: '20px'
            },
            {
                //html: '<h4>购物</h4>',
                text: '购物',
                iconCls: 'team',
                cls: 'x-button-find',
            },
            {
                //html: '<h4>游戏</h4>',
                text: '游戏',
                iconCls: 'team',
                cls: 'x-button-find',
            }
        ]
    }

});
