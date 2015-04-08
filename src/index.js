require("./stylesheets/main.less");

var settings = require("./settings");
var MenuBar = require("./bar");

var commands = codebox.require("core/commands");
var dialogs = codebox.require("utils/dialogs");

// Create the bar and add it to the body
var bar = new MenuBar();
bar.appendTo(codebox.app.$el);

commands.register({
    id: "view.menubar.toggle",
    title: "View: Toggle Menu Bar",
    shortcuts: [
        "mod+b", "mod+k"
    ],
    run: function() {
        settings.data.set("visible", !settings.data.get("visible"));
        codebox.settings.save();
    }
});

// Exports menubar
codebox.menubar = bar;
