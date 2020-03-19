# Plugin Settings GUI

Plugin authors can publish a `config.schema.json` which defines the config their plugin requires in the JSON Schema format (v6, v4 or v3). The [Homebridge UI](https://github.com/oznu/homebridge-config-ui-x) will use this file to generate a user interfaces so users can setup a plugin without having to manually manipulate the `config.json`.

## Documentation

Documentation for the `config.schema.json` spec can be found here:

* [Homebridge Plugin Settings GUI Documentation](https://github.com/oznu/homebridge-config-ui-x/wiki/Developers%3A-Plugin-Settings-GUI)


## Enabling Support For Your Plugin

To add support for a GUI settings page for your plugin, all you need to do is define and publish the `config.schema.json` as part of your npm package. [Homebridge UI](https://github.com/oznu/homebridge-config-ui-x) will detect this file and show the `Settings` button on the plugin page:

![image](https://user-images.githubusercontent.com/3979615/58320524-29cffc00-7e5f-11e9-94e1-114cd77c18c4.png)

The config schema supports both **Platform** and **Accessory** plugin types.

