const request = require('request-promise');
const cheerio = require('cheerio');

async function main(){
    const html = await request.get(
        "https://codingwithstefan.com/table-example"
    );

    const $ = cheerio.load(html);

    let scrapedRows = [];

    $('body > table > tbody > tr').each((index, element)=>{
        if(index === 0) return true;

        const tds = $(element).find("td");
        const company = $(tds[0]).text();
        const contact = $(tds[1]).text();
        const country = $(tds[2]).text();
        scrapedRows.push({company, contact, country});
    });

    console.log(scrapedRows);
}
main();