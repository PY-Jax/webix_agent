if (!window.agentmanage.admin.pageFinance.agent_order){
    agentmanage.admin.pageFinance.agent_order = {};
}

agentmanage.admin.pageFinance.agent_order.loadPage = function (session) {
    webix.ui({
        id: agentmanage.admin.pageFinance.itemId,
        rows: [
            {view:"label",label:"agent_order"}
        ]
    }, $$(agentmanage.admin.pageFinance.itemId))
}