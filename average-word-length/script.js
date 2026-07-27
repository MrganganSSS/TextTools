/**
 * Average Word Length — Tool Logic
 * Calculates the average character length of words in real-time.
 */
(function () {
    'use strict';

    var textInput = document.getElementById('text-input');
    var avgLengthDisplay = document.getElementById('avg-length');
    var clearBtn = document.getElementById('clear-btn');

    function calculateAverage() {
        var text = textInput.value;
        var trimmed = text.trim();

        if (!trimmed) {
            avgLengthDisplay.textContent = '0 chars';
            return;
        }

        var words = trimmed.split(/\s+/);
        var totalLength = 0;
        for (var i = 0; i < words.length; i++) {
            totalLength += words[i].length;
        }
        var average = (totalLength / words.length).toFixed(1);
        avgLengthDisplay.textContent = average + ' chars';
    }

    function clearText() {
        textInput.value = '';
        calculateAverage();
        textInput.focus();
    }

    textInput.addEventListener('input', calculateAverage);
    clearBtn.addEventListener('click', clearText);

    calculateAverage();

})();
