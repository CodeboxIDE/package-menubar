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
    }
});

var MenuItems = Collection.extend({
    model: MenuItem,
    comparator: "position"
});

module.exports = MenuItems;
