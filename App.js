const VERSION = "0.6.2";
const PACKAGE_NAME = "xyz.xyazh.nikki";
const VERSION_ID = 13;

const PAGE_XML = require("./res/page.xml.js");
const Utils = require("./js/Utils.js");
const Page = require("./js/Page.js");
const PasswordManager = require("./js/PasswordManager.js");
const DataManager = require("./js/DataManager.js");
const EasyList = require("./js/EasyList.js");
const HtmlView = require("./js/HtmlView.js");

const App = function (DATA_CONTAINER) {
    this.VERSION = VERSION;
    this.VERSION_ID = VERSION_ID;
    this.DATA_CONTAINER = DATA_CONTAINER;
    this.PACKAGE_NAME = PACKAGE_NAME;
    this.config = storages.create(PACKAGE_NAME + ".config");
    this.APP_PATH = context.getFilesDir().getAbsolutePath();
    //this.APP_PATH = ".";

    this.date = new Date();
    this.password_manager = new PasswordManager(this);
    this.page = new Page(this);
    this.data_manager = new DataManager(this);


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
    this.DATA_CONTAINER.stringToColor = Utils.stringToColor;
    this.DATA_CONTAINER.stringToColorLight = Utils.stringToColorLight;

    this.seleTheme = function () {
        var theme_name = this.config.get("theme", "dis");
        switch (theme_name) {
            case "dark":
                this.darkTheme();
                break;
            case "dis":
                this.disTheme();
                break;
            default:
                this.disTheme();
                break;
        }
    }

    this.disTheme = function () {
        this.DATA_CONTAINER.ui_color = "#77aaff";
        this.DATA_CONTAINER.main_bg_color = "#ffffff";
        this.DATA_CONTAINER.dis_text_color = "#757575";
        this.DATA_CONTAINER.normal_text_color = "#000000";
        this.DATA_CONTAINER.tekoki_btn_text_color = "#666666";
        this.DATA_CONTAINER.setting_title_text_color = "#77aaff";
        this.DATA_CONTAINER.card_bg_color = "#ffffff";
        this.DATA_CONTAINER.tine_color = "#ffffff";
        this.DATA_CONTAINER.line_color = "#dadada";
        this.DATA_CONTAINER.button_color = "#03A9F4";
        this.DATA_CONTAINER.btn_text_color = "#ffffff";
    }

    this.darkTheme = function () {
        this.DATA_CONTAINER.ui_color = "#1a1a1a";
        this.DATA_CONTAINER.main_bg_color = "#333333";
        this.DATA_CONTAINER.dis_text_color = "#757575";
        this.DATA_CONTAINER.normal_text_color = "#bbbbbb";
        this.DATA_CONTAINER.tekoki_btn_text_color = "#666666";
        this.DATA_CONTAINER.setting_title_text_color = "#77aaff";
        this.DATA_CONTAINER.card_bg_color = "#444444";
        this.DATA_CONTAINER.tine_color = "#cccccc";
        this.DATA_CONTAINER.line_color = "#888888";
        this.DATA_CONTAINER.button_color = "#1a1a1a";
        this.DATA_CONTAINER.btn_text_color = "#757575";
    }

    this.main = () => {
        this.uiLoadFream();
        this.page.openMainPage();
    }

    this.nikkiUpdate = function () {
    }

    this.loadUI = function () {
        this.seleTheme();
        ui.layout(PAGE_XML);
    }

    this.uiLoadFream = function () {
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
                this.page.looking_nikki = null;
                this.nikkiUpdate();
                this.page.openNikki();
            } else if (this.page.is_write_nikki) {
                this.onReturn();
            } else if (this.page.is_setting) {
                this.page.openMainPage();
            } else if (this.page.is_look_viar) {
                this.page.openViAr();
            } else if (this.page.is_select_viar_for_parent || this.page.is_select_viar_for_links) {
                this.page.openWriteViAr();
            } else if (this.page.is_write_viar) {
                this.onReturnViar();
            } else {
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

    this.onReturn = function () {
        confirm("确认返回吗，你可能还未保存？").then((status) => {
            if (status) {
                this.nikkiUpdate();
                this.page.openNikki();
            }
        });
    }

    this.onReturnViar = function () {
        confirm("确认返回吗，你可能还未保存？").then((status) => {
            if (status) {
                this.page.openViAr();
                this.page.viar_manager.viarUpdate();
            }
        });
    }

    return this;
}

module.exports = App;