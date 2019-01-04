webix.ready(function() {
    var logviewId = webix.uid();
    var appWidth = $(window).width();
    var doLogin = function (formValues){
        webix.ajax().post('/admin/login',formValues).then(function (result) {
            var resp = result.json();
            if (resp.code===0){
                window.location.href = "/admin";
            }else{
                webix.message({type: resp.msgtype, text:resp.msg,expire:2000});
            }
        }).fail(function (xhr) {
            webix.message({type: 'error', text: "登录失败:"+xhr.statusText,expire:2000});
        });
    };
    webix.ui({
        css: "login-page",
        rows: [
            
            { height: appWidth<600?80:150 },
            {
                align: "center,middle",
                body: {
                    css: "login-win",
                    rows: [
                        {
                            width: appWidth<600?300:400,
                            autoheight: true,
                            rows: [
                                {
                                    css: "login-title",
                                    height: 60,
                                    view: "label",
                                    template: "代理商平台登录"
                                },
                                {
                                    cols: [
                                        { width: 20 },
                                        {
                                            css: "login-form",
                                            id: logviewId,
                                            view: "form",
                                            rules: {
                                                username: webix.rules.isNotEmpty,
                                                password: webix.rules.isNotEmpty,
                                            },
                                            elements: [
                                                { view: "text", name: "username", placeholder: "请输入用户名", height: 50 },
                                                { view: "text", name: "password", type: 'password', placeholder: "请输入密码", height: 50 },
                                                { height: 5 },
                                                {
                                                    margin: 3, cols: [
                                                        {
                                                            view: "button",
                                                            label: "登 录",
                                                            value: "Login",
                                                            type: "form",
                                                            height: 50,
                                                            hotkey: "enter",
                                                            click: function (id) {
                                                                if (!$$(logviewId).validate()) {
                                                                    webix.message({ type: "error", text: "请正确填写帐号密码", expire: 2000 });
                                                                    return false;
                                                                }
                                                                doLogin($$(logviewId).getValues())
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        { width: 20 }
                                    ]

                                }
                            ]
                        }
                    ]
                }
            },
            {},
            // {
            //     height: 120,
            //     css: "login-footer",
            //     align: "center,middle",
            //     body: {
            //         rows: [
            //             {
            //                 width: 700,
            //                 view: 'label',
            //                 align: 'center',
            //                 label: "Copyright" + '&copy' + "2018 hunan. All Rights Reserved."
            //             },
            //             {
            //                 width: 700,
            //                 view: 'label',
            //                 align: 'center',
            //                 label: "版权所有"
            //             }
            //         ]
            //     }
            // }
        ]
    })
});
