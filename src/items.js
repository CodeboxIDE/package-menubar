define(function() {
    var hr = codebox.require("hr/hr");
    var _ = codebox.require("hr/utils");
    var commands = codebox.require("core/commands");

    var MenuItem = hr.Model.extend({
        defaults: {
            caption: "",
            command: "",
            items: [],
            args: {}
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

    var MenuItems = hr.Collection.extend({
        model: MenuItem
    });

    return MenuItems;
});