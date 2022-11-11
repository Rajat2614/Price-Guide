const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");
const path = require("path");
const pdfkit = require("pdfkit");

function getIssues(prodName,price,rating,reviews,orginalPrice) {
    //console.log(url);
    getIssueLink(prodName,price,rating,reviews,orginalPrice);
    // request(url, cb);
    // function cb(error, response, html) {
    //     if (error) {
    //         console.log(error);
    //     } else if (response.statusCode == 404) {
    //         console.log("Page Not Found");
    //     }
    //     else {
    //         getIssueLink(prodName,price,rating,reviews,orginalPrice);
    //     }
    // }

    function getIssueLink(prodName,price,rating,reviews,orginalPrice) {
        //let $ = cheerio.load(html);
        //let issueElemArr = $(".flex-auto.min-width-0.p-2.pr-3.pr-md-2").find(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
        //console.log(issueElemArr.length);
        let arr = [];
        // for (let i = 0; i < issueElemArr.length; i++) {
        //     let link = $(issueElemArr[i]).attr("href");
        //     //console.log(`https://github.com${link}`);
        //     arr.push("https://github.com" + link);
        // }
        //console.log(topic, "  ", repoName, "   ", arr);

    
        arr.push(`Product : ${prodName} Price : ${orginalPrice} Discounted Price : ${price} Rating : ${rating} Reviews : ${reviews}`);
        
        let folderpath = path.join(__dirname,"Amazon");
        dirCreator(folderpath);
        let filepath = path.join(folderpath,prodName+".pdf");
        let text = JSON.stringify(arr);
        let pdfDoc = new pdfkit();
        pdfDoc.pipe(fs.createWriteStream(filepath));
        pdfDoc.text(text);
        pdfDoc.end();

    }

}

module.exports = getIssues

function dirCreator(folderpath) {
    if (fs.existsSync(folderpath) == false) {
        fs.mkdirSync(folderpath);
    }
}