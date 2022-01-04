const csv = require("csv-parser");
const puppeteer = require("puppeteer");
const fs = require("fs");
const fetch = require("node-fetch");
const results = [];

//Opens all tabs so you can login before scripts are being ran
async function firstTimeSetup() {
    const path =
        process.env.LOCALAPPDATA + "\\Google\\Chrome\\User Data\\Default";
    const browser = await puppeteer.launch({
        headless: false,
        args: [`--user-data-dir=${path}`],
    });
    const page = await browser.newPage();
    await page.goto("https://www.frankerfacez.com/");
    const page2 = await browser.newPage();
    await page2.goto("https://7tv.app/");
    const page3 = await browser.newPage();
    await page3.goto("https://betterttv.com/");
}

//Clicks the BTTV buttons
async function BTTVStuff() {
    const path =
        process.env.LOCALAPPDATA + "\\Google\\Chrome\\User Data\\Default";
    const browser = await puppeteer.launch({
        headless: false,
        args: [`--user-data-dir=${path}`],
    });
    fs.createReadStream("dataBTTV.csv")
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => {
            console.log(results);
        });

    async function clickButtonRemove() {
        const [button] = await page.$x(
            "//button[contains(., 'Remove from Channel')]"
        );
        if (button) {
            await button.click();
        }
    }
    async function clickButtonAdd() {
        const [button] = await page.$x(
            "//button[contains(., 'Add to Channel')]"
        );
        if (button) {
            await button.click();
        }
    }

    function delay(time) {
        return new Promise(function (resolve) {
            setTimeout(resolve, time);
        });
    }

    const page = await browser.newPage();

    await page.setDefaultTimeout(5000);
    for (let index = 0; index < results.length; index++) {
        try {
            await page.goto(
                `https://betterttv.com/emotes/${results[index].Current}`
            );
            await page.waitForXPath(
                "//button[contains(., 'Remove from Channel')]"
            );
            await clickButtonRemove();
            console.log(`Removing: ${results[index].Current}`);
            await delay(2000);
            await page.goto(
                `https://betterttv.com/emotes/${results[index].Replace}`
            );
            await page.waitForXPath("//button[contains(., 'Add to Channel')]");
            await clickButtonAdd();
            console.log(`Adding: ${results[index].Replace}`);
        } catch (error) {
            console.log(error);
        }
    }

    await browser.close();
}

//Clicks all the buttons on 7TV
async function sevenTVStuff() {
    const path =
        process.env.LOCALAPPDATA + "\\Google\\Chrome\\User Data\\Default";
    const browser = await puppeteer.launch({
        headless: false,
        args: [`--user-data-dir=${path}`],
    });
    fs.createReadStream("data7tv.csv")
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => {
            console.log(results);
        });

    async function clickButtonRemove() {
        const [button] = await page.$x(
            "//button[contains(., 'REMOVE FROM CHANNEL')]"
        );
        if (button) {
            await button.click();
        }
    }
    async function clickButtonAdd() {
        const [button] = await page.$x(
            "//button[contains(., 'ADD TO CHANNEL')]",
            5000
        );
        if (button) {
            await button.click();
        }
    }

    function delay(time) {
        return new Promise(function (resolve) {
            setTimeout(resolve, time);
        });
    }

    const page = await browser.newPage();

    await page.setDefaultTimeout(5000);

    for (let index = 0; index < results.length; index++) {
        try {
            await page.goto(`https://7tv.app/emotes/${results[index].Current}`);
            await page.waitForXPath(
                "//button[contains(., 'REMOVE FROM CHANNEL')]"
            );
            await clickButtonRemove();
            console.log(`Removing: ${results[index].Current}`);
            await delay(5000);
            await page.goto(`https://7tv.app/emotes/${results[index].Replace}`);
            await page.waitForXPath("//button[contains(., 'ADD TO CHANNEL')]");
            await clickButtonAdd();
            console.log(`Adding: ${results[index].Replace}`);
        } catch (error) {
            console.log(error);
        }
    }

    await browser.close();
}

//Uses fetch for updating emotes
async function FFZStuff() {
    let data;
    const channels = {
        Penk: "903419",
        Happy: "813291",
    };

    const path =
        process.env.LOCALAPPDATA + "\\Google\\Chrome\\User Data\\Default";
    const browser = await puppeteer.launch({
        headless: false,
        args: [`--user-data-dir=${path}`],
    });
    fs.createReadStream("dataFFZ.csv")
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => {
            console.log(results);
        });

    const page = await browser.newPage();
    await page.goto("https://www.frankerfacez.com", {
        waitUntil: "networkidle2",
    });
    const cookies = await page.cookies();
    await !!cookies.find((cookie) => {
        if (cookie.name === "remember_token") {
            data = cookie.value;
        }
    });

    for (let index = 0; index < results.length; index++) {
        await fetch(
            `https://www.frankerfacez.com/emoticons/channel/False?channels=${channels.Happy}&ids=${results[index].Current}`,
            {
                headers: {
                    accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "accept-language": "en-US,en;q=0.9",
                    "sec-fetch-dest": "document",
                    "sec-fetch-mode": "navigate",
                    "sec-fetch-site": "same-origin",
                    "sec-fetch-user": "?1",
                    "sec-gpc": "1",
                    "upgrade-insecure-requests": "1",
                    cookie: `remember_token=${data}`,
                    Referer: `https://www.frankerfacez.com/emoticon/${results[index].Current}`,
                    "Referrer-Policy": "strict-origin-when-cross-origin",
                },
                body: null,
                method: "GET",
            }
        );
        console.log(`Removing: ${results[index].Current}`);

        await fetch(
            `https://www.frankerfacez.com/emoticons/channel/True?channels=${channels.Happy}&ids=${results[index].Replace}`,
            {
                headers: {
                    accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "accept-language": "en-US,en;q=0.9",
                    "sec-fetch-dest": "document",
                    "sec-fetch-mode": "navigate",
                    "sec-fetch-site": "same-origin",
                    "sec-fetch-user": "?1",
                    "sec-gpc": "1",
                    "upgrade-insecure-requests": "1",
                    cookie: `remember_token=${data}`,
                    Referer: `https://www.frankerfacez.com/emoticon/${results[index].Replace}`,
                    "Referrer-Policy": "strict-origin-when-cross-origin",
                },
                body: null,
                method: "GET",
            }
        );
        console.log(`Adding: ${results[index].Replace}`);
    }

    await browser.close();
}

switch (process.argv[2]) {
    case "-7TV":
        sevenTVStuff();
        break;
    case "-BTTV":
        BTTVStuff();
        break;
    case "-FFZ":
        FFZStuff();
        break;
    case "-SETUP":
        firstTimeSetup();
        break;
    default:
        break;
}
