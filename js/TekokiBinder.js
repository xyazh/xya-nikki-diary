const Utils = require('./Utils.js');

const WEEK_DAY = ["日", "一", "二", "三", "四", "五", "六"];

const TEKOKI_DAY_LIST = [];

const ENPTY = {
    day: "",
    p: 0,
    number: 0
};

const TekokiBinder = function (page, app) {
    this.page = page;
    this.app = app;
    this.tekoki_week = ui.tekoki_week;
    this.tekoki_day = ui.tekoki_day;
    this.tekoki_week.setDataSource(WEEK_DAY);
    this.tekoki_day.setDataSource(TEKOKI_DAY_LIST);
    this.event = "默认";
    this.year = this.app.DATA_CONTAINER.year;
    this.month = this.app.DATA_CONTAINER.month;

    this.tekoki_year = ui.tekoki_year;
    this.tekoki_month = ui.tekoki_month;
    this.tekoki_last_year = ui.tekoki_last_year;
    this.tekoki_next_year = ui.tekoki_next_year;
    this.tekoki_last_month = ui.tekoki_last_month;
    this.tekoki_next_month = ui.tekoki_next_month;
    this.tekoki_event_set = ui.tekoki_event_set;
    this.tekoki_month_all = ui.tekoki_month_all;

    this.clearDayList = function () {
        for (var i = 0; i < 42; i++) {
            TEKOKI_DAY_LIST[i] = ENPTY;
        }
    }

    this.getDayListIdentity = function (year, month, first_day) {
        var n = Utils.getDaysInMonth(year, month);
        this.clearDayList();
        for (var i = 1; i <= n; i++) {
            TEKOKI_DAY_LIST[first_day + i - 1] = {
                "day": "" + i,
                "p": 0,
                number: 0
            };
        }
        return TEKOKI_DAY_LIST;
    }

    this.tekokiUpdate = function () {
        this.getThisTimeData();
        this.tekoki_event_set.setText(this.event);
    }

    this.getThisTimeData = function () {
        var key = this.year + "-" + this.month;
        var year = this.year;
        var month = this.month;
        var event_datas = this.app.data_manager.getTekokiData(key, this.event);
        var first_day = Utils.getFirstDayOfWeek(year, month);
        var list = this.getDayListIdentity(year, month, first_day);
        var max_number = 0;
        for (var i of event_datas) {
            max_number = Math.max(max_number, i.events[this.event]);
        }
        var n_day = 0;
        var n_number = 0;
        for (var i of event_datas) {
            var n = i.events[this.event];
            n_number += n;
            n_day += n > 0 ? 1 : 0;
            list[i.day + first_day - 1] = {
                day: "" + i.day,
                p: n === 0 ? 0 : (n / max_number),
                number: n
            };
        }
        this.tekoki_month_all.setText("本月共" + n_day + "天 " + n_number + "次");
    }

    this.bindSele = function () {
        this.tekoki_year.on("click", () => {
            var _years = [];
            for (var i = 1995; i <= 2124; i++) {
                _years.push(i);
            }
            dialogs.select("选择年份", _years, (i) => {
                if (_years[i] != undefined) {
                    this.year = _years[i];
                    this.tekoki_year.setText(this.year + "年");
                    this.tekokiUpdate();
                }
            });
        });
        this.tekoki_month.on("click", () => {
            var _month = [];
            for (var i = 1; i <= 12; i++) {
                _month.push(i);
            }
            dialogs.select("选择月份", _month, (i) => {
                if (_month[i] != undefined) {
                    this.month = _month[i];
                    this.tekoki_month.setText(this.month + "月");
                    this.tekokiUpdate();
                }
            });
        });
        this.tekoki_last_year.on("click", () => {
            if (this.year > 1995) {
                this.year--;
                this.tekoki_year.setText(this.year + "年");
                this.tekokiUpdate();
            }
        });
        this.tekoki_next_year.on("click", () => {
            if (this.year < 2124) {
                this.year++;
                this.tekoki_year.setText(this.year + "年");
                this.tekokiUpdate();
            }
        });
        this.tekoki_last_month.on("click", () => {
            if (this.month > 1) {
                this.month--;
                this.tekoki_month.setText(this.month + "月");
                this.tekokiUpdate();
            } else if (this.year > 1995) {
                if (this.month <= 1) {
                    this.month = 12;
                    this.year--;
                    this.tekoki_month.setText(this.month + "月");
                    this.tekoki_year.setText(this.year + "年");
                    this.tekokiUpdate();
                }
            }
        });
        this.tekoki_next_month.on("click", () => {
            if (this.month < 12) {
                this.month++;
                this.tekoki_month.setText(this.month + "月");
                this.tekokiUpdate();
            } else if (this.year < 2124) {
                if (this.month >= 12) {
                    this.month = 1;
                    this.year++;
                    this.tekoki_month.setText(this.month + "月");
                    this.tekoki_year.setText(this.year + "年");
                    this.tekokiUpdate();
                }
            }
        });

        this.tekoki_event_set.on("click", () => {
            dialogs.select("你要查看哪件事？", this.app.data_manager.getTekokiEvents(), (i) => {
                var tekoki_events = this.app.data_manager.getTekokiEvents();
                if (tekoki_events[i] != undefined) {
                    var tekoki_event = tekoki_events[i];
                    this.event = tekoki_event;
                    this.tekokiUpdate();
                }
            });
        });

        this.tekoki_day.on("item_click", item => {
            if (item.day == "") {
                return;
            }
            DATA_CONTAINER.tekoki_event = this.event;
            var input_view = ui.inflate(
                <vertical>
                    <appbar bg="{{DATA_CONTAINER.ui_color}}">
                        <toolbar id="tt" title="添加" />
                    </appbar>
                    <text size="12sp" margin="4 0 4 3" text="" />
                    <input hint="次数" inputType="number" text="" id="n" />
                    <input hint="事件" text="" id="ev" />
                    <text size="12sp" margin="4 0 4 3" text="" />
                    <list id="es">
                        <text textSize="48px" textColor="#000000" text="{{this}}" />
                    </list>
                </vertical>
            );
            var tekoki_events = this.app.data_manager.getTekokiEvents();
            input_view.es.setDataSource(tekoki_events);
            input_view.es.on("item_click", item => {
                input_view.ev.setText(item);
            });
            input_view.n.setText(String(item.number));
            input_view.ev.setText(this.event);
            var year_and_month = this.year + "-" + this.month;
            input_view.tt.title = "添加 " + year_and_month + "-" + item.day;
            dialogs.build({
                customView: input_view,
                positive: "确定",
                negative: "取消",
                wrapInScrollView: false,
                autoDismiss: false
            }).on("positive", (dialog) => {
                var event_name = String(input_view.ev.getText());
                var number = String(input_view.n.getText());
                if (event_name == "" || number == "") {
                    dialog.dismiss();
                    return;
                }
                try {
                    number = parseInt(number);
                } catch (e) {
                    input_view.setError("不是一个次数");
                    return;
                }
                if (number < 0) {
                    input_view.setError("不是能小于0");
                    return
                }
                this.app.data_manager.addTekoki(event_name, this.year, this.month, item.day, number);
                this.event = event_name;
                this.tekokiUpdate();
                dialog.dismiss();
            }).on("negative", (dialog) => {
                dialog.dismiss();
            }).show();
        });
    }

    return this;
}

module.exports = TekokiBinder;