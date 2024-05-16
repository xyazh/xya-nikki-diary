const ViArNode = require("./ViArNode.js");
const Utils = require("./Utils.js");

const RENDER_LIST = [];

const ViArTree = function () {
    this._root = ViArNode.newRootNode();
    this.node_map = {};

    this.tags = new Set();

    this.addDisTags = function () {
        this.tags.add("无");
        this.tags.add("root");
    }

    this.addDisTags();
    

    this.initRenderList = function () {
        this.clearRenderList();
        this.forEachNode((node) => {
            if (node instanceof ViArNode) {
                RENDER_LIST.push(node.getRenderNode());
            }
        });
    };

    this.getRoot = function () {
        return this._root;
    }

    this.getTags = function () {
        return this.tags;
    }

    this.clearRenderList = function () {
        if (RENDER_LIST.length > 1) {
            RENDER_LIST.length = 1;
        }
        if (RENDER_LIST.length = 1) {
            RENDER_LIST.pop();
        }
    }

    this.getRenderList = function () {
        return RENDER_LIST;
    }

    this.useNodeLinks = function (node) {
        this.clearRenderList();
        if (typeof node == "string") {
            node = this.getNode(node);
        }
        if (!(node instanceof ViArNode)) {
            return;
        }
        for (var link of node.links) {
            if (typeof link == "string") {
                link = this.getNode(link);
            }
            if (!(link instanceof ViArNode)) {
                continue;
            }
            RENDER_LIST.push(link.getRenderNode());
        }
    }

    this.useNodeChilds = function (node) {
        this.clearRenderList();
        if (typeof node == "string") {
            node = this.getNode(node);
        }
        if (!(node instanceof ViArNode)) {
            return;
        }
        for (var child of node.childs) {
            if (typeof child == "string") {
                child = this.getNode(child);
            }
            if (!(child instanceof ViArNode)) {
                continue;
            }
            RENDER_LIST.push(child.getRenderNode());
        }
    }

    this.useNodeParent = function (node) {
        this.clearRenderList();
        if (typeof node == "string") {
            node = this.getNode(node);
        }
        if (!(node instanceof ViArNode)) {
            return;
        }
        if (node.parent != null) {
            var parent = node.parent;
            if (typeof parent == "string") {
                parent = this.getNode(parent);
            }
            if (!(parent instanceof ViArNode)) {
                return;
            }
            RENDER_LIST.push(parent.getRenderNode());
        }
    }

    this.newNode = function (parent, title, content, tags, links, meta, main_tag) {
        if (typeof parent == "string") {
            parent = this.getNode(parent);
        }
        if (!(parent instanceof ViArNode)) {
            return null;
        }
        var in_links = [];
        for (var link of links) {
            if (typeof link == "string") {
                link = this.getNode(link);
            }
            if (!(link instanceof ViArNode)) {
                continue;
            }
            in_links.push(link);
        }
        for (var tag of tags) {
            this.tags.add(tag);
        }
        if (main_tag != undefined) {
            this.tags.add(main_tag);
        }
        var node = ViArNode.newNode(title, content, tags, parent, in_links, meta, main_tag);
        this.node_map[node.id] = node;
        return node;
    }

    this.delNode = function (node, clear_parent) {
        if (clear_parent == undefined) {
            clear_parent = true;
        }
        if (node == this._root || node == "root") {
            return false;
        }
        if (typeof node == "string") {
            var node_id = node;
            node = this.getNode(node_id);
            if (node == undefined) {
                return false;
            }
        } else if (node instanceof ViArNode) {
            var node_id = node.id;
        } else {
            return false;
        }
        //从链接的节点中删除
        for (var link_node_id of node.links) {
            var link_node = this.getNode(link_node_id);
            if (link_node == undefined) {
                continue;
            }
            link_node.links.delete(node_id);
        }
        //清理子节点
        for (var child of node.childs) {
            this.delNode(child, false);
        }
        //从父节点中删除
        if (clear_parent) {
            parent_node = this.getNode(node.parent);
            if (parent_node != undefined) {
                parent_node.childs.delete(node_id);
            }
        }
        //从节点列表中删除
        delete this.node_map[node_id];
        return true;
    }

    this.updateNode = function (node, parent, title, content, tags, links, meta, main_tag) {
        if (node == this._root || node == "root") {
            return false;
        }
        if (typeof node == "string") {
            var node_id = node;
            node = this.getNode(node_id);
            if (node == undefined) {
                return false;
            }
        } else if (node instanceof ViArNode) {
            var node_id = node.id;
        } else {
            return false;
        }
        var old_links = node.links;
        var old_parent = this.getNode(node.parent);
        //断开旧链接
        if (old_parent != undefined) {
            old_parent.childs.delete(node.id);
        }
        for (var old_link of old_links) {
            old_link = this.getNode(old_link);
            if (old_link != undefined) {
                old_link.links.delete(node_id);
            }
        }
        //建立新链接
        if (typeof parent == "string") {
            parent = this.getNode(parent);
        }
        if (parent instanceof ViArNode) {
            parent.childs.add(node_id);
        }
        for (var link of links) {
            if (typeof link == "string") {
                link = this.getNode(link);
            }
            if (!(link instanceof ViArNode)) {
                continue;
            }
            link.links.add(node_id);
        }
        for (var tag of tags) {
            this.tags.add(tag);
        }
        node.update(parent, title, content, tags, links, meta, main_tag);
    }

    this.getNode = function (id) {
        if (id == "root") {
            return this._root;
        }
        return this.node_map[id];
    }

    this.getNodesWithLinks = function (node) {
        var result = [];
        if (typeof node == "string") {
            node = this.getNode(node);
        }
        if (!(node instanceof ViArNode)) {
            return result;
        }
        for (var link of node.links) {
            result.push(link);
        }
        return result;
    }

    this.getNodesWithChild = function (node) {
        var result = [];
        if (typeof node == "string") {
            node = this.getNode(node);
        }
        if (!(node instanceof ViArNode)) {
            return result;
        }
        for (var child of node.childs) {
            result.push(child);
        }
        return result;
    }

    this.findNodesWithTag = function (tag) {
        var result = [];
        this.forEachNode((node, result) => {
            if (node.tags.has(tag)) {
                result.push(node);
            }
        }, result);
        return result;
    }

    this.save = function () {
        var node_save_map = {};
        for (var node_id in this.node_map) {
            var node = this.node_map[node_id];
            node_save_map[node_id] = node.save();
        }
        return {
            root: this._root.save(),
            node_map: node_save_map,
            tags: Array.from(this.tags),
            salt: Math.floor(Math.random() * 1000000000) + 1,
        };
    }

    this.saveToJson = function () {
        return JSON.stringify(this.save());
    }

    this.load = function (data) {
        if (data.root != undefined) {
            this._root = ViArNode.loadNode(data.root);
        }
        if (data.node_map != undefined) {
            for (var key in this.node_map) {
                delete this.node_map[key];
            }
            for (var node_id in data.node_map) {
                this.node_map[node_id] = ViArNode.loadNode(data.node_map[node_id]);
            }
        }
        if (data.tags != undefined) {
            this.tags.clear();
            for (var tag of data.tags) {
                this.tags.add(tag);
            }
        }
        this.initRenderList();
    }

    this.loadFromJson = function (data) {
        this.load(JSON.parse(data));
    }

    this.forEachNode = function (callback, args) {
        callback(this._root, args);
        for (var node_id in this.node_map) {
            callback(this.getNode(node_id), args);
        }
    }

    this.useSearch = function (keyword, tags) {
        var nodes = this.search(keyword, tags);
        this.clearRenderList();
        for (var node of nodes) {
            RENDER_LIST.push(node.node.getRenderNode());
        }
    }

    this.search = function (keyword, tags) {
        var nodes = new Set();
        if (tags != undefined && tags.length > 0) {
            for (var tag of tags) {
                var tag_nodes = this.findNodesWithTag(tag);
                for (var tag_node of tag_nodes) {
                    nodes.add(tag_node);
                }
            }
        } else {
            this.forEachNode((node, nodes) => {
                nodes.add(node);
            }, nodes);
        }
        var result = [];
        if (keyword == undefined || keyword == "" || keyword == null) {
            for (var node of nodes) {
                result.push({
                    node: node,
                    score: 1,
                });
            }
            return result;
        }
        var keywords = Utils.splitKeyword(keyword);
        for (var node of nodes) {
            var n = 0;
            for (keyword of keywords) {
                if (node.title.includes(keyword)) {
                    n += 1;
                }
                if (node.content.includes(keyword)) {
                    n += 1;
                }
            }
            if (n <= 0) {
                continue;
            }
            result.push({
                node: node,
                score: n,
            });
        }
        result.sort((a, b) => b.score - a.score);
        return result;
    }

    this.searchTag = function (keyword) {
        var result = [];
        var keywords = Utils.splitKeyword(keyword);
        for (var tag of this.tags) {
            tag = String(tag);
            var n = 0;
            for (keyword of keywords) {
                if (tag.includes(keyword)) {
                    n += 1;
                }
            }
            if (n <= 0) {
                continue;
            }
            result.push({
                tag: tag,
                score: n,
            });
        }
        result.sort((a, b) => b.score - a.score);
        return result;
    }

    this.reCreateTags = function () {
        this.tags.clear();
        this.addDisTags();
        this.forEachNode((node) => {
            for (var tag of node.tags) {
                this.tags.add(tag);
            }
        });
    }
}

module.exports = ViArTree;