'use strict';

const webdriver = require("selenium-webdriver");
const by = webdriver.By;
const Util = require("./support/util.js");

jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;

describe('Lego', () => {

    let browser;

    beforeAll(() => {
        browser = new Util();
    });

    afterAll(() => {
        browser.quit();
    });

    describe('products page', () => {

        beforeEach(async () => {
            await browser.getProductPage();
        });

        it('should contain word LEGO in title', async () => {
            const title = await browser.getTitle();
            return expect(title).toContain("LEGO");//
        });

        it('should have 4 navigation buttons', async() => {
            const numberOfNavButtons = await browser.findElements(by.className('nav__title'));
            let i = 0;
            numberOfNavButtons.forEach(function() {
                i++;
            });
            expect(i).toBe(4);
        });
    });

    describe('homepage', () => {

        beforeEach(async () => {
            await browser.getHomepage();
        });

        it('should have a correct title', async() => {
            const title = await browser.getTitle();
            expect(title).toEqual('LEGO.com US - Inspire and develop the builders of tomorrow');
        });

        it('should have main logo with correct link in it', async() => {
            const mainLogoLink = await browser.findElement(by.className('l-gh__logo  l-logo')).getAttribute('href');
            expect(mainLogoLink).toEqual('https://www.lego.com/en-us');
        });

        it('should have login link', async() => {
            const textInLogInLink = await browser.findElement(by.css('div.links > a')).getAttribute('text');
            expect(textInLogInLink).toEqual('Log in');
        });

        it('should go to russian version', async() => {
            await browser.findElement(by.className('l-select')).click();
            await browser.findElement(by.xpath('//a[contains(text(),\'Россия (Русский)\')]')).click();
            const title = await browser.getTitle();
            expect(title).toEqual('LEGO.com RU — Вдохновлять и учить строителей будущего.');
        });

        it('should have 7 main buttons', async() => {
            const numberOfHeaderButtons = await browser.findElements(by.className('l-nav__link'));
            let i = 0;
            numberOfHeaderButtons.forEach(function() {
                i++;
            });
            expect(i).toBe(7);
        });

       it('should open products link', async() => {
            await browser.clickLink('PRODUCTS');
            const title = await browser.getTitle();
            expect(title).toEqual('Products - LEGO.com US');
        });

        it('should have go right button', async() => {
            const isButtonPresent = await browser.findElement(by.className('mainstage__btn-icon icon icon-angle-right'));
            expect(isButtonPresent).toBeTruthy();
        });

        it('should have go left button', async() => {
            const isButtonPresent = await browser.findElement(by.className('mainstage__btn mainstage__btn--prev'));
            expect(isButtonPresent).toBeTruthy();
        });
    });
})


