const fs = require("fs");
const path = require("path");
const pdfkit = require("pdfkit");

function getDetailsamzn($,prodNameArr,pricesArr,ratingArr,reviewArr,orgPriceArr) {
    //getIssueLink(prodName,price,rating,reviews,orginalPrice);

    for (let i = 0; i < prodNameArr.length; i++) {
        let prodName = $(prodNameArr[i]).text();
        let price = $(pricesArr[i]).text();
        let rating = $(ratingArr[i]).text();
        let review = $(reviewArr[i]).text();
        let orgPrice = $(orgPriceArr[i]).text();
        if(prodName.search("Redmi Note 9") != -1 ){

            if(orgPrice == ""){
                orgPrice = price;
            }
            else{
                orgPrice = orgPrice.slice(1);
            }
            saveData(prodName,price,rating,review,orgPrice);
            //console.log(`Product : ${prodName}  Price : ${price}  Rating : ${rating} Reviews : ${reviews} Original Price : ${orginalPrice}`);
        }       
    }
    

    function saveData(prodName,price,rating,review,orgPrice) {
        let arr = [];
        arr.push(`Product : ${prodName} Price : ${orgPrice} Discounted Price : ${price} Rating : ${rating} Reviews : ${review}`);
        
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

module.exports = getDetailsamzn

function dirCreator(folderpath) {
    if (fs.existsSync(folderpath) == false) {
        fs.mkdirSync(folderpath);
    }
}

