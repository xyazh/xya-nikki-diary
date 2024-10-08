importClass(java.util.TimeZone);
importClass(java.util.UUID);
importClass(java.lang.System);

const Utils = {};

const STR_COLOR_MAP = {};

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
    var first_day_of_month = new Date(year, month - 1, 1);
    return first_day_of_month.getDay();
}

Utils.objIsEmpty = function (obj) {
    return Object.keys(obj).length === 0;
}

Utils.formatTimestampUTC = function (timestamp) {
    var date = new Date(timestamp);
    var year = date.getUTCFullYear();
    var month = String(date.getUTCMonth() + 1).padStart(2, '0');
    var day = String(date.getUTCDate()).padStart(2, '0');
    var hours = String(date.getUTCHours()).padStart(2, '0');
    var minutes = String(date.getUTCMinutes()).padStart(2, '0');
    var seconds = String(date.getUTCSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
}

Utils.formatTimestamp = function (timestamp) {
    var date = new Date(timestamp);
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');
    var hours = date.getHours().toString().padStart(2, '0');
    var minutes = date.getMinutes().toString().padStart(2, '0');
    var seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

Utils.isSameDay = function (date1, date2) {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
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

Utils.createUUID = function () {
    var uuid = UUID.randomUUID();
    return uuid.toString();
}
Utils.splitKeyword = function (str) {
    var result = [];
    for (var len = 1; len <= str.length; len++) {
        for (var start = 0; start <= str.length - len; start++) {
            result.push(str.substring(start, start + len));
        }
    }
    return result;
}

Utils.stringToColor = function (str) {
    str = String(str);
    if (!(str in STR_COLOR_MAP)) {
        STR_COLOR_MAP[str] = "#" + $crypto.digest(str, "MD5").substring(0, 6);
    }
    return STR_COLOR_MAP[str];
}

Utils.stringToColorLight = function (str) {
    color = Utils.stringToColor(str);
    var hex = color.substring(1);
    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);
    r = parseInt(127 + r / 2);
    g = parseInt(127 + g / 2);
    b = parseInt(127 + b / 2);
    var new_color = "#" +
        ("0" + r.toString(16)).slice(-2) +
        ("0" + g.toString(16)).slice(-2) +
        ("0" + b.toString(16)).slice(-2);
    return new_color;
}

Utils.invertColor = function (hex) {
    hex = hex.substring(1);
    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);
    r = 255 - r;
    g = 255 - g;
    b = 255 - b;
    var inverted_hex = "#" +
        ("0" + r.toString(16)).slice(-2) +
        ("0" + g.toString(16)).slice(-2) +
        ("0" + b.toString(16)).slice(-2);
    return inverted_hex;
}

Utils.getSystemName = function () {
    var os_name = "Unknown";
    try {
        os_name = System.getProperty("os.name");
        if (os_name.toLowerCase().indexOf("linux") !== -1) {
            if (System.getProperty("java.vendor").toLowerCase().indexOf("android") !== -1) {
                os_name = "Android";
            }
            else if (System.getProperty("java.vm.name").toLowerCase().indexOf("harmony") !== -1) {
                os_name = "HarmonyOS";
            }
            else {
                os_name = "Linux";
            }
        }
    } catch (e) {
    }
    return os_name;
};

Utils.parseTimeString = function (time_string) {
    const regexes = [
        /^(\d{4})(?:-(\d{1,2}))?(?:-(\d{1,2}))?(?:\s(\d{1,2}):(\d{1,2}):(\d{1,2}))?$/,
        /^(\d{4})年(?:-(\d{1,2})月)?(?:-(\d{1,2})日)?(?:\s(\d{1,2})时(\d{1,2})分(\d{1,2})秒)?$/,
        /^(\d{4})年(\d{1,2})月(\d{1,2})日(?:\s(\d{1,2})时(\d{1,2})分(\d{1,2})秒)?$/
    ];
    for (var regex of regexes) {
        var match = time_string.match(regex);
        if (match) {
            var [_, year, month, day, hour, minute, second] = match;
            var result = {
                year: year || null,
                month: month || null,
                day: day || null,
                hour: hour || null,
                minute: minute || null,
                second: second || null
            };
            return result;
        }
    }
    return null;
}



module.exports = Utils;