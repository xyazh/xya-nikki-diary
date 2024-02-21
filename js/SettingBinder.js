const SettingBinder = function(page,a) {
    this.app = a;
    this.page = page;
    this.git_btn = ui.git;
    this.about_btn = ui.about;
    this.git_btn.on("click", () => {
        $app.openUrl("https://github.com/xyazh/xya-nikki-diary");
    });
    this.about_btn.on("click", () => {
        toast("v"+this.app.VERSION);
    });
    return this;
}

module.exports = SettingBinder;