if (!window.agentmanage.admin.pageFinance.system_statistical){
    agentmanage.admin.pageFinance.system_statistical = {};
}

agentmanage.admin.pageFinance.system_statistical.loadPage = function (session) {
    webix.ui({
        id: agentmanage.admin.pageFinance.itemId,
        rows: [
            {view:"label",label:"system_statistical"}
        ]
    }, $$(agentmanage.admin.pageFinance.itemId))
}