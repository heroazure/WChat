/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/
//<debug>
//Ext.Loader.setPath({
//    'Ext': 'touch/src'
//});
//</debug>


Ext.application({
    name: 'WChat',

    title:'My Chat',
    requires: [
        'Ext.MessageBox',
        'WChat.helpers'
    ],
    models: ['Room',
        'User',
        'Message',
        'Friend'
    ],
    stores: ['Rooms',
    'Users',
    'Messages',
    'Friends',
    'SearchFriends'
    ],

    views: [
        'Main',
        'TabMain',
        //'room.Card',
        'room.List',
        'room.Chat',
        'user.List',
        'user.GroupChatAddList',
        'OverLay',
        'discover.Stack',
        'SearchFriendList'
    ],
    forms:['LoginForm',
        'UserForm'
    ],
    controllers: [
        'Security',
        'Rooms',
        'Friends',
        'Application'
    ],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function () {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: 'Loading...'
        });

        Ext.Ajax.request({
            url: '../api/security/IsAuthenticated',
            callback: function() {
                Ext.Viewport.setMasked(false);
            },
            success: function(response){
                var userId = Ext.util.JSON.decode(response.responseText),//Ext.Number.from(response.responseText, 0),
                    mainView;

                WChat.helpers.setUserId(userId);
                mainView = Ext.create('WChat.view.Main');

                Ext.Viewport.add(mainView);
                Ext.Viewport.setActiveItem(mainView);
            }
        });
        Ext.create('WChat.form.LoginForm', { fullscreen: true });

        var wchat = $.connection.WChatHub;
        WChat.helpers.setWchat(wchat);

        wchat.client.sendRoomMessge = function (message) {
            var ms = Ext.create('WChat.model.Message', {
                messageId: message.MessageId,
                text: message.Text,
                timestamp: message.Timestamp,
                userId: message.UserId,
                roomId: message.RoomId
            });
            Ext.getStore('Messages').add(ms);
        }
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
