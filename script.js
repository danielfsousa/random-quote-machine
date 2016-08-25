$(function() {

    var SPACE_KEY = 32;

    var $quote = $('#quote');
    var $quoteText = $quote.find('span');

    var $name = $('#name');
    var $nameText = $name.find('strong');

    var $twitter = $('.twitter');
    var $facebook = $('.facebook');
    var $spinner = $('.spinner');

    function stripHTML(str) {
        return $('<div/>').html(str).text();
    }

    function refreshQuote() {
        $spinner.fadeIn();
        $.getJSON('http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&_jsonp=?')
            .done(function(data) {

                var content = stripHTML(data[0].content);
                var name = stripHTML(data[0].title);

                var link = '"' + content + '" By: ' + name + ' Via: ';
                var twitterLink = "http://twitter.com/share?text=" + link;
                var facebookLink = "http://www.facebook.com/sharer.php?s=100&p[url]=" + window.location;

                $twitter.attr('href', twitterLink);
                $facebook.attr('href', facebookLink);

                $quote.fadeOut();
                $name.fadeOut(function () {
                    $quoteText.html(content);
                    $nameText.html(name);
                });
                $quote.fadeIn();
                $spinner.fadeOut();
                $name.fadeIn();
            })
            .fail(function () {
               console.log('Error loading quotes.');
            });
    }

    $('.refresh').on('click', refreshQuote);
    $('body').on('keydown', function(e) {
        if(SPACE_KEY == e.which) {
            refreshQuote();
        }
    });

    refreshQuote();

});