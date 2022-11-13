const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");

const getDetails = require("./amazonfile");

function scrapping(url){

    request(url, cb);

    function cb(error, response, html) {
        if (error) {
            console.log(error);
        }
        else {
            getTopicLinks(html);
        }
    }

    function getTopicLinks(html) {
        let $ = cheerio.load(html);

        let prodNameArr = $(".a-size-medium.a-color-base.a-text-normal");
        let pricesArr = $(".a-price-whole");
        let ratingArr = $(".a-icon-alt");
        let reviewArr = $(".a-size-base.puis-light-weight-text.s-link-centralized-style");
        let orgPriceArr = $(".a-price.a-text-price .a-offscreen");
        getDetails($,prodNameArr,pricesArr,ratingArr,reviewArr,orgPriceArr);

    }
    
}

module.exports = scrapping;


