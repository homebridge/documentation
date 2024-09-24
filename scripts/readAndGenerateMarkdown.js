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
  markdownContent += `| Name | Description | Version | Maintainers | Homebridge Version | Node Version | Homebridge 2.0 Ready |  Created | Last Updated |\n`;
  markdownContent += `|------|-------------|---------|-------------|---------------------|---------------|------------------|---------|--------------|\n`;

  plugins.forEach(plugin => {
    const pluginLink = `https://www.npmjs.com/package/${plugin.name}`;

    const homebridgeVersion = plugin.engines.homebridge || "N/A";
    const nodeVersion = plugin.engines.node || "N/A";

    // const homebridgeCompatible = semver.gte(homebridgeVersion, HOMEBRIDGE_VERSION_CHECK);
    // const nodeCompatible = semver.gte(nodeVersion, NODE_VERSION_CHECK);

    markdownContent += `| [${plugin.name}](${pluginLink}) | ${plugin.description} | ${plugin.version} | ${plugin.maintainers.join(', ')} | ${escapePipe(homebridgeVersion)} | ${escapePipe(nodeVersion)} | ${isHomebridgeCompatible(plugin)} |  ${formatDate(plugin.created)} | ${formatDate(plugin.lastUpdated)} |\n`;
  });

  return markdownContent;
}

// Generate summary report by maintainer
function generateSummaryReport(plugins) {
  const summary = {};

  plugins.forEach(plugin => {
    plugin.maintainers.forEach(maintainer => {
      if (!summary[maintainer]) {
        summary[maintainer] = {
          pluginCount: 0,
          compatibleCount: 0,
        };
      }
      summary[maintainer].pluginCount += 1;

      if (isHomebridgeCompatible(plugin) === 'supported') {
        summary[maintainer].compatibleCount += 1;
      }
    });
  });

  // Create an array from the summary object and sort by maintainer name
  const sortedSummary = Object.entries(summary).sort(([maintainerA], [maintainerB]) => {
    return maintainerA.localeCompare(maintainerB);
  });

  let reportContent = `# Summary Report by Maintainer\n\n`;
  reportContent += `| Maintainer | Total Plugins | Homebridge 2.0 Ready |\n`;
  reportContent += `|-------------|---------------|-------------------|\n`;

  sortedSummary.forEach(([maintainer, counts]) => {
    reportContent += `| ${maintainer} | ${counts.pluginCount} | ${counts.compatibleCount} |\n`;
  });

  return reportContent;
}

// Generate summary report sorted by maintainer
function generateSummaryReportByMaintainer(plugins) {
  const summary = {};

  plugins.forEach(plugin => {
      plugin.maintainers.forEach(maintainer => {
          if (!summary[maintainer]) {
              summary[maintainer] = {
                  pluginCount: 0,
                  compatibleCount: 0,
              };
          }
          summary[maintainer].pluginCount += 1;

          if (isHomebridgeCompatible(plugin) === 'supported') {
            summary[maintainer].compatibleCount += 1;
          }
      });
  });

  // Create an array from the summary object and sort by maintainer name
  const sortedSummary = Object.entries(summary).sort(([maintainerA], [maintainerB]) => {
      return maintainerA.localeCompare(maintainerB);
  });

  let reportContent = `# Summary Report by Maintainer\n\n`;
  reportContent += `| Maintainer | Total Plugins | Homebridge 2.0 Ready |\n`;
  reportContent += `|-------------|---------------|-------------------|\n`;

  sortedSummary.forEach(([maintainer, counts]) => {
      reportContent += `| ${maintainer} | ${counts.pluginCount} | ${counts.compatibleCount} |\n`;
  });

  return reportContent;
}

// Generate summary report sorted by plugin count
function generateSummaryReportByPluginCount(plugins) {
  const summary = {};

  plugins.forEach(plugin => {
      plugin.maintainers.forEach(maintainer => {
          if (!summary[maintainer]) {
              summary[maintainer] = {
                  pluginCount: 0,
                  compatibleCount: 0,
              };
          }
          summary[maintainer].pluginCount += 1;

          if (isHomebridgeCompatible(plugin) === 'supported') {
            summary[maintainer].compatibleCount += 1;
          }
      });
  });

  // Create an array from the summary object and sort by plugin count (descending)
  const sortedSummary = Object.entries(summary).sort(([, countsA], [, countsB]) => {
      return countsB.pluginCount - countsA.pluginCount;
  });

  let reportContent = `# Summary Report by Plugin Count\n\n`;
  reportContent += `| Maintainer | Total Plugins | Homebridge 2.0 Ready |\n`;
  reportContent += `|-------------|---------------|-------------------|\n`;

  sortedSummary.forEach(([maintainer, counts]) => {
      reportContent += `| ${maintainer} | ${counts.pluginCount} | ${counts.compatibleCount} |\n`;
  });

  return reportContent;
}

// Generate summary report sorted by compatible count
function generateSummaryReportByCompatibleCount(plugins) {
  const summary = {};

  plugins.forEach(plugin => {
      plugin.maintainers.forEach(maintainer => {
          if (!summary[maintainer]) {
              summary[maintainer] = {
                  pluginCount: 0,
                  compatibleCount: 0,
              };
          }
          summary[maintainer].pluginCount += 1;

          if (isHomebridgeCompatible(plugin) === 'supported') {
            summary[maintainer].compatibleCount += 1;
          }
      });
  });

  // Create an array from the summary object and sort by compatible count (descending)
  const sortedSummary = Object.entries(summary).sort(([, countsA], [, countsB]) => {
      return countsB.compatibleCount - countsA.compatibleCount;
  });

  let reportContent = `# Summary Report by Homebridge 2.0 Ready Count\n\n`;
  reportContent += `| Maintainer | Total Plugins | Homebridge 2.0 Ready |\n`;
  reportContent += `|-------------|---------------|-------------------|\n`;

  sortedSummary.forEach(([maintainer, counts]) => {
      reportContent += `| ${maintainer} | ${counts.pluginCount} | ${counts.compatibleCount} |\n`;
  });

  return reportContent;
}


// Main function to read data and generate Markdown
async function readAndGenerateMarkdown() {
  const jsonData = fs.readFileSync('homebridge_plugins.json', 'utf8');
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
  const summaryReportByMaintainer = generateSummaryReportByMaintainer(plugins);
  fs.writeFileSync('../homebridge_plugins_summary.md', summaryReportByMaintainer);
  console.log('Summary report by maintainer created: homebridge_plugins_summary.md');

  const summaryReportByPluginCount = generateSummaryReportByPluginCount(plugins);
  fs.writeFileSync('../homebridge_plugins_summary_by_plugin_count.md', summaryReportByPluginCount);
  console.log('Summary report by plugin count created: homebridge_plugins_summary_by_plugin_count.md');

  const summaryReportByCompatibleCount = generateSummaryReportByCompatibleCount(plugins);
  fs.writeFileSync('../homebridge_plugins_summary_by_compatible_count.md', summaryReportByCompatibleCount);
  console.log('Summary report by compatible count created: homebridge_plugins_summary_by_compatible_count.md');
}

readAndGenerateMarkdown();
