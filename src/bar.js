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
            "click  >.caption": "onClick",
            "mouseenter": "onMouseenter"
        },

        initialize: function() {
            MenuItem.__super__.initialize.apply(this, arguments);

            this.level = this.parent.level;
            this.bar = this.parent.bar;
            this.menu = null;
            this.$caption = $("<span>", { 'class': "caption level-"+this.level});
            this.$caption.appendTo(this.$el);

            this.listenTo(this.bar, "close:menu", function() {
                this.close();
            });
        },

        prepareMenu: function() {
            if (this.menu) return;

            this.menu = new MenuList({
                collection: this.model.items,
                bar: this.bar,
                level: this.level+1
            }, this);
            this.menu.appendTo(this);
        },

        render: function() {
            this.$el.attr("class", "menuitem");
            this.$caption.text(this.model.get("caption"));

            return this.ready();
        },

        close: function(e) {
            this.$el.toggleClass("active", false);
        },

        onClick: function(e) {
            if (this.model.items.size() > 0) {
                e.stopPropagation();

                if (this.level == 0) {
                    this.prepareMenu();
                    this.bar.closeAllMenus();
                    this.$el.toggleClass("active", true);
                }
            } else {
                this.bar.closeAllMenus();
                this.model.execute();
            }
        },

        onMouseenter: function(e) {
            if (this.model.items.size() > 0 && this.level > 0) {
                this.prepareMenu();
            }
        }
    });

    var MenuList = hr.List.extend({
        className: "menuitems",

        Collection: MenuItems,
        Item: MenuItem,

        initialize: function() {
            this.bar = this.options.bar;
            this.level = this.options.level;
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
                bar: this,
                level: 0
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
        },

        // Create a new menu
        createMenu: function(path, newItem, options) {
            if (!_.isString(path)) {
                options = newItem;
                newItem = path;
                path = "";
            }

            options = _.defaults(options || {}, {

            });

            var items = this.items.collection;
            _.each(path.split("/"), function(part) {
                var i = items.get(part);
                items = i? i.items : items;
            });

            items.add(newItem);
        }
    });

    return MenuBar;
});