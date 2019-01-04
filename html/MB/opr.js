if (!window.agentmanage.admin.pageOrganize.opr){
    agentmanage.admin.pageOrganize.opr = {};
}

agentmanage.admin.pageOrganize.opr.loadPage = function (session) {
    webix.ui({
        id: agentmanage.admin.pageOrganize.itemId,
        rows: [
            {view:"label",label:"opr"}
        ]
    }, $$(agentmanage.admin.pageOrganize.itemId))
}