// ==UserScript==
// @name         Tidal AutoPlay - MANAGER
// @version      2.0.0
// @description  This script Autoplay Tidal
// @author       bjemtj
// @match        *listen.tidal.com/*
// @run-at       document-end
// @updateURL    https://bjemtj.github.io/tampermonkey/tidal-main.js
// @downloadURL  https://bjemtj.github.io/tampermonkey/tidal-main.js
// @namespace  https://bjemtj.github.io/tampermonkey/tidal-main.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var REPEAT_TIMES = 200;

    var randomClickInterval;
    function getItems(){
        var items = document.querySelectorAll("button[data-test='play-button']");
        if(typeof(items) != 'undefined' && items != null){
            playRandom(items);
        }
    };

    function playRandom(items){
        clearInterval(randomClickInterval);

        var rdItem = items[Math.floor(Math.random()*items.length)];
        setTimeout(function(){
            rdItem.click();
            setTimeout(clickPlayButton,2000);
        }, 5000);
    };

    function setRepeatAll(){
        var loopClickRepeat = setInterval(function(){
                var repeatElm = document.querySelector("div[data-test='footer-player'] button[data-test='repeat']");
            if(typeof(repeatElm) != 'undefined' && repeatElm != null){
                var repeatLabel = repeatElm.getAttribute("class");
                if(repeatLabel.indexOf(" all")>0){
                    clearInterval(loopClickRepeat);
                }else{
                    repeatElm.click();
                }
            }
        }, 2000);
    };

    function setShuffle(){
        var loopClickRepeat = setInterval(function(){
                    var repeatElm = document.querySelector("div[data-test='footer-player'] button[data-test='shuffle']");
            if(typeof(repeatElm) != 'undefined' && repeatElm != null){
                var repeatLabel = repeatElm.getAttribute("class");
                if(repeatLabel.indexOf(" active")>0){
                    clearInterval(loopClickRepeat);
                }else{
                    repeatElm.click();
                }
            }
        }, 2000);
    };


    function clickNextButton(){
        if(REPEAT_TIMES<=0){
            window.location.href = window.location.href
        }else{
            var btn = document.querySelector("div[data-test='footer-player'] button[data-test='next']");
            if(typeof(btn) != 'undefined' && btn != null){
                btn.click();
                console.log("Click Next");
                REPEAT_TIMES--;
            }
        }
    };

    function clickPlayButton(){
        var btn = document.querySelector("div[data-test='footer-player'] button[data-test='play']");
        if(typeof(btn) != 'undefined' && btn != null){
            btn.click();
        }
    };

    function run() {
        console.log("Tidal AutoPlay - MANAGER");
        //console.log(PARAMS);

        setRepeatAll();
        setShuffle();

        randomClickInterval = setInterval(getItems,5000);

        setInterval(clickNextButton,65*1000);


    };

    setTimeout(run, 5000);
})();