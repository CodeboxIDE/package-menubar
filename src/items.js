var Model = codebox.require("hr.model");
var Collection = codebox.require("hr.collection");
var _ = codebox.require("hr.utils");
var commands = codebox.require("core/commands");

var MenuItem = Model.extend({
    defaults: {
        type: "entry",
        caption: "",
        command: "",
        items: [],
        args: {},
        position: 0,
        enabled: true
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
        commands.run(this.get("command"), this.get("args"))
    },

    // Check visibility
    checkState: function() {
        if (this.get("command")) {
            var cmd = commands.get(this.get("command"));
            var isEnabled = (
                // Command exits
                cmd &&

                // Command is runnable
                cmd.isRunnable()
            );

            this.set("enabled", isEnabled);
        }

        return this.get("enabled");
    }
});

var MenuItems = Collection.extend({
    model: MenuItem,
    comparator: "position"
});

module.exports = MenuItems;
