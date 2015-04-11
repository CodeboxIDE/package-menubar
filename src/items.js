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
        position: 0
    },

    // Constructor
    initialize: function() {
        MenuItem.__super__.initialize.apply(this, arguments);

        this.items = new MenuItems();

        this.listenTo(this, "change:items", function() {
            this.items.reset(this.get("items"));
        });
        this.items.reset(this.get("items"));
    },

    // Execute the command associated with the entry
    execute: function() {
        commands.run(this.get("command"), this.get("args"))
    }
});

var MenuItems = Collection.extend({
    model: MenuItem,
    comparator: "position"
});

module.exports = MenuItems;
