(function () {
    'use strict';

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('sw.js');
        });
    }

    function getFeed(url)
    {
        YUI().use('yql', function(Y){
            Y.YQL('select * from rss(0,10) where url = "' + url + '"', function(result) {
                showPosts(result.query.results);
            })
        });
    }

    function showPosts(rss)
    {
        var html = '';

        for (let post of rss.item) {
            html += '<li class="list-group-item"><h2><a href="' + post.link + '">' + post.title + '</a></h2></li>';
        }

        html = '<ul class="list-group">' + html + '</ul>';

        document.getElementById('app').innerHTML = html;
    }

    var feed = 'https://blog.elao.com/fr/index.xml';
    getFeed(feed);
}());

