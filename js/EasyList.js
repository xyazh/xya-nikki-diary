const EasyList = (function () {
    util.extend(EasyList, ui.Widget);
    function EasyList() {
        ui.Widget.call(this);
        this._list = [];
        this.defineAttr("source", (view, name, defaultGetter) => {
            if (view._list == undefined) {
                view._list = [];
                view.setDataSource(view._list);
            }
            return JSON.stringify(view._list);
        }, (view, name, value, defaultSetter) => {
            if (view._list == undefined) {
                view._list = [];
                view.setDataSource(view._list);
            }
            view._list.length = 0;
            var list = JSON.parse(value);
            for (var item of list) {
                view._list.push(item);
            }
        });
    }

    EasyList.prototype.render = function () {
        return (
            <list />
        );
    }

    ui.registerWidget("easy-list", EasyList);
    return EasyList;
})();

module.exports = EasyList; 