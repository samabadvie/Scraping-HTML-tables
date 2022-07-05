const request = require('request-promise');
const cheerio = require('cheerio');

async function main(){
    const html = await request.get(
        "https://codingwithstefan.com/table-example"
    );

    const $ = cheerio.load(html);

    $('body > table > tbody > tr > td').each((index, element)=>{
        console.log($(element).text());
    });
}
main();