/**
 * Reading Time Calculator — Tool Logic
 * Estimates reading time based on 200 words per minute.
 */
(function () {
    'use strict';

    var textInput = document.getElementById('text-input');
    var readingTimeDisplay = document.getElementById('reading-time');
    var clearBtn = document.getElementById('clear-btn');
    var WORDS_PER_MINUTE = 200;

    /**
     * Counts words in the given text.
     */
    function countWords(text) {
        var trimmed = text.trim();
        if (!trimmed) return 0;
        return trimmed.split(/\s+/).length;
    }

    /**
     * Calculates reading time in minutes.
     * Returns 0 for empty text, otherwise rounds up.
     */
    function calculateReadingTime(text) {
        var wordCount = countWords(text);
        if (wordCount === 0) return 0;
        return Math.ceil(wordCount / WORDS_PER_MINUTE);
    }

    /**
     * Updates the reading time display.
     */
    function updateReadingTime() {
        var minutes = calculateReadingTime(textInput.value);
        var label = minutes === 1 ? 'min read' : 'mins read';
        readingTimeDisplay.textContent = minutes + ' ' + label;
    }

    /**
     * Clears the textarea and resets the reading time.
     */
    function clearText() {
        textInput.value = '';
        updateReadingTime();
        textInput.focus();
    }

    // Event listeners
    textInput.addEventListener('input', updateReadingTime);
    clearBtn.addEventListener('click', clearText);

    // Initialize on load
    updateReadingTime();

})();
