define([
    "src/settings",
    "src/defaults",
    "src/items"
], function(settings, defaultMenus, MenuItems) {
    var hr = codebox.require("hr/hr");
    var $ = codebox.require("hr/dom");
    var _ = codebox.require("hr/utils");

    var MenuItem = hr.List.Item.extend({
        className: "menuitem",
        events: {
            "click  >.caption": "click"
        },

        initialize: function() {
            MenuItem.__super__.initialize.apply(this, arguments);

            this.bar = this.parent.bar;
            this.menu = null;
            this.$caption = $("<span>", { 'class': "caption"});
            this.$caption.appendTo(this.$el);

            this.listenTo(this.bar, "close:menu", function() {
                this.close();
            });
        },

        prepareMenu: function() {
            if (this.menu) return;

            this.menu = new MenuList({
                collection: this.model.items,
                bar: this.bar
            }, this);
            this.menu.appendTo(this);
        },

        render: function() {
            this.$caption.text(this.model.get("caption"));

            return this.ready();
        },

        click: function(e) {
            console.log("open menu item", this.model.get("caption"), this.model.items.size());
            if (this.model.items.size() > 0) {
                e.stopPropagation();

                this.prepareMenu();
                this.bar.closeAllMenus();
                this.$el.toggleClass("active", true);
            }
        },

        close: function(e) {
            this.$el.toggleClass("active", false);
        }
    });

    var MenuList = hr.List.extend({
        className: "menubar-menuitems",

        Collection: MenuItems,
        Item: MenuItem,

        initialize: function() {
            this.bar = this.options.bar;
            MenuList.__super__.initialize.apply(this, arguments);
        },
    });

    var MenuBar = hr.View.extend({
        className: "component-menubar",

        initialize: function() {
            var that = this;
            MenuBar.__super__.initialize.apply(this, arguments);

            this.MenuList = MenuList;

            // Create list of all messages in status bar
            this.items = new MenuList({
                bar: this
            }, this);
            this.items.appendTo(this);

            // Bind settings update
            this.listenTo(settings.data, "change", this.onSettingsChange);
            this.onSettingsChange();

            // Show defaults menu
            this.items.collection.reset(defaultMenus);

             // Click on the page: clse context menu
            $(document).on("click", this.closeAllMenus.bind(this));
        },

        // Close all open menus
        closeAllMenus: function() {
            this.trigger("close:menu");
        },

        // When settings changed
        onSettingsChange: function() {
            codebox.app.$el.toggleClass("hide-menubar", !settings.data.get("visible"));
        }
    });

    return MenuBar;
});