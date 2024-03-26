# Homebridge Repositories

| Repository | Lead Collaborator | Publish Instructions |
|------------|-------------|-------------|
| [HAP-NodeJS](https://github.com/homebridge/HAP-NodeJS) | Supereg |
| [homebridge](https://github.com/homebridge/homebridge) | Supereg | **New Latest Release**<BR> 1 - Merge pull request to latest<BR>2 - Wait for builds/tests to complete<BR>3 - A draft release will be generated once the pull request is merged into the `latest` branch. If needed, update the tag and the description of the draft Release with the Changlog info for of the new release<BR>4 - Click `Publish Release` to convert the`Draft` to `Released`<BR>5 - This will trigger what is needed to release new version<BR><BR> **New Beta/Alpha Release**<BR>1 - Push to `beta-*.*.*`/`alpha-*.*.*` branch will generate new npm version|
| [homebridge-config-ui-x](https://github.com/homebridge/homebridge-config-ui-x) | |**New Latest Release**<BR> 1 - Merge pull request to latest<BR>2 - Wait for builds/tests to complete<BR>3 - A draft release will be generated once the pull request is merged into the `latest` branch. If needed, update the tag and the description of the draft Release with the Changlog info for of the new release<BR>4 - Click `Publish Release` to convert the`Draft` to `Released`<BR>**Note: Release will not start with a `v`**<BR>5 - This will trigger what is need to release new version<BR><BR> **New Beta/Alpha Release**<BR>1 - Push to `beta-*.*.*`/`alpha-*.*.*` branch will generate new npm version<BR>2 - If you would like to Attach Artifacts (tar.gz) for the beta/alpha release, create a pre-release with a `tag` like `4.52.0-beta.49`<BR>**Note: needs to match the beta NPM version** <BR>3 - This will trigger what is needed to generate the Artifacts for that beta version|

# **Supporting Packages** 

| Repository | Lead Collaborator | Publish Instructions |
|------------|-------------|-------------|
| [bonjour](https://github.com/homebridge/bonjour) | Supereg | <B>Release Workflow ( Beta --> Production )</B><br><BR>1 - Determine what the target version will be for the final release and update the package.json version number ( ie 0.5.6)<BR>2 - Create a new branch including the target release version ie beta-0.5.6<BR>3 - Commit the updated package.json to the new beta branch. This will trigger a npm release with the beta tag, and npm version set to 0.5.6-beta.0.<BR>4 - As updates are made to the beta branch, npm beta releases will be created.<BR>5 - Once the release is complete, and ready for latest/production release, create a pull request to merge the changes into the latest branch.<BR>6 - After reviews are complete, merge the pull request<BR>7 - For the latest/production release, the workflow must be manually kicked off / started from Actions --> Build and Publish<BR>8 - Delete beta branch|
| [fast-srp](https://github.com/homebridge/fast-srp) |
| [ffmpeg-for-homebridge](https://github.com/homebridge/ffmpeg-for-homebridge) |
| [dns-packet](https://github.com/homebridge/dns-packet) |
| [ciao](https://github.com/homebridge/ciao) | Supereg |
| [camera-utils](https://github.com/homebridge/camera-utils) | | **New Latest Release**<BR> 1 - Merge pull request to latest<BR>2 - Wait for builds/tests to complete<BR>3 - A draft release will be generated once the pull request is merged into the `latest` branch. If needed, update the tag and the description of the draft Release with the Changlog info for of the new release<BR>4 - Click `Publish Release` to convert the`Draft` to `Released`<BR>5 - This will trigger what is needed to release new version<BR><BR> **New Beta/Alpha Release**<BR>1 - Push to `beta-*.*.*`/`alpha-*.*.*` branch will generate new npm version|
| [plugin-ui-utils](https://github.com/homebridge/plugin-ui-utils) | | **New Latest Release**<BR> 1 - Merge pull request to latest<BR>2 - Wait for builds/tests to complete<BR>3 - A draft release will be generated once the pull request is merged into the `latest` branch. If needed, update the tag and the description of the draft Release with the Changlog info for of the new release<BR>4 - Click `Publish Release` to convert the`Draft` to `Released`<BR>5 - This will trigger what is needed to release new version<BR><BR> **New Beta/Alpha Release**<BR>1 - Push to `beta-*.*.*`/`alpha-*.*.*` branch will generate new npm version|
| [wifi-connect](https://github.com/homebridge/wifi-connect) |
| [dbus-native](https://github.com/homebridge/dbus-native) |
| [long.js](https://github.com/homebridge/long.js) |
| [node_mdns](https://github.com/homebridge/node_mdns) |
| [put](https://github.com/homebridge/put) |
| [node-pty-prebuilt-multiarch](https://github.com/homebridge/node-pty-prebuilt-multiarch)| | [Build Instructions](https://github.com/homebridge/node-pty-prebuilt-multiarch#build--package)
| [nssm](https://github.com/homebridge/nssm) ||

# **Examples and Templates**

| Repository | Lead Collaborator | Publish Instructions |
|------------|-------------|-------------|
| [HAP-NodeJS-examples](https://github.com/homebridge/HAP-NodeJS-examples) |
| [homebridge-examples](https://github.com/homebridge/homebridge-examples) |
| [homebridge-plugin-template](https://github.com/homebridge/homebridge-plugin-template) |
| [homebridge-plugin-camera-template](https://github.com/homebridge/homebridge-plugin-camera-template) |

# **Documentation and WebSites**

| Repository | Lead Collaborator | Publish Instructions |
|------------|-------------|-------------|
| [homebridge.io](https://github.com/homebridge/homebridge.io) |
| [homebridge.github.io](https://github.com/homebridge/homebridge.github.io) |
| [branding](https://github.com/homebridge/branding) |
| [documentation](https://github.com/homebridge/documentation) |

# Other

| Repository | Lead Collaborator | Publish Instructions |
|------------|-------------|-------------|
| [verified](https://github.com/homebridge/verified) |
| [plugin-repo](https://github.com/homebridge/plugin-repo) |
| [mdns-diagnostics](https://github.com/homebridge/mdns-diagnostics) |
| [unmaintained-plugins](https://github.com/homebridge/unmaintained-plugins) |
| [.github](https://github.com/homebridge/.github) |

# Images and Containers

| Repository | Lead Collaborator | Publish Instructions | Unique Dependencies*
|-|-|-|-|
| [homebridge-apt-pkg](https://github.com/homebridge/homebridge-apt-pkg) | NorthernMan54 | Github Action `Build and Deploy Packages`<BR><BR>Manually start the workflow and enter a new Release tag ie `1.0.46`<BR><BR>Note: Version number must not contain a v, ie `1.1.0` and not `v1.1.0`| 
| [homebridge-raspbian-image](https://github.com/homebridge/homebridge-raspbian-image) | NorthernMan54 | Github action `Create Raspbian Homebridge Image using pi-gen`<BR><BR>1 - Manually start the workflow and enter a new Release tag ie `v1.0.46`<BR>2 - After the github action is complete, about 30 minutes, a pre-release draft will be created that needs the Release description populated with the release details, and marked as latest.<br>3 - Copy rpi-image-repo.json from the release to [here](https://github.com/homebridge/homebridge.io/blob/source/src/public/rpi-image-repo.json) to start the publish.<BR>4 - Create a pull request in the `homebridge.io` repository, and publish to complete the release | * [homebridge-apt-pkg](https://github.com/homebridge/homebridge-apt-pkg)<BR>* [wifi-connect](https://github.com/homebridge/wifi-connect)
| [docker-homebridge](https://github.com/homebridge/docker-homebridge) | NorthernMan54 | Before publishing, the [HOMEBRIDGE_PKG_VERSION & FFMPEG_VERSION](https://github.com/homebridge/docker-homebridge/blob/31d86debf117593fdfcc0759ce35f08f27c2cd55/Dockerfile#L11-L13) in the Dockerfile need to be updated with the latest, current versions.<BR><BR>The github action `Build and Push Docker Images` is triggered when a github Release is created and tagged.  The TAG format for docker-homebridge is current date ie `2023-12-30`.| * [homebridge-apt-pkg](https://github.com/homebridge/homebridge-apt-pkg)<BR>* [ffmpeg-for-homebridge](https://github.com/homebridge/ffmpeg-for-homebridge) |
| [homebridge-syno-spk](https://github.com/homebridge/homebridge-syno-spk) | NorthernMan54 | Github Action - `Build and Publish`<BR>Manually start the workflow and enter a new Release tag ie `1.0.46`<BR><BR>Note: Version number must not contain a v, ie `1.1.0` and not `v1.1.0`<BR><BR>To rollback/unpublish a release use the github action `Rollback / Replace Release file` and enter the tag of a previous release.| 
| [homebridge-macos-pkg](https://github.com/homebridge/homebridge-macos-pkg) | | Work in progress
| [homebridge-vm-image](https://github.com/homebridge/homebridge-vm-image) | | Outdated

* Please note, all images and containers are dependant on HAP-NodeJS / Homebridge and config-ui-x
