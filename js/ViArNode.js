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
            tags: this.tags,
            parent: this.parent,
            childs: this.childs,
            links: this.links,
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
        tags: [],
        parent: null,
        childs: [],
        links: [],
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
        tags: tags,
        parent: parent.id,
        childs: [],
        links: links,
        meta: ""
    }
    var node = new ViArNode(data);
    parent.childs.push(node.id);
    //TODO tages links
    return node;
}

module.exports = ViArNode;