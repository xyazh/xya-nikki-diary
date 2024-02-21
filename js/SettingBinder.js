const SettingBinder = function(page,a) {
    this.app = a;
    this.page = page;
    this.git_btn = ui.git;
    this.about_btn = ui.about;
    this.cheak_nikki_time_btn = ui.cheak_nikki_time;
    this.git_btn.on("click", () => {
        $app.openUrl("https://github.com/xyazh/xya-nikki-diary");
    });
    this.about_btn.on("click", () => {
        toast("v"+this.app.VERSION);
    });
    this.cheak_nikki_time_btn.on("click", () => {
        this.app.data_manager.cheakNikkiTime();
        toast("校验完成");
    });
    return this;
}

module.exports = SettingBinder;