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
  isHomebridgeCompatible = hbEngines.some((x) => (x.startsWith('^2') || x.startsWith('>=2'))) ? 'supported' : isHomebridgeCompatible;
  return isHomebridgeCompatible;
}

// Function to generate Markdown for the plugins list, including downloads
function generateMarkdown(plugins) {
  let markdownContent = `# Homebridge Plugins List\n\n`;
  markdownContent += `| Name | Description | Version | owner | Homebridge Version | Node Version | Homebridge 2.0 Ready | Downloads | Created | Last Updated |\n`;
  markdownContent += `|------|-------------|---------|-------------|---------------------|---------------|------------------|-----------|---------|--------------|\n`;

  plugins.forEach(plugin => {
    const pluginLink = `https://www.npmjs.com/package/${plugin.name}`;

    const homebridgeVersion = plugin.engines.homebridge || "N/A";
    const nodeVersion = plugin.engines.node || "N/A";
    const downloads = plugin.downloads || "N/A"; // Include downloads

    markdownContent += `| [${plugin.name}](${pluginLink}) | ${plugin.description} | ${plugin.version} | ${plugin.owner} | ${escapePipe(homebridgeVersion)} | ${escapePipe(nodeVersion)} | ${isHomebridgeCompatible(plugin)} | ${downloads} | ${formatDate(plugin.created)} | ${formatDate(plugin.lastUpdated)} |\n`;
  });

  return markdownContent;
}

// Function to create a summary report for the plugins by owner
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

// Generate summary report sorted by owner
function generateSummaryReportByOwner(plugins) {
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

// Generate summary report sorted by Homebridge 2.0 ready count
function generateSummaryReportByCompatibleCount(plugins) {
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

// Generate a final summary report for Homebridge 2.0 readiness
function generateFinalSummaryReport(plugins) {
  const totalPlugins = plugins.length;
  let compatibleCount = 0;

  plugins.forEach(plugin => {
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

// Main function to read data, generate markdown, and summary reports
async function readAndGenerateMarkdown() {
  const jsonData = fs.readFileSync('../homebridge_plugins.json', 'utf8');
  const plugins = JSON.parse(jsonData);

  // Generate the main markdown report with downloads
  const markdownContent = generateMarkdown(plugins);
  fs.writeFileSync('../homebridge_plugins.md', markdownContent);
  console.log('Markdown file with downloads created: homebridge_plugins.md');

  // Generate the summary report by owner
  const summaryReportByOwner = generateSummaryReportByOwner(plugins);
  fs.writeFileSync('../homebridge_plugins_summary_by_owner.md', summaryReportByOwner);
  console.log('Summary report by owner created: homebridge_plugins_summary_by_owner.md');

  // Generate the summary report by plugin count
  const summaryReportByPluginCount = generateSummaryReportByPluginCount(plugins);
  fs.writeFileSync('../homebridge_plugins_summary_by_plugin_count.md', summaryReportByPluginCount);
  console.log('Summary report by plugin count created: homebridge_plugins_summary_by_plugin_count.md');

  // Generate the summary report by Homebridge 2.0 compatibility count
  const summaryReportByCompatibleCount = generateSummaryReportByCompatibleCount(plugins);
  fs.writeFileSync('../homebridge_plugins_summary_by_compatible_count.md', summaryReportByCompatibleCount);
  console.log('Summary report by compatible count created: homebridge_plugins_summary_by_compatible_count.md');

  // Generate the final summary report
  const finalSummaryReport = generateFinalSummaryReport(plugins);
  fs.writeFileSync('../homebridge_plugins_final_summary.md', finalSummaryReport);
  console.log('Final summary report created: homebridge_plugins_final_summary.md');
}

readAndGenerateMarkdown();
