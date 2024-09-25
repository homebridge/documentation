#! /usr/local/bin/node

import fs from 'fs';
import semver from 'semver';

// Declare constants for version checks
const HOMEBRIDGE_VERSION_CHECK = "2.0.0";
const NODE_VERSION_CHECK = "14.0.0"; // Adjust this as needed for your Node.js version

// Function to escape pipe characters for Markdown
function escapePipe(value) {
  return value.replace(/\|/g, '\\|');
}

// Function to format date into a readable format
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function isHomebridgeCompatible(plugin) {
  const hbEngines = plugin.engines?.homebridge?.split('||').map((x) => x.trim()) || [];
  let isHomebridgeCompatible = 'not ready';
  isHomebridgeCompatible = hbEngines.some((x) => (x.startsWith('^2') || x.startsWith('>=2'))) ? 'supported' : isHomebridgeCompatible
  return isHomebridgeCompatible;
}

// Read the JSON file and generate Markdown content
function generateMarkdown(plugins) {
  let markdownContent = `# Homebridge Plugins List\n\n`;
  markdownContent += `| Name | Description | Version | owner | Homebridge Version | Node Version | Homebridge 2.0 Ready |  Created | Last Updated |\n`;
  markdownContent += `|------|-------------|---------|-------------|---------------------|---------------|------------------|---------|--------------|\n`;

  plugins.forEach(plugin => {
    const pluginLink = `https://www.npmjs.com/package/${plugin.name}`;

    const homebridgeVersion = plugin.engines.homebridge || "N/A";
    const nodeVersion = plugin.engines.node || "N/A";

    // const homebridgeCompatible = semver.gte(homebridgeVersion, HOMEBRIDGE_VERSION_CHECK);
    // const nodeCompatible = semver.gte(nodeVersion, NODE_VERSION_CHECK);

    markdownContent += `| [${plugin.name}](${pluginLink}) | ${plugin.description} | ${plugin.version} | ${plugin.owner} | ${escapePipe(homebridgeVersion)} | ${escapePipe(nodeVersion)} | ${isHomebridgeCompatible(plugin)} |  ${formatDate(plugin.created)} | ${formatDate(plugin.lastUpdated)} |\n`;
  });

  return markdownContent;
}

function createSummary(plugins) {
  const summary = {};

  plugins.forEach(plugin => {

    if (!summary[plugin.owner]) {
      summary[plugin.owner] = {
        pluginCount: 0,
        compatibleCount: 0,
      };
    }
    summary[plugin.owner].pluginCount += 1;

    if (isHomebridgeCompatible(plugin) === 'supported') {
      summary[plugin.owner].compatibleCount += 1;
    }

  });
  return summary;
}

// Generate summary report by owner
function generateSummaryReport(plugins) {
  // Create an array from the summary object and sort by owner name
  const sortedSummary = Object.entries(createSummary(plugins)).sort(([ownerA], [ownerB]) => {
    return ownerA.localeCompare(ownerB);
  });

  let reportContent = `# Summary Report by owner\n\n`;
  reportContent += `| owner | Total Plugins | Homebridge 2.0 Ready |\n`;
  reportContent += `|-------------|---------------|-------------------|\n`;

  sortedSummary.forEach(([owner, counts]) => {
    reportContent += `| ${owner} | ${counts.pluginCount} | ${counts.compatibleCount} |\n`;
  });

  return reportContent;
}

// Generate summary report sorted by owner
function generateSummaryReportByOwner(plugins) {

  // Create an array from the summary object and sort by owner name
  const sortedSummary = Object.entries(createSummary(plugins)).sort(([ownerA], [ownerB]) => {
    return ownerA.localeCompare(ownerB);
  });

  let reportContent = `# Summary Report by owner\n\n`;
  reportContent += `| owner | Total Plugins | Homebridge 2.0 Ready |\n`;
  reportContent += `|-------------|---------------|-------------------|\n`;

  sortedSummary.forEach(([owner, counts]) => {
    reportContent += `| ${owner} | ${counts.pluginCount} | ${counts.compatibleCount} |\n`;
  });

  return reportContent;
}

