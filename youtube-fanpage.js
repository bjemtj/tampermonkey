// ==UserScript==
// @name         YouTube AutoPlay - Facebook Fanpage
// @version      2.1.0
// @description  This script Autoplay Youtube
// @author       bjemtj
// @match        *://www.facebook.com/*
// @run-at       document-start
// @updateURL    https://bjemtj.github.io/tampermonkey/youtube-fanpage.js
// @downloadURL  https://bjemtj.github.io/tampermonkey/youtube-fanpage.js
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
        window.location.assign(uri);
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
        console.log("YouTube AutoPlay - Facebook Fanpage");
        let tracksSelector = 'a[href*="php?u=https%3A%2F%2Fmusic.youtube.com"]';
        doAtLeastOnce(tracksSelector, 5000, doFunc_move);
    };

    setTimeout(run, 5000);

})();