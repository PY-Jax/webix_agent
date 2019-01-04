if (!window.agentmanage) {
    agentmanage = {};
}
agentmanage.admin = {};
agentmanage.admin.panelId = "agentmanage.admin-main-panel";
agentmanage.admin.actions = {};
agentmanage.admin.methods = {};

agentmanage.admin.methods.setNavbar = function(pageName){
    $('.navbar-btn').removeClass('active');
    $('.'+pageName).addClass('active');
};

webix.debug({ events: false, size: false });

if (!webix.env.touch && webix.env.scrollSize && webix.CustomScroll) {
    webix.CustomScroll.init();
}

var currentLang = navigator.language || navigator.browserLanguage;
console.log(currentLang);
webix.i18n.setLocale(currentLang);

var isMB = false,isPC = false,viewPort;
if (appBrowser.versions.mobile || appBrowser.versions.iPhone || appBrowser.versions.android) {
    isMB = true;
    viewPort = "MB";
    var appWidth = $(window).width();
}else{
    isPC = true;
    viewPort = "PC";
}

webix.ready(function () {
    webix.ajax().get('./json/session.json',{}).then(function (result) {
        var resp = result.json();
        if (resp.code === 1) {
            webix.message({type: "error", text: resp.msg});
            setTimeout(function () {
                window.location.href = "/";
            }, 2000);
            return false;
        }
        var session = resp.data;
        webix.ui({
            rows: [
                {
                    view:"toolbar",
                    css:"toolbar-css", 
                    padding:0,
                    margin:0,
                    height:50,
                    type:"space",
                    responsive:true,
                    cols:[
                        { view: "button", type: "htmlbutton",label:"<a href='./index.html' style='width:100%;height:100%;display:block;'><img src='./images/logo_title.png' style='width:100%;height:100%;' /></a>",width:220,},
                        {
                            minWidth:280,
                            id:"toolbar_navbar",
                            view: "template",
                            css:"navbar",
                            template:function(){
                                //console.log(session.menus);
                                var navbar_list = '';
                                for(i in session.menus){
                                    navbar_list += "<div class='navbar-btn "+session.menus[i].id+"' data_name='"+session.menus[i].id+"'><span>"+session.menus[i].value+"</span></div>"
                                }
                                return "<div class='navbar-box'>"+
                                    navbar_list+
                                "</div>"
                            },
                            onClick:{
                                "navbar-btn":function(e, id, trg){
                                    var data_name = trg.getAttribute("data_name");
                                    var get_class = trg.getAttribute("class");
                                    if(get_class.indexOf("active") > -1){
                                        return false;
                                    }
                                    webix.require("html/" + data_name + ".js", function () {
                                        agentmanage.admin[data_name].loadPage(session);
                                    });
                                },

                            },
                            on:{
                                onAfterRender: function () {
                                    webix.require("html/pageOrganize.js", function () {//
                                        agentmanage.admin.pageOrganize.loadPage(session);
                                    });
                                }
                            }
                        },
                        {view: "button",type:"icon",css:"app_button", icon: "mdi mdi-account",width: 38,popup:"app_button_pop"}
                    ]
                },
                {
                    id: agentmanage.admin.panelId,
                    template: ""
                }
            ]
        })
    });    

    webix.ui({
        view:"popup",
        id:"app_button_pop",
        width:100,
        body:{
            view:"list", 
            data:[ 
                {id:"1", name:"设置"},
                {id:"2", name:"退出"}
            ],
            datatype:"json",
            template:"#name#",
            autoheight:true,
            borderless:true,
            select:true,
            on:{
                onItemClick:function(id){
                    console.log(id)
                }
            }
        }
    });
})