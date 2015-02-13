define([
    "src/settings",
    "src/items"
], function(settings, MenuItems) {
    var hr = codebox.require("hr/hr");
    var $ = codebox.require("hr/dom");
    var _ = codebox.require("hr/utils");

    var MenuItem = hr.List.Item.extend({
        className: "menuitem",
        events: {
            click: "click"
        },

        render: function() {
            this.$el.html(this.model.get("caption"));

            return this.ready();
        },

        click: function(e) {
            if (this.model.get("click")) {

            }
        }
    });

    var MenuList = hr.List.extend({
        className: "menubar-menuitems",

        Collection: MenuItems,
        Item: MenuItem
    });

    var MenuBar = hr.View.extend({
        className: "component-statusbar",

        initialize: function() {
            MenuBar.__super__.initialize.apply(this, arguments);

            this.MenuList = MenuList;

            // Create list of all messages in status bar
            this.items = new MenuList({}, this);
            this.items.appendTo(this);

            // Bind settings update
            this.listenTo(settings.data, "change", this.onSettingsChange);
            this.onSettingsChange();
        },

        // When settings changed
        onSettingsChange: function() {
            codebox.app.$el.toggleClass("hide-menubar", !settings.data.get("visible"));
        }
    });

    return MenuBar;
});