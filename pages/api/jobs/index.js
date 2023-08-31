const puppeteer = require("puppeteer");
const cheerio = require('cheerio');
const fs = require('fs');

export default async function handler(req, res) {
  // const options = {
  //   //args: chrome.args,
  //   executablePath: await puppeteer.executablePath,
  //  // headless: chrome.headless,
  // };

  try {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.goto('https://www.job-maldives.com/', {waitUntil: 'load', timeout: 0});
    //await page.waitForTimeout(2000);
    //getting access to the raw HTML
    const pageData = await page.evaluate(() => {
        return {
        html: document.documentElement.innerHTML,
        };
    });
    let data = [];
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
        // let newlink = link.replace('https://www.jobmaldives.com/2023/', '');

        data.push({
            'title': title,
            'date': date,
            'link': link.replace('https://www.jobmaldives.com/2023/', '')
            })
      }); 

    fs.writeFile('./json/jobs.json',  JSON.stringify(data), function(err) {
        if (err) {
            console.log(err);
        }
    });
    await browser.close();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
}
