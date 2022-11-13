const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");

const getDetails = require("./cromafile");

function scrappingCroma(url){

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

//        productname:"product-title plp-prod-title"
//        orgPriceArr: 'class-amount, id-old-price"
//        price: span->class-old-price, data_test_id = new-price
//        ratings and reviews: div tag -> class: cp-rating plp-ratings ratings-plp-line, 

        console.log($.text());

        // let prodNameArr = $(".product-title.plp-prod-title");
        // let pricesArr = $("span[data_testid='new-price']");
        // let ratingArr = $(".cp-rating.plp-ratings.ratings-plp-line");
        // let reviewArr = $(".cp-rating.plp-ratings.ratings-plp-line");
        // let orgPriceArr = $("span[data_testid='old-price']");
        // //getDetails($,prodNameArr,pricesArr,ratingArr,reviewArr,orgPriceArr);
        // for(let i=0;i<prodNameArr.length;i++){
        //     console.log(`Porduct : ${prodNameArr[i]} Old Price : ${orgPriceArr} New Price : ${pricesArr} Rating : ${ratingArr}`);
        // }
    }
    
}

module.exports = scrappingCroma;


