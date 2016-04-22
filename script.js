/**
 * Created by Burak on 18.04.2016.
 */
(function() {
    "use strict";
    var timer;
    var word = 0;
    var frames = [];

    window.onload = function() {
        var start = document.getElementById("start");
        start.onclick = goTimer;
        document.getElementById("stop").disabled = true;
        var stop = document.getElementById("stop");
        stop.onclick = stopIt;
        var speed = document.getElementById("speed");
        speed.onchange = changeSpeed;
        var size = document.getElementById("size");
        size.onchange = changeSize;
    };

    //a function to start the time
    function goTimer() {
        var input = document.getElementById("mytextarea").value;
        var raw = input.replace(/\n/g, ' ');
        var wordStrings = raw.split(' ');

        document.getElementById("start").disabled = true;
        document.getElementById("mytextarea").disabled = true;
        document.getElementById("stop").disabled = false;

        frames = setPunctuation(wordStrings);
        timer = setInterval(frame, 171);
    }

    //a function to generate the output
    function frame() {
        if (word < frames.length) {
            document.getElementById("output").innerHTML = frames[word];
            word++;
        } else {
            stopIt();
        }
    }

    //a function to check if there are words end with any punctuation
    //if there is, the last punctuation with the specific requirement will be removed
    //and the word with thse specific punctuation required will be added to the array again
    function setPunctuation(wordStrings) {
        var words = [];
        for (var i = 0; i < wordStrings.length; i++) {
            var eachWord = wordStrings[i];
            if (eachWord.match(/[,!?;:.]$/g)) {
                eachWord = eachWord.replace(/[,!?;:.]?$/g, "");
                words.push(eachWord);
            }
            words.push(eachWord);
        }
        return words;
    }

    //a function to stop the animation
    function stopIt() {
        clearInterval(timer);
        timer = null;
        word = 0;
        document.getElementById("output").innerHTML = "";
        document.getElementById("start").disabled = false;
        document.getElementById("mytextarea").disabled = false;
        document.getElementById("stop").disabled = true;
    }

    //a function to change the size
    function changeSize() {
        var wordSize = document.querySelectorAll("input");
        for (var i = 0; i < wordSize.length; i++) {
            if (wordSize[i].checked) {
                document.getElementById("output").style.fontSize = parseInt(wordSize[i].value) + "pt";
            }
        }
    }

    //a function to change the speed
    function changeSpeed() {
        var speeds = document.querySelectorAll("option");
        for (var i = 0; i < speeds.length; i++) {
            if (timer) {
                if (speeds[i].selected) {
                    clearInterval(timer);
                    timer = setInterval(frame, speeds[i].value);
                }
            }
        }
    }
})();