// ==UserScript==
// @name         YouTube AutoPlay - HotList
// @version      2.0.1
// @description  This script Autoplay Youtube
// @author       bjemtj
// @match        *music.youtube.com/hotlist*
// @run-at       document-end
// @updateURL    https://bjemtj.github.io/tampermonkey/youtube-hotlist.js
// @downloadURL  https://bjemtj.github.io/tampermonkey/youtube-hotlist.js
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
        console.log("YouTube AutoPlay - HotList");
        let selector = 'a[class="yt-simple-endpoint style-scope ytmusic-full-bleed-item-renderer"]';
        doAtLeastOnce(selector, 5000, doFunc_move);
    };

    setTimeout(run, 5000);

})();