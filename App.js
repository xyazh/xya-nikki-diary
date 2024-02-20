const VERSION = "0.4.6"

const PAGE_XML = require("./res/page.xml.js");
const Utils = require("./js/Utils.js");
const Page = require("./js/Page.js");
const PasswordManager = require("./js/PasswordManager.js");
const DataManager = require("./js/DataManager.js");

const App = function (DATA_CONTAINER) {
    this.VERSION = VERSION;
    this.date = new Date();
    this.password_manager = new PasswordManager(this);
    this.page = new Page(this);
    this.data_manager = new DataManager(this);

    this.DATA_CONTAINER = DATA_CONTAINER;
    this.DATA_CONTAINER.ui_color = "#77aaff";
    this.DATA_CONTAINER.page_number = 0;
    this.DATA_CONTAINER.title = "主页";
    this.DATA_CONTAINER.TEKOKI_TEXT_SIZE = 48;
    this.DATA_CONTAINER.addZero = Utils.addZero;
    this.DATA_CONTAINER.day = this.date.getDate();
    this.DATA_CONTAINER.month = this.date.getMonth() + 1;
    this.DATA_CONTAINER.year = this.date.getFullYear();
    this.DATA_CONTAINER.hours = Utils.addZero(this.date.getHours());
    this.DATA_CONTAINER.minu = Utils.addZero(this.date.getMinutes());
    this.DATA_CONTAINER.datetime = Date.parse(this.date);
    this.DATA_CONTAINER.week = "周" + "日一二三四五六".charAt(this.date.getDay());
    this.DATA_CONTAINER.tekoki_event = "默认";

    this.main = ()=>{
        this.uiLoadFream();
        this.page.openMainPage();
    }

    this.nikkiUpdate = function () {
    }

    this.uiLoadFream = function () {
        ui.layout(PAGE_XML);
        ui.statusBarColor(this.DATA_CONTAINER.ui_color);
        //让工具栏左上角可以打开侧拉菜单
        ui.toolbar.setupWithDrawer(ui.drawer);
        this.page.init();
        this.bindOnBack();
        this.data_manager.load();
    }

    this.bindOnBack = function () {
        ui.emitter.on("back_pressed", (e) => {
            e.consumed = true;
            if (this.page.is_look_nikki) {
                this.page.looking_nikki=null;
                this.nikkiUpdate();
                this.page.openNikki();
            }else if(this.page.is_write_nikki) {
                this.onReturn();
            }else {
                this.onExit();
            }
        });
    }

    this.onExit = function () {
        confirm("确认退出吗？").then((status) => {
            if (status) {
                ui.finish();
            }
        });
    }

    this.onReturn= function () {
        confirm("确认返回吗，你可能还未保存？").then((status) => {
            if (status) {
                this.nikkiUpdate();
                this.page.openNikki();
            }
        });
    }

    return this;
}

module.exports = App;