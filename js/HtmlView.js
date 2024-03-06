const BASE_PAGE = (
    'data:text/html;base64,PCFkb2N0eXBlIGh0bWw+PGh0bWwg' +
    'bGFuZz0iY24iPjxoZWFkPjxtZXRhIGNoYXJzZXQ9IlVURi04Ij' +
    '48bWV0YSBodHRwLWVxdWl2PSJYLVVBLUNvbXBhdGlibGUiY29u' +
    'dGVudD0iSUU9ZWRnZSI+PG1ldGEgbmFtZT0idmlld3BvcnQiY2' +
    '9udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNj' +
    'YWxlPTEuMCI+PHN0eWxlPmh0bWx7bWFyZ2luOjA7aGVpZ2h0Oj' +
    'EwMCU7d2lkdGg6MTAwJX1ib2R5e21hcmdpbjowO2hlaWdodDox' +
    'MDAlO3dpZHRoOjEwMCV9PC9zdHlsZT48c2NyaXB0IHNyYz0iYX' +
    'V0b3g6Ly9zZGsudjEuanMiPjwvc2NyaXB0PjxzY3JpcHQ+JGF1' +
    'dG94LmNhbGxIYW5kbGVyKCJhangiLCJ3ZWJfcmVhZHkiLChkYX' +
    'RhKT0+e2RvY3VtZW50LmJvZHkuaW5uZXJIVE1MPWRhdGF9KTtk' +
    'b2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCJBdXRveEpzQnJpZG' +
    'dlUmVhZHkiLCgpPT57fSk7PC9zY3JpcHQ+PC9oZWFkPjxib2R5' +
    'PjwvYm9keT48L2h0bWw+'
);

const HtmlView = (function () {
    util.extend(HtmlView, ui.Widget);
    function HtmlView() {
        ui.Widget.call(this);
        this._html = "";
        this.defineAttr("html", (view, name, defaultGetter) => {
            return this._html;
        }, (view, name, value, defaultSetter) => {
            this._html = value;
            view.jsBridge.registerHandler("ajx", (data, callBack) => {
                if (data == "web_ready") {
                    callBack(value);
                }
            });
            view.loadUrl(BASE_PAGE);
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