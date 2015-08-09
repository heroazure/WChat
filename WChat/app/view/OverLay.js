Ext.define('WChat.view.OverLay', {

    extend: 'Ext.Panel',
    xtype: 'overlay',
    requires: ['Ext.Panel', 'Ext.Button'],

    config: {
        layout: {
            type: 'vbox',
            //pack: 'center',
            align: 'stretch'
        },
        autoDestroy: false,
        // We give it a left and top property to make it floating by default
        left: 0,
        top: 0,
        style: 'background-color:#eee',
        // Make it modal so you can click the mask to hide the overlay
        modal: true,
        hideOnMaskTap: true,

        // Make it hidden by default
        hidden: true,

        // Set the width and height of the panel
        width: Ext.os.deviceType == 'Phone' ? 260 : 280,
        height: Ext.os.deviceType == 'Phone' ? '70%' : 300,

        // Here we specify the #id of the element we created in `index.html`
        //contentEl: 'content',

        // Style the content and make it scrollable
        //styleHtmlContent: true,
        //scrollable: true,

        // Insert a title docked at the top with a title
        defaults: {
            xtype: 'button',
            width: '100%',
            //height: Ext.os.deviceType == 'Phone' ? '25%' : 70,
            align: 'center',
            flex: 1,
            style: 'border-bottom:1px solid #eee;',
            ui: 'plain'
        },
        items: [
            { html: '<h3 style="width:100%;text-align:center;">扫一扫</h3>' },
            { itemId: 'addGroup', html: '<h3 style="width:100%;text-align:center;">发起群聊</h3>' },
            { itemId: 'addFriend', html: '<h3 style="width:100%;text-align:center;">添加朋友</h3>' },
            { html: '<h3 style="width:100%;text-align:center;">帮助与反馈</h3>' }
        ]
    }
});