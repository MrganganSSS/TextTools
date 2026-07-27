/**
 * Speaking Time Calculator — Tool Logic
 * Estimates speaking time based on 150 words per minute.
 */
(function () {
    'use strict';

    var SPEAKING_RATE = 150; // words per minute

    var textInput = document.getElementById('text-input');
    var speakingTimeDisplay = document.getElementById('speaking-time');
    var clearBtn = document.getElementById('clear-btn');

    function countWords(text) {
        var trimmed = text.trim();
        if (!trimmed) return 0;
        return trimmed.split(/\s+/).length;
    }

    function updateSpeakingTime() {
        var wordCount = countWords(textInput.value);
        var minutes = Math.ceil(wordCount / SPEAKING_RATE);
        speakingTimeDisplay.textContent = minutes + ' min';
    }

    function clearText() {
        textInput.value = '';
        updateSpeakingTime();
        textInput.focus();
    }

    textInput.addEventListener('input', updateSpeakingTime);
    clearBtn.addEventListener('click', clearText);

    updateSpeakingTime();

})();