// Generate summary report sorted by plugin count
function generateSummaryReportByPluginCount(plugins) {

  // Create an array from the summary object and sort by plugin count (descending)
  const sortedSummary = Object.entries(createSummary(plugins)).sort(([, countsA], [, countsB]) => {
    return countsB.pluginCount - countsA.pluginCount;
  });

  let reportContent = `# Summary Report by Plugin Count\n\n`;
  reportContent += `| owner | Total Plugins | Homebridge 2.0 Ready |\n`;
  reportContent += `|-------------|---------------|-------------------|\n`;

  sortedSummary.forEach(([owner, counts]) => {
    reportContent += `| ${owner} | ${counts.pluginCount} | ${counts.compatibleCount} |\n`;
  });

  return reportContent;
}

// Generate summary report sorted by compatible count
function generateSummaryReportByCompatibleCount(plugins) {

  // Create an array from the summary object and sort by compatible count (descending)
  const sortedSummary = Object.entries(createSummary(plugins)).sort(([, countsA], [, countsB]) => {
    return countsB.compatibleCount - countsA.compatibleCount;
  });

  let reportContent = `# Summary Report by Homebridge 2.0 Ready Count\n\n`;
  reportContent += `| owner | Total Plugins | Homebridge 2.0 Ready |\n`;
  reportContent += `|-------------|---------------|-------------------|\n`;

  sortedSummary.forEach(([owner, counts]) => {
    reportContent += `| ${owner} | ${counts.pluginCount} | ${counts.compatibleCount} |\n`;
  });

  return reportContent;
}

function generateFinalSummaryReport(plugins) {
  const totalPlugins = plugins.length;
  let compatibleCount = 0;

  plugins.forEach(plugin => {
    const homebridgeVersion = plugin.engines.homebridge || "0.0.0";
    if (isHomebridgeCompatible(plugin) === 'supported') {
      compatibleCount += 1;
    }
  });

  let reportContent = `# Homebridge 2.0 Ready Report\n\n`;
  reportContent += `| Total Plugins | Homebridge 2.0 Ready |\n`;
  reportContent += `|----------------|--------------------|\n`;
  reportContent += `| ${totalPlugins} | ${compatibleCount} |\n`;

  return reportContent;
}


// Main function to read data and generate Markdown
async function readAndGenerateMarkdown() {
  const jsonData = fs.readFileSync('../homebridge_plugins.json', 'utf8');
  const plugins = JSON.parse(jsonData);

  // Generate Markdown content
  const markdownContent = generateMarkdown(plugins);

  // Write to a Markdown file
  fs.writeFileSync('../homebridge_plugins.md', markdownContent);
  console.log('Markdown file created: homebridge_plugins.md');

  // Generate summary report
  const summaryReport = generateSummaryReport(plugins);
  fs.writeFileSync('../homebridge_plugins_summary.md', summaryReport);
  console.log('Summary report created: homebridge_plugins_summary.md');

  // Generate summary reports
  const summaryReportByowner = generateSummaryReportByOwner(plugins);
  fs.writeFileSync('../homebridge_plugins_summary.md', summaryReportByowner);
  console.log('Summary report by owner created: homebridge_plugins_summary.md');

  const summaryReportByPluginCount = generateSummaryReportByPluginCount(plugins);
  fs.writeFileSync('../homebridge_plugins_summary_by_plugin_count.md', summaryReportByPluginCount);
  console.log('Summary report by plugin count created: homebridge_plugins_summary_by_plugin_count.md');

  const summaryReportByCompatibleCount = generateSummaryReportByCompatibleCount(plugins);
  fs.writeFileSync('../homebridge_plugins_summary_by_compatible_count.md', summaryReportByCompatibleCount);
  console.log('Summary report by compatible count created: homebridge_plugins_summary_by_compatible_count.md');

  // Generate final summary report
  const finalSummaryReport = generateFinalSummaryReport(plugins);
  fs.writeFileSync('../homebridge_plugins_final_summary.md', finalSummaryReport);
  console.log('Final summary report created: homebridge_plugins_final_summary.md');
}

readAndGenerateMarkdown();
