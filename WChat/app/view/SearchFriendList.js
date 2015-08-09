Ext.define('WChat.view.SearchFriendList', {

    extend: 'Ext.List',
    requires: [
        'Ext.XTemplate'],
    xtype: 'searchFriendList',

    config: {
        
        store: 'SearchFriends',
        variableHeights: true,

        //cls:''
        //useSimpleItems: true,
        itemTpl: Ext.create('Ext.XTemplate',
            '<div class="row"><div class="col-sm-12 col-lg-12">{userName}</div></div>')
    }

});
