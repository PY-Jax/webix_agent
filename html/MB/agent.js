if (!window.agentmanage.admin.pageOrganize.agent){
    agentmanage.admin.pageOrganize.agent = {};
}

agentmanage.admin.pageOrganize.agent.loadPage = function (session) {
    webix.ui({
        id: agentmanage.admin.pageOrganize.itemId,
        rows: [
            {view:"label",label:"agent"}
        ]
    }, $$(agentmanage.admin.pageOrganize.itemId))
}