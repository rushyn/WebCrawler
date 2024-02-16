const {crawlPage} = require('./crawl.js')
const {printReport} = require('./report.js')

async function main(){
    if (process.argv.length < 3){
        console.log("no website supplied")
        process.exit(1)
    }
    if (process.argv.length > 3){
        console.log("too murch stuff suppled try one web address at a time")
        process.exit(1)
    }
    const baseURL = process.argv[2]
    

    console.log(`start crawl of ${baseURL}`)

    const pages = await crawlPage(baseURL, baseURL, {})
    printReport(pages)
}


main()
