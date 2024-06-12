const Utils = require('./Utils.js');
const ViArNode = require("./ViArNode.js");

const SRH_TAGS = [];
const SRH_TAGS_SET = new Set();
const WRITE_TAGS = [];
const WRITE_TAGS_SET = new Set();
const WRITE_LINKS = [];
const WRITE_LINKS_MAP = {};
const LOOK_TAGS = [];
const TAG_LIST = [];
const TAGS_SET = new Set();
const SRH_MAIN_TAG = [];
const SRH_MAIN_TAGS_SET = new Set();

const ViArBinder = function (page, app) {
    this.page = page;
    this.app = app;

    this.viar = this.app.data_manager.getViAr();
    this.write_parent = this.viar.getRoot();
    this.write_node = null;

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
    this.reset_btn = ui.viar_reset;
    this.srh_tags = ui.viar_srh_tags;
    this.srh_tag_btn_main = ui.srh_tag_btn_main;
    this.srh_tag_inp_main = ui.srh_tag_inp_main;
    this.viar_inp_web = ui.viar_inp_web;
    this.viar_inp_sec_btn = ui.viar_inp_sec;
    this.viar_inp_web_line = ui.viar_inp_web_line;
    this.viar_inp_full_btn = ui.viar_inp_full;
    this.viar_inp_c = ui.viar_inp_c;
    this.viar_inp_web_c = ui.viar_inp_web_c;

    this.list.setDataSource(this.viar.getRenderList())
    this.srh_tag_li.setDataSource(SRH_TAGS);
    this.write_viar_li.setDataSource(WRITE_TAGS);
    this.inp_links.setDataSource(WRITE_LINKS);
    this.look_tag_list.setDataSource(LOOK_TAGS);
    this.tag_list.setDataSource(TAG_LIST);
    this.srh_tags.setDataSource(SRH_MAIN_TAG);
    this.viar_inp_web.loadUrl("file://" + files.path("./res/text.html"));

    this.viar_inp_full_btn.on("click", () => {
        var st = this.viar_inp_web.attr("visibility");
        var is_inp = false;
        var date_view = null;
        if (st == "gone") {
            is_inp = true;
            date_view = this.inp;
        } else {
            is_inp = false;
            date_view = this.viar_inp_web;
        }
        date_view.attr("h", `${device.height}px`);
        sele_date = dialogs.build({
            customView: date_view,
            positive: "返回",
            wrapInScrollView: false,
            autoDismiss: false,
            cancelable: false,
            canceledOnTouchOutside: false
        }).on("positive", (dialog) => {
            dialog.dismiss();
            date_view.parent.removeView(date_view);
            if (is_inp) {
                this.viar_inp_c.addView(date_view);
            } else {
                this.viar_inp_web_c.addView(date_view);
            }
            date_view.attr("h", "700px");
        }).on("negative", (dialog) => {
            dialog.dismiss();
            date_view.parent.removeView(date_view);
            if (is_inp) {
                this.viar_inp_c.addView(date_view);
            } else {
                this.viar_inp_web_c.addView(date_view);
            }
            date_view.attr("h", "700px");
        }).show();
        var dialogWindow = sele_date.getWindow();
        var layoutParams = dialogWindow.getAttributes();
        layoutParams.width = device.width;
        layoutParams.height = device.height;
        layoutParams.horizontalMargin = 0.1;
        layoutParams.verticalMargin = 0.1;
        dialogWindow.setAttributes(layoutParams);
    });

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

    this.look_viar_btn.on("click", () => {
        var id = this.look_viar_id.text();
        if (id == "root") {
            toast(`根节点禁止修改`);
            return;
        }
        var node = this.viar.getNode(id);
        if (!(node instanceof ViArNode)) {
            toast(`未发现节点：${id}`);
            return;
        }
        this.clearWritePage();
        this.write_node = node;
        var parent = this.viar.getNode(node.parent);
        if (parent == undefined) {
            parent = this.viar.getRoot();
        }
        this.write_parent = parent;
        this.inp_tit.setText(node.title);
        this.inp.setText(node.content);
        this.viar_inp_web.jsBridge.callHandler('setText', node.content, () => { });
        this.inp_meta.setText(node.meta);
        var tags = node.tags;
        for (var tag of tags) {
            this.addWriteTag(tag);
        }
        var links = node.links;
        for (var link of links) {
            link = this.viar.getNode(link);
            if (link == undefined) {
                continue;
            }
            this.addWriteLink(link);
        }
        this.page.openWriteViAr();
    });

    this.srh_tag_btn.on("click", () => {
        var kw = this.srh_tag_inp.text();
        this.clearSrhTags();
        if (kw == "") {
            for (let v of this.viar.tags) {
                this.addSrhTag(v);
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
            this.reset_btn.attr("visibility", "gone");
        } else {
            this.tob_hidden_btn.setText("收起");
            this.tob.attr("visibility", "visible");
            this.reset_btn.attr("visibility", "visible");
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

    this.viar_inp_sec_btn.on("click", () => {
        var st = this.viar_inp_web.attr("visibility");
        if (st == "gone") {
            this.viar_inp_web.attr("visibility", "visible");
            this.inp.attr("visibility", "gone");
            this.viar_inp_web_line.attr("visibility", "visible");
            this.viar_inp_web.jsBridge.callHandler('setText', this.inp.text(), () => { });
        } else {
            this.viar_inp_web.attr("visibility", "gone");
            this.inp.attr("visibility", "visible");
            this.viar_inp_web_line.attr("visibility", "gone");

            const fetchWebContent = () => {
                return new Promise((resolve, reject) => {
                    this.viar_inp_web.jsBridge.callHandler('getText', '', (data) => {
                        if (data) {
                            resolve(data);
                        } else {
                            reject(new Error("Failed to get content from jsBridge"));
                        }
                    });
                });
            };

            fetchWebContent()
                .then((content) => {
                    this.inp.setText(content);
                })
                .catch((error) => {
                    toast(error);
                });
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

    this.reset_btn.on("click", () => {
        this.viar.initRenderList();
        this.viar_srh_kw.setText("");
        this.clearSrhMainTag();
    });

    this.writeViar = (content, parent, title) => {
        if (content == "" && this.write_node != null) {
            confirm("正文留空代表删除该项以及所有子项，是否继续？").then((status) => {
                if (status) {
                    this.viar.delNode(this.write_node);
                    this.viar.initRenderList();
                    this.viar_srh_kw.setText("");
                    this.page.openViAr();
                    this.clearWritePage();
                    this.app.data_manager.saveViAr();
                    this.write_node = null;
                }
            });
            return;
        }
        if (content == "") {
            return;
        }
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
        if (this.write_node != null) {
            this.viar.updateNode(this.write_node, parent, title, content, tags, links, meta, main_tag);
        } else {
            this.viar.newNode(parent, title, content, tags, links, meta, main_tag);
        }
        this.viar.initRenderList();
        this.viar_srh_kw.setText("");
        this.page.openViAr();
        this.clearWritePage();
        this.app.data_manager.saveViAr();
        this.write_node = null;
    }

    this.write_btn.on("click", () => {
        var parent = this.write_parent;
        var title = this.inp_tit.text();
        var content = null;

        var fetchContent = () => {
            return new Promise((resolve, reject) => {
                var st = this.viar_inp_web.attr("visibility");
                if (st == "gone") {
                    resolve(this.inp.text());
                } else {
                    this.viar_inp_web.jsBridge.callHandler('getText', '', (data) => {
                        if (data) {
                            resolve(data);
                        } else {
                            reject(new Error("Failed to get content from jsBridge"));
                        }
                    });
                }
            });
        };

        fetchContent()
            .then((content) => {
                this.writeViar(content, parent, title);
            })
            .catch((error) => {
                toast(error);
            });
    });


    this.srh_tag_btn_main.on("click", () => {
        var kw = this.srh_tag_inp_main.text();
        this.clearTagList();
        if (kw == "") {
            for (let v of this.viar.tags) {
                this.addTagList(v);
            }
            return;
        }
        var tags = this.viar.searchTag(kw);
        for (var tag of tags) {
            this.addTagList(tag.tag);
        }
    });

    this.srh_btn.on("click", () => {
        if (this.tob_hidden_btn.text() != "收起") {
            this.tob_hidden_btn.setText("收起");
            this.tob.attr("visibility", "visible");
            this.reset_btn.attr("visibility", "visible");
            return;
        }
        var keyword = this.viar_srh_kw.text();
        var tags = SRH_MAIN_TAG;
        this.viar.useSearch(keyword, tags);
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

    this.tag_list.on("item_click", (item) => {
        this.addSrhMainTag(item);
    });

    this.srh_tags.on("item_click", (item) => {
        this.delSrhMainTag(item);
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
        var st = this.srh_btn.attr("visibility");
        if (st != "gone") {
            this.add_btn.attr("visibility", "visible");
        }
    }

    this.setWriteParentTx = function () {
        var node = this.write_parent;
        this.write_parent_tx.setText(`<node:${node.title}|id=${node.id}>`);
    }

    this.viarUpdate = function () {
        this.clearTagList();
        var tags = this.viar.getTags();
        for (var tag of tags) {
            this.addTagList(tag);
        }
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
        for (var key in WRITE_LINKS_MAP) {
            delete WRITE_LINKS_MAP[key];
        }
    }

    this.clearTagList = function () {
        if (TAG_LIST.length > 1) {
            TAG_LIST.length = 1;
        }
        if (TAG_LIST.length == 1) {
            TAG_LIST.pop();
        }
        TAGS_SET.clear();
    }

    this.clearSrhMainTag = function () {
        if (SRH_MAIN_TAG.length > 1) {
            SRH_MAIN_TAG.length = 1;
        }
        if (SRH_MAIN_TAG.length == 1) {
            SRH_MAIN_TAG.pop();
        }
        SRH_MAIN_TAGS_SET.clear();
    }

    this.clearWritePage = () => {
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

    this.addTagList = function (tag) {
        if (!TAGS_SET.has(tag)) {
            TAGS_SET.add(tag);
            TAG_LIST.push(tag);
        }
    }

    this.addSrhMainTag = function (tag) {
        if (!SRH_MAIN_TAGS_SET.has(tag)) {
            SRH_MAIN_TAGS_SET.add(tag);
            SRH_MAIN_TAG.push(tag);
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

    this.delTagList = function (tag) {
        TAGS_SET.delete(tag);
        for (let i = TAG_LIST.length - 1; i >= 0; i--) {
            if (TAG_LIST[i] == tag) {
                TAG_LIST.splice(i, 1);
            }
        }
    }

    this.delSrhMainTag = function (tag) {
        SRH_MAIN_TAGS_SET.delete(tag);
        for (let i = SRH_MAIN_TAG.length - 1; i >= 0; i--) {
            if (SRH_MAIN_TAG[i] == tag) {
                SRH_MAIN_TAG.splice(i, 1);
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