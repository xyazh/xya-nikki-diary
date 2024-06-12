const BASE_PAGE = "file://" + files.path("./res/text2.html")

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