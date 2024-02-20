const Utils = {};

Utils.addZero = function (num) {
    num = "" + num;
    if (num.length == 1) {
        num = "0" + num;
    }
    return num;
}

Utils.decrypt = function (data, pw) {
    var pw_md5 = pw;
    var pw_key = new $crypto.Key(pw_md5);
    var dedata = $crypto.decrypt(data, pw_key, "AES/ECB/PKCS5padding", {
        input: "base64",
        output: "string"
    });
    return dedata;
}

Utils.encrypt = function (data, pw) {
    var pw_md5 = pw;
    var pw_key = new $crypto.Key(pw_md5);
    var endata = $crypto.encrypt(data, pw_key, "AES/ECB/PKCS5padding", {
        output: "base64"
    });
    return endata;
}

Utils.ttToDatetime = function (ymd, hm) {
    ymd = ymd.replace(/-/g, "/")
    return Date.parse(ymd + " " + hm)
}

Utils.getDaysInMonth = function (year, month) {
    return new Date(year, month, 0).getDate();
}

Utils.getFirstDayOfWeek = function (year, month) {
    var firstDayOfMonth = new Date(year, month - 1, 1);
    return firstDayOfMonth.getDay();
}

Utils.objIsEmpty = function (obj) {
    return Object.keys(obj).length === 0;
}

module.exports = Utils;