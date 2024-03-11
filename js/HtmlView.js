const BASE_PAGE = 'data:text/html;base64,PCFkb2N0eXBlIGh0bWw+PGh0bWwgbGFuZz0iY24iPjxoZWFkPjxtZXRhIGNoYXJzZXQ9IlVURi04Ij48bWV0YSBodHRwLWVxdWl2PSJYLVVBLUNvbXBhdGlibGUiY29udGVudD0iSUU9ZWRnZSI+PG1ldGEgbmFtZT0idmlld3BvcnQiY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCwgbWF4aW11bS1zY2FsZT0xLjAsIHVzZXItc2NhbGFibGU9bm8iPjxzdHlsZT5odG1se21hcmdpbjowO2hlaWdodDoxMDAlO3dpZHRoOjEwMCV9Ym9keXttYXJnaW46MDtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlO292ZXJmbG93LXg6aGlkZGVufTwvc3R5bGU+PHNjcmlwdCBzcmM9ImF1dG94Oi8vc2RrLnYxLmpzIj48L3NjcmlwdD48c2NyaXB0PmZ1bmN0aW9uIHJ1blNjcmlwdChzY3JpcHQpe2NvbnN0IG5ld1NjcmlwdD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtuZXdTY3JpcHQuaW5uZXJIVE1MPXNjcmlwdC5pbm5lckhUTUw7Y29uc3Qgc3JjPXNjcmlwdC5nZXRBdHRyaWJ1dGUoJ3NyYycpO2lmKHNyYyluZXdTY3JpcHQuc2V0QXR0cmlidXRlKCdzcmMnLHNyYyk7ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChuZXdTY3JpcHQpO2RvY3VtZW50LmhlYWQucmVtb3ZlQ2hpbGQobmV3U2NyaXB0KX1mdW5jdGlvbiBzZXRIVE1MV2l0aFNjcmlwdChjb250YWluZXIscmF3SFRNTCl7Y29udGFpbmVyLmlubmVySFRNTD1yYXdIVE1MO2NvbnN0IHNjcmlwdHM9Y29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ3NjcmlwdCcpO2ZvcihsZXQgc2NyaXB0IG9mIHNjcmlwdHMpe3J1blNjcmlwdChzY3JpcHQpfX08L3NjcmlwdD48c2NyaXB0PiRhdXRveC5jYWxsSGFuZGxlcigiYWp4Iiwid2ViX3JlYWR5IiwoZGF0YSk9PntzZXRIVE1MV2l0aFNjcmlwdChkb2N1bWVudC5ib2R5LGRhdGEpfSk7ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigiQXV0b3hKc0JyaWRnZVJlYWR5IiwoKT0+e30pOzwvc2NyaXB0PjwvaGVhZD48Ym9keT48L2JvZHk+PC9odG1sPg==';

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