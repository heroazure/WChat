Ext.define('WChat.form.LoginForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.loginform',

    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Password',
        'Ext.Button',
        'Ext.Toolbar',
        'Ext.Panel'
    ],

    config: {
        items: [
            {
                xtype: 'fieldset',
                defaults: {
                    labelWidth: 110
                },
                title: '登录',
                items: [
                    {
                        xtype: 'textfield',
                        label: '邮箱',
                        name: 'emailAddress',
                        placeHolder:'请输入邮箱地址'
                    },
                    {
                        xtype: 'passwordfield',
                        label: '密码',
                        name: 'password',
                        placeHolder: '请输入密码'
                    }
                ]
            },
            {
                xtype: 'button',
                action: 'Login',
                itemId: 'mybutton6',
                margin: 50,
                text: '登录'
            },
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '欢迎进入聊天系统'
            },
            {
                xtype:'button',
                action: 'Register',
                text: '立即注册',
                margin:50
            }
        ]
    }

});