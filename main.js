const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");

//const getIssues = require("./issues")

// function hello(link){
//     url = link;
// }

function scrapping(url){

    request(url, cb);

    function cb(error, response, html) {
        if (error) {
            console.log(error);
        }
        else {
            getTopicLinks(html);
        //console.log(html);
        }
    }

    function getTopicLinks(html) {
        let $ = cheerio.load(html);

        let linkElemArr = $(".a-size-medium.a-color-base.a-text-normal");
        let pricesArr = $(".a-price-whole");
        let ratingArr = $(".a-icon-alt");
        let reviewArr = $(".a-size-base.puis-light-weight-text.s-link-centralized-style");
        let orgPriceArr = $(".a-price.a-text-price .a-offscreen");

        for (let i = 0; i < linkElemArr.length; i++) {
            let href = $(linkElemArr[i]).text();
            let price = $(pricesArr[i]).text();
            let rating = $(ratingArr[i]).text();
            let reviews = $(reviewArr[i]).text();
            let orginalPrice = $(orgPriceArr[i]).text();
            console.log(`Product : ${href}  Price : ${price}  Rating : ${rating} Reviews : ${reviews} Original Price : ${orginalPrice}`);
            // let topicLink = "https://github.com" + href;
            // let topic = href.split("/").pop();
            // GetRepo(topicLink, topic);
        }
    }
}

module.exports = scrapping;

// function GetRepo(link, topic) {
//     request(link, cb);
//     function cb(error, response, html) {
//         if (error) { console.log(error); }
//         else { gitFiles(html, topic); }
//     }
// }

// function gitFiles(html, topic) {
//     let $ = cheerio.load(html);
//     let linkArr = $(".color-fg-muted.text-normal.lh-condensed");
//     //console.log(topic);
//     for (let i = 0; i < 8; i++) {
//         let twoAnchors = $(linkArr[i]).find("a");
//         let href = ($(twoAnchors[1]).attr("href"));
//         let fileLink = `https://github.com${href}/issues`;
//         //console.log(href);
//         //console.log(fileLink);
//         let repoName = href.split("/").pop();
//         getIssues(fileLink, topic,repoName);
//     }
//     //console.log("'''''''''''''''''''''''''''''''''''''''''''''''''''''");
// }

