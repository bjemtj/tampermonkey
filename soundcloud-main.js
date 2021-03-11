// ==UserScript==
// @name         SoundCloud AutoPlay - MAIN
// @version      2.3.0
// @description  This script Autoplay Youtube
// @author       bjemtj
// @match        *soundcloud.com/*
// @run-at       document-end
// @updateURL    https://bjemtj.github.io/tampermonkey/soundcloud-main.js
// @downloadURL  https://bjemtj.github.io/tampermonkey/soundcloud-main.js
// @grant        none
// @require      https://l2.io/ip.js?var=myip
// ==/UserScript==

(function() {
    'use strict';

    var PARAMS = {
        "DOMAIN": "https://soundcloud.com",
        "LISTEN_DURATION": 600,
        "LISTEN_OTHERS_DURATION": 120,
        "LINKS":{
            "ARTISTS" : ["https://soundcloud.com/terence-garza/sets/guitar-in-country-vol-01",
                         "https://soundcloud.com/katheryn-doyle-a/sets/communication-time"],
            "OTHERS": "https://soundcloud.com/discover",
            "FANPAGE": "https://www.facebook.com/pg/Musicfme/posts/?ref=page_internal"
        },
        "UPDATE_API": "https://script.google.com/macros/s/AKfycbyaTbgkqRWkFTu5dlcsrG9YSHaTHdNpKsrTrhsOCFyN_CiSBBmA9rUc-Q/exec"
    };

    function updateStatus(){
        var getURI = PARAMS.UPDATE_API + "?ipaddress=" + myip + "&state=2";
        var xhr = new XMLHttpRequest();
        xhr.open('GET', getURI, true);
        xhr.send(null);
    }
    function getActiveURL(){
        switch(true)
        {
            case PARAMS.LINKS.ARTISTS.indexOf(window.location.href) >= 0:
                return 1;
            case window.location.href == PARAMS.LINKS.OTHERS:
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
        var a = document.createElement('a');
        var link = document.createTextNode(url);
        a.appendChild(link);
        a.title = url;
        a.href = url;
        document.body.appendChild(a);
        a.click();
        newPlay();
    }
    function hardReload(url) {
        window.location.href = url;
    }
    
    function newPlay(){

        if(getActiveURL() == 1)
        {
            setTimeout(clickPlay, 5000);
            setTimeout(clickLike, 5000);
            setTimeout(clickShuffle, 5000);
            
            setTimeout(hardReload, PARAMS.LISTEN_DURATION * 1000, PARAMS.LINKS.OTHERS); //Hard reload after listen time
        }else if(getActiveURL() == 2)
        {
            setTimeout(clickPlay, 5000);
            setTimeout(clickLike, 5000);
            setTimeout(clickShuffle, 5000);
            
            let rndArtist = PARAMS.LINKS.ARTISTS[Math.floor(Math.random() * PARAMS.LINKS.ARTISTS.length)];
            let artistPath = rndArtist.replace(PARAMS.DOMAIN, "");
            setTimeout(gotoURL, PARAMS.LISTEN_OTHERS_DURATION * 1000, artistPath); //Go to Artist path after break time
        }
    }

    function run() {
        newPlay();
    };

    setTimeout(run, 5000);
    setInterval(updateStatus, 60000);
})();
