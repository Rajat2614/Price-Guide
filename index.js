const { SourceMap } = require("module");
const { type } = require("os");
const { mainModule } = require("process");
const puppeteer = require("puppeteer");

const scrap = require("./main");

const loginLink = "https://www.amazon.in";
const productName = "Iphone 13 Starlight 128gb";

let page;
let browserOpen = puppeteer.launch({
    headless: true,
    slowMo: true,
    defaultViewport: null,
    args: ["--start-maximized"]
});

browserOpen
    .then(function (browserObj) {
        let browserOpenPromise = browserObj.newPage();
        return browserOpenPromise;
    }).then(function (newTab) {
        // open google on new page
        page = newTab;
        let openAmazon = newTab.goto(loginLink);
        return openAmazon;
    }).then(function () {
        let productEntered = page.type("input[id='twotabsearchtextbox']", productName, { delay: 50 });
        return productEntered;
    }).then(function () {
        return waitAndClick("input[type='submit']", page);
    }).then(function () {
        let waitFor3Seconds = page.waitForTimeout(3000);
        return waitFor3Seconds;
    }).then(function () {
        //console.log(page.url());
        scrap(page.url());
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