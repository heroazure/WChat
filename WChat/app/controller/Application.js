Ext.define('WChat.controller.Application', {
    extend: 'Ext.app.Controller',
    requires:['Ext.field.Search'],
    config: {
        refs: {
            mainContainer: 'mainContainer',
            tabMain: 'tabmain',
            tabBar: 'tabmain>tabbar',
            mainAdd: 'mainContainer #add',
            mainSearch: 'mainContainer #search',
            sureButton: 'mainContainer #sure',
            addGroup: 'overlay #addGroup',
            addFriend: 'overlay #addFriend',
            searchTextBox: {
                selector: 'mainContainer navigationBar searchfield',
                xtype: 'searchfield',
                width: '600px',
                placeHolder:'搜索朋友',
                autoCreate: true
            }
        },
        control: {
            mainContainer: {
                push: 'onMainPush',
                pop: 'onMainPop'
            },
            tabBar: {
                activetabchange: 'onActiveTabChange'
            },
            mainAdd: {
                tap: 'addTap'
            },
            mainSearch: {
                tap: 'searchTap'
            },
            addGroup: {
                tap: 'addGroupTap'
            },
            addFriend: {
                tap: 'addFriendTap'
            },
            searchTextBox: {
                clearicontap: 'onClearIconTap',
                keyup: 'onSearchKeyUp'
            }
        },

    },
    onMainPush: function (view, item) {
        this.changeTopComponent1();
    },
    onMainPop: function (view, item) {
        this.changeTopComponent2();
    },
    onActiveTabChange: function (tabBar, newTab, oldTab) {
        //var t = newTab.getTitle();
        //var m = this.getTabMain();
        //m.setTitle(t);
    },
    addGroupTap: function () {
        if (!this.friendList) {
            this.friendList = Ext.create('WChat.view.user.GroupChatAddList');
        }
        this.overlayItemsPush(this.friendList);
    },
    /*添加朋友*/
    addFriendTap:function(){
        if (!this.searchFriendList) {
            this.searchFriendList = Ext.create('WChat.view.SearchFriendList');
        }
        this.overlayItemsPush(this.searchFriendList);
        var navigationBar = this.getMainContainer().getNavigationBar();
        var tt = this.getSearchTextBox();
        navigationBar.doBoxInsert(2,tt);
    },
    addTap: function (icon) {
        if (!this.overlay) {
            this.overlay = Ext.create('WChat.view.OverLay');
        }
        this.overlay.showBy(icon);
    },
    onClearIconTap:function(){

    },
    onSearchKeyUp:function(){

    },
    searchTap: function (icon) {

    },
    overlayItemsPush: function (component) {
        this.getMainContainer().push(component);
        if (this.overlay) {
            this.overlay.hide();
        }
    },
    changeTopComponent1: function () {
        this.getMainAdd().hide();
        this.getMainSearch().hide();
        this.getSureButton().hide();
    },
    changeTopComponent2: function () {
        this.getMainAdd().show();
        this.getMainSearch().show();
        this.getSureButton().hide();
    }
});