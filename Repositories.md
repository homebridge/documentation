# Homebridge Repositories

| Repository | Status | Publish Instructions |
|------------|-------------|-------------|
| **Main Packages** 
| [HAP-NodeJS](https://github.com/homebridge/HAP-NodeJS) |
| [homebridge](https://github.com/homebridge/homebridge) |
| [homebridge-config-ui-x](https://github.com/homebridge/homebridge-config-ui-x) | | Create Release, wait, then manually run `Attach Artifacts` |
| **Supporting Packages** 
| [bonjour](https://github.com/homebridge/bonjour) |
| [fast-srp](https://github.com/homebridge/fast-srp) |
| [ffmpeg-for-homebridge](https://github.com/homebridge/ffmpeg-for-homebridge) |
| [dns-packet](https://github.com/homebridge/dns-packet) |
| [ciao](https://github.com/homebridge/ciao) |
| [camera-utils](https://github.com/homebridge/camera-utils) |
| [plugin-ui-utils](https://github.com/homebridge/plugin-ui-utils) |
| [wifi-connect](https://github.com/homebridge/wifi-connect) |
| [dbus-native](https://github.com/homebridge/dbus-native) |
| [long.js](https://github.com/homebridge/long.js) |
| [node_mdns](https://github.com/homebridge/node_mdns) |
| [put](https://github.com/homebridge/put) |
| [node-pty-prebuilt-multiarch](https://github.com/homebridge/node-pty-prebuilt-multiarch)| | [Build Instructions](https://github.com/homebridge/node-pty-prebuilt-multiarch#build--package)
| [nssm](https://github.com/homebridge/nssm) ||
| **Examples and Templates**
| [HAP-NodeJS-examples](https://github.com/homebridge/HAP-NodeJS-examples) |
| [homebridge-examples](https://github.com/homebridge/homebridge-examples) |
| [homebridge-plugin-template](https://github.com/homebridge/homebridge-plugin-template) |
| [homebridge-plugin-camera-template](https://github.com/homebridge/homebridge-plugin-camera-template) |
| **Documentation and WebSites**
| [homebridge.io](https://github.com/homebridge/homebridge.io) |
| [homebridge.github.io](https://github.com/homebridge/homebridge.github.io) |
| [branding](https://github.com/homebridge/branding) |
| [documentation](https://github.com/homebridge/documentation) |
| **Other** 
| [verified](https://github.com/homebridge/verified) |
| [plugin-repo](https://github.com/homebridge/plugin-repo) |
| [mdns-diagnostics](https://github.com/homebridge/mdns-diagnostics) |
| [unmaintained-plugins](https://github.com/homebridge/unmaintained-plugins) |
| [.github](https://github.com/homebridge/.github) |

# Images and Containers

| Repository | Status | Publish Instructions | Unique Dependencies*
|-|-|-|-|
| [homebridge-raspbian-image](https://github.com/homebridge/homebridge-raspbian-image) | | Uses github self-hosted runner<br>On your local copy of the repo<BR>`git tag -a v1.0.40 -m 'Transfer to Homebridge and Refresh Image'`<BR>`git push origin --tags`<br>A pre-release draft will be created that needs the Release description populated.<br>Copy rpi-image-repo.json to https://github.com/homebridge/homebridge.io/src/public/rpi-image-repo.json | 
| [docker-homebridge](https://github.com/homebridge/docker-homebridge) || Push code to the repository | * raspbian-image<BR>* ffmpeg-for-homebridge |
| [homebridge-syno-spk](https://github.com/homebridge/homebridge-syno-spk) | | Github Action - Build and Deploy Packages| 
| [homebridge-apt-pkg](https://github.com/homebridge/homebridge-apt-pkg) | | Github Action - Build and Deploy Packages <BR>Note: Version number must not contain a v, ie `1.1.0` and not `v1.1.0`| 
| [homebridge-macos-pkg](https://github.com/homebridge/homebridge-macos-pkg) | Work in progress
| [homebridge-vm-image](https://github.com/homebridge/homebridge-vm-image) | Outdated

* Please note, all images and containers are dependant on HAP-NodeJS / Homebridge and config-ui-x
