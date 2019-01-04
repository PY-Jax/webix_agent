if (!window.agentmanage.admin.pageCustomer.order){
    agentmanage.admin.pageCustomer.order = {};
}

agentmanage.admin.pageCustomer.order.loadPage = function (session) {
    webix.ui({
        id: agentmanage.admin.pageCustomer.itemId,
        rows: [
            {view:"label",label:"order"}
        ]
    }, $$(agentmanage.admin.pageCustomer.itemId))
}