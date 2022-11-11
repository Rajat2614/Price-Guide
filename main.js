const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");

const getIssues = require("./issue");

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

        for (let i = 0; i < prodNameArr.length; i++) {
            let prodName = $(prodNameArr[i]).text();
            let price = $(pricesArr[i]).text();
            let rating = $(ratingArr[i]).text();
            let reviews = $(reviewArr[i]).text();
            let orginalPrice = $(orgPriceArr[i]).text();
            if(prodName.search("Apple iPhone 13") != -1 ){

                if(orginalPrice == ""){
                    orginalPrice = price;
                }
                else{
                    orginalPrice = orginalPrice.slice(1);
                }
                
                getIssues(prodName,price,rating,reviews,orginalPrice);
                console.log(`Product : ${prodName}  Price : ${price}  Rating : ${rating} Reviews : ${reviews} Original Price : ${orginalPrice}`);
            }       
        }
    }
}

module.exports = scrapping;


