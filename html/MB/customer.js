if (!window.agentmanage.admin.pageCustomer.customer){
    agentmanage.admin.pageCustomer.customer = {};
}

agentmanage.admin.pageCustomer.customer.loadPage = function (session) {
    webix.ui({
        id: agentmanage.admin.pageCustomer.itemId,
        rows: [
            {view:"label",label:"customer"}
        ]
    }, $$(agentmanage.admin.pageCustomer.itemId))
}