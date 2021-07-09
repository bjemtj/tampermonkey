// ==UserScript==
// @name         YouTube AutoPlay - MAIN
// @version      2.1.2
// @description  This script Autoplay Youtube
// @author       bjemtj
// @match        *music.youtube.com/watch*
// @run-at       document-end
// @updateURL    https://bjemtj.github.io/tampermonkey/youtube-main.js
// @downloadURL  https://bjemtj.github.io/tampermonkey/youtube-main.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var PARAMS = {
        "ARTIST_ID" : "UC4fC5LIZfZgH8USaHKUkDwg",
        "SEEK_EVENT": true,
        "REPEAT_TIMES": 5,
        "REPEAT_TIMES_RANGE": 5,
        "LISTEN_DURATION_RANGE": 10,
        "LISTEN_DURATION": 80,
        "GOTO_PERCENT": 0.99,
        "LINKS":{
            "ARTIST" : "https://music.youtube.com/channel/UC4fC5LIZfZgH8USaHKUkDwg",
            "OTHERS": "https://music.youtube.com/explore",
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

    function checkVideoPaused(){
        setInterval(function(){
            var yesBtn = document.getElementById("button");
            if(!yesBtn){
                yesBtn.click();
            }
        },60 * 1000);

    };

    function hmsToSecondsOnly(str) {
        var p = str.split(':'),
            s = 0, m = 1;

        while (p.length > 0) {
            s += m * parseInt(p.pop(), 10);
            m *= 60;
        }

        return s;
    };

    function seekSliderBar(gotoPercent, listenDuration){
        var ytplayer = document.getElementById("movie_player");


        if(PARAMS.SEEK_EVENT){
            var totalDuration = hmsToSecondsOnly(document.querySelector('.time-info.style-scope.ytmusic-player-bar').textContent.split(" / ")[1].trim());
            ytplayer.seekTo(totalDuration * gotoPercent, true);
        }

        if(!EVENT_ADDED){
            ytplayer.addEventListener("onStateChange", function(state){
                if(state === 0){
                    if(ARTIST_CORRECTED){
                        console.log(PARAMS.REPEAT_NUMB);
                        if(PARAMS.REPEAT_NUMB > 0){
                            clickLike();

                            var loopGetDuration = setInterval(function(){
                                console.log("Get duration");
                                var totalDuration = hmsToSecondsOnly(document.querySelector('.time-info.style-scope.ytmusic-player-bar').textContent.split(" / ")[1].trim());
                                if(totalDuration > 0 && totalDuration < 1000){
                                    var rndStart = Math.floor(Math.random() * (parseInt(totalDuration) - parseInt(listenDuration) - 5));
                                    console.log("Start from " + rndStart);
                                    var ytplayer = document.getElementById("movie_player");
                                    setTimeout(ytplayer.seekTo, 5000, rndStart, true);
                                    clearInterval(loopGetDuration);
                                }
                            }, 1000);



                            var rndDuration = (Math.floor(Math.random() * PARAMS.LISTEN_DURATION_RANGE) + PARAMS.LISTEN_DURATION);
                            setTimeout(seekSliderBar, rndDuration*1000, PARAMS.GOTO_PERCENT, rndDuration);
                        }else{
                            if(Math.random() > 0){
                                window.location.href = PARAMS.LINKS.OTHERS;
                            }else{
                                window.location.href = PARAMS.LINKS.FANPAGE;
                            }
                        }
                        PARAMS.REPEAT_NUMB--;
                    }else{
                        window.location.href = PARAMS.LINKS.ARTIST;
                    }
                }
            });

            EVENT_ADDED = true;
        }
    };

    function checkArtist(){
        var content = document.body.innerHTML;
        ARTIST_CORRECTED = content.indexOf(PARAMS.ARTIST_ID) !== -1;
        if(ARTIST_CORRECTED){
            PARAMS.REPEAT_NUMB = (Math.floor(Math.random() * PARAMS.REPEAT_TIMES_RANGE) + PARAMS.REPEAT_TIMES);
        }
    };

    function clickLike(){
        var loopClickLikeRepeat = setInterval(function(){
            var btnRender = document.getElementById("like-button-renderer");
            if(btnRender != null){
                if(Math.floor(Math.random() * 5) > 1){
                    console.log("Like Click");
                    btnRender.querySelector('[aria-label="Like"]').click();
                }
                clearInterval(loopClickLikeRepeat);
            }
        },5 * 1000);
    }

    function run() {
        console.log("YouTube AutoPlay - MANAGER");
        console.log(PARAMS);
        setAutoPlay(true);//ON

        setRepeatAll();

        checkArtist();

        checkVideoPaused();

        clickLike();

        var loopGetDuration_First = setInterval(function(){
            console.log("Get duration");
            var totalDuration_First = hmsToSecondsOnly(document.querySelector('.time-info.style-scope.ytmusic-player-bar').textContent.split(" / ")[1].trim());
            if(totalDuration_First > 0 && totalDuration_First < 1000){
                var rndDuration_First = (Math.floor(Math.random() * PARAMS.LISTEN_DURATION_RANGE) + PARAMS.LISTEN_DURATION);
                var rndStart_First = Math.floor(Math.random() * (parseInt(totalDuration_First) - parseInt(rndDuration_First) - 5));
                console.log("Start from " + rndStart_First);
                var ytplayer = document.getElementById("movie_player");
                setTimeout(ytplayer.seekTo, 5000, rndStart_First, true);
                setTimeout(seekSliderBar, rndDuration_First*1000, PARAMS.GOTO_PERCENT, rndDuration_First);
                clearInterval(loopGetDuration_First);
            }
        },1000);


    };

    setTimeout(run, 5000);
})();
