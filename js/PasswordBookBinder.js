const Utils = require("./Utils.js");

const RENDER_LIST = [];

const PasswordBookBinder = function (page, a) {
    this.INPUT_VIEW = ui.inflate(
        <vertical>
            <appbar bg="{{DATA_CONTAINER.ui_color}}">
                <toolbar title="新增项目" />
            </appbar>
            <text size="12sp" margin="4 0 4 3" text="" />
            <input hint="用户名" id="pb_add_un" />
            <input hint="邮箱" id="pb_add_em" />
            <input hint="密码" id="pb_add_pw" />
            <input hint="备注" id="pb_add_meta" />
        </vertical>
    );

    this.SHOW_VIEW = ui.inflate(
        <vertical>
            <appbar bg="{{DATA_CONTAINER.ui_color}}">
                <toolbar title="密码" />
            </appbar>
            <text size="12sp" margin="4 0 4 3" text="" />
            <linear>
                <text text="用户名:" margin="4" />
                <text text="" margin="4" id="pb_show_un" />
            </linear>
            <vertical h="2px" w="*" bg="{{DATA_CONTAINER.line_color}}"></vertical>
            <linear>
                <text text="邮箱:" margin="4" />
                <text text="" margin="4" id="pb_show_em" />
            </linear>
            <vertical h="2px" w="*" bg="{{DATA_CONTAINER.line_color}}"></vertical>
            <linear>
                <text text="密码:" margin="4" />
                <text text="" margin="4" id="pb_show_pw" />
            </linear>
            <vertical h="2px" w="*" bg="{{DATA_CONTAINER.line_color}}"></vertical>
            <linear>
                <text text="备注:" margin="4" />
                <text text="" margin="4" id="pb_show_meta" />
            </linear>
        </vertical>
    );

    this.app = a;
    this.page = page;
    this.tob = ui.pb_tob;
    this.src_inp = ui.pb_srh_kw;
    this.add_btn = ui.pb_add;
    this.srh_btn = ui.pb_srh;
    this.ui_list = ui.pb_li;
    this.src_reset = ui.pb_reset;

    this._clearRenderList = function () {
        if (RENDER_LIST.length > 1) {
            RENDER_LIST.length = 1;
        }
        if (RENDER_LIST.length = 1) {
            RENDER_LIST.pop();
        }
    }

    this.clearRenderList = function () {
        ui.run(() => {
            this._clearRenderList();
        });
    }

    this._initRenderList = function () {
        this._clearRenderList();
        this.app.data_manager.getPasswordBook().forEach(item => {
            RENDER_LIST.push(item);
        });

    };

    this.initRenderList = function () {
        ui.run(() => {
            this._initRenderList();
        });
    };

    this.ui_list.setDataSource(RENDER_LIST);

    this.create = (item) => {
        var input_view = this.INPUT_VIEW;
        input_view.pb_add_un.text(item == undefined ? "" : String(item.name));
        input_view.pb_add_em.text(item == undefined ? "" : String(item.email));
        input_view.pb_add_pw.text(item == undefined ? "" : String(item.pw));
        input_view.pb_add_meta.text(item == undefined ? "" : String(item.meta));
        dialogs.build({
            customView: input_view,
            positive: "确定",
            negative: "取消",
            wrapInScrollView: false,
            autoDismiss: false
        }).on("positive", (dialog) => {
            var username = input_view.pb_add_un.text();
            var email = input_view.pb_add_em.text();
            var password = input_view.pb_add_pw.text();
            var meta = input_view.pb_add_meta.text();
            var pb_data = {
                name: username,
                email: email,
                pw: password,
                meta: meta,
                id: item == undefined ? Date.parse(new Date()) : item.id
            };
            var password_book = this.app.data_manager.getPasswordBook();
            ui.run(() => {
                if (item != undefined) {
                    this.app.data_manager._delPasswordBook(item.id);
                }
                password_book.push(pb_data);
                this.app.data_manager.savePasswordBook();
                this._initRenderList();
            });
            dialog.dismiss();
        }).on("negative", (dialog) => {
            dialog.dismiss();
        }).show();
    }

    this.SHOW_VIEW.pb_show_un.on("click", () => {
        var str = this.SHOW_VIEW.pb_show_un.text();
        setClip(str);
        toast("用户名已复制到剪切板");
    });

    this.SHOW_VIEW.pb_show_em.on("click", () => {
        var str = this.SHOW_VIEW.pb_show_em.text();
        setClip(str);
        toast("邮件已复制到剪切板");
    });

    this.SHOW_VIEW.pb_show_pw.on("click", () => {
        var str = this.SHOW_VIEW.pb_show_pw.text();
        setClip(str);
        toast("密码已复制到剪切板");
    });

    this.SHOW_VIEW.pb_show_meta.on("click", () => {
        var str = this.SHOW_VIEW.pb_show_meta.text();
        setClip(str);
        toast("备注已复制到剪切板");
    });

    this.show = (item) => {
        var show_view = this.SHOW_VIEW;
        show_view.pb_show_un.text(String(item.name));
        show_view.pb_show_em.text(String(item.em));
        show_view.pb_show_pw.text(String(item.pw));
        show_view.pb_show_meta.text(String(item.meta));

        dialogs.build({
            customView: show_view,
            positive: "返回",
            negative: "修改",
            neutral: "删除",
            neutralColor: "#ff0000",
            wrapInScrollView: false,
            autoDismiss: false
        }).on("positive", (dialog) => {
            dialog.dismiss();
        }).on("negative", (dialog) => {
            dialog.dismiss();
            this.create(item);
        }).on("neutral", (dialog) => {
            dialog.dismiss();
            ui.run(() => {
                this.app.data_manager._delPasswordBook(item.id);
                this.app.data_manager.savePasswordBook();
                this._initRenderList();
            });
        }).show();
    }

    this.add_btn.on("click", () => {
        this.create();
    });

    this.ui_list.on("item_click", item => {
        this.show(item);
    });

    this.search = function (keyword) {
        var result = [];
        if (keyword == undefined || keyword == "" || keyword == null) {
            return result;
        }
        var keywords = Utils.splitKeyword(keyword);
        var items = this.app.data_manager.getPasswordBook();
        for (var item of items) {
            var n = 0;
            for (keyword of keywords) {
                if (item.name.includes(keyword)) {
                    n += 1;
                }
                if (item.pw.includes(keyword)) {
                    n += 1;
                }
                if (item.meta.includes(keyword)) {
                    n += 2;
                }
            }
            if (n <= 0) {
                continue;
            }
            result.push({
                item: item,
                score: n,
            });
        }
        result.sort((a, b) => b.score - a.score);
        return result;
    }

    this.useSearch = function (keyword) {
        var items = this.search(keyword);
        ui.run(() => {
            this._clearRenderList();
            for (var item of items) {
                RENDER_LIST.push(item.item);
            }
        });
    }

    this.srh_btn.on("click", () => {
        var keyword = this.src_inp.text();
        this.useSearch(keyword);
    });

    this.src_reset.on("click", () => {
        this.initRenderList();
    });

    return this;
}

module.exports = PasswordBookBinder;