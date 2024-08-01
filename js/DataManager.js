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

const TEKOKIS_PATH = "./data/tekoki/tekoki.json";
const NIKKIS_PATH = "./data/nikki/nikki.json";
const VIAR_PATH = "./data/viar/viar.json";
const PASSWORD_BOOK_PATH = "./data/passwordbook/passwordbook.json";

const CRYPT_VRESION = 1;

const DataMnager = function (app) {
    this.app = app;
    this.password = "";
    this.sl_ing = false;

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

    this.clearNikkis = function () {
        NIKKIS.length = 0;
        this.app.page.setNikkiCount(NIKKIS.length);
    }

    this.clearTekokis = function () {
        TEKOKIS.data = {};
        TEKOKIS.events.length = 0;
    }

    this.clearPasswordBook = function () {
        PASSWORD_BOOK.length = 0;
    }

    this.addTekoki = function (event_name, year, month, day, number) {
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

    this.reCreateTekoki = function () {
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


    this.sortNikki = function () {
        NIKKIS.sort((a, b) => b.date - a.date);
        this.app.page.setNikkiCount(NIKKIS.length);
    }

    this.insertNikki = function (nikki) {
        this.delNikki(nikki.id);
        if (nikki.text.length > 0) {
            NIKKIS.push(nikki);
        }
        this.sortNikki();
    }

    this.delNikki = function (id) {
        for (let i = 0; i < NIKKIS.length; i++) {
            if (NIKKIS[i].id === id) {
                NIKKIS.splice(i, 1);
                break;
            }
        }
        this.sortNikki();
    }

    this.addPasswordBook = function (password_book) {
        PASSWORD_BOOK.push(password_book);
    }

    this.delPasswordBook = function (id) {
        for (let i = 0; i < PASSWORD_BOOK.length; i++) {
            if (PASSWORD_BOOK[i].id === id) {
                PASSWORD_BOOK.splice(i, 1);
                break;
            }
        }
    }


    this.createEnptyFile = function (path, data_tmp) {
        if (files.exists(path)) {
            return;
        }
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
        this.createEnptyFile(NIKKIS_PATH);
        var nikki_data = files.read(NIKKIS_PATH, [encoding = "utf-8"]);
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
            nikki = nikki.data;
            nikki.forEach(element => {
                NIKKIS.push(element);
            });
            this.sortNikki();
        }
    }

    this.loadTekoki = function () {
        this.createEnptyFile(TEKOKIS_PATH);
        var tekoki_data = files.read(TEKOKIS_PATH, [encoding = "utf-8"]);
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
        if (tekoki !== null) {
            tekoki = tekoki.data;
        }
        if (tekoki.events === undefined) {
            tekoki.events = [];
        }
        if (tekoki.data === undefined) {
            tekoki.data = {};
        }
        TEKOKIS.events = tekoki.events;
        TEKOKIS.data = tekoki.data;
    }

    this.loadViAr = function () {
        this.createEnptyFile(VIAR_PATH);
        var viar_data = files.read(VIAR_PATH, [encoding = "utf-8"]);
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
        this.createEnptyFile(PASSWORD_BOOK_PATH);
        var password_book_data = files.read(PASSWORD_BOOK_PATH, [encoding = "utf-8"]);
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
            password_book = password_book.data;
            password_book.forEach(element => {
                PASSWORD_BOOK.push(element);
            });
        }
    }

    this.load = function () {
        this.loadNikki();
        this.loadTekoki();
        this.loadViAr();
        this.loadPasswordBook();
    }

    this.saveNikki = function () {
        this.createEnptyFile(NIKKIS_PATH);
        var nikki_data = {
            salt: Math.floor(Math.random() * 1000000000) + 1,
            data: NIKKIS
        };
        nikki_data = JSON.stringify(nikki_data);
        nikki_data = this.encrypt(nikki_data);
        nikki_data = JSON.stringify(nikki_data);
        files.write(NIKKIS_PATH, nikki_data, [encoding = "utf-8"]);
    }

    this.saveTekoki = function () {
        this.createEnptyFile(TEKOKIS_PATH);
        var tekoki_data = {
            salt: Math.floor(Math.random() * 1000000000) + 1,
            data: TEKOKIS
        };
        tekoki_data = JSON.stringify(tekoki_data);
        tekoki_data = this.encrypt(tekoki_data);
        tekoki_data = JSON.stringify(tekoki_data);
        files.write(TEKOKIS_PATH, tekoki_data, [encoding = "utf-8"]);
    }

    this.saveViAr = function () {
        this.createEnptyFile(VIAR_PATH, {});
        var viar_data = VIAR.saveToJson();
        viar_data = this.encrypt(viar_data);
        viar_data = JSON.stringify(viar_data);
        files.write(VIAR_PATH, viar_data, [encoding = "utf-8"]);
    }

    this.savePasswordBook = function () {
        this.createEnptyFile(PASSWORD_BOOK_PATH);
        var password_book_data = {
            salt: Math.floor(Math.random() * 1000000000) + 1,
            data: PASSWORD_BOOK
        };
        password_book_data = JSON.stringify(password_book_data);
        password_book_data = this.encrypt(password_book_data);
        password_book_data = JSON.stringify(password_book_data);
        files.write(PASSWORD_BOOK_PATH, password_book_data, [encoding = "utf-8"]);
    }

    this.save = function () {
        this.saveTekoki();
        this.saveNikki();
        this.saveViAr();
        this.savePasswordBook();
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
        if (load_backup.is_plain !== true) {
            data = LZString.decompressFromBase64(data);
        }
        try {
            data = JSON.parse(data);
        } catch (e) {
            toast("导入文件发生异常:" + e);
            return;
        }
        this.clearNikkis();
        for (var i of data.out_nikki) {
            NIKKIS.push(i);
        }
        this.sortNikki();
        TEKOKIS.data = data.out_tekoki.data;
        TEKOKIS.events = data.out_tekoki.events;
        var viar = data.out_viar;
        if (viar != undefined) {
            try {
                VIAR.loadFromJson(viar);
            } catch (e) {
                toast("加载故事集发生异常:" + e);
            }
        }
        this.clearPasswordBook();
        for (var i of data.out_password_book) {
            PASSWORD_BOOK.push(i);
        }
        this.save();
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
        this.clearNikkis();
        for (var i in nikki) {
            NIKKIS.push(nikki[i]);
        }
        this.sortNikki();
        this.saveNikki();
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
        this.clearTekokis();
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
                    if (TEKOKIS.data[key] === undefined) {
                        TEKOKIS.data[key] = {};
                    }
                    for (var eve_key in td.n_event) {
                        td.n_event[eve_key] = parseInt(td.n_event[eve_key]);
                    }
                    TEKOKIS.data[key][td.day] = {
                        day: parseInt(td.day),
                        events: td.n_event
                    };
                }
            }
        }
        for (var e of event) {
            TEKOKIS.events.push(e);
        }
        this.saveTekoki();
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
        this.clearNikkis();
        for (var nikki of nikkis) {
            NIKKIS.push(nikki);
        }
        this.sortNikki();
        this.saveNikki();
    }



    return this;
}

module.exports = DataMnager;