### Wikipedia Crawler with P5 (from Coding Train)

loadJSON() with callback is used:
 - to get a list of search results
 - to browse to a search result page
regex is used to filter JSON data returned by wiki API


### Issue faced
```
No 'Access-Control-Allow-Origin' header is present on the requested resource.
Origin 'http://localhost:12000' is therefore not allowed access.
If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
```
workaround: use 'jsonp' polyfill
