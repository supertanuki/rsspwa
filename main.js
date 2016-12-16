function ajaxRequest(url) {
    var request = new XMLHttpRequest();

    request.onloadend = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                console.log(request.response);
            }
        }
    };

    request.onerror = function () {
        console.log(request.readyState);
    };

    request.open('GET', url);
    request.send();
}

var feed = 'http://www.lemonde.fr/rss/une.xml';
ajaxRequest(feed);
