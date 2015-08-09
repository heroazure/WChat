Ext.define('WChat.view.user.GroupChatAddList', {

    extend: 'Ext.List',
    requires: [
        'Ext.XTemplate'],
    xtype: 'groupChatAddList',

    config: {
        store: 'Friends',
        variableHeights: true,
        cls: 'x-list-groupadd',
        selectedCls:'selected-item',
        //cls:''
        //useSimpleItems: true,
        itemTpl: Ext.create('Ext.XTemplate',
            '<div class="row">',
            '<div class="col-sm-11 col-lg-11">{[this.showName(values.friendName,values.nickName)]}</div>',
            '<div class="col-sm-1 col-lg-1"><input type="checkbox" class="form-control" /></div>',
            '</div>',
            {
                showName: function (friendName, nickName) {
                    return friendName ? friendName : nickName;
                }
            })
    }

});
