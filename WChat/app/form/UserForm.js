Ext.define('WChat.form.UserForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.userform',

    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Password',
        'Ext.Toolbar',
        'Ext.Button'
    ],

    config: {
        items: [
            {
                xtype: 'fieldset',
                defaults: {
                    labelWidth: 100
                },
                title: '注册用户信息',
                items: [
                    {
                        xtype: 'textfield',
                        label: '用户名',
                        name: 'userName'
                    },
                    {
                        xtype: 'textfield',
                        label: '邮箱',
                        name: 'emailAddress'
                    },
                    {
                        xtype: 'passwordfield',
                        label: '密码',
                        name: 'password'
                    }
                ]
            },
            {
                xtype: 'toolbar',
                docked: 'bottom',
                ui: 'neutral',
                items: [
                    {
                        xtype: 'button',
                        action: 'SaveUser',
                        itemId: 'mybutton7',
                        iconCls: 'download',
                        text: '确定'
                    }
                ]
            },
            {
                xtype: 'titlebar',
                docked: 'top',
                title:'用户注册'
            }
        ]
    }

});