// ==UserScript==
// @name         Apple Music AutoPlay - MANAGER
// @version      2.1.1
// @description  This script Autoplay Apple Music
// @author       bjemtj
// @match        *https://music.apple.com/*
// @run-at       document-end
// @updateURL    https://bjemtj.github.io/tampermonkey/apple-main.js
// @downloadURL  https://bjemtj.github.io/tampermonkey/apple-main.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    //Auto confirm Alert
    var oldConfirm = window.confirm;
    window.confirm = function (e) {
        return true;
    };
    
    function setRepeatAll(){
        var loopClickRepeat = setInterval(function(){
            var repeatElm = document.querySelector(".button-reset.web-chrome-playback-controls__secondary-btn[aria-label^='Repeat']");
            if(repeatElm !== null){
                var repeatLabel = repeatElm.getAttribute("aria-label");
                if(repeatLabel == "Repeat all"){
                    clearInterval(loopClickRepeat);
                }else{
                    repeatElm.click();
                }
            }

        }, 2000);
    };
    function clickPlay(){
        var loopClickRepeat = setInterval(function(){
            var repeatElm = document.querySelector(".shuffle-button.action-button[aria-label='Shuffle']");
            if(repeatElm !== null){
                var repeatLabel = repeatElm.getAttribute("aria-label");
                console.log(repeatElm);
                if(repeatLabel == "Shuffle"){
                    repeatElm.click();
                    setTimeout(function(){
                        var playBtn = document.querySelector(".button-reset.action-button[aria-label='Play']");
                        if(playBtn == null){
                            clearInterval(loopClickRepeat);
                        }
                    },5000);
                }
            }

        }, 10000);
    };

    function clickNext(){
        console.log("Click Next");
        var loopClickRepeat = setInterval(function(){
            var repeatElm = document.querySelector(".button-reset.web-chrome-playback-controls__playback-btn[aria-label='Next']");
            if(repeatElm !== null){
                var repeatLabel = repeatElm.getAttribute("aria-label");
                if(repeatLabel == "Next"){
                    clearInterval(loopClickRepeat);
                    repeatElm.click();
                    REPEAT_NUMB--;
                }
                if(REPEAT_NUMB<0){
                    window.location.reload();
                }
            }
        }, 2000);
    };
    var REPEAT_NUMB = 100;
    function run() {
        console.log("Apple Music AutoPlay - MANAGER");

        clickPlay();
        setRepeatAll();
        setInterval(clickNext,33*1000);
    };

    setTimeout(run, 5000);
})();
