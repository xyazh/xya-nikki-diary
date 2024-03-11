const Utils = require('./Utils.js');
const ViArNode = require("./ViArNode.js");

const SRH_TAGS = [];
const SRH_TAGS_SET = new Set();
const WRITE_TAGS = [];
const WRITE_TAGS_SET = new Set();
const WRITE_LINKS = [];
const WRITE_LINKS_MAP = {};
const LOOK_TAGS = [];

const ViArBinder = function (page, app) {
    this.page = page;
    this.app = app;

    this.viar = this.app.data_manager.getViAr();
    this.write_parent = this.viar.getRoot();

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
    this.srh_tag_li = ui.srh_tag_li;
    this.write_viar_li = ui.write_viar_li;
    this.srh_tag_inp = ui.srh_tag_inp;
    this.srh_tag_btn = ui.srh_tag_but;
    this.srh_parent_btn = ui.viar_slc_last;
    this.write_parent_tx = ui.write_parent_tx;
    this.inp_links = ui.viar_inp_links;
    this.inp_links_btn = ui.viar_inp_add_links;
    this.write_btn = ui.write_viar_but;
    this.inp_tit = ui.viar_inp_tit;
    this.inp = ui.viar_inp;
    this.inp_meta = ui.viar_inp_meta;

    this.list.setDataSource(this.viar.getRenderList())
    this.srh_tag_li.setDataSource(SRH_TAGS);
    this.write_viar_li.setDataSource(WRITE_TAGS);
    this.inp_links.setDataSource(WRITE_LINKS);
    this.look_tag_list.setDataSource(LOOK_TAGS);

    this.link_node_btn.on("click", () => {
        var id = this.look_viar_id.text();
        var node = this.viar.getNode(id);
        this.viar.useNodeLinks(node);
        this.viar_srh_kw.setText(`<node:${node.title}|id=${id}>的链接`);
        this.page.openViAr();
    });

    this.next_node_btn.on("click", () => {
        var id = this.look_viar_id.text();
        var node = this.viar.getNode(id);
        this.viar.useNodeChilds(node);
        this.viar_srh_kw.setText(`<node:${node.title}|id=${id}>的子节点`);
        this.page.openViAr();
    });

    this.last_node_btn.on("click", () => {
        var id = this.look_viar_id.text();
        var node = this.viar.getNode(id);
        this.viar.useNodeParent(node);
        this.viar_srh_kw.setText(`<node:${node.title}|id=${id}>的父节点`);
        this.page.openViAr();
    });

    this.srh_tag_btn.on("click", () => {
        var kw = this.srh_tag_inp.text();
        this.clearSrhTags();
        if (kw == "") {
            for (let v of this.viar.tags) {
                SRH_TAGS.push(v);
            }
            return;
        }
        var tags = this.viar.searchTag(kw);
        this.addSrhTag(kw);
        for (var tag of tags) {
            this.addSrhTag(tag.tag);
        }
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
        var st = this.srh_btn.attr("visibility");
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
        if (this.page.is_select_viar_for_parent || this.page.is_select_viar_for_links) {
            this.hiddenAdd();
        }
    });

    this.add_btn.on("click", () => {
        this.page.openWriteViAr();
        this.nofityTags();
    });

    this.srh_parent_btn.on("click", () => {
        this.page.openSelectViarForParent();
    });

    this.inp_links_btn.on("click", () => {
        this.page.openSelectViarForLinks();
    });

    this.write_btn.on("click", () => {
        var parent = this.write_parent;
        var title = this.inp_tit.text();
        var content = this.inp.text();
        var tags = Array.from(WRITE_TAGS_SET);
        var links = [];
        var main_tag = undefined;
        if (WRITE_TAGS.length > 0) {
            main_tag = WRITE_TAGS[0];
        }
        var meta = this.inp_meta.text();
        for (var link in WRITE_LINKS_MAP) {
            links.push(WRITE_LINKS_MAP[link]);
        }
        this.viar.newNode(parent, title, content, tags, links, meta, main_tag);
        this.viar.initRenderList();
        this.page.openViAr();
        this.clearWritePage();
        this.app.data_manager.saveViAr();
    });

    this.list.on("item_click", (item) => {
        var node = this.viar.getNode(item.id);
        if (!(node instanceof ViArNode)) {
            toast(`未发现节点：${item.id}`);
            return;
        }
        if (this.page.is_viar) {
            this.page.openLookViAr();
            this.setLookTags(node.tags);
            this.look_viar_html.attr("html", node.content);
            this.look_viar_id.setText(node.id);
            this.look_viar_title.setText(node.title);
            this.look_viar_time.setText(node.getTime());
            return;
        }
        if (this.page.is_select_viar_for_parent) {
            this.page.openWriteViAr();
            this.write_parent = node;
            this.setWriteParentTx();
            return;
        }
        if (this.page.is_select_viar_for_links) {
            this.page.openWriteViAr();
            this.addWriteLink(node);
        }
    });

    this.srh_tag_li.on("item_click", (item) => {
        this.addWriteTag(item);
    });

    this.write_viar_li.on("item_click", (item) => {
        this.delWriteTag(item);
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

    this.inp_links.on("item_click", (item) => {
        this.delWriteLinkWithKey(item);
    });

    this.hiddenAdd = function () {
        this.add_btn.attr("visibility", "gone");
    }

    this.displayAdd = function () {
        this.add_btn.attr("visibility", "visible");
    }

    this.setWriteParentTx = function () {
        var node = this.write_parent;
        this.write_parent_tx.setText(`<node:${node.title}|id=${node.id}>`);
    }

    this.viarUpdate = function () {
        this.tag_list.attr("source", JSON.stringify(Array.from(this.viar.getTags())));
    }

    this.clearWriteTags = function () {
        if (WRITE_TAGS.length > 1) {
            WRITE_TAGS.length = 1;
        }
        if (WRITE_TAGS.length == 1) {
            WRITE_TAGS.pop();
        }
        WRITE_TAGS_SET.clear();
    }

    this.clearSrhTags = function () {
        if (SRH_TAGS.length > 1) {
            SRH_TAGS.length = 1;
        }
        if (SRH_TAGS.length == 1) {
            SRH_TAGS.pop();
        }
        SRH_TAGS_SET.clear();
    }

    this.clearWriteLinks = function () {
        if (WRITE_LINKS.length > 1) {
            WRITE_LINKS.length = 1;
        }
        if (WRITE_LINKS.length == 1) {
            WRITE_LINKS.pop();
        }
        WRITE_LINKS_MAP = {};
        for (var key in WRITE_LINKS_MAP) {
            delete WRITE_LINKS_MAP[key];
        }
    }

    this.clearWritePage = function () {
        this.inp_tit.setText("");
        this.inp.setText("");
        this.inp_meta.setText("");
        this.srh_tag_inp.setText("");
        this.clearWriteLinks();
        this.clearWriteTags();
    }

    this.addWriteTag = function (tag) {
        if (!WRITE_TAGS_SET.has(tag)) {
            WRITE_TAGS_SET.add(tag);
            WRITE_TAGS.push(tag);
        }
    }

    this.addSrhTag = function (tag) {
        if (!SRH_TAGS_SET.has(tag)) {
            SRH_TAGS_SET.add(tag);
            SRH_TAGS.push(tag);
        }
    }

    this.addWriteLink = function (link) {
        var key = `<node:${link.title}|id=${link.id}>`;
        if (!(key in WRITE_LINKS_MAP)) {
            WRITE_LINKS_MAP[key] = link;
            WRITE_LINKS.push(key);
        }
    }

    this.delSrhTag = function (tag) {
        SRH_TAGS_SET.delete(tag);
        for (let i = SRH_TAGS.length - 1; i >= 0; i--) {
            if (SRH_TAGS[i] == tag) {
                SRH_TAGS.splice(i, 1);
            }
        }
    }

    this.delWriteTag = function (tag) {
        WRITE_TAGS_SET.delete(tag);
        for (let i = WRITE_TAGS.length - 1; i >= 0; i--) {
            if (WRITE_TAGS[i] == tag) {
                WRITE_TAGS.splice(i, 1);
            }
        }
    }

    this.delWriteLink = function (link) {
        var key = `<node:${link.title}|id=${link.id}>`;
        delete WRITE_LINKS_MAP[key];
        for (let i = WRITE_LINKS.length - 1; i >= 0; i--) {
            if (WRITE_LINKS[i] == key) {
                WRITE_LINKS.splice(i, 1);
            }
        }
    }

    this.delWriteLinkWithKey = function (key) {
        delete WRITE_LINKS_MAP[key];
        for (let i = WRITE_LINKS.length - 1; i >= 0; i--) {
            if (WRITE_LINKS[i] == key) {
                WRITE_LINKS.splice(i, 1);
            }
        }
    }

    this.setLookTags = function (tags) {
        if (LOOK_TAGS.length > 1) {
            LOOK_TAGS.length = 1;
        }
        if (LOOK_TAGS.length == 1) {
            LOOK_TAGS.pop();
        }
        for (var tag of tags) {
            LOOK_TAGS.push(tag);
        }
    }

    this.nofityTags = function () {
        this.clearSrhTags();
        for (let tag of this.viar.tags) {
            this.addSrhTag(tag);
        }
    }

    return this;
}

module.exports = ViArBinder;