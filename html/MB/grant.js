if (!window.agentmanage.admin.pageCustomer.grant){
    agentmanage.admin.pageCustomer.grant = {};
}

agentmanage.admin.pageCustomer.grant.loadPage = function (session) {
    webix.ui({
        id: agentmanage.admin.pageCustomer.itemId,
        rows: [
            {view:"label",label:"grant"}
        ]
    }, $$(agentmanage.admin.pageCustomer.itemId))
}