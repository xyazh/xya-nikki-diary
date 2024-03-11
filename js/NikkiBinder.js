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