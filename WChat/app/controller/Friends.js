Ext.define('WChat.controller.Friends', {
    extend: 'Ext.app.Controller',
    requires: ['WChat.helpers'],
    config: {
        refs: {
            friendsList: 'friends',
            mainContainer: 'mainContainer',
            groupChatAddList: 'groupChatAddList',
            sureButton: 'mainContainer #sure',
            //mainAdd: 'mainContainer #add',
            //mainSearch: 'mainContainer #search'
        },
        control: {
            friendsList: {
                initialize: 'initFriends',
                itemtap: 'onFriendTap',
            },
            groupChatAddList: {
                initialize: 'initGroupChatAddList',
                itemtap: 'onGroupChatAddListTap',
            },
            sureButton: {
                tap: 'onSureButtonTap'
            }
        },
        friendArray: new Array()
    },
    initFriends: function () {
        this.loadFriends(this.getFriendsList());
    },
    initGroupChatAddList: function () {
        this.loadFriends(this.getGroupChatAddList());
    },
    onGroupChatAddListTap: function (list, idx, el, record, e) {
        var friendArray = this.getFriendArray(),
        friendid = record.get('friendUserId'),
        sureButton = this.getSureButton();
        var checkbox = Ext.get(e.target);

        if (checkbox.dom.type == 'checkbox') {
            var ck = checkbox.getAttribute('checked');
            if (ck) {
                friendArray = friendArray.filter(function (val) {
                    return val != friendid;
                });
                if (friendArray.length == 0) {
                    sureButton.hide();
                }
            }
            else {
                friendArray.push(friendid);
                if (sureButton.isHidden()) {
                    sureButton.show();
                }
            }
        }
    },
    onSureButtonTap: function (btn) {
        var arr = this.getFriendArray();
        //var arr1 = new Array();
        //arr1.join(',');
        if (arr.length > 0) {
            Ext.Ajax.request({
                scope: this,
                url: '../api/userroom?friends=' + arr.join(','),
                method: 'POST',
                //params: {
                //    friends: arr.join(',')
                //},
                //jsonData: {
                //    friends: arr.join(',')
                //},
                callback: function () {
                    Ext.Viewport.setMasked(false);
                },
                success: function (response) {
                    var datas = Ext.util.JSON.decode(response.responseText),
                        title = datas.title,
                        roomId = datas.roomId,
                            messageStore = Ext.getStore('Messages').load();

                    WChat.helpers.setRoomId(roomId);
                    messageStore.clearFilter(true);
                    messageStore.filterBy(function (message) {
                        return roomId == message.get('roomId');
                    });

                    if (!this.chat) {
                        this.chat = Ext.widget('chat');
                    }
                    this.chat.config.title = title;
                    this.getMainContainer().push(this.chat);
                },
                failure: function () {
                    Ext.Msg.alert("加载失败", "加载失败.");
                }
            });
        }
    },
    onFriendTap: function (list, idx, el, record) {
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: 'Loading...'
        });
        Ext.Ajax.request({
            scope: this,
            url: '../api/messages?friendUserId=' + record.get('friendUserId'),
            callback: function () {
                Ext.Viewport.setMasked(false);
            },
            success: function (response) {
                var datas = Ext.util.JSON.decode(response.responseText),
                    //userId = WChat.helpers.getUserId(),
                store = Ext.getStore("Messages");
                store.applyData(datas);
                //me.getFriendsList().setStore(store);
                WChat.helpers.setRoomId(datas);////////////////
                if (!this.chat) {
                    this.chat = Ext.widget('chat');
                }
                //var tt = messageStore;
                this.chat.config.title = record.get('friendName') ? record.get('friendName') : record.get('nickName');
                this.getMainContainer().push(this.chat);
            },
            failure: function () {
                Ext.Msg.alert("加载失败", "加载失败.");
            }
        });
    },
    loadFriends: function (list) {
        Ext.Ajax.request({
            url: '../api/friends?userId=' + WChat.helpers.getUserId(),
            //params: { id: 'cdd255b6-78db-4567-e0bc-50d984ae28aa' },
            callback: function () {
                Ext.Viewport.setMasked(false);
            },
            success: function (response) {
                var datas = Ext.util.JSON.decode(response.responseText),
                    //userId = WChat.helpers.getUserId(),
                store = Ext.getStore("Friends");
                store.applyData(datas);
                //list.setStore(store);

            },
            failure: function () {
                Ext.Msg.alert("加载失败", "加载失败.");
            }
        });
    }

});