const PasswordManager = require("./PasswordManager.js");
const TekokiBinder = require("./TekokiBinder.js");
const NikkiBinder = require("./NikkiBinder.js");
const SettingBinder = require("./SettingBinder.js");
const ViArBinder = require("./ViArBinder.js");
const Utils = require("./Utils.js");

const MENU_LIST = [{
    title: "主页",
    icon: "@drawable/ic_home_black_48dp"
},
{
    title: "日记",
    icon: "@drawable/ic_class_black_48dp"
},
{
    title: "记录",
    icon: "@drawable/ic_create_black_48dp"
},
{
    title: "故事集",
    icon: "@drawable/ic_device_hub_black_48dp"
},
{
    title: PasswordManager.hasPassword() ? "修改密码" : "创建密码",
    icon: "@drawable/ic_https_black_48dp"
},
{
    title: "导出",
    icon: "@drawable/ic_file_upload_black_48dp"
},
{
    title: "导入",
    icon: "@drawable/ic_file_download_black_48dp"
},
{
    title: "设置",
    icon: "@drawable/ic_settings_black_48dp"
},
{
    title: "退出",
    icon: "@drawable/ic_exit_to_app_black_48dp"
}];

const Page = function (app) {
    this.app = app;
    this.is_main_page = false;
    this.is_nikki = false;
    this.is_look_nikki = false;
    this.is_write_nikki = false;
    this.is_tekoki = false;
    this.is_setting = false;
    this.is_viar = false;
    this.is_look_viar = false;
    this.is_write_viar = false;
    this.looking_nikki = null;
    this.temp_nikki = null;
    this.is_select_viar_for_parent = false;
    this.is_select_viar_for_links = false;

    this.init = function () {
        this.fh = ui.fh;
        this.main_page = ui.main_page;
        this.nikki = ui.nikki;
        this.look_nikki = ui.look_nikki;
        this.write_nikki = ui.write_nikki;
        this.tekoki = ui.tekoki;
        this.menu = ui.menu;
        this.toolbar = ui.toolbar;
        this.setting = ui.setting;
        this.nikki_count = ui.tj;
        this.input_nikki = ui.inp;
        this.inp_ymd_btn = ui.Tset;
        this.inp_hm_btn = ui.tset;
        this.viar = ui.viar;
        this.look_viar = ui.look_viar;
        this.write_viar = ui.write_viar;
        this.initLookNikki();
        this.loadManagers();
        this.bindMenu();
    }

    this.initLookNikki = function () {
        this.look_nikki_day = ui.look_nikki_day;
        this.look_nikki_m_and_w = ui.look_nikki_m_and_w;
        this.look_nikki_year = ui.look_nikki_year;
        this.look_nikki_text = ui.look_nikki_text;
        this.look_nikki_time = ui.look_nikki_time;
    }

    this.loadManagers = function () {
        this.tekoki_manager = new TekokiBinder(this, this.app);
        this.tekoki_manager.getThisTimeData();
        this.tekoki_manager.bindSele();
        this.nikki_manager = new NikkiBinder(this, this.app);
        this.nikki_manager.bindDateSele();
        this.nikki_manager.bindOnBtn();
        this.nikki_manager.bindChangeInput();
        this.Setting_manager = new SettingBinder(this, this.app);
        this.viar_manager = new ViArBinder(this, this.app);
    }


    this.getHeight = function () {
        return this.fh.attr("h");
    }

    this.allHidden = function () {
        this.main_page.attr("h", "0");
        this.nikki.attr("h", "0");
        this.look_nikki.attr("h", "0");
        this.write_nikki.attr("h", "0");
        this.tekoki.attr("h", "0");
        this.setting.attr("h", "0");
        this.viar.attr("h", "0");
        this.look_viar.attr("h", "0");
        this.write_viar.attr("h", "0");

        this.main_page.attr("visibility", "gone");
        this.nikki.attr("visibility", "gone");
        this.look_nikki.attr("visibility", "gone");
        this.write_nikki.attr("visibility", "gone");
        this.tekoki.attr("visibility", "gone");
        this.setting.attr("visibility", "gone");
        this.viar.attr("visibility", "gone");
        this.look_viar.attr("visibility", "gone");
        this.write_viar.attr("visibility", "gone");

        this.is_main_page = false;
        this.is_nikki = false;
        this.is_look_nikki = false;
        this.is_write_nikki = false;
        this.is_tekoki = false;
        this.is_setting = false;
        this.is_viar = false;
        this.is_look_viar = false;
        this.is_write_viar = false;

        this.is_select_viar_for_parent = false;
        this.is_select_viar_for_links = false;
    }

    this.setNikkiCount = function (page_n) {
        this.nikki_count.setText("共" + page_n + "篇");
    }

    this.openMainPage = function () {
        this.allHidden();
        this.main_page.attr("h", this.getHeight());
        this.main_page.attr("visibility", "visible");
        this.toolbar.title = "主页";
        this.is_main_page = true;
    }

    this.openNikki = function () {
        this.allHidden();
        this.nikki.attr("h", this.getHeight());
        this.nikki.attr("visibility", "visible");
        this.toolbar.title = "日记";
        this.is_nikki = true;
    }

    this.openLookNikki = function () {
        this.allHidden();
        this.look_nikki.attr("h", this.getHeight());
        this.look_nikki.attr("visibility", "visible");
        this.toolbar.title = "查看日记";
        this.is_look_nikki = true;
    }

    this.openWriteNikki = function () {
        this.allHidden();
        this.write_nikki.attr("h", this.getHeight());
        this.write_nikki.attr("visibility", "visible");
        this.toolbar.title = "写日记-";
        this.toolbar.title += this.temp_nikki === null || this.temp_nikki.is_new ? "新" : "来自草稿";
        this.is_write_nikki = true;
    }

    this.openTekoki = function () {
        this.allHidden();
        this.tekoki.attr("h", this.getHeight());
        this.tekoki.attr("visibility", "visible");
        this.toolbar.title = "记录";
        this.is_tekoki = true;
    }

    this.openSetting = function () {
        this.allHidden();
        this.setting.attr("h", this.getHeight());
        this.setting.attr("visibility", "visible");
        this.toolbar.title = "设置";
        this.is_setting = true;
    }

    this.openViAr = function () {
        this.allHidden();
        this.viar.attr("h", this.getHeight());
        this.viar.attr("visibility", "visible");
        this.toolbar.title = "故事集";
        this.is_viar = true;
        this.viar_manager.viarUpdate();
        this.viar_manager.displayAdd();
    }

    this.openLookViAr = function () {
        this.allHidden();
        this.look_viar.attr("h", this.getHeight());
        this.look_viar.attr("visibility", "visible");
        this.toolbar.title = "故事集-查看";
        this.is_look_viar = true;
    }

    this.openWriteViAr = function () {
        this.allHidden();
        this.write_viar.attr("h", this.getHeight());
        this.write_viar.attr("visibility", "visible");
        this.toolbar.title = "故事集-写";
        this.is_write_viar = true;
        this.viar_manager.setWriteParentTx();
    }

    this.openSelectViarForParent = function () {
        this.allHidden();
        this.viar.attr("h", this.getHeight());
        this.viar.attr("visibility", "visible");
        this.toolbar.title = "故事集-搜索";
        this.is_select_viar_for_parent = true;
        this.viar_manager.hiddenAdd();
    }

    this.openSelectViarForLinks = function () {
        this.allHidden();
        this.viar.attr("h", this.getHeight());
        this.viar.attr("visibility", "visible");
        this.toolbar.title = "故事集-搜索";
        this.is_select_viar_for_links = true;
        this.viar_manager.hiddenAdd();
    }

    this.loadWriteNikki = function () {
        var date;
        var year;
        var month;
        var day;
        var hours;
        var minu;
        var id;
        var text;
        var is_new;
        if (this.temp_nikki !== null) {
            year = this.temp_nikki.year;
            month = this.temp_nikki.month;
            day = this.temp_nikki.day;
            hours = this.temp_nikki.hours;
            minu = this.temp_nikki.minu;
            id = this.temp_nikki.id;
            text = this.temp_nikki.text;
            is_new = this.temp_nikki.is_new;
        } else {
            date = new Date();
            year = date.getFullYear();
            month = date.getMonth() + 1;
            day = date.getDate();
            hours = Utils.addZero(date.getHours());
            minu = Utils.addZero(date.getMinutes());
            id = Date.parse(new Date());
            text = "";
            is_new = true;
        }
        var inp_year_month_day = year + "-" + month + "-" + day;
        var inp_hours_minu = hours + ":" + minu;
        this.inp_ymd_btn.setText(inp_year_month_day);
        this.inp_hm_btn.setText(inp_hours_minu);
        this.input_nikki.setText(text);
        var datetime = Utils.ttToDatetime(inp_year_month_day, inp_hours_minu);
        var week = "周" + "日一二三四五六".charAt(new Date(datetime).getDay());
        this.temp_nikki = {
            year: year,
            month: month,
            day: day,
            hours: hours,
            minu: minu,
            week: week,
            date: datetime,
            id: id,
            text: text,
            is_new: is_new
        }
    }

    this.loadLookNikki = function (item) {
        this.looking_nikki = item;
        this.look_nikki_day.setText(String(item.day));
        this.look_nikki_m_and_w.setText(String(item.month) + "月 " + String(item.week));
        this.look_nikki_year.setText(String(item.year));
        this.look_nikki_text.setText(String(item.text));
        this.look_nikki_time.setText(String(item.hours) + ":" + String(item.minu));
    }

    this.changeMenuPW = function () {
        var appd = {
            title: PasswordManager.hasPassword() ? "修改密码" : "创建密码",
            icon: "@drawable/ic_https_black_48dp"
        };
        MENU_LIST.splice(4, 1);
        MENU_LIST.splice(4, 0, appd);
    }

    this.import = function () {
        dialogs.confirm("注意", "在导入时软件的密码必须与导出前相同，导入后原有数据将会被覆盖", (b) => {
            var load_path = "/sdcard/xya日记/backup/";
            var load_files = files.listDir(load_path);
            dialogs.select("选择文件", load_files, (i) => {
                var load_filename = load_files[i];
                if (load_filename != undefined) {
                    var load_full_path = load_path + load_filename;
                    this.app.data_manager.import(load_full_path);
                }
            });
        });
    }

    this.export = function () {
        var save_path = "/sdcard/xya日记/backup/";
        var save_filename = "backup-" + Date.parse(new Date()) + "-v" + this.app.VERSION + ".json";
        var save_full_path = save_path + save_filename;
        this.app.data_manager.export(save_full_path);
    }

    this.bindMenu = function () {
        var menu_list = MENU_LIST;
        this.menu.setDataSource(menu_list);
        this.menu.on("item_click", item => {
            switch (item.title) {
                case "主页":
                    this.openMainPage();
                    break
                case "日记":
                    this.openNikki();
                    this.app.nikkiUpdate();
                    break
                case "记录":
                    this.openTekoki();
                    this.tekoki_manager.tekokiUpdate();
                    break;
                case "故事集":
                    this.openViAr();
                    this.viar_manager.viarUpdate();
                    break;
                case "创建密码":
                    this.app.password_manager.create();
                    break
                case "修改密码":
                    this.app.password_manager.reCreate();
                    break
                case "导出":
                    this.export();
                    break;
                case "导入":
                    this.import();
                    break;
                case "设置":
                    this.openSetting();
                    break;
                case "退出":
                    this.app.onExit();
                    break;
            }
        })
    }

    return this;
}


module.exports = Page;