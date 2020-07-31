const puppeteer = require('puppeteer');

start()

async function start() {

    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://www.instagram.com/p/CAoSFo5la8I/')

    await loadMore(page, '.dCJp8');
    const comments = await getComments(page, '.C4VMK span a')
    const mentions = getMentions(comments)
    const contedMentionsObject = count(mentions)
    const listSortedMentions = sort(contedMentionsObject)
    console.log(listSortedMentions)

    /*------------------------------ Functions -----------------------------*/
    async function loadMore(page, selector) {
        const moreButton = await page.$(selector);
        if(moreButton) {
            console.log("More")
            await moreButton.click();
            await page.waitFor(selector, { timeout: 3000 }).catch(() => { console.log('timeout') })
            await loadMore(page, selector)
        }
    }

    async function getComments(page, selector) {
        const comments = await page.$$eval(selector, links => links.map(link => link.innerText))
        return comments
    }

    function getMentions(comments) {
        const mentions = comments.filter(comment => comment.substr(0,1) == '@')
        return mentions
    }

    function count(mentions) {
        const countedmentions = {};
        mentions.forEach(mention => countedmentions[mention] = (countedmentions[mention] || 0) + 1)
        return countedmentions
    }
    
    function sort(coutedMentionsObject) {
        const entries = []
        //const entries = Object.entries[coutedMentionsObject]
    
        for(prop in coutedMentionsObject) {
            entries.push([prop, coutedMentionsObject[prop]])
        }
    
        const sorted = entries.sort((a, b) => b[1] - a[1])
        return sorted;
    }   
}