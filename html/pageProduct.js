if (!window.agentmanage.admin.pageProduct){
    agentmanage.admin.pageProduct = {};
    agentmanage.admin.pageProduct.itemId = "agentmanage.admin-pageProduct";
}

agentmanage.admin.pageProduct.loadPage = function (session) {
    agentmanage.admin.methods.setNavbar('pageProduct');
    var tabbarList = '';
    for(i in session.menus){
        if(session.menus[i].id == 'pageProduct'){
            tabbarList = session.menus[i].data
        }
    }
    webix.ui({
        id: agentmanage.admin.panelId,
        rows: [
            {
                borderless:false, view:"tabbar", id:'tabbar', multiview:true,optionWidth: 100, options:tabbarList,
                on:{
                    onAfterRender:function(){
                        var itemId = tabbarList[0].id;
                        webix.require("html/"+ viewPort + "/" + itemId + ".js", function () {
                            agentmanage.admin.pageProduct[itemId].loadPage(session);
                        });
                    },
                    onAfterTabClick:function (id) {
                        //console.log(id)
                        var clickDate = new Date().getTime();
                        webix.require("html/"+ viewPort + "/" + id + ".js?clickDate=" + clickDate, function () {
                            agentmanage.admin.pageProduct[id].loadPage(session);
                        });
                    }
                }
            },
            {
                id:agentmanage.admin.pageProduct.itemId,
                template:""
            }
        ]
    },$$(agentmanage.admin.panelId))
}