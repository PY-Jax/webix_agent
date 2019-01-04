if (!window.agentmanage.admin.pageFinance.customer_statistical){
    agentmanage.admin.pageFinance.customer_statistical = {};
}

agentmanage.admin.pageFinance.customer_statistical.loadPage = function (session) {
    webix.ui({
        id: agentmanage.admin.pageFinance.itemId,
        rows: [
            {view:"label",label:"customer_statistical"}
        ]
    }, $$(agentmanage.admin.pageFinance.itemId))
}