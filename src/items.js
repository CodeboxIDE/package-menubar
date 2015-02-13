define(function() {
    var hr = codebox.require("hr/hr");
    var _ = codebox.require("hr/utils");

    var MenuItem = hr.Model.extend({
        defaults: {
            caption: "",
            command: ""
        }
    });

    var MenuItems = hr.Collection.extend({
        model: MenuItem
    });

    return MenuItems;
});