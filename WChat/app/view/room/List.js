Ext.define('WChat.view.room.List', {

    extend: 'Ext.List',
    requires: [
        'Ext.XTemplate'],
    xtype: 'rooms',

    config: {
        tab: {
            title: '聊天室',
            iconCls: 'home'
        },
        store: 'Rooms',
        variableHeights: true,
        useSimpleItems: true,
        itemTpl:Ext.create('Ext.XTemplate',
            '<div class="row"><div class="col-sm-6 col-lg-6">{title}</div><div class="col-sm-6 col-lg-6">{createDate}</div></div>'
            )
    }

});
