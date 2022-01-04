const csv = require("csv-parser");
const puppeteer = require("puppeteer");
const fs = require("fs");
const fetch = require("node-fetch");
const results = [];

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

async function FFZStuff() {
    const channels = {
        Penk: "PenkTynk",
        Happy: "HappyThoughts",
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

    async function clickButtonRemove() {
        const [button] = await page.$x(
            `//div/a[contains(., '${channels.Happy}')]`
        );
        if (button) {
            await button.click();
        }
    }
    async function clickButtonAdd() {
        const [button] = await page.$x(
            `//div/a[contains(., '${channels.Happy}')]`
        );
        if (button) {
            await button.click();
        }
    }

    for (let index = 0; index < results.length; index++) {
        try {
            await page.goto(
                `https://www.frankerfacez.com/emoticon/${results[index].Current}`
            );
            await page.waitForXPath(
                `//div/a[contains(., '${channels.Happy}')]`
            );
            await clickButtonRemove();
            await page.waitForNetworkIdle();
            console.log(`Removing: ${results[index].Current}`);
            await page.goto(
                `https://www.frankerfacez.com/emoticon/${results[index].Replace}`
            );
            await page.waitForXPath(
                `//div/a[contains(., '${channels.Happy}')]`
            );
            await clickButtonAdd();
            await page.waitForNetworkIdle();
            console.log(`Adding: ${results[index].Replace}`);
        } catch (error) {
            console.log(error);
        }
    }

    await browser.close();
}

async function fetchThing() {
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
        try {
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
                        cookie: `${data}`,
                        Referer: `https://www.frankerfacez.com/emoticon/${results[index].Current}`,
                        "Referrer-Policy": "strict-origin-when-cross-origin",
                    },
                    body: null,
                    method: "GET",
                }
            ).then(async () => {
                await page.goto(
                    `https://www.frankerfacez.com/emoticon/${results[index].Current}`
                );
                await page.waitForNetworkIdle();
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
                            cookie: `${data}`,
                            Referer: `https://www.frankerfacez.com/emoticon/${results[index].Replace}`,
                            "Referrer-Policy":
                                "strict-origin-when-cross-origin",
                        },
                        body: null,
                        method: "GET",
                    }
                ).then(() => {
                    await page.waitForNetworkIdle();
                    console.log(`Adding: ${results[index].Replace}`);
                });
            });
        } catch (error) {
            console.log(error);
        }
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
    case "-FETCH":
        fetchThing();
        break;
    default:
        break;
}
/* 
Link to the existing emote -> unlink -> link to new emote -> add it to channel
webcrawl emote page for emote name -> click on emote -> unlink emote -> add new emote
*/
