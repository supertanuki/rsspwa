(function () {
    'use strict';

    const RSS2JSON_API_ENDPOINT = 'https://api.rss2json.com/v1/api.json?rss_url=';

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('sw.js');
        });
    }

    function fetchFeed(url)
    {
        if (!'Request' in window) {
            console.log('Request not supported');
            return;
        }

        var request = new Request(RSS2JSON_API_ENDPOINT + url);

        fetch(request, {})
            .then(function(response) {
                console.log(response);
                return response.json();
            })
            .then(function(json) {
                showPosts(json);
            })
            .catch(function(error) {
                console.log('Request failed = ', error);
            });
    }

    function showPosts (rss) {
        var html      = '';

        for (let item of rss.items) {
            html += '<li class="list-group-item"><h2><a href="' + item.link + '">' + item.title + '</a></h2><p>' + item.description +'</p></li>';
        }

        html = '<ul class="list-group">' + html + '</ul>';

        document.getElementById('app').innerHTML = html;
    }

    var feed = 'https://www.lemonde.fr/rss/une.xml';
    fetchFeed(feed);
}());

