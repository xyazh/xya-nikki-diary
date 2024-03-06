const Utils = require("./Utils.js");

const ViArNode = function (data) {
    this.title = data.title;
    this.date = data.date;
    this.creat_date = data.creat_date;
    this.id = data.id;
    this.content = data.content;
    this.tags = data.tags;
    this.parent = data.parent;
    this.childs = data.childs;
    this.links = data.links;
    this.meta = data.meta;

    this.save = function () {
        var save_data = {
            title: this.title,
            date: this.date,
            creat_date: this.creat_date,
            id: this.id,
            content: this.content,
            tags: Array.from(this.tags),
            parent: this.parent,
            childs: Array.from(this.childs),
            links: Array.from(this.links),
            meta: this.meta
        }
        return save_data;
    }

    return this;
}

ViArNode.newRootNode = function () {
    var data = {
        title: "root",
        date: 0,
        creat_date: 0,
        id: "root",
        content: "root",
        tags: new Set(),
        parent: null,
        childs: new Set(),
        links: new Set(),
        meta: ""
    }
    return new ViArNode(data);
}

ViArNode.newNode = function (title, content, tags, parent, links) {
    var date = Date.parse(new Date());
    var data = {
        title: title,
        date: date,
        creat_date: date,
        id: Utils.createUUID(),
        content: content,
        tags: new Set(tags),
        parent: parent.id,
        childs: new Set(),
        links: new Set(),
        meta: ""
    }
    var node = new ViArNode(data);
    parent.childs.add(node.id);
    for(var link of links){
        node.links.add(link.id);
        link.links.add(node.id);
    }
    return node;
}

ViArNode.loadNode = function (save_data) {
    var data = {
        title: save_data.title,
        date: save_data.date,
        creat_date: save_data.creat_date,
        id: save_data.id,
        content: save_data.content,
        tags: new Set(save_data.tags),
        parent: parent.id,
        childs: new Set(save_data.childs),
        links: new Set(save_data.links),
        meta: save_data.meta
    }
    return new ViArNode(data);
}

module.exports = ViArNode;