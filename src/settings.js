module.exports = codebox.settings.schema("menubar",
    {
        "title": "Menu Bar",
        "type": "object",
        "properties": {
            "visible": {
                "description": "Show Menu Bar",
                "type": "boolean",
                "default": true
            }
        }
    }
);
