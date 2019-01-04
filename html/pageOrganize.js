if (!window.agentmanage.admin.pageOrganize){
    agentmanage.admin.pageOrganize = {};
    agentmanage.admin.pageOrganize.itemId = "agentmanage.admin-pageOrganize";
}

agentmanage.admin.pageOrganize.loadPage = function (session) {
    agentmanage.admin.methods.setNavbar('pageOrganize');
    var tabbarList = '';
    for(i in session.menus){
        if(session.menus[i].id == 'pageOrganize'){
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
                            agentmanage.admin.pageOrganize[itemId].loadPage(session);
                        });
                    },
                    onAfterTabClick:function (id) {
                        //console.log(id)
                        var clickDate = new Date().getTime();
                        webix.require("html/"+ viewPort + "/" + id + ".js?clickDate=" + clickDate, function () {
                            agentmanage.admin.pageOrganize[id].loadPage(session);
                        });
                    }
                }
            },
            {
                id:agentmanage.admin.pageOrganize.itemId,
                template:""
            }
        ]
    },$$(agentmanage.admin.panelId))
}

