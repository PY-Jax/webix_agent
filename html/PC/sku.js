if (!window.agentmanage.admin.pageProduct.sku){
    agentmanage.admin.pageProduct.sku = {};
}

agentmanage.admin.pageProduct.sku.loadPage = function (session) {
    webix.ui({
        id: agentmanage.admin.pageProduct.itemId,
        rows: [
            {view:"label",label:"sku"}
        ]
    }, $$(agentmanage.admin.pageProduct.itemId))
}