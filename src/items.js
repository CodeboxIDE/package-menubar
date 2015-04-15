var Model = codebox.require("hr.model");
var Collection = codebox.require("hr.collection");
var _ = codebox.require("hr.utils");
var commands = codebox.require("core/commands");
var dialogs = codebox.require("utils/dialogs");

var MenuItem = Model.extend({
    defaults: {
        type: "entry",
        caption: "",
        command: "",
        items: [],
        args: {},
        position: 0,
        enabled: true,
        shortcut: ""
    },

    // Constructor
    initialize: function() {
        MenuItem.__super__.initialize.apply(this, arguments);

        this.items = new MenuItems();

        this.listenTo(this, "change:items", function() {
            this.items.reset(this.get("items"));
        });
        this.items.reset(this.get("items"));

        this.listenTo(commands, "add remove reset change:enabled change:context context", this.checkState);
    },

    // Execute the command associated with the entry
    execute: function() {
        return commands.run(this.get("command"), this.get("args"))
        .fail(dialogs.error);
    },

    // Check visibility
    checkState: function() {
        var isEnabled = true;

        if (this.get("command")) {
            var cmd = commands.resolve(this.get("command"));
            isEnabled = (
                // Command exits
                cmd != null &&

                // Command is runnable
                cmd.isRunnable()
            );
        }

        return isEnabled && this.get("enabled");
    },

    // Return the shortcut text
    shortcutText: function() {
        var def = this.get("shortcut") || "";

        if (!def && this.get("command")) {
            var cmd = commands.resolve(this.get("command"));
            def = cmd? cmd.shortcutText() : def;
        }

        return def;
    }
});

var MenuItems = Collection.extend({
    model: MenuItem,
    comparator: "position"
});

module.exports = MenuItems;
