const puppeteer = require('puppeteer');
const fs = require('fs');

const radoviURL = 'https://www.putevi-srbije.rs/index.php?option=com_content&view=category&layout=blog&id=29&Itemid=209&lang=sr'

const Scrape = async () => {
    const browser = await puppeteer.launch({
        headless: true,
        devtools: false
    });

    const page = await browser.newPage()
    const data = []
    page.on('response', async (response) => {
        // Returns response body and writes it into a file
        if (response.url().includes('novamapa/textfile.txt')) {
            const text = await response.text();
            await data.push(text)
            // console.log(data)
            const lines = text.split('\n').slice(1, -1).join('\n')
            fs.writeFile('radovi.txt', lines, (err, data) => { if (err) { console.log(err) } })
        }
    })

    await page.goto(radoviURL, {
        waitUntil: 'networkidle0',
        timeout: 0,
    })

    await browser.close()

    PushToJson() // Write scraped data to .txt file

}

const ScrapeCoords = async (location, coords) => {
    // Loops through locations and returns coordinates for each one
    const browser = await puppeteer.launch({
        headless: true,
    });
    for (let i = 0; i < location.length; i++) {
        const page = await browser.newPage()
        await page.goto(`https://www.google.com/maps/search/${location[i].location}`, { waitUntil: 'networkidle0' }) // Waits until there is no more network traffic on the page
        // Waits 8 seconds before extracting url, while waiting, the browser continues opening new tabs
        setTimeout(async () => {
            const pageUrl = (await browser.pages())[1];
            if (pageUrl.url().includes('@')) { // If url includes '@', it includes coords
                let fullCoords = pageUrl.url().split('@')[1].split(/,\d{2}z/)
                coords[i].id = i + 1;
                coords[i].lat = fullCoords[0].split(',')[0]
                coords[i].lon = fullCoords[0].split(',')[1]
                console.log(coords[i])
            }
            console.log(pageUrl.url())
            await pageUrl.close()
        }, 8000)
    }
    // At the end, wait 20 seconds for all pages to finish extracting. Otherwise it crashes
    setTimeout(async () => {
        await browser.close()
        fs.writeFile('radovi.json', JSON.stringify(coords, null), (err, data) => err ? console.log(err) : console.log('Success')) // Writes scraped data to json
    }, 20000)
}

const PushToJson = () => {
    const lines = fs.readFileSync('radovi.txt').toString('utf8').split('\n')

    // Array of objects
    let objArr = []

    // Push values to an array of objects
    lines.forEach(line => {
        let obj = {
            id: '',
            desc: '',
            date: '',
            type: '',
            location: '',
            lat: '',
            lon: '',
        }
        // console.log(line)
        let l = line.split(/( |\t)RADOVI:|ZABRANE:|OBUSTAVE:|ODRONI\/KLIZIŠTA:/)[2]
            .replace(/\d{2}.\d{2}.\d{4}. /, '')
            .replace(/<br>/g, '')
            .split(/\t50/)[0]
            .replace(/\t/g, ' ')
        console.log(l)
        obj.desc = l
        obj.date = line.match(/\d{2}[.]\d{2}[.]\d{4}[.]/g) // Dates
        obj.type = line.match(/RADOVI|ZABRANE|OBUSTAVE|ODRONI\/KLIZIŠTA/)[0]
        obj.location = l.split(/,/g)[1]
            .split(/\d{2}./)[0]
            .replace(/deonica/, '')
        objArr.push(obj)
        console.log(line)
    })
    ScrapeCoords(objArr, objArr)
}


module.exports = {
    Scrape,
    ScrapeCoords,
    PushToJson
}
