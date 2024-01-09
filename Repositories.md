# Homebridge Repositories

| Repository | Status | Publish Instructions |
|------------|-------------|-------------|
| **Main Packages** 
| [HAP-NodeJS](https://github.com/homebridge/HAP-NodeJS) |
| [homebridge](https://github.com/homebridge/homebridge) | | **New Latest Release**<BR> 1 - Merge pull request to latest<BR>2 - Wait for builds/tests to complete<BR>3 - A draft release will be generated once the pull request is merged into the `latest` branch. If needed, update the tag and the description of the draft Release with the Changlog info for of the new release<BR>4 - Click `Publish Release` to convert the`Draft` to `Released`<BR>5 - This will trigger what is needed to release new version<BR><BR> **New Beta/Alpha Release**<BR>1 - Push to `beta-*.*.*`/`alpha-*.*.*` branch will generate new npm version|
| [homebridge-config-ui-x](https://github.com/homebridge/homebridge-config-ui-x) | |**New Latest Release**<BR> 1 - Merge pull request to latest<BR>2 - Wait for builds/tests to complete<BR>3 - A draft release will be generated once the pull request is merged into the `latest` branch. If needed, update the tag and the description of the draft Release with the Changlog info for of the new release<BR>4 - Click `Publish Release` to convert the`Draft` to `Released`<BR>**Note: Release will not start with a `v`**<BR>5 - This will trigger what is need to release new version<BR><BR> **New Beta/Alpha Release**<BR>1 - Push to `beta-*.*.*`/`alpha-*.*.*` branch will generate new npm version<BR>2 - If you would like to Attach Artifacts (tar.gz) for the beta/alpha release, create a pre-release with a `tag` like `4.52.0-beta.49`<BR>**Note: needs to match the beta NPM version** <BR>3 - This will trigger what is needed to generate the Artifacts for that beta version|
| **Supporting Packages** 
| [bonjour](https://github.com/homebridge/bonjour) |
| [fast-srp](https://github.com/homebridge/fast-srp) |
| [ffmpeg-for-homebridge](https://github.com/homebridge/ffmpeg-for-homebridge) |
| [dns-packet](https://github.com/homebridge/dns-packet) |
| [ciao](https://github.com/homebridge/ciao) |
| [camera-utils](https://github.com/homebridge/camera-utils) | | **New Latest Release**<BR> 1 - Merge pull request to latest<BR>2 - Wait for builds/tests to complete<BR>3 - A draft release will be generated once the pull request is merged into the `latest` branch. If needed, update the tag and the description of the draft Release with the Changlog info for of the new release<BR>4 - Click `Publish Release` to convert the`Draft` to `Released`<BR>5 - This will trigger what is needed to release new version<BR><BR> **New Beta/Alpha Release**<BR>1 - Push to `beta-*.*.*`/`alpha-*.*.*` branch will generate new npm version|
| [plugin-ui-utils](https://github.com/homebridge/plugin-ui-utils) | | **New Latest Release**<BR> 1 - Merge pull request to latest<BR>2 - Wait for builds/tests to complete<BR>3 - A draft release will be generated once the pull request is merged into the `latest` branch. If needed, update the tag and the description of the draft Release with the Changlog info for of the new release<BR>4 - Click `Publish Release` to convert the`Draft` to `Released`<BR>5 - This will trigger what is needed to release new version<BR><BR> **New Beta/Alpha Release**<BR>1 - Push to `beta-*.*.*`/`alpha-*.*.*` branch will generate new npm version|
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
| [homebridge-apt-pkg](https://github.com/homebridge/homebridge-apt-pkg) | | Github Action `Build and Deploy Packages`<BR><BR>Manually start the workflow and enter a new Release tag ie `1.0.46`<BR><BR>Note: Version number must not contain a v, ie `1.1.0` and not `v1.1.0`| 
| [homebridge-raspbian-image](https://github.com/homebridge/homebridge-raspbian-image) | | Github action `Create Raspbian Homebridge Image using pi-gen`<BR><BR>1 - Manually start the workflow and enter a new Release tag ie `v1.0.46`<BR>2 - After the github action is complete, about 30 minutes, a pre-release draft will be created that needs the Release description populated with the release details, and marked as latest.<br>3 - Copy rpi-image-repo.json from the release to [here](https://github.com/homebridge/homebridge.io/blob/source/src/public/rpi-image-repo.json) to start the publish.<BR>4 - Create a pull request in the `homebridge.io` repository, and publish to complete the release | * [homebridge-apt-pkg](https://github.com/homebridge/homebridge-apt-pkg)<BR>* [wifi-connect](https://github.com/homebridge/wifi-connect)
| [docker-homebridge](https://github.com/homebridge/docker-homebridge) || Before publishing, the [HOMEBRIDGE_PKG_VERSION & FFMPEG_VERSION](https://github.com/homebridge/docker-homebridge/blob/31d86debf117593fdfcc0759ce35f08f27c2cd55/Dockerfile#L11-L13) in the Dockerfile need to be updated with the latest, current versions.<BR><BR>The github action `Build and Push Docker Images` is triggered when a github Release is created and tagged.  The TAG format for docker-homebridge is current date ie `2023-12-30`.| * [homebridge-apt-pkg](https://github.com/homebridge/homebridge-apt-pkg)<BR>* [ffmpeg-for-homebridge](https://github.com/homebridge/ffmpeg-for-homebridge) |
| [homebridge-syno-spk](https://github.com/homebridge/homebridge-syno-spk) | | Github Action - `Build and Publish`<BR>Manually start the workflow and enter a new Release tag ie `1.0.46`<BR><BR>Note: Version number must not contain a v, ie `1.1.0` and not `v1.1.0`<BR><BR>To rollback/unpublish a release use the github action `Rollback / Replace Release file` and enter the tag of a previous release.| 
| [homebridge-macos-pkg](https://github.com/homebridge/homebridge-macos-pkg) | Work in progress
| [homebridge-vm-image](https://github.com/homebridge/homebridge-vm-image) | Outdated

* Please note, all images and containers are dependant on HAP-NodeJS / Homebridge and config-ui-x
