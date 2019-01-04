if (!window.agentmanage.admin.pageProduct.sku_grant){
    agentmanage.admin.pageProduct.sku_grant = {};
}

agentmanage.admin.pageProduct.sku_grant.loadPage = function (session) {
    webix.ui({
        id: agentmanage.admin.pageProduct.itemId,
        rows: [
            {view:"label",label:"sku_grant"}
        ]
    }, $$(agentmanage.admin.pageProduct.itemId))
}