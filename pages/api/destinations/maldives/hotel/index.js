//const chrome = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium-min");

export default async function handler(req, res) {
  let query = req.query;
  const { hotelid, checkin, checkout, rooms } = query;

  // const options = {
  //   args: chrome.args,
  //   executablePath: await chrome.executablePath,
  //   headless: chrome.headless,
  // };

  try {
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();

    await page.goto(
      `https://hotelscan.com/combiner/${hotelid}?pos=zz&locale=en&checkin=${checkin}&checkout=${checkout}&rooms=${rooms}&mobile=0&loop=1&country=MV&ef=1&geoid=xmmmamtksdxx&toas=resort&availability=1&deviceNetwork=4g&deviceCpu=20&deviceMemory=8&limit=25&offset=0`,
      {
        waitUntil: "load",
      }
    );
    await page.waitForTimeout(500);
    let html = await page.evaluate(() => {
      let body = document.querySelector("body").innerText;
      let pre = document.querySelector("pre").innerHTML;
      return JSON.parse(body);
    });
    await browser.close();
    res.status(200).json(html);
    console.log(html);
  } catch (error) {
    console.log(error);
  }
}
