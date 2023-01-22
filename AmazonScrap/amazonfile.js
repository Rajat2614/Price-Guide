const fs = require("fs");
const path = require("path");
const { Parser } = require("json2csv");


let data = [];

function getDetailsamzn($,prodNameArr,pricesArr,ratingArr,orgPriceArr,productName) {
    //getIssueLink(prodName,price,rating,reviews,orginalPrice);

    for (let i = 0; i < prodNameArr.length; i++) {
        let prodName = $(prodNameArr[i]).text();
        let price = $(pricesArr[i]).text();
        let rating = $(ratingArr[i]).text();
        let orgPrice = $(orgPriceArr[i]).text();
        if(prodName.search(productName) != -1 ){

            prodName = prodName.slice(0,prodName.search("-"));
            prodName = prodName.replaceAll(","," ");
            rating = rating.slice(0,rating.search("out")-1);
            if(orgPrice == ""){
                orgPrice = price;
            }
            if(orgPrice.search("₹") != -1){
                orgPrice = orgPrice.slice(1);
            }
            console.log(typeof(price));
            if(price != ""){
                price = price.replace(",","");
                orgPrice = orgPrice.replace(",","");
                data.push({"Product Name" : prodName,"OrgPrice" : parseInt(orgPrice) ,"Price" : parseInt(price), "Rating" : rating});
            }
            
            //console.log(`Product : ${prodName}  Price : ${price}  Rating : ${rating} Reviews : ${reviews} Original Price : ${orginalPrice}`);
        }       
    }
    
    saveData(data);

    function saveData(data) {
        
        let folderpath = path.join(__dirname,"Amazon");
        dirCreator(folderpath);
        let filepath = path.join(folderpath, "graph.csv");

        let text = new Parser({fields: ["Product Name", "OrgPrice", "Price", "Rating"]}).parse(data);
        fs.writeFileSync(filepath,text);
    }

}

module.exports = getDetailsamzn

function dirCreator(folderpath) {
    if (fs.existsSync(folderpath) == false) {
        fs.mkdirSync(folderpath);
    }
}

