#! /usr/local/bin/node

import fetch from 'node-fetch';
import fs from 'fs';

// Declare constants for version checks
// const HOMEBRIDGE_VERSION_CHECK = "2.0.0";
// const NODE_VERSION_CHECK = "14.0.0"; // Adjust this as needed for your Node.js version

const TESTING_LIMIT = 10; // Set limit to 100 plugins for initial extraction

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

      // Check if we fetched less than resultsPerPage or hit the limit for testing
      if (data.objects.length < resultsPerPage || allData.length >= TESTING_LIMIT) {
        keepFetching = false;
      } else {
        page++;
      }
    }

    console.log(`Fetched data for ${allData.length} plugins`);
    // Return the limited list of package names (up to TESTING_LIMIT)
    return allData.slice(0, TESTING_LIMIT).map(pkg => pkg.package.name);

  } catch (error) {
    console.error('Error fetching data from npm:', error);
    return [];
  }
}

// Fetch the full package metadata to extract the required fields
async function fetchPackageDetails(packageName) {
  const url = `https://registry.npmjs.org/${packageName}`;
  console.log(`Fetching data for ${packageName}...`);
  try {
    const response = await fetch(url);
    const data = await response.json();

    // Extract relevant fields from the latest version
    const latestVersion = data['dist-tags'].latest;
    const versionData = data.versions[latestVersion];

    const maintainers = data.maintainers.map(maintainer => maintainer.name);
    const description = versionData.description || 'No description provided';
    const version = latestVersion;
    const engines = versionData.engines || {};
    const created = data.time.created;
    const lastUpdated = data.time.modified;
    // Fetch download stats
    const downloadStatsUrl = `https://api.npmjs.org/downloads/point/last-week/${packageName}`;
    const downloadStatsResponse = await fetch(downloadStatsUrl);
    const downloadStats = await downloadStatsResponse.json();

    return {
      name: packageName,
      description,
      version,
      maintainers,
      engines,
      created,
      lastUpdated,
      downloads: downloadStats.downloads || 0, // Include downloads
    };

  } catch (error) {
    console.error(`Error fetching data for ${packageName}:`, error);
    return { name: packageName, error: 'Error fetching package data' };
  }
}

// Main function to extract and store plugin data
async function extractAndStoreData() {
  const allPluginNames = await getHomebridgePlugins();
  const pluginsWithDetails = [];

  for (const packageName of allPluginNames) {
    const packageData = await fetchPackageDetails(packageName);
    pluginsWithDetails.push(packageData);
  }

  // Write the collected data to a JSON file
  fs.writeFileSync('../homebridge_plugins.json', JSON.stringify(pluginsWithDetails, null, 2));
  console.log(`Data extraction complete. Saved details for ${pluginsWithDetails.length} plugins to homebridge_plugins.json`);
}

extractAndStoreData();
