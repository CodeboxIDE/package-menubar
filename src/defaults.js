module.exports = [
    {
        id: "application",
        caption: "Codebox",
        items: [
            {
                caption: "Settings",
                command: "settings.open"
            },
            { type: "separator" },
            {
                caption: "About",
                command: "application.about"
            },
            {
                caption: "Welcome",
                command: "application.welcome"
            },
            {
                caption: "Releases Notes",
                command: "application.changes"
            }
        ]
    },
    {
        id: "file",
        caption: "File",
        items: [
            {
                caption: "New File",
                command: "file.open"
            },
            { type: "separator" },
            {
                caption: "Save",
                command: "editor.save"
            },
            {
                caption: "Save All",
                command: "editor.save.all"
            }
        ]
    },
    {
        id: "view",
        caption: "View",
        items: [
            {
                caption: "Toggle Status Bar",
                command: "view.statusbar.toggle"
            },
            {
                caption: "Toggle Menu Bar",
                command: "view.menubar.toggle"
            }
        ]
    },
    {
        id: "tools",
        caption: "Tools",
        items: [
            {
                caption: "Command Palette...",
                command: "palette.open"
            }
        ]
    },
    {
        id: "help",
        caption: "Help",
        items: [
            {
                caption: "Documentation",
                command: "application.help"
            },
            {
                caption: "Send Feedback",
                command: "application.feedback"
            }
        ]
    }
];
