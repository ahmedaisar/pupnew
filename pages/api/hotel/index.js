import StealthPlugin from "puppeteer-extra-plugin-stealth";
import puppeteer from "puppeteer-extra";
puppeteer.use(StealthPlugin());

export default async function handler(req, res) {
  let query = req.query;
  const { hotelid, checkin, checkout, rooms } = query;
  const browser = await puppeteer.launch({
    headless: true,
    ignoreDefaultArgs: ["--disable-extensions"],
  });

  const page = await browser.newPage();

  await page.goto(
    `https://hotelscan.com/combiner/${hotelid}?pos=zz&locale=en&checkin=${checkin}&checkout=${checkout}&rooms=${rooms}&mobile=0&loop=1&country=MV&ef=1&geoid=xmmmamtksdxx&toas=resort&availability=1&deviceNetwork=4g&deviceCpu=20&deviceMemory=8&limit=25&offset=0`,
    {
      waitUntil: "networkidle2",
    }
  );
  //await page.waitForTimeout(2000);
  let html = await page.evaluate(() => {
    return JSON.parse(document.querySelector("body").innerText);
  });
  await browser.close();
  //return html;
  res.status(200).json(html);
}
