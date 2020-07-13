// ==UserScript==
// @name         YouTube AutoPlay - Channel
// @version      2.0.2
// @description  This script Autoplay Youtube
// @author       bjemtj
// @match        *music.youtube.com/channel*
// @run-at       document-end
// @updateURL    https://bjemtj.github.io/tampermonkey/youtube-channel.js
// @downloadURL  https://bjemtj.github.io/tampermonkey/youtube-channel.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
	
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
        console.log("YouTube AutoPlay - Channel");
        let subcribeSelector = 'paper-button.ytmusic-subscribe-button-renderer';
        doAtLeastOnce(subcribeSelector, 5000, doFunc_click);
        let tracksSelector = 'a[class="yt-simple-endpoint style-scope yt-formatted-string"][href*="watch"';
        doAtLeastOnce(tracksSelector, 5000, doFunc_move);
    };

    setTimeout(run, 5000);

})();