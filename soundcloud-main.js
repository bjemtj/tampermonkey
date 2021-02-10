// ==UserScript==
// @name         SoundCloud AutoPlay - MAIN
// @version      2.1.3
// @description  This script Autoplay Youtube
// @author       bjemtj
// @match        *soundcloud.com/*
// @run-at       document-end
// @updateURL    https://bjemtj.github.io/tampermonkey/soundcloud-main.js
// @downloadURL  https://bjemtj.github.io/tampermonkey/soundcloud-main.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var PARAMS = {
        "LISTEN_DURATION": 600,
        "LISTEN_OTHERS_DURATION": 120,
        "LINKS":{
            "ARTIST" : "https://soundcloud.com/terence-garza/sets/guitar-in-country-vol-01",
            "ARTIST_SUB" : "/terence-garza/sets/guitar-in-country-vol-01",
            "OTHERS": "https://soundcloud.com/discover",
            "OTHERS_SUB": "https://soundcloud.com/discover",
            "FANPAGE": "https://www.facebook.com/pg/Musicfme/posts/?ref=page_internal"
        }
    };


    var ARTIST_CORRECTED = false;
    var EVENT_ADDED = false;

    function setAutoPlay(toggle){
        var autoPlayElm = document.getElementById("automix");
        var checked = autoPlayElm.getAttribute("checked");
        if(toggle != (checked == null ? false : true)){
            autoPlayElm.click();
        }
    };

    function setRepeatAll(){
        var repeatElm = document.querySelector(".repeat.style-scope.ytmusic-player-bar");
        var loopClickRepeat = setInterval(function(){
            var repeatLabel = repeatElm.getAttribute("aria-label");
            if(repeatLabel == "Repeat all"){
                clearInterval(loopClickRepeat);
            }else{
                repeatElm.click();
            }

        }, 2000);
    };


    function getActiveURL(){
        switch(window.location.href)
        {
            case PARAMS.LINKS.ARTIST:
                return 1;
            case PARAMS.LINKS.OTHERS:
                return 2;
            default:
                return 0;
        }
    };

    function clickShuffle(){
        var loopClickShuffleRepeat = setInterval(function(){
            let btnRender = document.querySelector("button[title='Shuffle']");
            if(btnRender != null){
                btnRender.click();
                clearInterval(loopClickShuffleRepeat);
            }
        },5 * 1000);
    }
    function clickLike(){
        var loopClickLikeRepeat = setInterval(function(){
            let btnRender = document.querySelector("button[aria-label='Like']");
            if(btnRender != null){
                if(Math.random() < 0.5)
                {
                    btnRender.click();
                }
                clearInterval(loopClickLikeRepeat);
            }
        },5 * 1000);
    }

    function clickPlay(){
        var loopClickPlayRepeat = setInterval(function(){
            var btns = document.querySelectorAll("a[title='Play']");
            let rdPos = Math.floor(Math.random() * btns.length);
            let element = btns[rdPos];
            if(element != null){
                element.click();
                console.log(getActiveURL() + " play");
                clearInterval(loopClickPlayRepeat);
            }
        },5 * 1000);
    }
    function gotoURL(url) {
        var a = document.createElement('a')
        var link = document.createTextNode(url);
        a.appendChild(link);
        a.title = url;
        a.href = url;
        document.body.appendChild(a);
        a.click();
        newPlay();
    }

    function newPlay(){

        if(getActiveURL() == 1)
        {
            setTimeout(clickPlay, 5000);
            setTimeout(clickLike, 5000);
            setTimeout(clickShuffle, 5000);
            setTimeout(gotoURL, PARAMS.LISTEN_DURATION * 1000, PARAMS.LINKS.ARTIST_SUB);
        }else if(getActiveURL() == 2)
        {
            setTimeout(clickPlay, 5000);
            setTimeout(clickLike, 5000);
            setTimeout(clickShuffle, 5000);
            setTimeout(gotoURL, PARAMS.LISTEN_OTHERS_DURATION * 1000, PARAMS.LINKS.OTHERS_SUB);
        }
    }

    function run() {
        newPlay();
    };

    setTimeout(run, 5000);
})();
