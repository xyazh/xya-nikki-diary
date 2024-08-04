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
            <text text="" margin="4 4 4 8" id="pb_show_un" />
            <vertical h="2px" w="*" bg="{{DATA_CONTAINER.line_color}}"></vertical>
            <text text="" margin="4 4 4 8" id="pb_show_pw" />
            <vertical h="2px" w="*" bg="{{DATA_CONTAINER.line_color}}"></vertical>
            <text text="" margin="4 4 4 8" id="pb_show_meta" />
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

    this.clearRenderList = function () {
        if (RENDER_LIST.length > 1) {
            RENDER_LIST.length = 1;
        }
        if (RENDER_LIST.length = 1) {
            RENDER_LIST.pop();
        }
    }

    this.initRenderList = function () {
        this.clearRenderList();
        this.app.data_manager.getPasswordBook().forEach(item => {
            RENDER_LIST.push(item);
        });
    };
    this.ui_list.setDataSource(RENDER_LIST);


    this.create = () => {
        var input_view = this.INPUT_VIEW;
        input_view.pb_add_un.text("");
        input_view.pb_add_pw.text("");
        input_view.pb_add_meta.text("");
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
            this.initRenderList();
            dialog.dismiss();
        }).on("negative", (dialog) => {
            dialog.dismiss();
        }).show();
    }

    this.show = (item) => {
        var show_view = this.SHOW_VIEW;
        show_view.pb_show_un.text("用户名:" + item.name);
        show_view.pb_show_pw.text("密码:" + item.pw);
        show_view.pb_show_meta.text("备注:" + item.meta);

        dialogs.build({
            customView: show_view,
            positive: "复制密码",
            negative: "复制账号",
            neutral: "删除",
            neutralColor: "#ff0000",
            wrapInScrollView: false,
            autoDismiss: false
        }).on("positive", (dialog) => {
            var content = item.pw;
            setClip(content);
            toast("密码已复制到剪切板");
            dialog.dismiss();
        }).on("negative", (dialog) => {
            var content = item.name;
            setClip(content);
            toast("用户名已复制到剪切板");
            dialog.dismiss();
        }).on("neutral", (dialog) => {
            dialog.dismiss();
            this.app.data_manager.delPasswordBook(item.id);
            this.app.data_manager.savePasswordBook();
            this.initRenderList();
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
        this.clearRenderList();
        for (var item of items) {
            RENDER_LIST.push(item.item);
        }
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