// ==UserScript==
// @name         YouTube AutoPlay - HotList
// @version      2.0.0
// @description  This script Autoplay Youtube
// @author       bjemtj
// @match        *music.youtube.com/hotlist*
// @run-at       document-end
// @updateURL    https://bjemtj.github.io/tampermonkey/youtube-hotlist.js
// @downloadURL  https://bjemtj.github.io/tampermonkey/youtube-hotlist.js
// @namespace  https://bjemtj.github.io/tampermonkey/youtube-hotlist.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function doFunc_click(elements){
        let rdPos = Math.floor(Math.random()*elements.length);
        elements[rdPos].click();
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
        let selector = 'ytmusic-item-thumbnail-overlay-renderer';
        doAtLeastOnce(selector, 5000, doFunc_click);
    };

    setTimeout(run, 5000);

})();
