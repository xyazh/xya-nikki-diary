const Utils = require("./Utils");

const DATA_VIEW = ui.inflate(
    <vertical>
        <datepicker id="datepicker" />
    </vertical>
);

const TIME_VIEW = ui.inflate(
    <vertical>
        <timepicker id="timepicker" />
    </vertical>
);

const RENDER_LIST = [];

const NikkiBinder = function (page, app) {
    this.page = page;
    this.app = app;
    this.ui_list = ui.texts_list;
    this.ui_list.setDataSource(this.app.data_manager.getNikkis());
    this.save_nikki_btn = ui.write_nikki_but;
    this.input_nikki = ui.inp;
    this.inp_ymd_btn = ui.Tset;
    this.inp_hm_btn = ui.tset;
    this.ui_list.on("item_click", item => {
        this.page.loadLookNikki(item);
        this.page.openLookNikki();
    });
    this.write_nikki_btn = ui.nikki_but;
    this.rewrite_nikki_btn = ui.look_nikki_but;

    this.tob = ui.nikki_tob;
    this.sub_tob = ui.nikki_sub_tob;
    this.src_inp = ui.nikki_srh_kw;
    this.srh_btn = ui.nikki_srh;
    this.reset_btn = ui.nikki_reset;
    this.updown_btn = ui.nikki_updown;
    this.nikki_count = ui.tj;
    this.srh_list = ui.texts_srh_list;
    this.srh_list.setDataSource(RENDER_LIST);
    this.srh_list.on("item_click", item => {
        this.page.loadLookNikki(item);
        this.page.openLookNikki();
    });

    this.updown_btn.on("click", () => {
        var t = this.sub_tob.attr("visibility");
        if (t == "gone") {
            this.sub_tob.attr("visibility", "visible");
            this.srh_btn.attr("visibility", "visible");
            this.reset_btn.attr("visibility", "visible");
            this.updown_btn.text("收起");
        } else {
            this.sub_tob.attr("visibility", "gone");
            this.srh_btn.attr("visibility", "gone");
            this.reset_btn.attr("visibility", "gone");
            this.updown_btn.text("展开");
        }
    });

    this.reset_btn.on("click", () => {
        this.srh_list.attr("visibility", "gone");
        this.ui_list.attr("visibility", "visible");
        this.nikki_count.attr("visibility", "visible");
    });

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

    this.search = function (keyword) {
        var result = [];
        if (keyword == undefined || keyword == "" || keyword == null) {
            return result;
        }

        var times = Utils.parseTimeString(keyword);
        var keywords = Utils.splitKeyword(keyword);
        var items = this.app.data_manager.getNikkis();
        for (var item of items) {
            var n = 0;
            if (times != null) {
                if (item.year == times.year) {
                    n += 500;
                }
                if (item.month == times.month) {
                    n += 500;
                }
                if (item.day == times.day) {
                    n += 500;
                }
                if (item.hours == times.hour) {
                    n += 500;
                }
                if (item.minu == times.minute) {
                    n += 500;
                }
            }
            if (keyword == item.week) {
                n += 500;
            }
            for (keyword of keywords) {
                if (item.text.includes(keyword)) {
                    n += 1;
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
            this.srh_list.attr("visibility", "visible");
            this.ui_list.attr("visibility", "gone");
            this.nikki_count.attr("visibility", "gone");
        });
    }

    this.srh_btn.on("click", () => {
        var keyword = this.src_inp.text();
        this.useSearch(keyword);
    });

    this.bindDateSele = function () {
        var date_view = DATA_VIEW;
        this.sele_date = dialogs.build({
            customView: date_view,
            positive: "确定",
            negative: "取消",
            wrapInScrollView: false,
            autoDismiss: false
        }).on("positive", (dialog) => {
            if (this.page.temp_nikki === null) {
                this.page.loadWriteNikki();
            }
            this.page.temp_nikki.year = date_view.datepicker.getYear();
            this.page.temp_nikki.month = date_view.datepicker.getMonth() + 1;
            this.page.temp_nikki.day = date_view.datepicker.getDayOfMonth();
            this.page.temp_nikki.is_new = false;
            this.page.loadWriteNikki();
            dialog.dismiss();
        }).on("negative", (dialog) => {
            dialog.dismiss();
        });

        var time_view = TIME_VIEW;
        this.sele_time = dialogs.build({
            customView: time_view,
            positive: "确定",
            negative: "取消",
            wrapInScrollView: false,
            autoDismiss: false
        }).on("positive", (dialog) => {
            if (this.page.temp_nikki === null) {
                this.page.loadWriteNikki();
            }
            this.page.temp_nikki.hours = time_view.timepicker.getHour();
            this.page.temp_nikki.minu = time_view.timepicker.getMinute();
            this.page.temp_nikki.is_new = false;
            this.page.loadWriteNikki();
            dialog.dismiss();
        }).on("negative", (dialog) => {
            dialog.dismiss();
        });
    }

    this.bindOnBtn = function () {
        this.save_nikki_btn.on("click", () => {
            this.save();
        })

        this.inp_ymd_btn.on("click", () => {
            this.sele_date.show();
        });

        this.inp_hm_btn.on("click", () => {
            this.sele_time.show();
        });

        this.write_nikki_btn.on("click", () => {
            this.page.loadWriteNikki();
            this.page.openWriteNikki();
        });

        this.rewrite_nikki_btn.on("click", () => {
            this.page.temp_nikki = this.page.looking_nikki;
            this.page.temp_nikki.is_new = false;
            this.page.loadWriteNikki();
            this.page.openWriteNikki();
        });
    }

    this.bindChangeInput = function () {
        if (this.page !== undefined && this.page.temp_nikki !== null) {
            var text = this.input_nikki.getText();
            this.page.temp_nikki.text = text;
        }
        setTimeout(() => { this.bindChangeInput(); }, 5000);
    }

    this.save = function () {
        if (this.page.temp_nikki !== null) {
            var text = this.input_nikki.getText();
            this.page.temp_nikki.text = String(text);
            this.app.data_manager.insertNikki(this.page.temp_nikki);
        }
        this.app.data_manager.saveNikki();
        this.page.looking_nikki = null;
        this.page.temp_nikki = null;
        this.page.openNikki();
    }
    return this;
}

module.exports = NikkiBinder;