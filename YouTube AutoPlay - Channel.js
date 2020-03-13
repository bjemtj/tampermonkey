// ==UserScript==
// @name         YouTube AutoPlay - Channel
// @version      2.0.0
// @description  This script Autoplay Youtube
// @author       bjemtj
// @match        *music.youtube.com/channel*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var items;
    var getInterval;
    function getItems(){
        items = document.querySelectorAll('a[class="yt-simple-endpoint style-scope yt-formatted-string"][href*="watch"');
        if(typeof(items) != 'undefined' && items != null){
            playRandom();
        }
    };

    function playRandom(){
        clearInterval(getInterval);

        var rdItem = items[Math.floor(Math.random()*items.length)];
        var uri = rdItem.getAttribute("href");
        var link = "https://music.youtube.com/"+uri;
        console.log(link);
        setTimeout(function(){
            window.location.href = link;
        }, 5000);
    }

    function doFunc_click(elements){
        let rdPos = Math.floor(Math.random()*elements.length);
        elements[rdPos].click();
    }
    function doFunc_move(elements){
        let rdPos = Math.floor(Math.random()*elements.length);
        let element = elements[rdPos];
        let uri = element.getAttribute("href");
        let link = "https://music.youtube.com/"+uri;
        window.location.assign(link);
    }
    function doAtLeastOnce(selector, time, doFunc){
        let interval = setInterval(function(){
            let elements = document.querySelectorAll(selector);
            if(elements.length > 0){
                clearInterval(interval);
                doFunc(elements);
            }
        }, time);
    }
    function run() {
        console.log("YouTube AutoPlay - HotList");
        let subcribeSelector = 'paper-button.ytmusic-subscribe-button-renderer';
        doAtLeastOnce(subcribeSelector, 5000, doFunc_click);
        let tracksSelector = 'a[class="yt-simple-endpoint style-scope yt-formatted-string"][href*="watch"';
        doAtLeastOnce(tracksSelector, 5000, doFunc_move);
    };

    setTimeout(run, 5000);

})();