const chrome = require("chrome-aws-lambda");
const cheerio = require('cheerio');
const fs = require('fs');

export default async function handler(req, res) {
  let query = req.query;

  const options = {
    //args: chrome.args,
    executablePath: await chrome.executablePath,
   // headless: chrome.headless,
  };

  try {
    const browser = await chrome.puppeteer.launch(options);

    const page = await browser.newPage();

    await page.goto('https://www.job-maldives.com/', {waitUntil: 'load', timeout: 0});
    //await page.waitForTimeout(2000);
    //getting access to the raw HTML
    const pageData = await page.evaluate(() => {
        return {
        html: document.documentElement.innerHTML,
        };
    });
    let data = { jobPosts: [] }
    let title;
    let date;
    let link;
    //parsing the HTML and picking our elements
    const $ = cheerio.load(pageData.html);
    let alljobs = $('.recent-posts-list');
        alljobs.each((index, element) => {
        title = $(element).find('div.recent-post-title a').text();
        link = $(element).find('div.recent-post-title a').attr('href');
        date = $(element).find('div.recent-posts-details').text();
        
    data.jobPosts.push({
        'title': title,
        'date': date,
        'link': link
        })
    }); 

    fs.writeFile('./json/jobs.json',  JSON.stringify(data.jobPosts), function(err) {
        if (err) {
            console.log(err);
        }
    });
    await browser.close();
    res.status(200).json(data);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
 