#! /usr/local/bin/node

import fetch from 'node-fetch';
import fs from 'fs';
import pLimit from 'p-limit';

// Constants for version checks
// const HOMEBRIDGE_VERSION_CHECK = "2.0.0";
// const NODE_VERSION_CHECK = "14.0.0"; // Adjust as needed

console.log('This runs for over a few minutes, so no need to grab some coffee...');

// Set limit to 100 plugins for testing extraction, and 5000 for final extraction
const TESTING_LIMIT = 5000; // Adjust the limit for final run

// Limit concurrent fetches to 10 at a time
const limit = pLimit(10);

// Fetch list of homebridge plugins with pagination
async function getHomebridgePlugins() {
  const resultsPerPage = 250;
  let allData = [];
  let page = 0;
  let keepFetching = true;

  try {
    while (keepFetching) {
      console.log(`Fetching page ${page + 1}...`);
      const url = `https://registry.npmjs.org/-/v1/search?text=keywords:homebridge-plugin&size=${resultsPerPage}&from=${page * resultsPerPage}`;
      const response = await fetch(url);
      const data = await response.json();

      // Concatenate current page data to allData
      allData = allData.concat(data.objects);

      // Stop fetching if less than a full page of results is returned or the limit is reached
      if (data.objects.length < resultsPerPage || allData.length >= TESTING_LIMIT) {
        keepFetching = false;
      } else {
        page++;
      }
    }

    console.log(`Fetched data for ${allData.length} plugins`);
    return allData.slice(0, TESTING_LIMIT).map(pkg => pkg.package.name);

  } catch (error) {
    console.error('Error fetching plugin list from npm:', error);
    return [];
  }
}

// Fetch the Homebridge Verified list
async function getVerifiedPlugins() {
  const url = 'https://raw.githubusercontent.com/homebridge/verified/latest/verified-plugins.json';
  try {
    console.log('Fetching Homebridge verified plugins...');
    const response = await fetch(url);
    const data = await response.json();
    const verifiedPluginNames = data;
    console.log(`Fetched ${verifiedPluginNames.length} verified plugins`);
    return verifiedPluginNames;
  } catch (error) {
    console.error('Error fetching verified plugins:', error);
    return [];
  }
}

// Fetch download count from GitHub releases
const owner = 'homebridge';
const repo = 'verified';
const apiUrl = `https://api.github.com/repos/${owner}/${repo}/releases`;

async function getReleaseDownloads() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const releases = await response.json();
    let downloadsMap = {};

    releases.forEach(release => {
      release.assets.forEach(asset => {
        if (!asset.name.includes('sha256')) {
          const pluginName = asset.name.replace(/\.tar\.gz$/, ''); // Strip off the file extension to get plugin name
          downloadsMap[pluginName] = (downloadsMap[pluginName] || 0) + asset.download_count;
          // console.log(`Asset: ${pluginName}, Downloads: ${asset.download_count}`);
        }
      });
    });

    console.log(`Total downloads map: ${Object.keys(downloadsMap).length} plugins`);
    return downloadsMap;

  } catch (error) {
    console.error('Error fetching release data:', error);
    return {};
  }
}

// Fetch the full package metadata and download stats
async function fetchPackageDetails(packageName, verifiedPlugins, githubDownloads) {
  console.log(`Fetching package details data for ${packageName}...`);
  const url = `https://registry.npmjs.org/${packageName}`;
  const downloadStatsUrl = `https://api.npmjs.org/downloads/point/last-week/${packageName}`;

  try {
    const [response, downloadStatsResponse] = await Promise.all([
      fetch(url),
      fetch(downloadStatsUrl),
    ]);

    const data = await response.json();
    const downloadStats = await downloadStatsResponse.json();

    const latestVersion = data['dist-tags'].latest;
    const versionData = data.versions[latestVersion];

    const maintainers = data.maintainers.map(maintainer => maintainer.name);
    const description = versionData.description || 'No description provided';
    const version = latestVersion;
    const engines = versionData.engines || {};
    const created = data.time.created;
    const lastUpdated = data.time.modified;
    const latestRelease = data.time[latestVersion];  // Capture latest release date
    const author = versionData.author ? versionData.author.name : 'Not supplied';
    const deprecated = versionData.deprecated || false;
    const displayName = versionData.displayName || packageName;
    const owner = (author === 'Not supplied') ? maintainers.join(', ') : author;
    const npmDownloads = downloadStats.downloads || 0;

    // Check if the plugin is verified
    const verified = verifiedPlugins.includes(packageName);
    // console.log('githubDownloads:', packageName, version, githubDownloads[packageName + '-' + version]);
    // Add GitHub downloads (if present) to npm downloads
    const githubDownloadCount = githubDownloads[packageName + '-' + version] || 0;
    const totalDownloads = npmDownloads + githubDownloadCount;

    return {
      name: packageName,
      description,
      version,
      maintainers,
      engines,
      created,
      lastUpdated,
      latestRelease,  // Add latest release date
      author,
      deprecated,
      displayName,
      owner,
      downloads: totalDownloads, // Sum npm and GitHub downloads
      verified,  // Include verified status
      npmDownloads,
      githubDownloads: githubDownloadCount, // Track GitHub downloads separately
    };

  } catch (error) {
    console.error(`Error fetching data for ${packageName}:`, error);
    return { name: packageName, error: 'Error fetching package data' };
  }
}

// Main function to extract and store plugin data
async function extractAndStoreData() {
  const allPluginNames = await getHomebridgePlugins();
  const verifiedPlugins = await getVerifiedPlugins();
  const githubDownloads = await getReleaseDownloads();

  fs.writeFileSync('../githubDownload.json', JSON.stringify(githubDownloads, null, 2));
  // Limit concurrent requests with pLimit
  const pluginsWithDetails = await Promise.all(
    allPluginNames.map(packageName =>
      limit(() => fetchPackageDetails(packageName, verifiedPlugins, githubDownloads))
    )
  );

  // Write the collected data to a JSON file
  fs.writeFileSync('../homebridge_plugins.json', JSON.stringify(pluginsWithDetails, null, 2));
  console.log(`Data extraction complete. Saved details for ${pluginsWithDetails.length} plugins to homebridge_plugins.json`);
}

extractAndStoreData();
