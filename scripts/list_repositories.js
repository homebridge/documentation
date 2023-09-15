const https = require('https');

let url = "https://api.github.com/orgs/Homebridge/repos";

let headers = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Safari/605.1.15'
};

https.get(url, { headers: headers }, (res) => {
  let body = "";

  res.on("data", (chunk) => {
    body += chunk;
  });

  res.on("end", () => {
    try {
      let repositories = JSON.parse(body);
      // do something with JSON


      //  let markdownTable = '| Repository | Description | Last Updated | Status | Publish Instructions |\n|------------|-------------|-------------|-------------|-------------|\n';
      let markdownTable = '| Repository | Status | Publish Instructions |\n|------------|-------------|-------------|-------------|-------------|\n';

      for (const repo of repositories) {
      //  markdownTable += `| [${repo.name}](${repo.html_url}) | ${repo.description || ''} | ${repo.updated_at || ''} |\n`;
        markdownTable += `| [${repo.name}](${repo.html_url}) |\n`;
      }

      console.log(markdownTable);


    } catch (error) {
      console.error(error.message);
    };
  });

}).on("error", (error) => {
  console.error(error.message);
});