if (!window.agentmanage.admin.pageOrganize.demo){
    agentmanage.admin.pageOrganize.demo = {};
}

agentmanage.admin.pageOrganize.demo.loadPage = function (session) {
    var tableid = webix.uid();
    var queryid = webix.uid();
    var reloadData = function () {
        $$(tableid).define("url", $$(tableid));
        $$(tableid).refresh();
        $$(tableid).clearAll();
        var params = $$(queryid).getValues();
        var args = [];
        for (var k in params) {
            args.push(k + "=" + params[k]);
        }
        $$(tableid).load('./json/agent.json?' + args.join("&"));
    };

    webix.ui({
        id: agentmanage.admin.pageOrganize.itemId,
        rows: [
            {
                id:queryid,
                view: "toolbar",
                css: "page-toolbar",
                cols: [
                    { view:"segmented", name:"goods",width:400,options:[{ id:1,value:"全部" },{ id:2,value:"电视IPTV" },{ id:3,value:"路由" },{ id:4,value:"计费" }],on:{
                        onAfterRender:function(){
                            console.log('segmented')
                            reloadData();
                        },
                        onAfterTabClick:function(id){
                            console.log(id)
                            reloadData();
                        }
                    } },
                    { 
                        view:"richselect", width:300,
                        value:1, options:[
                            { id:1, value:"Banana"   }, 
                            { id:2, value:"Papaya"   }, 
                            { id:3, value:"Apple" }
                        ]
                    },
                    {view: "text", name: "code",id: "code",placeholder: "关键字", width: 160},
                    {
                        view: "button",
                        label: "查询",
                        autowidth: true,
                        click: function () {
                            reloadData();
                        }
                    },
                    {},
                    {
                        view: "button",
                        label: "增加",
                        autowidth: true,
                        click: function () {
                            agentmanage.admin.pageOrganize.demo.add(function () {
                                reloadData();
                            });
                        }
                    },
                    {
                        view: "button",
                        label: "修改",
                        autowidth: true,
                        click: function () {
                            var item = $$(tableid).getSelectedItem();
                            if(!item){
                                webix.message({type: 'error', text: '请选择一条数据', expire: 2000});
                                return false;
                            }
                            console.log(item);
                            agentmanage.admin.pageOrganize.demo.edit(item,function () {
                                reloadData();
                            });
                        }
                    },
                    {
                        view: "button",
                        label: "删除",
                        css:"btn-delete",
                        autowidth: true,
                        click: function () {
                            var item = $$(tableid).getSelectedItem();
                            if(!item){
                                webix.message({type: 'error', text: '请选择一条数据', expire: 2000});
                                return false;
                            }
                            agentmanage.admin.pageOrganize.demo.delete(item.code,function () {
                                reloadData();
                            })
                        }
                    }
                ]
            },
            {
                id:tableid,
                view:"datatable",
                columns:[
                    { id:"fileName",header:"名称", template:"{common.treetable()} #name#",width:500 },
                    { id:"contact", header:["联系人"], width:120, sort:"string"},
                    { id:"mobile", header:["电话"],width:140, sort:"string"},
                    { id:"address", header:["地址"], width:150, sort:"string",fillspace:true},
                    { id:"email",header:["邮箱"], sort:"string",fillspace:true},
                    { id:"createTime",header:["创建时间"], sort:"string",fillspace:true},
                    {
                        id: "act", header: ["操作"], fillspace: true, template: function (obj) {
                            return "<span class='dt_btn'>查看</span><span class='dt_btn red_btn'>删除</span>";
                        }
                    },
                    { header: { content: "headerMenu" }, headermenu: false,width:35}
                ],
                onClick: {
                    
                },
                select:true,
                resizeColumn:true,
                autoWidth:true,
                autoHeight:true,
                // url:"./json/agent.json",
            }

        ]
    }, $$(agentmanage.admin.pageOrganize.itemId));
}

