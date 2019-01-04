if (!window.agentmanage.admin.pageOrganize.group){
    agentmanage.admin.pageOrganize.group = {};
}

agentmanage.admin.pageOrganize.group.loadPage = function (session) {
    webix.ui({
        id: agentmanage.admin.pageOrganize.itemId,
        rows: [
            {view:"label",label:"group"}
        ]
    }, $$(agentmanage.admin.pageOrganize.itemId))
}