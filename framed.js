const puppeteer = require('puppeteer-extra')
const readline = require('readline')
const fs = require('fs')


async function RegisterFramed() {

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {
        rl.question('Enter Email: ', (email) => {
        rl.close();
        resolve(email)
        })
    })
}


(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://framed.gg/');
    await page.setDefaultNavigationTimeout(0);
    
    //Fill Data
    const email = await RegisterFramed();
    await page.type('input[type="email"]', email);
    await page.click('div:nth-child(3) > input');
    await page.waitForTimeout(2000)
    console.log('Done, data email sudah tercatat.')
    await browser.close()
    
    //Save Data Email
    fs.appendFile('.../test.txt','\n' + email, function(err, result) {if(err) console.log('err', err)})
})()