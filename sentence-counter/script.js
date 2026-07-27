/**
 * Sentence Counter — Tool Logic
 * Counts sentences in real-time as the user types or pastes text.
 * Sentences are detected by ending with . ! ? followed by whitespace or end of string.
 */
(function () {
    'use strict';

    var textInput = document.getElementById('text-input');
    var sentenceCountDisplay = document.getElementById('sentence-count');
    var clearBtn = document.getElementById('clear-btn');

    /**
     * Counts sentences in the given text.
     * Matches sentence-ending punctuation (. ! ?) followed by whitespace or end of string.
     * Returns 1 for any non-empty text that doesn't end with sentence punctuation.
     */
    function countSentences(text) {
        var trimmed = text.trim();
        if (!trimmed) return 0;

        // Match sentences ending with . ! ? followed by whitespace or end of string
        var matches = trimmed.match(/[.!?]+(?=\s|$)/g);
        if (!matches) return 0;

        return matches.length;
    }

    /**
     * Updates the sentence count display.
     */
    function updateCount() {
        var count = countSentences(textInput.value);
        sentenceCountDisplay.textContent = count;
    }

    /**
     * Clears the textarea and resets the count.
     */
    function clearText() {
        textInput.value = '';
        updateCount();
        textInput.focus();
    }

    // Event listeners
    textInput.addEventListener('input', updateCount);
    clearBtn.addEventListener('click', clearText);

    // Initialize count on load
    updateCount();

})();
