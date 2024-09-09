const Utils = require("./Utils.js");
const LZString = require("./LZString");
const ViArTree = require("./ViArTree.js")
const NIKKIS = [];
const TEKOKIS = {
    events: [],
    data: {}
};
const VIAR = new ViArTree();

const PASSWORD_BOOK = [];

const TEKOKIS_PATH = "/data/tekoki/tekoki.json";
const NIKKIS_PATH = "/data/nikki/nikki.json";
const VIAR_PATH = "/data/viar/viar.json";
const PASSWORD_BOOK_PATH = "/data/passwordbook/passwordbook.json";

const CRYPT_VRESION = 1;

const DataMnager = function (app) {
    this.app = app;
    this.password = "";
    this.sl_ing = false;
    this.APP_PATH = this.app.APP_PATH;

    this.exportDecorator = (fuc) => {
        return (full_path) => {
            if (this.sl_ing) {
                toast("正在导出...请勿重复点击...");
            } else {
                this.sl_ing = true;
                toast("正在导出...可能会花费一些时间...");
                threads.start(() => {
                    try {
                        fuc.call(this, full_path);
                        toast("导出完成");
                    } catch (e) {
                        console.error(e);
                        var stack_trace = "" + e + "\n" + e.stack.toString();
                        console.error(stack_trace);
                        toast("导出失败");
                    }
                    this.sl_ing = false;
                });
            }
        }
    }

    this.importDecorator = (fuc) => {
        return (full_path) => {
            if (this.sl_ing) {
                toast("正在导入...请勿重复点击...");
            } else {
                this.sl_ing = true;
                toast("正在导入...可能会花费一些时间...");
                threads.start(() => {
                    try {
                        fuc.call(this, full_path);
                        toast("导入完成");
                    } catch (e) {
                        console.error(e);
                        var stack_trace = "" + e + "\n" + e.stack.toString();
                        console.error(stack_trace);
                        toast("导入失败");
                    }
                    this.sl_ing = false;
                });
            }
        }
    }

    this.getNikkis = function () {
        return NIKKIS;
    }

    this.getTekokis = function () {
        return TEKOKIS;
    }

    this.getViAr = function () {
        return VIAR;
    }

    this.getPasswordBook = function () {
        return PASSWORD_BOOK;
    }

    this.getTekokiData = function (key, event_name) {
        var result = [];
        if (TEKOKIS.data[key] === undefined) {
            return result;
        }
        for (var i in TEKOKIS.data[key]) {
            var events = TEKOKIS.data[key][i].events;
            if (event_name in events) {
                result.push(TEKOKIS.data[key][i]);
            }
        }
        return result;
    }

    this.getTekokiEvents = function () {
        if (TEKOKIS.events === undefined) {
            TEKOKIS.events = [];
        }
        return TEKOKIS.events;
    }

    this._clearNikkis = function () {
        NIKKIS.length = 0;
        this.app.page.setNikkiCount(NIKKIS.length);
    }

    this.clearNikkis = function () {
        ui.run(() => {
            this._clearNikkis();
        });
    }

    this._clearTekokis = function () {
        TEKOKIS.data = {};
        TEKOKIS.events.length = 0;
    }

    this.clearTekokis = function () {
        ui.run(() => {
            this._clearTekokis();
        });
    }

    this._delTekoki = function(event_name) {
        var index = TEKOKIS.events.indexOf(event_name);
        if (index !== -1) {
            TEKOKIS.events.splice(index, 1);
        }
        for (var key in TEKOKIS.data) {
            if (TEKOKIS.data.hasOwnProperty(key)) {
                for (var day in TEKOKIS.data[key]) {
                    if (TEKOKIS.data[key].hasOwnProperty(day)) {
                        if (TEKOKIS.data[key][day].events.hasOwnProperty(event_name)) {
                            delete TEKOKIS.data[key][day].events[event_name];
                        }
                        if (Object.keys(TEKOKIS.data[key][day].events).length === 0) {
                            delete TEKOKIS.data[key][day];
                        }
                    }
                }
                if (Object.keys(TEKOKIS.data[key]).length === 0) {
                    delete TEKOKIS.data[key];
                }
            }
        }
        this.saveTekoki();
    };

    this.delTekoki = function (event_name) {
        ui.run(() => {
            this._delTekoki(event_name);
        });
    };
    

    this._clearPasswordBook = function () {
        PASSWORD_BOOK.length = 0;
    }

    this.clearPasswordBook = function () {
        ui.run(() => {
            this._clearPasswordBook();
        });
    }

    this._addTekoki = function (event_name, year, month, day, number) {
        var key = year + "-" + month;
        if (!TEKOKIS.events.includes(event_name)) {
            TEKOKIS.events.push(event_name);
        }
        if (TEKOKIS.data[key] === undefined) {
            TEKOKIS.data[key] = {};
        }
        if (TEKOKIS.data[key][day] === undefined) {
            TEKOKIS.data[key][day] = {
                day: parseInt(day),
                events: {}
            };
        }
        TEKOKIS.data[key][day].events[event_name] = number;
        this.saveTekoki();
    }

    this.addTekoki = function (event_name, year, month, day, number) {
        ui.run(() => {
            this._addTekoki(event_name, year, month, day, number);
        });
    }

    this._reCreateTekoki = function () {
        var re_events = new Set();
        for (var year_mouth in TEKOKIS.data) {
            var days = TEKOKIS.data[year_mouth];
            for (var day in days) {
                var events = days[day].events;
                for (var event_name in events) {
                    if (events[event_name] <= 0) {
                        continue;
                    }
                    re_events.add(event_name);
                }
            }
        }
        TEKOKIS.events = Array.from(re_events);
        this.saveTekoki();
    }

    this.reCreateTekoki = function () {
        ui.run(() => {
            this._reCreateTekoki();
        });
    }

    this._sortNikki = function () {
        NIKKIS.sort((a, b) => b.date - a.date);
        this.app.page.setNikkiCount(NIKKIS.length);
    }

    this.sortNikki = function () {
        ui.run(() => {
            this._sortNikki();
        });
    }

    this._insertNikki = function (nikki) {
        this._delNikki(nikki.id);
        if (nikki.text.length > 0) {
            NIKKIS.push(nikki);
        }
        this._sortNikki();
    }

    this.insertNikki = function (nikki) {
        ui.run(() => {
            this._insertNikki(nikki);
        });
    }

    this._delNikki = function (id) {
        for (var i = 0; i < NIKKIS.length; i++) {
            if (NIKKIS[i].id === id) {
                NIKKIS.splice(i, 1);
                break;
            }
        }
        this._sortNikki();
    }

    this.delNikki = function (id) {
        ui.run(() => {
            this._delNikki(id);
        });
    }

    this._addPasswordBook = function (password_book) {
        PASSWORD_BOOK.push(password_book);
    }

    this.addPasswordBook = function (password_book) {
        ui.run(() => {
            this._addPasswordBook(password_book);
        });
    }

    this._delPasswordBook = function (id) {
        for (var i = 0; i < PASSWORD_BOOK.length; i++) {
            if (PASSWORD_BOOK[i].id === id) {
                PASSWORD_BOOK.splice(i, 1);
                break;
            }
        }
    }

    this.delPasswordBook = function (id) {
        ui.run(() => {
            this._delPasswordBook(id);
        });
    }

    this._setNikki = function (nikki) {
        this._clearNikkis();
        for (var i of nikki) {
            NIKKIS.push(i);
        }
        this._sortNikki();
        this.saveNikki();
    }

    this.setNikki = function (nikki) {
        ui.run(() => {
            this._setNikki(nikki);
        });
    }

    this._setTekoki = function (tekoki){
        this._clearTekokis();
        TEKOKIS.events = tekoki.events;
        TEKOKIS.data = tekoki.data;
        this.saveTekoki();
    }

    this.setTekoki = function (tekoki) {
        ui.run(() => {
            this._setTekoki(tekoki);
        });
    }

    this._setPasswordBook = function (password_books) {
        this._clearPasswordBook();
        for (var i of password_books) {
            PASSWORD_BOOK.push(i);
        }
        this.savePasswordBook();
    }

    this.setPasswordBook = function (password_books) {
        ui.run(() => {
            this._setPasswordBook(password_books);
        });
    }

    this.createEnptyFile = function (path, data_tmp) {
        if (files.exists(path)) {
            return;
        }
        print(path);
        files.ensureDir(path);
        if (data_tmp == undefined) {
            data_tmp = [];
        }
        var data = {
            salt: Math.floor(Math.random() * 1000000000) + 1,
            data: data_tmp
        };
        data = JSON.stringify(data);
        data = this.encrypt(data);
        data = JSON.stringify(data);
        files.write(path, data, [encoding = "utf-8"]);
    }

    this.loadNikki = function () {
        this.createEnptyFile(this.APP_PATH + NIKKIS_PATH);
        var nikki_data = files.read(this.APP_PATH + NIKKIS_PATH, [encoding = "utf-8"]);
        var nikki = null;
        try {
            nikki = JSON.parse(nikki_data);
        } catch (e) {
            toast("加载日记发生异常:" + e);
        }
        if (nikki !== null) {
            nikki = this.decrypt(nikki);
        }
        try {
            nikki = JSON.parse(nikki);
        } catch (e) {
            toast("加载日记发生异常:" + e);
        }
        if (nikki !== null) {
            this.setNikki(nikki.data);
        }
    }

    this.loadTekoki = function () {
        this.createEnptyFile(this.APP_PATH + TEKOKIS_PATH);
        var tekoki_data = files.read(this.APP_PATH + TEKOKIS_PATH, [encoding = "utf-8"]);
        var tekoki = null;
        try {
            tekoki = JSON.parse(tekoki_data);
        } catch (e) {
            toast("加载记录发生异常:" + e);
            return;
        }
        if (tekoki !== null) {
            tekoki = this.decrypt(tekoki);
        }
        try {
            tekoki = JSON.parse(tekoki);
        } catch (e) {
            toast("加载记录发生异常:" + e);
            return;
        }
        print(tekoki);
        if (tekoki != null) {
            tekoki = tekoki.data;
        }
        if (tekoki.events == undefined) {
            tekoki.events = [];
        }
        if (tekoki.data == undefined) {
            tekoki.data = {};
        }
        this.setTekoki(tekoki);
    }

    this.loadViAr = function () {
        this.createEnptyFile(this.APP_PATH + VIAR_PATH);
        var viar_data = files.read(this.APP_PATH + VIAR_PATH, [encoding = "utf-8"]);
        var viar = null;
        try {
            viar = JSON.parse(viar_data);
        } catch (e) {
            toast("加载故事集发生异常:" + e);
        }
        if (viar !== null) {
            viar = this.decrypt(viar);
        }
        try {
            VIAR.loadFromJson(viar);
        } catch (e) {
            toast("加载故事集发生异常:" + e);
        }
    }

    this.loadPasswordBook = function () {
        this.createEnptyFile(this.APP_PATH + PASSWORD_BOOK_PATH);
        var password_book_data = files.read(this.APP_PATH + PASSWORD_BOOK_PATH, [encoding = "utf-8"]);
        var password_book = null;
        try {
            password_book = JSON.parse(password_book_data);
        } catch (e) {
            toast("加载密码簿发生异常:" + e);
            return;
        }
        if (password_book !== null) {
            password_book = this.decrypt(password_book);
        }
        try {
            password_book = JSON.parse(password_book);
        } catch (e) {
            toast("加载密码簿发生异常:" + e);
        }
        if (password_book !== null) {
            this.setPasswordBook(password_book.data);
        }
    }

    this.load = function () {
        this.loadNikki();
        this.loadTekoki();
        this.loadViAr();
        this.loadPasswordBook();
    }

    this._saveNikki = () => {
        this.createEnptyFile(this.APP_PATH + NIKKIS_PATH);
        var nikki_data = {
            salt: Math.floor(Math.random() * 1000000000) + 1,
            data: NIKKIS
        };
        nikki_data = JSON.stringify(nikki_data);
        nikki_data = this.encrypt(nikki_data);
        nikki_data = JSON.stringify(nikki_data);
        files.write(this.APP_PATH + NIKKIS_PATH, nikki_data, [encoding = "utf-8"]);
    }

    this.saveNikki = () => {
        threads.start(this._saveNikki);
    }

    this._saveTekoki = () => {
        this.createEnptyFile(this.APP_PATH + TEKOKIS_PATH);
        var tekoki_data = {
            salt: Math.floor(Math.random() * 1000000000) + 1,
            data: TEKOKIS
        };
        tekoki_data = JSON.stringify(tekoki_data);
        tekoki_data = this.encrypt(tekoki_data);
        tekoki_data = JSON.stringify(tekoki_data);
        files.write(this.APP_PATH + TEKOKIS_PATH, tekoki_data, [encoding = "utf-8"]);
    }

    this.saveTekoki = () => {
        threads.start(this._saveTekoki);
    }

    this._saveViAr = () => {
        this.createEnptyFile(this.APP_PATH + VIAR_PATH, {});
        var viar_data = VIAR.saveToJson();
        viar_data = this.encrypt(viar_data);
        viar_data = JSON.stringify(viar_data);
        files.write(this.APP_PATH + VIAR_PATH, viar_data, [encoding = "utf-8"]);
    }

    this.saveViAr = () => {
        threads.start(this._saveViAr);
    }

    this._savePasswordBook = () => {
        this.createEnptyFile(this.APP_PATH + PASSWORD_BOOK_PATH);
        var password_book_data = {
            salt: Math.floor(Math.random() * 1000000000) + 1,
            data: PASSWORD_BOOK
        };
        password_book_data = JSON.stringify(password_book_data);
        password_book_data = this.encrypt(password_book_data);
        password_book_data = JSON.stringify(password_book_data);
        files.write(this.APP_PATH + PASSWORD_BOOK_PATH, password_book_data, [encoding = "utf-8"]);
    }

    this.savePasswordBook = () => {
        threads.start(this._savePasswordBook);
    }

    this._save = () => {
        this._saveTekoki();
        this._saveNikki();
        this._saveViAr();
        this._savePasswordBook();
    }

    this.save = () => {
        threads.start(this._save);
    }

    this.export = function (full_path) {
        var data = {
            out_nikki: NIKKIS,
            out_tekoki: TEKOKIS,
            out_viar: VIAR.saveToJson(),
            out_password_book: PASSWORD_BOOK,
            salt: Math.floor(Math.random() * 1000000000) + 1
        }
        data = JSON.stringify(data);
        data = LZString.compressToBase64(data);
        data = this.encrypt(data);
        data = JSON.stringify(data);
        files.ensureDir(full_path);
        files.write(full_path, data, [encoding = "utf-8"]);
    }
    this.export = this.exportDecorator(this.export);


    this.exportPlain = function (full_path) {
        var data = {
            out_nikki: NIKKIS,
            out_tekoki: TEKOKIS,
            out_viar: VIAR.saveToJson(),
            out_password_book: PASSWORD_BOOK
        }
        data = JSON.stringify(data);
        data = {
            version: this.app.VERSION,
            crypt_version: CRYPT_VRESION,
            is_encrypt: false,
            is_plain: true,
            data: data
        }
        data = JSON.stringify(data);
        files.ensureDir(full_path);
        files.write(full_path, data, [encoding = "utf-8"]);
    }
    this.exportPlain = this.exportDecorator(this.exportPlain);

    this.exportOneDay = function (full_path) {
        var result = {
            metadata: {
                version: "2023.25",
                xya_info: "This is export from xya-nikki"
            },
            entries: []
        }
        for (var nikki of NIKKIS) {
            var text = nikki.text;
            var text_data = {
                contents: [{
                    text: text
                }
                ],
                meta: {
                    created: {
                        platform: "com.bloombuilt.dayone-android",
                        version: 407
                    },
                    "small-lines-removed": true,
                    version: 1
                }
            };
            text_data = JSON.stringify(text_data);
            var date = Utils.formatTimestampUTC(nikki.date);
            var data = {
                uuid: $crypto.digest(text_data, "MD5").toUpperCase(),
                starred: false,
                pinned: false,
                text: text,
                richText: text_data,
                creationDate: date,
                modifiedDate: date,
                creationDevice: device.model,
                creationOSName: Utils.getSystemName(),
                creationOSVersion: Utils.getAndroidVersion(),
                creationDeviceType: device.brand,
                timeZone: Utils.getTimeZone(),
                v: {}
            };
            result.entries.push(data);
        }
        result = JSON.stringify(result);
        files.ensureDir(full_path);
        files.write(full_path, result, [encoding = "utf-8"]);
    }
    this.exportOneDay = this.exportDecorator(this.exportOneDay);

    this.import = function (full_path) {
        var load_backup_json = files.read(full_path, [, encoding = "utf-8"])
        var load_backup = null;
        try {
            load_backup = JSON.parse(load_backup_json);
        } catch (e) {
            toast("导入文件发生异常:" + e);
            return;
        }
        var version = load_backup.crypt_version;
        switch (version) {
            case 1:
                this._importV1(load_backup);
                break;
            default:
                this._importVBeta(load_backup);
        }
    }
    this.import = this.importDecorator(this.import);

    this._importV1 = function (load_backup) {
        var data = this.decrypt(load_backup);
        try {
            if (load_backup.is_plain !== true) {
                data = LZString.decompressFromBase64(data);
            }
            data = JSON.parse(data);
        } catch (e) {
            toast("导入文件发生异常:" + e);
            return;
        }
        this.setNikki(data.out_nikki);
        this.setTekoki(data.out_tekoki);
        var viar = data.out_viar;
        if (viar != undefined) {
            try {
                VIAR.loadFromJson(viar,()=>{
                    this.saveViAr();
                });
            } catch (e) {
                toast("加载故事集发生异常:" + e);
            }
        }
        this.clearPasswordBook();
        var password_book = data.out_password_book;
        if (password_book != undefined) {
            this.setPasswordBook(password_book);
        }
    }

    this._importVBeta = function (load_backup) {
        var load_nikki = load_backup.out_nikki;
        var load_tekoki = load_backup.out_tekoki;
        var load_event = load_backup.out_tekoki_event;
        this._importNikkiVBeta(load_nikki);
        this._importTekokiVBeta(load_tekoki, load_event);
    }

    this._importNikkiVBeta = function (load_nikki) {
        var nikki = null;
        var nikki_data = this._decryptVBeta(load_nikki);
        try {
            nikki = JSON.parse(nikki_data);
        } catch (e) {
            toast("导入日记发生异常:" + e);
            return;
        }
        var nikki_list = []
        for (var i in nikki) {
            nikki_list.push(nikki[i]);
        }
        this.setNikki(nikki_list)
    }

    this._importTekokiVBeta = function (load_tekoki, load_event) {
        var tekoki = null;
        var tekoki_data = this._decryptVBeta(load_tekoki);
        try {
            tekoki = JSON.parse(tekoki_data);
        } catch (e) {
            toast("导入记录发生异常:" + e);
            return;
        }
        var event = null;
        var event_data = this._decryptVBeta(load_event);
        try {
            event = JSON.parse(event_data);
        } catch (e) {
            toast("导入记录发生异常:" + e);
            return;
        }
        var new_tekoki = {
            events: [],
            data: {}
        };
        for (var key in tekoki) {
            var tds = tekoki[key];
            for (var td of tds) {
                if (!Utils.objIsEmpty(td.n_event)) {
                    var del_list = [];
                    for (var eve_key in td.n_event) {
                        if (td.n_event[eve_key] <= 0) {
                            del_list.push(eve_key);
                        }
                    }
                    for (var del_key of del_list) {
                        delete td.n_event[del_key];
                    }
                    if (Utils.objIsEmpty(td.n_event)) {
                        continue;
                    }
                    if (new_tekoki.data[key] === undefined) {
                        new_tekoki.data[key] = {};
                    }
                    for (var eve_key in td.n_event) {
                        td.n_event[eve_key] = parseInt(td.n_event[eve_key]);
                    }
                    new_tekoki.data[key][td.day] = {
                        day: parseInt(td.day),
                        events: td.n_event
                    };
                }
            }
        }
        for (var e of event) {
            new_tekoki.events.push(e);
        }
        this.setTekoki(new_tekoki);
    }

    this.encrypt = function (data) {
        if (!this.app.password_manager.has_password) {
            var endata = {
                version: this.app.VERSION,
                crypt_version: CRYPT_VRESION,
                is_encrypt: false,
                data: data
            }
            return endata;
        }
        var pw = this.app.password_manager.password;
        var endata = Utils.encrypt(data, pw);
        endata = {
            version: this.app.VERSION,
            crypt_version: CRYPT_VRESION,
            is_encrypt: true,
            data: endata
        }
        return endata;
    }

    this.decrypt = function (data) {
        switch (data.crypt_version) {
            case 1:
                return this._decryptV1(data);
            default:
                return this._decryptVBeta(data);
        }
    }

    this._decryptV1 = function (data) {
        if (!data.is_encrypt) {
            return data.data;
        }
        if (!this.app.password_manager.has_password) {
            return null;
        }
        data = data.data;
        var pw = this.app.password_manager.password;
        var dedata = Utils.decrypt(data, pw);
        return dedata;
    }

    this._decryptVBeta = function (data) {
        if (!this.app.password_manager.has_password) {
            return data;
        }
        var pw = this.app.password_manager.password;
        var dedata = Utils.decrypt(data, pw);
        return dedata;
    }

    this.checkNikkiTime = function () {
        var nikkis = [];
        for (var nikki of NIKKIS) {
            var date = new Date(nikki.date);
            nikki.year = date.getFullYear();
            nikki.month = date.getMonth() + 1;
            nikki.day = date.getDate();
            nikki.hours = Utils.addZero(date.getHours());
            nikki.minu = Utils.addZero(date.getMinutes());
            nikki.week = "周" + "日一二三四五六".charAt(date.getDay());
            nikkis.push(nikki);
        }
        this.setNikki(nikkis);
    }

    return this;
}

module.exports = DataMnager;