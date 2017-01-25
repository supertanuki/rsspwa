# RssPWA

![RssPWA](/favicon/android-chrome-192x192.png)

A Progressive Web App RSS reader with offline features ! 📵

## Install

Clone the repository

  $ git clone git@github.com:supertanuki/rsspwa.git

## Run

To run this application, you will need a webserver.

We suggest you to do it via [Web Server for Chrome Extension](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb). Install the application, run it from the [Chrome apps panel](chrome://apps/), select the parent directory of the rsspwa project, check the `Automatically show index.html` option.

Then, go to the following page: [http://127.0.0.1:8887/rsspwa/](http://127.0.0.1:8887/rsspwa/)

## Demo

[https://supertanuki.github.io/rsspwa/](https://supertanuki.github.io/rsspwa/)

## Todo

- Replace YUI by our own proxy for reading rss and avoid Same-Origin policy (via Google App Script?)
- Parse the requested site html to get the feed url
- Add a website and save it in browser storage (IndexedDb?)
- See the added websites list
- See the content of a post

## Credits

To read RSS by JavaScript and avoid Same-Origin policy
we use YUI, the Yahoo User Interface Library, an alternative to deprecated Google Feed API [https://github.com/yui/yui3](https://github.com/yui/yui3)

Logo made with [https://logomakr.com](https://logomakr.com)

Favicons made with [http://realfavicongenerator.net](http://realfavicongenerator.net)
