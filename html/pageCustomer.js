if (!window.agentmanage.admin.pageCustomer){
    agentmanage.admin.pageCustomer = {};
    agentmanage.admin.pageCustomer.itemId = "agentmanage.admin-pageCustomer";
}

agentmanage.admin.pageCustomer.loadPage = function (session) {
    agentmanage.admin.methods.setNavbar('pageCustomer');
    var tabbarList = '';
    for(i in session.menus){
        if(session.menus[i].id == 'pageCustomer'){
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
                            agentmanage.admin.pageCustomer[itemId].loadPage(session);
                        });
                    },
                    onAfterTabClick:function (id) {
                        //console.log(id)
                        var clickDate = new Date().getTime();
                        webix.require("html/"+ viewPort + "/" + id + ".js?clickDate=" + clickDate, function () {
                            agentmanage.admin.pageCustomer[id].loadPage(session);
                        });
                    }
                }
            },
            {
                id:agentmanage.admin.pageCustomer.itemId,
                template:""
            }
        ]
    },$$(agentmanage.admin.panelId))
}