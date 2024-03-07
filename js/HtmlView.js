const BASE_PAGE = 'data:text/html;base64,PCFkb2N0eXBlIGh0bWw+PGh0bWwgbGFuZz0iY24iPjxoZWFkPjxtZXRhIGNoYXJzZXQ9IlVURi04Ij48bWV0YSBodHRwLWVxdWl2PSJYLVVBLUNvbXBhdGlibGUiY29udGVudD0iSUU9ZWRnZSI+PG1ldGEgbmFtZT0idmlld3BvcnQiY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCwgbWF4aW11bS1zY2FsZT0xLjAsIHVzZXItc2NhbGFibGU9bm8iPjxzdHlsZT5odG1se21hcmdpbjowO2hlaWdodDoxMDAlO3dpZHRoOjEwMCV9Ym9keXttYXJnaW46MDtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlO292ZXJmbG93LXg6aGlkZGVufTwvc3R5bGU+PHNjcmlwdCBzcmM9ImF1dG94Oi8vc2RrLnYxLmpzIj48L3NjcmlwdD48c2NyaXB0PiRhdXRveC5jYWxsSGFuZGxlcigiYWp4Iiwid2ViX3JlYWR5IiwoZGF0YSk9Pntkb2N1bWVudC5ib2R5LmlubmVySFRNTD1kYXRhfSk7ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigiQXV0b3hKc0JyaWRnZVJlYWR5IiwoKT0+e30pOzwvc2NyaXB0PjwvaGVhZD48Ym9keT48L2JvZHk+PC9odG1sPg==';

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