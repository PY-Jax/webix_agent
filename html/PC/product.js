if (!window.agentmanage.admin.pageProduct.product){
    agentmanage.admin.pageProduct.product = {};
}

agentmanage.admin.pageProduct.product.loadPage = function (session) {
    webix.ui({
        id: agentmanage.admin.pageProduct.itemId,
        rows: [
            {view:"label",label:"product"}
        ]
    }, $$(agentmanage.admin.pageProduct.itemId))
}