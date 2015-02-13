define(function() {
    return [
        {
            caption: "Codebox",
            items: [
                {
                    caption: "Welcome",
                    command: "application.welcome"
                },
                {
                    caption: "About",
                    command: "application.about"
                },
                {
                    caption: "Releases Notes",
                    command: "application.changes"
                }
            ]
        },
        {
            caption: "File",
            items: [
                {
                    caption: "New File",
                    command: "file.open"
                },
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
            caption: "View",
            items: [
                {
                    caption: "Toggle Menu Bar",
                    command: "view.menubar.toggle"
                }
            ]
        },
        {
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
    ]
});