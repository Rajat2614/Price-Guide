const { SourceMap } = require("module");
const { type } = require("os");
const { mainModule } = require("process");
const puppeteer = require("puppeteer");

const scrapAmzn = require("./AmazonScrap/amazonmain");
const scrapCroma = require("./CromaScrap/cromamain");

const amazonLink = "https://www.amazon.in";
const cromaLink = "https://www.croma.com";
const productName = "Redmi Note 9";

let page1, page2;
let browserOpen = puppeteer.launch({
    headless: false,
    slowMo: true,
    defaultViewport: null,
    args: ["--start-maximized"]
});

// browserOpen
//     .then(function (browserObj) {
//         let browserOpenPromise = browserObj.newPage();
//         return browserOpenPromise;
//     }).then(function (newTab) {
//         // open google on new page
//         page1 = newTab;
//         let opencroma = newTab.goto(cromaLink);
//         return openAmazon;
//     }).then(function () {
//         let productEntered = page1.type("input[id='twotabsearchtextbox']", productName, { delay: 50 });
//         return productEntered;
//     }).then(function () {
//         return waitAndClick("input[type='submit']", page1);
//     }).then(function () {
//         let waitFor3Seconds = page1.waitForTimeout(3000);
//         return waitFor3Seconds;
//     }).then(function () {
//         //console.log(page.url());
//         scrapAmzn(page1.url());
//     }).then(function(){
//         return page1.close();
//     })

    
    browserOpen
    .then(function (browserObj) {
        let browserOpenPromise = browserObj.newPage();
        return browserOpenPromise;
    }).then(function (newTab) {
        // open Croma on new page
        page2 = newTab;
        let openCroma = newTab.goto(cromaLink);
        return openCroma;
    }).then(function () {
        let productEntered = page2.type("input[id='search']", productName, { delay: 50 });
        return productEntered;
    }).then(function () {
        let EnterisPressed = page2.keyboard.press("Enter");
        return EnterisPressed;
    }).then(function () {
        let waitFor3Seconds = page2.waitForTimeout(3000);
        return waitFor3Seconds;
    }).then(function () {
        //console.log(page.url());
        scrapCroma(page2.url());
    }).then(function(){
        return page2.close();
    })

    function waitAndClick(selector, cPage) {
        return new Promise(function (resolve, reject) {
            let waitPromise = cPage.waitForSelector(selector);
            waitPromise.then(function () {
                let clickModal = cPage.click(selector, { delay: 50 });
                return clickModal;
            }).then(function () {
                resolve();
            }).catch(function (err) {
                reject();
            })
        })
    }