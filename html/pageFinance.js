if (!window.agentmanage.admin.pageFinance){
    agentmanage.admin.pageFinance = {};
    agentmanage.admin.pageFinance.itemId = "agentmanage.admin-pageFinance";
}

agentmanage.admin.pageFinance.loadPage = function (session) {
    agentmanage.admin.methods.setNavbar('pageFinance');
    var tabbarList = '';
    for(i in session.menus){
        if(session.menus[i].id == 'pageFinance'){
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
                            agentmanage.admin.pageFinance[itemId].loadPage(session);
                        });
                    },
                    onAfterTabClick:function (id) {
                        //console.log(id)
                        var clickDate = new Date().getTime();
                        webix.require("html/"+ viewPort + "/" + id + ".js?clickDate=" + clickDate, function () {
                            agentmanage.admin.pageFinance[id].loadPage(session);
                        });
                    }
                }
            },
            {
                id:agentmanage.admin.pageFinance.itemId,
                template:""
            }
        ]
    },$$(agentmanage.admin.panelId))
}