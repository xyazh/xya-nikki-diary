const ViArNode = require("./ViArNode.js");
const Utils = require("./Utils.js");

const ViArTree = function () {
    this._root = ViArNode.newRootNode();
    this.node_map = {};

    this.getRoot = function () {
        return this._root;
    }

    this.newNode = function (parent, title, content, tags, links) {
        if (parent instanceof String) {
            parent = this.getNode(parent);
        }
        if (!(parent instanceof ViArNode)) {
            return null;
        }
        var in_links = [];
        for (var link of links) {
            if (link instanceof String) {
                link = this.getNode(link);
            }
            if (!(link instanceof ViArNode)) {
                continue;
            }
            in_links.push(link);
        }
        var node = ViArNode.newNode(title, content, tags, parent, in_links);
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
        if (node instanceof String) {
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

    this.getNode = function (id) {
        if (id == "root") {
            return this._root;
        }
        return this.node_map[id];
    }

    this.getNodesWithChild = function (node) {
        var result = [];
        if (node instanceof String) {
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
            salt: Math.floor(Math.random() * 1000000000) + 1,
        };
    }

    this.saveToJson = function () {
        return JSON.stringify(this.save());
    }

    this.load = function (data) {
        this.root = ViArNode.loadNode(data.root);
        for (var node_id in data.node_map) {
            this.node_map[node_id] = ViArNode.loadNode(data.node_map[node_id]);
        }
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

    this.search = function (keyword, tags) {
        var nodes = new Set();
        if (tags != undefined) {
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
}

module.exports = ViArTree;