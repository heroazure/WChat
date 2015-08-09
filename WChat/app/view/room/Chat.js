Ext.define('WChat.view.room.Chat', {

    extend: 'Ext.List',
    requires: [
        'Ext.XTemplate',
        'Ext.field.Text',
        'Ext.Button',
        'Ext.plugin.PullRefresh'
    ],
    xtype: 'chat',

    config: {
        store: 'Messages',
        variableHeights: true,
        disableSelection:true,
        useSimpleItems: false,
        itemTpl:Ext.create('Ext.XTemplate', 
			'<div class="row" {[this.alignRight(values.userId)]}>',
            '<div class="col-sm-12 col-lg-12">{text}<br />{timestamp}</div>',
            '</div>', {
                alignRight: function (userId) {
                    if (userId == WChat.helpers.getUserId())
                        return "style = \"text-align:right;\"";
                    return "";
                }
            }
        ),
        ui:'round',
        emptyText:'你们可以开始聊天了',
        plugins: 'pullrefresh',
        items: [{
            docked: 'bottom',
            xtype: 'toolbar',
            items: [{
                xtype: 'textfield',
                name:'sendText',
                placeHolder: '输入内容',
                width:'80%'
            }, {
                xtype: 'button',
                text: '发送',
                action:'send'
            }]
        }]
    }
});