const PasswordBookBinder = function (page, a) {
    this.app = a;
    this.page = page;
    this.tob = ui.pb_tob;
    this.src_inp = ui.pb_srh_kw;
    this.add_btn = ui.pb_add;
    this.srh_btn = ui.pb_srh;
    this.ui_list = ui.pb_li;

    this.ui_list.setDataSource(this.app.data_manager.getPasswordBook());

    this.create = () => {
        var input_view = ui.inflate(
            <vertical>
                <appbar bg="{{DATA_CONTAINER.ui_color}}">
                    <toolbar title="新增项目" />
                </appbar>
                <text size="12sp" margin="4 0 4 3" text="" />
                <input hint="用户名" id="pb_add_un" />
                <input hint="密码" id="pb_add_pw" />
                <input hint="备注" id="pb_add_meta" />
            </vertical>
        );
        dialogs.build({
            customView: input_view,
            positive: "确定",
            negative: "取消",
            wrapInScrollView: false,
            autoDismiss: false
        }).on("positive", (dialog) => {
            var username = input_view.pb_add_un.text();
            var password = input_view.pb_add_pw.text();
            var meta = input_view.pb_add_meta.text();
            var pb_data = {
                name: username,
                pw: password,
                meta: meta,
                id: Date.parse(new Date())
            };
            var password_book = this.app.data_manager.getPasswordBook();
            password_book.push(pb_data);
            this.app.data_manager.savePasswordBook();
            dialog.dismiss();
        }).on("negative", (dialog) => {
            dialog.dismiss();
        }).show();
    }

    this.add_btn.on("click", () => {
        this.create();
    });

    return this;
}

module.exports = PasswordBookBinder;