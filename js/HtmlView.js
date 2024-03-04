const HtmlView = (function () {
    util.extend(HtmlView, ui.Widget);
    function HtmlView() {
        ui.Widget.call(this);
        this._html = "";
        this.defineAttr("html", (view, name, defaultGetter) => {
            return this._html;
        }, (view, name, value, defaultSetter) => {
            this._html = value;
            var web_root = $files.join(files.cwd(), "res");
            view.jsBridge.registerHandler("ajx", (data, callBack) => {
                if (data == "web_ready") {
                    callBack(value);
                }
            });
            view.loadUrl(`data:text/html;base64,PCFkb2N0eXBlIGh0bWw+PGh0bWwgbGFuZz0iY24iPjxoZWFkPjxtZXRhIGNoYXJzZXQ9IlVURi04Ij48bWV0YSBodHRwLWVxdWl2PSJYLVVBLUNvbXBhdGlibGUiY29udGVudD0iSUU9ZWRnZSI+PG1ldGEgbmFtZT0idmlld3BvcnQiY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCI+PHN0eWxlPmh0bWx7bWFyZ2luOjA7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJX1ib2R5e21hcmdpbjowO2hlaWdodDoxMDAlO3dpZHRoOjEwMCV9PC9zdHlsZT48c2NyaXB0IHNyYz0iYXV0b3g6Ly9zZGsudjEuanMiPjwvc2NyaXB0PjxzY3JpcHQ+JGF1dG94LmNhbGxIYW5kbGVyKCJhangiLCJ3ZWJfcmVhZHkiLChkYXRhKT0+e2RvY3VtZW50LmJvZHkuaW5uZXJIVE1MPWRhdGF9KTtkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCJBdXRveEpzQnJpZGdlUmVhZHkiLCgpPT57fSk7PC9zY3JpcHQ+PC9oZWFkPjxib2R5PjwvYm9keT48L2h0bWw+`);
        });
    }

    HtmlView.prototype.render = function () {
        return (
            <webview />
        );
    }

    ui.registerWidget("html-view", HtmlView);
    return HtmlView;
})();

module.exports = HtmlView; 