// 增加
agentmanage.admin.pageOrganize.demo.add = function(callback){
    var winid = "add";
    if ($$(winid)) {
        return;
    }
    var formid = winid + "_form";
    webix.ui({
        view:"window",
        id:winid,
        fullscreen:true,
        modal: true,
        //move: true,
        position:function(state){ 
            state.left = 0;
            state.top = 93;
            state.right = 0;
            state.bottom = 0;
        },
        head: {
            view: "toolbar",
            css: "page-toolbar",
            cols: [
                {view:"label",label:"增加代理商"}
            ]
        },
        body:{
            cols:[
                {
                    id: formid,
                    view: "form",
                    width:600,
                    scroll: true,
                    borderless:true,
                    elementsConfig: {},
                    elements: [
                        {
                            view: "text",
                            hidden:true,
                            labelWidth: 100,
                            name: "code",
                            id: "code",
                            label: "code",
                        },
                        {
                            view: "text",
                            labelWidth: 100,
                            name: "name",
                            id: "name",
                            label: "代理商名称",
                        },
                        {
                            view: "text",
                            name: "contact",
                            id: "contact",
                            label: "代理商联系人",
                            labelWidth: 100,
                        },
                        {
                            view: "text",
                            name: "mobile",
                            id: "mobile",
                            label: "代理商电话",
                            labelWidth: 100,
                        },                
                        {
                            view: "text",
                            name: "email",
                            id: "email",
                            label: "联系邮箱",
                            labelWidth: 100,
                        },                {
                            view: "text",
                            name: "address",
                            id: "address",
                            label: "联系地址",
                            labelWidth: 100,
                        },
                        {
                            cols: [
                                {},
                                {
                                    view: "button",
                                    type: "form",
                                    value: "提交",
                                    autowidth: true,
                                    height: 36,
                                    click: function () {
                                        if ($$(formid).validate()) {
                                            var btn = this;
                                            var param = $$(formid).getValues();
                                            webix.ajax().post('/admin/agent/edit',param).then(function (result) {
                                                btn.enable();
                                                var resp = result.json();
                                                webix.message({type: resp.msgtype, text: resp.msg, expire: 3000});
                                                callback();
                                                $$(winid).close();
                                            })
                                        } else {
                                            webix.message({type: 'error', text: "请输入正确的数据格式", expire: 3000});
                                        }
                                    }
                                },
                                {
                                    view: "button",
                                    label: "取消",
                                    autowidth: true,
                                    click: function () {
                                        $$(winid).close();
                                    }
                                }
                            ]
                        }
                    ]
                },
                {}
            ]
            
        }
    }).show();
}

// 修改
agentmanage.admin.pageOrganize.demo.edit = function(item,callback){
    var winid = "edit";
    if ($$(winid)) {
        return;
    }
    var formid = winid + "_form";
    webix.ui({
        view:"window",
        id:winid,
        fullscreen:true,
        modal: true,
        //move: true,
        position:function(state){ 
            state.left = 0;
            state.top = 93;
            state.right = 0;
            state.bottom = 0;
        },
        head: {
            view: "toolbar",
            css: "page-toolbar",
            cols: [
                {view:"label",label:"修改代理商"}
            ]
        },
        body:{
            cols:[
                {
                    id: formid,
                    view: "form",
                    width:600,
                    scroll: true,
                    borderless:true,
                    elementsConfig: {},
                    elements: [
                        {
                            view: "text",
                            hidden:true,
                            labelWidth: 100,
                            name: "code",
                            id: "code",
                            label: "code",
                            value:item.code
                        },
                        {
                            view: "text",
                            labelWidth: 100,
                            name: "name",
                            id: "name",
                            label: "代理商名称",
                            value:item.name
                        },
                        {
                            view: "text",
                            name: "contact",
                            id: "contact",
                            label: "代理商联系人",
                            labelWidth: 100,
                            value:item.contact
                        },
                        {
                            view: "text",
                            name: "mobile",
                            id: "mobile",
                            label: "代理商电话",
                            labelWidth: 100,
                            value:item.mobile
                        },                
                        {
                            view: "text",
                            name: "email",
                            id: "email",
                            label: "联系邮箱",
                            labelWidth: 100,
                            value:item.email
                        },                {
                            view: "text",
                            name: "address",
                            id: "address",
                            label: "联系地址",
                            labelWidth: 100,
                            value:item.address
                        },
                        {
                            cols: [
                                {},
                                {
                                    view: "button",
                                    type: "form",
                                    value: "提交",
                                    autowidth: true,
                                    height: 36,
                                    click: function () {
                                        if ($$(formid).validate()) {
                                            var btn = this;
                                            var param = $$(formid).getValues();
                                            webix.ajax().post('/admin/agent/edit',param).then(function (result) {
                                                btn.enable();
                                                var resp = result.json();
                                                webix.message({type: resp.msgtype, text: resp.msg, expire: 3000});
                                                callback();
                                                $$(winid).close();
                                            })
                                        } else {
                                            webix.message({type: 'error', text: "请输入正确的数据格式", expire: 3000});
                                        }
                                    }
                                },
                                {
                                    view: "button",
                                    label: "取消",
                                    autowidth: true,
                                    click: function () {
                                        $$(winid).close();
                                    }
                                }
                            ]
                        }
                    ]
                },
                {}
            ]
            
        }
    }).show();
}

// 删除
agentmanage.admin.pageOrganize.demo.delete = function (id,callback) {
    webix.confirm({
        title: "操作确认",
        ok: "是", cancel: "否",
        text: "确认要删除吗，此操作不可逆。",
        callback: function (ev) {
            if (ev) {
                webix.ajax().post('/admin/agent/delete?ids='+id).then(function (result) {
                    var resp = result.json();
                    webix.message({type: resp.msgtype, text: resp.msg, expire: 2000});
                    if(callback){
                        callback()
                    }
                })
            }
        }
    });
}