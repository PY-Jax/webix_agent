if (!window.agentmanage.admin.pageOrganize.region){
    agentmanage.admin.pageOrganize.region = {};
}

agentmanage.admin.pageOrganize.region.loadPage = function (session) {
    webix.ui({
        id: agentmanage.admin.pageOrganize.itemId,
        rows: [
            {view:"label",label:"region"}
        ]
    }, $$(agentmanage.admin.pageOrganize.itemId))
}