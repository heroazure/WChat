Ext.define('WChat.view.user.List', {

    extend: 'Ext.List',
    requires: [
        'Ext.XTemplate'],
    xtype: 'friends',

    config: {
        tab: {
            title: '联系人',
            iconCls: 'user',
            badgeText: '5',

        },
        store: 'Friends',
        variableHeights: true,
        
        //cls:''
        //useSimpleItems: true,
        itemTpl:Ext.create('Ext.XTemplate',
            '<div class="row"><div class="col-sm-12 col-lg-12">{[this.showName(values.friendName,values.nickName)]}</div></div>',
            {
                showName: function (friendName,nickName) {
                    return friendName ? friendName : nickName;
                }
            })
    }

});
