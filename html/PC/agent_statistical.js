if (!window.agentmanage.admin.pageFinance.agent_statistical){
    agentmanage.admin.pageFinance.agent_statistical = {};
}

agentmanage.admin.pageFinance.agent_statistical.loadPage = function (session) {
    webix.ui({
        id: agentmanage.admin.pageFinance.itemId,
        rows: [
            {view:"label",label:"agent_statistical"}
        ]
    }, $$(agentmanage.admin.pageFinance.itemId))
}