const { normalizeURL, getURLsFromHTML} = require('./crawl.js')
const { test, expect } = require('@jest/globals')

test('normalizeURL strip protocol', () => {
    const input = "https://blog.boot.dev/path"
    const actual = normalizeURL(input)
    const expected = "blog.boot.dev/path"
    expect(actual).toEqual(expected)
})

test('normalizeURL strip trailing slash', () => {
    const input = "https://blog.boot.dev/path/"
    const actual = normalizeURL(input)
    const expected = "blog.boot.dev/path"
    expect(actual).toEqual(expected)
})

test('normalizeURL capitals', () => {
    const input = "https://BLOG.boot.dev/path/"
    const actual = normalizeURL(input)
    const expected = "blog.boot.dev/path"
    expect(actual).toEqual(expected)
})

test('normalizeURL strip http', () => {
    const input = "http://blog.boot.dev/path/"
    const actual = normalizeURL(input)
    const expected = "blog.boot.dev/path"
    expect(actual).toEqual(expected)
})


test('getURLsFromHTML absolute', () => {
    const inbutHTMLBody = `
<html>
    <body>
        <a href ="https://blog.boot.dev">
        boot.dev Blog
        </a>
    </body>
</html>
`
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inbutHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative', () => {
    const inbutHTMLBody = `
<html>
    <body>
        <a href ="/path/">
        boot.dev Blog
        </a>
    </body>
</html>
`
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inbutHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})


test('getURLsFromHTML both', () => {
    const inbutHTMLBody = `
<html>
    <body>
        <a href ="https://blog.boot.dev/path1/">
        boot.dev Blog path 1
        </a>
        <a href ="/path2/">
        boot.dev Blog path 2
        </a>
    </body>
</html>
`
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inbutHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative', () => {
    const inbutHTMLBody = `
<html>
    <body>
        <a href ="invalid">
        invalid URL
        </a>
    </body>
</html>
`
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inbutHTMLBody, inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected)
})