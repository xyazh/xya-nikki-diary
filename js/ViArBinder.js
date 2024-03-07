const Utils = require('./Utils.js');
const ViArNode = require("./ViArNode.js");

const ViArBinder = function (page, app) {
    this.page = page;
    this.app = app;

    this.viar = this.app.data_manager.getViAr();

    this.tob_hidden_btn = ui.viar_tob_hidden_btn;
    this.tob = ui.viar_tob;
    this.viar_btn = ui.viar_but;
    this.add_btn = ui.viar_add;
    this.srh_btn = ui.viar_srh;
    this.list = ui.viar_list;
    this.tag_list = ui.viar_tags;
    this.viar_srh_kw = ui.viar_srh_kw;

    this.look_tob_hidden_btn = ui.look_viar_tob_hidden_btn;
    this.look_tob = ui.look_viar_tob;
    this.look_tag_list = ui.look_viar_tags;
    this.look_viar_html = ui.look_viar_html;
    this.look_viar_id = ui.look_viar_id;
    this.look_viar_title = ui.look_viar_title;
    this.look_viar_time = ui.look_viar_time;
    this.look_viar_btn = ui.look_viar_but;
    this.link_node_btn = ui.link_node_but;
    this.last_node_btn = ui.last_node_but;
    this.next_node_btn = ui.next_node_but;

    this.list.setDataSource(this.viar.getRenderList());

    this.link_node_btn.on("click", () => {
        var id = this.look_viar_id.text();
        var node = this.viar.getNode(id);
        this.viar.useNodeLinks(node);
        this.viar_srh_kw.setText(`<node:${node.title}|id=${id}>的链接`);
        this.page.openViAr();
        this.list.setDataSource(this.viar.getRenderList());
        print(this.viar.getRenderList());
    });

    this.tob_hidden_btn.on("click", () => {
        if (this.tob_hidden_btn.text() == "收起") {
            this.tob_hidden_btn.setText("展开");
            this.tob.attr("visibility", "gone");
        } else {
            this.tob_hidden_btn.setText("收起");
            this.tob.attr("visibility", "visible");
        }
    });

    this.viar_btn.on("click", () => {
        var st = this.add_btn.attr("visibility");
        if (st == "gone") {
            this.add_btn.attr("visibility", "visible");
            this.srh_btn.attr("visibility", "visible");
            this.viar_btn.attr("rotation", "-90");
            this.viar_btn.attr("alpha", "0.5");
        } else {
            this.add_btn.attr("visibility", "gone");
            this.srh_btn.attr("visibility", "gone");
            this.viar_btn.attr("rotation", "0");
            this.viar_btn.attr("alpha", "1");
        }
    });

    this.list.on("item_click", (item) => {
        this.page.openLookViAr();
        var node = this.viar.getNode(item.id);
        if (!(node instanceof ViArNode)) {
            return;
        }
        this.look_tag_list.attr("source", JSON.stringify(Array.from(node.tags)));
        this.look_viar_html.attr("html", node.content);
        this.look_viar_id.setText(node.id);
        this.look_viar_title.setText(node.title);
        this.look_viar_time.setText(node.getTime());
    });

    this.look_tob_hidden_btn.on("click", () => {
        if (this.look_tob_hidden_btn.text() == "收起") {
            this.look_tob_hidden_btn.setText("展开");
            this.look_tob.attr("visibility", "gone");
            this.look_viar_btn.attr("visibility", "gone");
        } else {
            this.look_tob_hidden_btn.setText("收起");
            this.look_tob.attr("visibility", "visible");
            this.look_viar_btn.attr("visibility", "visible");
        }
    });

    this.viarUpdate = function () {
        this.tag_list.attr("source", JSON.stringify(Array.from(this.viar.getTags())));
    }

    return this;
}

module.exports = ViArBinder;