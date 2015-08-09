Ext.define('WChat.controller.Rooms', {
    extend: 'Ext.app.Controller',
    requires: ['WChat.helpers'],
    config: {
        refs: {
            roomsList: 'rooms',
            roomContainer: 'roomContainer',
            mainContainer: 'mainContainer',
            chat: 'chat',
            sendButton: 'button[action=send]',
            sendText: 'chat textfield[name=sendText]'
        },
        control: {
            roomsList: {
                initialize: 'initRooms',
                itemtap: 'onRoomTap',
                activate: 'onRoomsActivate'
            },
            chat: {
                initialize:'initChat'
            },
            sendButton: {
                tap:'onSendTap'
            },
            //mainContainer: {
            //    initialize: 'initMainContainer'
            //}
        },
        roomId: null,
    },
    initRooms: function () {
        var me = this;
        
        Ext.Ajax.request({
            url: '../api/users/rooms?id=' + WChat.helpers.getUserId(),
            //params: { id: 'cdd255b6-78db-4567-e0bc-50d984ae28aa' },
            callback: function () {
                Ext.Viewport.setMasked(false);
            },
            success: function (response) {
                var datas = Ext.util.JSON.decode(response.responseText),
                    //userId = WChat.helpers.getUserId(),
                store = Ext.getStore("Rooms");
                store.applyData(datas);
                //var r = this.getRooms();
                //me.getRoomsList().setStore(store);
                
            },
            failure: function () {
                Ext.Msg.alert("加载失败", "加载失败.");
            }
        });
    },
    //initMainContainer: function () {
    //    $(function () {
    //        $("#ext-titlebar-2").hide();
    //    });
        
    //},
    onRoomTap: function (list, idx, el, record) {
        var messageStore = Ext.getStore('Messages').load(),
			roomId = record.get('roomId');
        //this.setRoomId(roomId);
        WChat.helpers.setRoomId(roomId);
        messageStore.clearFilter(true);
        messageStore.filterBy(function (message) {
            return roomId== message.get('roomId');
        });

        if (!this.chat) {
            this.chat = Ext.widget('chat');
        }
        //var tt = messageStore;
        this.chat.config.title = record.get('title');
        this.getMainContainer().push(this.chat);
    },
    onRoomsActivate: function () {
        if (this.chat) {
            this.chat.deselectAll();
        }
    },

    /*Chat聊天室的操作*/
    initChat: function () {
        var me = this;
        //if (!me.wchat) {
        //    me.wchat = $.connection.WChatHub;
        //}
        var wchat = WChat.helpers.getWchat();
        //打开连接
        $.connection.hub.start().done(function () {
            //连接打开后将roomId发送到服务器加入group
            wchat.server.userConnected(WChat.helpers.getRoomId());
        }).fail(function () {
            console.log('Could not Connect!');
        });
    },
    onSendTap: function () {
        var me = this;
        //if (!me.wchat) {
        //    me.wchat = $.connection.WChatHub;
        //}
        var wchat = WChat.helpers.getWchat();
        //$.connection.hub.start().done(function () {
        var r = WChat.helpers.getRoomId(),
            t = me.getSendText().getValue();
        $.connection.hub.start();
        wchat.server.sendRoomMessage(r, t, WChat.helpers.getUserId());
        //});
    }
});
