const SettingBinder = function (page, a) {
    this.app = a;
    this.page = page;
    this.git_btn = ui.git;
    this.about_btn = ui.about;
    this.cheak_nikki_time_btn = ui.cheak_nikki_time;
    this.export_nikki_plain_btn = ui.export_nikki_plain;
    this.export_one_day_btn = ui.export_one_day;
    this.delete_password_btn = ui.delete_password;
    this.theme_btn = ui.theme;
    this.re_create_tags_btn = ui.re_create_tags_btn;
    this.tekoki_re_create_events_btn = ui.re_create_events_btn;
    this.clear_all_btn = ui.clear_all;
    this.del_event_btn = ui.del_events_btn;

    this.theme_btn.setText(this.app.config.get("theme", "dis") == "dark" ? "使用默认主题" : "使用深色主题");
    this.git_btn.on("click", () => {
        $app.openUrl("https://github.com/xyazh/xya-nikki-diary");
    });

    this.about_btn.on("click", () => {
        toast("v" + this.app.VERSION);
    });

    this.del_event_btn.on("click", () => {
        dialogs.select("你要删除哪件事？删除后无法恢复！！！）", this.app.data_manager.getTekokiEvents(), (i) => {
            var tekoki_events = this.app.data_manager.getTekokiEvents();
            if (tekoki_events[i] == undefined) {
                return;
            }
            dialogs.confirm("警告", `确定要删除${tekoki_events[i]}的所有记录，此操作无法恢复`, (cheak) => {
                if (!cheak) {
                    return;
                }
                this.app.data_manager.delTekoki(tekoki_events[i]);
                toast("已删除事件");
            });
        });
    });

    this.clear_all_btn.on("click", () => {
        dialogs.confirm("警告", "确定要清空所有数据，此操作无法恢复", (cheak) => {
            if (!cheak) {
                return;
            }
            this.app.APP_PATH;
            var flag = files.removeDir(this.app.APP_PATH + "/data/");
            if (flag) {
                toast("已清空所有数据");
                setTimeout(() => {
                    ui.finish();
                }, 500);
            } else {
                toast("清空失败");
            }
        });
    });

    this.cheak_nikki_time_btn.on("click", () => {
        this.app.data_manager.checkNikkiTime();
        toast("校验完成");
    });

    this.delete_password_btn.on("click", () => {
        dialogs.confirm("确认", "确定要删除密码", (cheak) => {
            if (!cheak) {
                return;
            }
            this.app.password_manager.deletePassword();
            toast("已删除密码");
        });
    });

    this.export_nikki_plain_btn.on("click", () => {
        var save_path = "/sdcard/xya日记/backup/";
        var save_filename = "backup-plain-" + Date.parse(new Date()) + "-v" + this.app.VERSION + ".json";
        var save_full_path = save_path + save_filename;
        this.app.data_manager.exportPlain(save_full_path);
    });

    this.export_one_day_btn.on("click", () => {
        var save_path = "/sdcard/xya日记/backup-other/";
        var save_filename = "backup-one-day-" + Date.parse(new Date()) + "-v" + this.app.VERSION + ".json";
        var save_full_path = save_path + save_filename;
        this.app.data_manager.exportOneDay(save_full_path);
    });

    this.theme_btn.on("click", () => {
        var theme = this.app.config.get("theme", "dis");
        if (theme == "dark") {
            this.app.config.put("theme", "dis");
            this.theme_btn.setText("使用深色主题");
        } else {
            this.app.config.put("theme", "dark");
            this.theme_btn.setText("使用默认主题");
        }
        toast("重启软件后生效");
    });

    this.re_create_tags_btn.on("click", () => {
        this.page.viar_manager.viar.reCreateTags();
        this.app.data_manager.saveViAr();
        toast("已重建标签");
    });

    this.tekoki_re_create_events_btn.on("click", () => {
        this.app.data_manager.reCreateTekoki();
        this.page.tekoki_manager.event = "默认";
        this.page.tekoki_manager.tekokiUpdate();
        toast("已清理事件");
    });

    return this;
}

module.exports = SettingBinder;