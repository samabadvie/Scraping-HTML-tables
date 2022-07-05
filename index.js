const request = require("request-promise");
const cheerio = require("cheerio");

async function main() {
  const html = await request.get("https://codingwithstefan.com/table-example");

  const $ = cheerio.load(html);

  let scrapedRows = [];
  let tableHeaders = [];

  $("body > table > tbody > tr").each((index, element) => {
    if (index === 0) {
      const ths = $(element).find("th");
      ths.each((index, element) => {
        tableHeaders.push($(element).text().toLowerCase());
      });
      console.log(tableHeaders);
      return true;
    }

    const tds = $(element).find("td");
    let scrapeRow = {};

    tds.each((index, element) => {
      scrapeRow[tableHeaders[index]] = $(element).text();
    });
    scrapedRows.push(scrapeRow);
  });

  console.log(scrapedRows);
}
main();
