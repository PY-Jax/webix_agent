if (!window.agentmanage.admin.pageOrganize.demo){
    agentmanage.admin.pageOrganize.demo = {};
}

agentmanage.admin.pageOrganize.demo.loadPage = function (session) {
    var tableid = webix.uid();
    var queryid = webix.uid();
    var args = [];
    var searchItems = {};
    var reloadData = function (args) {
        $$(tableid).define("url", $$(tableid));
        $$(tableid).refresh();
        $$(tableid).clearAll();
        $$(tableid).load('/json/agent.json?' + args.join("&"));
    };
    webix.ui({
        id: agentmanage.admin.pageOrganize.itemId,
        rows: [
            {
                view: "toolbar",
                css: "page-toolbar",
                borderless:true,
                paddingX:6,
                cols: [
                    {
                        view: "button",type:"icon",icon: "mdi mdi-light mdi-magnify",autowidth: true,click:function () {
                            agentmanage.admin.pageOrganize.demo.searchBox();
                        }
                    },
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
                view:"dataview",
                css:"dataviewBox",
                select:true,
                url:"/json/agent.json",
                type: {
                    height: 80,
                    width:appWidth,
                },
                template:function(obj){
                    return `
                        <div class='dataviewCss' style='width:100%;height:100%;'>
                            <div class="borderBox">
                                <div class='conts-box'>
                                <p>名称：${obj.name}</p>
                                <p>电话：${obj.mobile}</p>
                                <p>创建时间：${obj.createTime}</p>
                            </div>
                            <div class='btn-box'>
                                <div class='btnDetails'>详情</div>
                            </div>
                        </div>
                    `
                },
                onClick:{
                    "btnDetails":function(e, id, trg){
                        var item = this.getItem(id);
                        agentmanage.admin.pageOrganize.demo.Detailqgits(trg,item)
            
                    }
                }
            }
        ]
    }, $$(agentmanage.admin.pageOrganize.itemId))

    // 搜索
    agentmanage.admin.pageOrganize.demo.searchBox = function(){
        var winid = webix.uid();
        if ($$(winid)) {
            return;
        }
        console.log(searchItems)
        webix.ui({
            view:"popup",
            id:winid,
            fullscreen:true,
            position:function(state){ 
                state.left = 0;
                state.top = 0;
                state.width = appWidth;
                state.height = 134;
            },
            body:{
                id: queryid,
                view: "form",
                css:"searchBox",
                margin:0,
                paddingX:8,
                paddingY:4,
                borderless:true,
                rows:[
                    {
                        cols:[
                            {view: "text", name: "code",value:searchItems.code,placeholder: "关键字"},
                            {view:"datepicker",name:"selectTime",value:searchItems.selectTime,stringResult:true,format: "%Y-%m-%d",placeholder: "选择日期"},
                            
                        ]
                    },
                    {
                        view:"combo", 
                        id:"combo",
                        name:"num",
                        placeholder: 'Combo',
                        options:["One", "Two", "Three"]
                    },
                    {
                        cols:[
                            {
                                view: "button",
                                label: "查询",
                                type: "form",
                                autowidth: true,
                                click: function () {
                                    var params = $$(queryid).getValues();
                                    searchItems = params;
                                    for (var k in params) {
                                        args.push(k + "=" + params[k]);
                                    }
                                    reloadData(args);
                                }
                            },
                            {
                                view: "button",
                                label: "清空",
                                autowidth: true,
                                click: function () {
                                    // $$(queryid).define("value","");
                                    $$(queryid).reconstruct();
                                }
                            }
                        ]
                    }
                    
                ]
            }
        }).show();
    }
    
}



// 详情
agentmanage.admin.pageOrganize.demo.Detailqgits = function(trg,item){
    console.log(item)
    var winid = webix.uid();
    if ($$(winid)) {
        return;
    }
    var formid = winid + "_form";
    webix.ui({
        view:"popup",
        id:winid,
        autoHeight: true,
        width:300,
        //modal: true,
        //move: true,
        position:"center",
        body:{
            id: formid,
            template:function(){
                return `
                    <div>
                        <p>代理商名称：${item.name}</p>
                        <p>代理商联系人：${item.contact}</p>
                        <p>联系电话：${item.mobile}</p>
                        <p>联系地址：${item.address}</p>
                        <p>联系邮箱：${item.email}</p>
                        <p>创建时间：${item.createTime}</p>
                    </div>
                `
            }
        }
    }).show(trg, { pos: "bottom"});
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
            state.top = 0;
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
                    width:appWidth,
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
            state.top = 0;
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
                    width:appWidth,
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