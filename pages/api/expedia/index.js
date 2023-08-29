// const chrome = require("chrome-aws-lambda");

// export default async function handler(req, res) {
//   //   let query = req.query;
//   //   const { hotelid, checkin, checkout, rooms } = query;
//   //   const args = [
//   //     "--no-sandbox",
//   //     "--disable-setuid-sandbox",
//   //     "--disable-infobars",
//   //     "--window-position=0,0",
//   //     "--ignore-certifcate-errors",
//   //     "--ignore-certifcate-errors-spki-list",
//   //     '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"',
//   //   ];
//   const options = {
//     args: await chrome.args,
//     executablePath: await chrome.executablePath,
//     headless: await chrome.headless,
//   };

//   try {
//     const browser = await chrome.puppeteer.launch(options);

//     const page = await browser.newPage();
//     await page.setViewport({ width: 0, height: 0 });
//     await page.goto(
//       `https://www.expedia.com/Hotel-Search?adults=2&d1=2023-02-01&d2=2023-02-06&destination=Maldives&endDate=2023-02-06&latLong=3.202778%2C73.22068&regionId=109&rooms=1&semdtl=&sort=RECOMMENDED&startDate=2023-02-01&theme=&useRewards=false&userIntent=`,
//       {
//         waitUntil: "networkidle2",
//       }
//     );
//     // await page.waitForTimeout(3000);
//     let xhrCatcher = await page.waitForResponse((r) =>
//       r.request().url().includes("https://www.expedia.com/graphql")
//     );

//     let xhrResponse = await xhrCatcher;

//     let xhrPayload = await xhrResponse.json();
//     console.log("xhrPayload", xhrPayload);

//     await browser.close();
//     res.status(200).json(xhrPayload);
//   } catch (error) {
//     console.log(error);
//   }
//   // await page.type('#input-auto-complete > input[type="text"]', "Maldives");
//   // await page.click(
//   //   '.SearchFormFlyout_formWrapper__CLXm > input[type="submit"]'
//   // );
//   // await page.waitForTimeout(5000);
//   // const [response] = await Promise.all([
//   //   page.waitForResponse((res) =>
//   //     res.url().includes("/graphql?infoSlideoutQuery")
//   //   ),
//   // ]);
//   // const jsondata = await response.json();
//   // let jsn;

//   // await page.on("response", async (res) => {
//   //   if (res) {
//   //     page.waitForResponse((res) => res.url().includes("/graphql"));
//   //   }
//   //   console.log(await res.json());
//   // });
// }
