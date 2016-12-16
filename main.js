(function () {
    'use strict';

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js');
        });
    }

    function ajaxRequest (url) {
        var request = new XMLHttpRequest();

        request.onloadend = function () {
            if (request.readyState === XMLHttpRequest.DONE) {
                if (request.status === 200) {
                    showPosts(request.response);
                }
            }
        };

        request.onerror = function () {
            console.log(request.readyState);
        };

        request.open('GET', url);
        request.send();
    }

    function showPosts (rss) {
        if (window.DOMParser) {
            var parser    = new DOMParser();
            var xmlDoc    = parser.parseFromString(rss, "text/xml");
            var titleList = [];
            var html      = '';

            [].forEach.call(xmlDoc.getElementsByTagName("item"), function (element) {
                titleList.push(element.getElementsByTagName('title')[0].textContent);
            });

            for (let title of titleList) {
                html += '<li>' + title + '</li>';
            }

            html = '<ul>' + html + '</ul>';

            document.getElementById('app').innerHTML = html;
        } else {
            console.log('method not supported');
        }
    }

    var feed = 'http://www.lemonde.fr/rss/une.xml';
    ajaxRequest(feed);
}());

