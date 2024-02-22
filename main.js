"ui";
try {
    const DATA_CONTAINER = {};
    const App = require("./App.js");
    var app = new App(DATA_CONTAINER);
    app.password_manager.inputPassword(app.main);
} catch (e) {
    console.error(e);
    var stack_trace = e.stack.toString();
    files.ensureDir("/sdcard/xya日记/log/error.log");
    files.write("/sdcard/xya日记/log/error.log", stack_trace, [encoding = "utf-8"]);
    toast("发生严重错误,错误日志已写入：/sdcard/xya日记/log/error.log");
    setTimeout(()=>{}, 500);
}