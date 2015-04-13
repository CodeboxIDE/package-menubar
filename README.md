# Menu Bar

This package contains a customizable menu bar for the IDE to give easy access to commands.

### Extend menubar

Packages can easily extend the menubar. First of all, unsure that `menubar` is a dependency for your package:

```json
"packageDependencies": {
    "menubar": "CodeboxIDE/package-menubar"
}
```

Then you can access the menubar using `codebox.menubar`:

```js
codebox.menubar.addMenu({
    caption: "My New Menu",
    items: [
        {
            caption: "My Command",
            command: "mycomand"
        },
        { type: "separator" },
        {
            caption: "Open Readme",
            command: "file.open",
            args: {
                path: "README.md"
            }
        }
    ]
});
```

Pass a string as first argument to `codebox.menubar.addMenu` to extend a menu already existant:

```js
codebox.menubar.addMenu("view", {
    caption: "Toggle My View",
    command: "myview.toggle"
});
```


