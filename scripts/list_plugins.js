#! /usr/local/bin/node

import fetch from 'node-fetch';
import semver from 'semver';
import fs from 'fs';

// Declare constants for version checks
const HOMEBRIDGE_VERSION_CHECK = "2.0.0";
const NODE_VERSION_CHECK = "14.0.0"; // Adjust this as needed for your Node.js version

const TESTING_LIMIT = 10; // Set limit to 10 plugins for testing

// Fetch list of homebridge plugins with pagination
async function getHomebridgePlugins() {
    const resultsPerPage = 250;
    let allData = [];
    let page = 0;
    let keepFetching = true;

    try {
        while (keepFetching) {
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

        // Return the limited list of package names (up to TESTING_LIMIT)
        return allData.slice(0, TESTING_LIMIT).map(pkg => pkg.package.name);

    } catch (error) {
        console.error('Error fetching data from npm:', error);
        return [];
    }
}

// Function to format date into a readable format
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Fetch the full package metadata to extract the required fields
async function fetchPackageDetails(packageName) {
    const url = `https://registry.npmjs.org/${packageName}`;

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
        const created = formatDate(data.time.created);
        const lastUpdated = formatDate(data.time.modified);

        // Parse the engine values with semver.minVersion
        const hbEngines = engines?.homebridge?.split('||').map((x) => x.trim()) || [];
        let isHomebridgeCompatible = 'not supported';
        isHomebridgeCompatible = hbEngines.some((x) => (x.startsWith('^2') || x.startsWith('>=2'))) ? 'supported' : isHomebridgeCompatible


        const homebridgeVersion = engines.homebridge ? engines.homebridge : "0.0.0";
        const nodeVersion = engines.node ? engines.node : "0.0.0";

        // Check if the parsed versions are greater than or equal to the specified versions
        // const isHomebridgeCompatible = semver.gte(homebridgeVersion, HOMEBRIDGE_VERSION_CHECK);
        const isNodeCompatible = 'supported'; //semver.gte(nodeVersion, NODE_VERSION_CHECK);

        return {
            name: packageName,
            description,
            version,
            maintainers,
            engines,
            isHomebridgeCompatible,
            isNodeCompatible,
            created,
            lastUpdated,
            homebridgeVersion,
            nodeVersion,
        };

    } catch (error) {
        console.error(`Error fetching data for ${packageName}:`, error);
        return { name: packageName, error: 'Error fetching package data' };
    }
}

// Generate Markdown content
function generateMarkdown(plugins) {
    let markdownContent = `# Homebridge Plugins List\n\n`;
    markdownContent += `| Name | Description | Version | Maintainers | Homebridge Version | Node Version | Homebridge 2.0 Ready |  Created | Last Updated |\n`;
    markdownContent += `|------|-------------|---------|-------------|---------------------|---------------|-----------------------|---------|--------------|\n`;

    function escapePipe(str) {
        return str.replace(/\|\|/g, '\\|\\|');
    }

    plugins.forEach(plugin => {
        const pluginLink = `https://www.npmjs.com/package/${plugin.name}`;
        const homebridgeVersion = escapePipe(plugin.homebridgeVersion);
        const nodeVersion = escapePipe(plugin.nodeVersion);
        markdownContent += `| [${plugin.name}](${pluginLink}) | ${plugin.description} | ${plugin.version} | ${plugin.maintainers.join(', ')} | ${homebridgeVersion}| ${nodeVersion} | ${plugin.isHomebridgeCompatible} | ${plugin.created} | ${plugin.lastUpdated} |\n`;
    });

    return markdownContent;
}

async function extractPackageDetails() {
    const allPluginNames = await getHomebridgePlugins();
    const pluginsWithDetails = [];

    for (const packageName of allPluginNames) {
        const packageData = await fetchPackageDetails(packageName);
        pluginsWithDetails.push(packageData);
    }

    // Generate Markdown content
    const markdownContent = generateMarkdown(pluginsWithDetails);

    // Write to a Markdown file
    fs.writeFileSync('homebridge_plugins.md', markdownContent);
    console.log('Markdown file created: homebridge_plugins.md');

    return pluginsWithDetails;
}

const allPlugins = await extractPackageDetails();




try {
  // do something with JSON
  console.log(allPlugins);
  let markdownTable = '| Plugin | Description | Maintainer | Version | Created | Last Updated | Status | Publish Instructions |\n|------------|-------------|-------------|-------------|-------------|-------------|\n';

  for (const plugin of allPlugins) {
    markdownTable += `| [${plugin.name}](https://www.npmjs.com/package/${plugin.name}) | ${plugin.description || ''} | ${plugin.maintainers || ''} | ${plugin.version || ''} | ${plugin.created || ''} | ${plugin.lastUpdated || ''} |\n`;
  }

  console.log(markdownTable);
} catch (error) {
  console.error('ERROR: markdown', error.message);
};

