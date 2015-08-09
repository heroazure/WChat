Ext.define('WChat.controller.Security', {
    extend: 'Ext.app.Controller',
    requires: ['WChat.helpers', 'WChat.view.Main', 'WChat.form.LoginForm'],
    config: {
        refs: {
            loginForm: 'loginform'
        },

        control: {
            "button[action=Login]": {
                tap: 'onLoginTap'
            },
            "button[action=Logout]": {
                tap: 'onLogoutTap'
            },
            "button[action=Register]": {
                tap: 'onRegisterTap'
            },
            "button[action=SaveUser]": {
                tap: 'onUserSaveTap'
            }
        }
    },
    onRegisterTap: function () {
        var approverId = 1,
        isOnLine = false;
        var record = Ext.create('WChat.model.User', {
            approverID: approverId,
            isOnLine: isOnLine
        });
        var userForm = Ext.create('WChat.form.UserForm', {
            title: "用户注册",
            record: record
        });
        Ext.Viewport.add(userForm);
        Ext.Viewport.setActiveItem(userForm);
    },

    onLoginTap: function (button, e, eOpts) {
        var loginForm = this.getLoginForm(),
            values = loginForm.getValues();

        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: 'Logging In...'
        });
        //var mainView = Ext.create('widget.main');
        
        Ext.Ajax.request({
            url: '../api/security/login',
            params: values,
            callback: function () {
                Ext.Viewport.setMasked(false);
            },
            success: function (response) {
                var userId = Ext.util.JSON.decode(response.responseText),//Ext.Number.from(response.responseText, 0),
                    mainView;
               //var tt= Ext.create('WChat.form.LoginForm', { fullscreen: true });
                WChat.helpers.setUserId(userId);//这个要放在create之前，不然Rooms控制器下的initRooms方法内的getUserId()将获取不到
                mainView=Ext.create('WChat.view.Main');
                //var id = WChat.helpers.getUserId();
                //Ext.getStore('Messages').load();
                //Ext.getStore('Rooms').load();
                //Ext.getStore('Users').load();

                Ext.Viewport.add(mainView);
                Ext.Viewport.setActiveItem(mainView);
            },
            failure: function () {
                Ext.Msg.alert("登录失败", "登录信息不匹配.");
            }
        });
    },

    onLogoutTap: function (button, e, eOpts) {
        var loginForm = this.getLoginForm();

        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: 'Logging Out...'
        });

        Ext.Ajax.request({
            url: '../api/security/logout',
            callback: function () {
                Ext.Viewport.setMasked(false);
            },
            success: function (response) {
                loginForm.reset();
                WChat.helpers.setUserId(0);
                Ext.Viewport.setActiveItem(0);
            },
            failure: function () {
                Ext.Msg.alert("退出登录", "退出登录失败.");
            }
        });
    },
    onUserSaveTap: function (button, e, eOpts) {
        var form = button.up('formpanel');

        this.saveUserRecord(form);
    },
    saveUserRecord: function (form) {
        var me = this,
            values = form.getValues(),
            record = form.getRecord(),
            newRecord = record.phantom;

        if (newRecord) {
            record.set('userId', '00000000-0000-0000-0000-000000000000');//////
        }

        record.beginEdit();

        record.set(values);

        if (record.isValid()) {
            Ext.Viewport.setMasked({
                xtype: 'loadmask',
                message: 'Saving...'
            });

            record.save({
                callback: function () {
                    Ext.Viewport.setMasked(false);
                },
                success: function () {
                    record.endEdit();
                    if (newRecord) {
                        Ext.Viewport.setActiveItem(0);
                    }
                    else
                        me.getMainView().pop();
                },
                failure: function (resp, opts) {
                    record.cancelEdit();

                    var respText = Ext.util.JSON.decode(resp.responseText);
                    Ext.Msg.alert('错误', respText.error);
                    //var obj=Ext.decode(response.responseText);
                    //var obj = Ext.JSON.decode(result, true);
                }
            });
        }
        else {
            var errors = record.validate(),
                message = "Please resolve the following errors with the record:<br><br>";

            record.cancelEdit();

            for (var i = 0; i < errors.items.length; i++) {
                message += "<li>" + errors.items[i].getField() + " " + errors.items[i].getMessage();
            }

            Ext.Msg.alert("Error", message);
        }

    //    Ext.Ajax.request({
    //        url   : record.phantom '/users' : '/users/' + record.get('user_id'),
    //    method: record.phantom 'POST'   : 'PUT',
    //    params: changes,
    //    success: function() {
    //        //post-processing here - this might include reloading the grid if there are calculated fields
    //    }
    //}); 
    }

});