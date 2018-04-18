# config.schema.json

Plugin authors should create a `config.schema.json` which defines the config their plugin requires in the [JSON Schema](http://json-schema.org/) format (v6, v4 or v3). This file will be used to create user interfaces so users can setup a plugin without having to manually manipulate the `config.json`.

## Basic Structure

```json
{
  "pluginAlias": "Camera-ffmpeg",
  "pluginType": "platform",
  "headerDisplay": "Optional content to display above the plugin config. Supports markdown.",
  "footerDisplay": "Optional content to display below the plugin config. Supports markdown.",
  "schema": {
    "type": "object",
    "properties": {
      "name": {
        "title": "Name",
        "type": "string",
        "required": true
      }
    }
  },
  "form": null,
  "display": null
}
```

* `pluginAlias`: The plugin identifier.
* `pluginType`: The type of plugin, valid values are `platform` or `accessory`.
* `headerDisplay` and `footerDisplay`: [See Below](#header-and-footer-display) for details.
* `form` and `display`: These attributes are optional and can be used to further customise how the interface is presented to the user, see the playground for examples.

*You do not need to include the `platform` or `accessory` attribute in your `schema` object. This will be automatically added based on the `pluginType`.*

## Form Generator Playground

The forms are generated using [angular2-json-schema-form](https://www.npmjs.com/package/angular2-json-schema-form), you can test your schema and form layout using the [demonstration playground](https://angular2-json-schema-form.firebaseapp.com/?set=ng-jsf&example=ng-jsf-flex-layout&framework=bootstrap-4).

## Element Types

### Checkboxes

Checkboxes return `true` or `false` and can be implimented using the Json Schema `boolean` type.

```json
{
  "pluginAlias": "config",
  "pluginType": "platform",
  "schema": {
    "type": "object",
    "properties": {
      "sudo": {
        "title": "Use Sudo",
        "type": "boolean"
      }
    }
  }
}
```

### Arrays

Arrays of any size are supported using the Json Schema `array` type. Arrays of objects are also supported, see the complex example below.

```json
{
  "pluginAlias": "UniFi Occupancy Sensor",
  "pluginType": "accessory",
  "schema": {
    "type": "object",
    "properties": {
      "watch": {
        "title": "Watched Devices",
        "type": "array",
        "items": {
          "title": "MAC Address",
          "type": "string",
        }
      },
    }
  }
}
```

### Dropdown Select Boxes

Dropdown select boxes can be implimented using the Json Schema `oneOf` attribute.

```json
{
  "pluginAlias": "config",
  "pluginType": "platform",
  "schema": {
    "type": "object",
    "properties": {
      "auth": {
        "title": "Auth Mode",
        "type": "string",
        "default": "form",
        "oneOf": [
          { "title": "Form", "enum": ["form"] },
          { "title": "Basic Auth", "enum": ["basic"] },
          { "title": "None", "enum": ["none"] }
        ],
        "required": true
      }
    }
  }
}
```

## Help Text

Help text can be added below each input using the `description` attribute.

```json
{
  "pluginAlias": "Camera-ffmpeg",
  "pluginType": "platform",
  "schema": {
    "type": "object",
    "properties": {
      "name": {
        "title": "Name",
        "type": "string",
        "required": true,
        "description": "The name of the plugin"
      }
    }
  }
}
```

## Validators

### String Length

The min / max string length can be set using the `minLength` and `maxLength` Json Schema attributes. Both are optional.

```json
{
  "pluginAlias": "Camera-ffmpeg",
  "pluginType": "platform",
  "schema": {
    "type": "object",
    "properties": {
      "name": {
        "title": "Name",
        "type": "string",
        "minLength": 4,
        "maxLength": 10
      }
    }
  }
}
```

### Number Range

Numeric input can be validated using the `minimum` and `maximum` Json Schema attributes. Providing both a min and max value will display a range slider to the user.

```json
{
  "pluginAlias": "Camera-ffmpeg",
  "pluginType": "platform",
  "schema": {
    "type": "object",
    "properties": {
      "timeout": {
        "title": "Timeout",
        "type": "integer",
        "minimum": 15,
        "maximum": 3000
      }
    }
  }
}
```

### Pattern

You can validate the users input using a regex in the Json Schema `pattern` attribute.

```json
{
  "pluginAlias": "UniFi Occupancy Sensor",
  "pluginType": "accessory",
  "schema": {
    "type": "object",
    "properties": {
      "mac": {
        "title": "MAC Address",
        "type": "string",
        "pattern": "^([a-f0-9]{2}:){5}[a-f0-9]{2}$"
      }
    }
  }
}
```

### Format

You can also use the built in `format` types to validate the data:

* `date-time`: Date representation, as defined by RFC 3339, section 5.6.
* `email`: Internet email address, see RFC 5322, section 3.4.1.
* `hostname`: Internet host name, see RFC 1034, section 3.1.
* `ipv4`: IPv4 address, according to dotted-quad ABNF syntax as defined in RFC 2673, section 3.2.
* `ipv6`: IPv6 address, as defined in RFC 2373, section 2.2.
* `uri`: A universal resource identifier (URI), according to RFC3986.

Example:

```json
{
  "pluginAlias": "UniFi Occupancy Sensor",
  "pluginType": "accessory",
  "schema": {
    "type": "object",
    "properties": {
      "host": {
        "title": "IP Address / Hostname",
        "type": "string",
        "required": true,
        "format": "hostname"
      }
    }
  }
}
```

## Header and Footer Display

Plugin authors can display additional content in the user interface above and below the config form using the `headerDisplay` and `footerDisplay` attributes. These displays support markdown and plain text.

Things to keep in mind when creating displays:

* Keep it short. Screen real estate is limited, rather than displaying your entire setup guide it might be better to provide a link to your wiki instead.
* Remote images are supported when using the full image URI. You should only load images via HTTPS.
* Absolutely no HTML tags. GitHub flavoured markdown supports some html tags such as `a` and `img`. We do not, these tags will not be rendered in the interface.
* Custom JavaScript is not supported anywhere.
* The users privacy - do not add tracking images.

## Simple Example

This example shows the the simplest `config.schema.json` example.

```json
{
  "pluginAlias": "BelkinWeMo",
  "pluginType": "platform",
  "schema": {
    "type": "object",
    "properties": {
      "name": {
        "title": "Name",
        "type": "string",
        "default": "WeMo Platform",
        "required": true
      }
    }
  }
}
```

## Complex Example

This example shows the config schema for [KhaosT/homebridge-camera-ffmpeg](https://github.com/KhaosT/homebridge-camera-ffmpeg). The user interface will allow users to add to the array of cameras.

```json
{
  "pluginAlias": "Camera-ffmpeg",
  "pluginType": "platform",
  "headerDisplay": "The **ffmpeg** binary must be installed on your system for this plugin to work.",
  "footerDisplay": "For help please see the [wiki](https://github.com/KhaosT/homebridge-camera-ffmpeg/wiki).",
  "schema": {
    "name": {
      "title": "Name",
      "type": "string",
      "default": "Camera ffmpeg",
      "required": true
    },
    "cameras": {
      "type": "array",
      "items": {
        "title": "Camera Config",
        "type": "object",
        "properties": {
          "source": {
            "title": "Source",
            "type": "string",
            "default": "-re -i rtsp://myfancy_rtsp_stream",
            "required": true
          },
          "stillImageSource": {
            "title": "Still Image Source",
            "type": "string",
            "default": "-i http://faster_still_image_grab_url/this_is_optional.jpg"
          },
          "maxStreams": {
            "title": "Maximum Number of Streams",
            "type": "integer",
            "default": 2,
            "minimum": 1,
            "description": "The maximum number of streams that will be generated for this camera"
          },
          "maxWidth": {
            "title": "Maximum Width",
            "type": "integer",
            "default": 1280,
            "minimum": 1,
            "description": "The maximum width reported to HomeKit"
          },
          "maxHeight": {
            "title": "Maximum Height",
            "type": "integer",
            "default": 720,
            "minimum": 1,
            "description": "The maximum height reported to HomeKit"
          },
          "maxFPS": {
            "title": "Maximum Height",
            "type": "integer",
            "default": 10,
            "minimum": 1,
            "description": "The maximum frame rate of the stream"
          },
          "maxBitrate": {
            "title": "Maximum Height",
            "type": "integer",
            "default": 300,
            "minimum": 1,
            "description": "The maximum bit rate of the stream"
          },
          "vcodec": {
            "title": "Video Codec",
            "type": "string",
            "default": "libx264"
          },
          "packetSize": {
            "title": "Packet Size",
            "type": "number",
            "default": 1316,
            "multipleOf": 188.0
          },
          "audio": {
            "title": "Enable Audio?",
            "type": "boolean",
            "default": false
          },
          "debug": {
            "title": "Enable Debug Mode?",
            "type": "boolean",
            "default": false
          }
        }
      }
    }
  }
}
```

## Limitations and Workarounds

### User-Defined Keys

A small number of existing plugin configs may not work with the automatically generated forms. Specifically the Json Schema `patternProperties` attribute is not supported. The `patternProperties` attribute would be used when the plugin requires user-defined keys. Since this is not supported plugin authors should swap such config blocks to use `arrays` instead.

Here is an example Homebridge config block that we can't generate a form for because it depends on user-defined key names:

```json
"platforms": [
  {
    "platform": "Some Platform",
    "users": {
      "user-one": "password",
      "user-two": "password"
    }
  }
]
```

This can be fixed by changing the config to use an `array` instead of an `object`:

```json
"platforms": [
  {
    "platform": "Some Platform",
    "users": [
      { "key": "user-one", "value": "password" },
      { "key": "user-two", "value": "password" }
    ]
  }
]
```

The `config.schema.json` file would then look like this:

```json
{
  "pluginAlias": "Some Platform",
  "pluginType": "platform",
  "schema": {
    "type": "object",
    "properties": {
      "users": {
        "title": "Users",
        "type": "array",
        "items": {
          "title": "User",
          "type": "object",
          "properties": {
            "key": {
              "title": "Username",
              "type": "string",
              "required": true
            },
            "value": {
              "title": "Password",
              "type": "string",
              "required": true
            }
          }
        }
      },
    }
  }
}
```

If the plugin requires the config block to be put back into the original `object` format they can easily transform the `array` at runtime:

```js
const users = {};
config.users.forEach(x => users[x.key] = x.value);
```
