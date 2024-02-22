importClass(java.util.TimeZone);

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

Utils.formatTimestamp = function (timestamp) {
    var date = new Date(timestamp);
    var year = date.getUTCFullYear();
    var month = String(date.getUTCMonth() + 1).padStart(2, '0');
    var day = String(date.getUTCDate()).padStart(2, '0');
    var hours = String(date.getUTCHours()).padStart(2, '0');
    var minutes = String(date.getUTCMinutes()).padStart(2, '0');
    var seconds = String(date.getUTCSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
}

Utils.getAndroidVersion = function () {
    const version_map = {
        "1": "1.0",
        "2": "1.1",
        "3": "1.5 Cupcake",
        "4": "1.6 Donut",
        "5": "2.0 Eclair",
        "6": "2.0.1 Eclair",
        "7": "2.1 Eclair",
        "8": "2.2 Froyo",
        "9": "2.3 Gingerbread",
        "10": "2.3.3 Gingerbread",
        "11": "3.0 Honeycomb",
        "12": "3.1 Honeycomb",
        "13": "3.2 Honeycomb",
        "14": "4.0 Ice Cream Sandwich",
        "15": "4.0.3 Ice Cream Sandwich",
        "16": "4.1 Jelly Bean",
        "17": "4.2 Jelly Bean",
        "18": "4.3 Jelly Bean",
        "19": "4.4 KitKat",
        "20": "4.4W KitKat, with wearable extensions",
        "21": "5.0 Lollipop",
        "22": "5.1 Lollipop",
        "23": "6.0 Marshmallow",
        "24": "7.0 Nougat",
        "25": "7.1 Nougat",
        "26": "8.0 Oreo",
        "27": "8.1 Oreo",
        "28": "9 Pie",
        "29": "10",
        "30": "11",
        "31": "12"
    }
    var version = version_map["" + device.sdkInt];
    version = version || "Unknown";
    return version;
}

Utils.getTimeZone = function () {
    var tz = TimeZone.getDefault().getID();
    return tz;
}

module.exports = Utils;