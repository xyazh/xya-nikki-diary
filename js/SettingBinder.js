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
    this.page_lock_set_btn = ui.page_lock_setting;


    this.reload = function () {
        this.page_lock_set_btn.text(this.page.has_page_lock ? "删除页面子密码" : "设置页面子密码")
    }

    this.theme_btn.setText(this.app.config.get("theme", "dis") == "dark" ? "使用默认主题" : "使用深色主题");
    this.reload();

    this.clearPageLock = function () {
        this.app.config.put("has_page_lock", false);
        this.app.config.put("page_token", "");
        this.page.has_page_lock = false;
        this.page.page_lock_token = "";
        this.reload();
    }

    this.page_lock_set_btn.on("click", () => {
        if (!this.app.password_manager.has_password) {
            toast("使用页面子密码前需设置主密码");
            return;
        }
        if (this.page.has_page_lock) {
            var input_view = ui.inflate(
                <vertical>
                    <appbar bg="{{DATA_CONTAINER.ui_color}}">
                        <toolbar title="删除子密码" />
                    </appbar>
                    <text size="12sp" margin="4 0 4 3" text="" />
                    <input hint="使用主密码或者子密码来删除" id="p" password="true" />
                </vertical>
            );
            dialogs.build({
                customView: input_view,
                positive: "确定",
                negative: "取消",
                wrapInScrollView: false,
                autoDismiss: false
            }).on("positive", (dialog) => {
                var pw = input_view.p.text();
                var o_pw = this.app.config.get("page_token", "");
                var flag = false;
                if (!this.app.password_manager.has_password) {
                    flag = true;
                } else if (pw == o_pw || this.app.password_manager.cheakPassword(pw)) {
                    flag = true;
                }
                if (flag) {
                    this.clearPageLock();
                    toast("删除成功");
                    dialog.dismiss();
                }
                input_view.p.setError("密码错误");
            }).on("negative", (dialog) => {
                dialog.dismiss();
            }).show();
        } else {
            var input_view = ui.inflate(
                <vertical>
                    <appbar bg="{{DATA_CONTAINER.ui_color}}">
                        <toolbar title="设置子密码" />
                    </appbar>
                    <text size="12sp" margin="4 0 4 3" text="" />
                    <input hint="设置子密码" id="p" password="true" />
                </vertical>
            );
            dialogs.build({
                customView: input_view,
                positive: "确定",
                negative: "取消",
                wrapInScrollView: false,
                autoDismiss: false
            }).on("positive", (dialog) => {
                var pw = input_view.p.text();
                this.app.config.put("has_page_lock", true);
                this.app.config.put("page_token", pw);
                this.page.has_page_lock = true;
                this.page.page_lock_token = pw;
                this.reload();
                toast("设置成功");
                dialog.dismiss();
            }).on("negative", (dialog) => {
                dialog.dismiss();
            }).show();
        }
    });

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
        if(!this.app.password_manager.has_password){
            toast("当前没有密码");
            return;
        }
        var input_view = ui.inflate(
            <vertical>
                <appbar bg="{{DATA_CONTAINER.ui_color}}">
                    <toolbar title="删除密码" />
                </appbar>
                <text size="12sp" margin="4 0 4 3" text="" />
                <input hint="输入当前使用的密码" id="p" password="true" />
            </vertical>
        );
        dialogs.build({
            customView: input_view,
            positive: "确定",
            negative: "取消",
            wrapInScrollView: false,
            autoDismiss: false
        }).on("positive", (dialog) => {
            var pw = input_view.p.text();
            if (this.app.password_manager.cheakPassword(pw)) {
                this.app.password_manager.deletePassword();
                toast("已删除密码");
                dialog.dismiss();
                return;
            }
            input_view.p.setError("密码错误");
        }).on("negative", (dialog) => {
            dialog.dismiss();
        }).show();
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