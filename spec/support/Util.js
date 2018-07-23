const webdriver = require("selenium-webdriver");
const by = webdriver.By;

class Util {

    constructor() {
        this.browser = this.createDriver();
    }

    createDriver() {
        const driver = new webdriver.Builder()
            .usingServer('http://localhost:4444/wd/hub')
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();
        driver.manage().timeouts().implicitlyWait(5000);
        driver.manage().window().maximize();
        return driver;
    }
    getProductPage(){
        return this.browser.get("https://www.lego.com/en-us/products");
    }

    getHomepage() {
        return this.browser.get("https://www.lego.com/en-us");
    }

    clickLink(text) {
        return this.browser.findElement(by.linkText(text)).click();
    }


    getTitle() {
        return this.browser.getTitle();
    }

    findElement(locator) {
        return this.browser.findElement(locator);
    }

    findElements(locator) {
        return this.browser.findElements(locator);
    }

    quit() {
        this.browser.quit();
    }
}

module.exports = Util;