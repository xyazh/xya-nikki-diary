const ViArNode = require("./ViArNode.js");

const ViArTree = function (data) {
    if (data.root == undefined) {
        this.root = ViArNode.newRootNode();
        this.node_map = {};
    } else {
        this.root = data.root;
        this.node_map = data.node_map;
    }

    this.getNode = function (id) {
        return this.node_map[id];
    }

    this.save = function () {
        return {
            root: this.root,
            node_map: this.node_map
        };
    }

    this.forEach = function (callback) {
        callback(this.root);
        for(var node of this.node_map){
            callback(node);
        }
    }
}

module.exports = ViArTree;