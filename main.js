"ui";
try {
    const DATA_CONTAINER = {};
    const App = require("./App.js");
    var app = new App(DATA_CONTAINER);
    app.password_manager.inputPassword(app.main);
} catch (e) {
    toast(e);
    files.ensureDir("/sdcard/xya日记/log/error.log");
    files.write("/sdcard/xya日记/log/error.log", e, [encoding = "utf-8"]);
}