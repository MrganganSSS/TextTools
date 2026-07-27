/**
 * Word Counter — Tool Logic
 * Counts words in real-time as the user types or pastes text.
 */
(function () {
    'use strict';

    var textInput = document.getElementById('text-input');
    var wordCountDisplay = document.getElementById('word-count');
    var clearBtn = document.getElementById('clear-btn');

    /**
     * Counts words in the given text.
     * Splits by whitespace and filters out empty strings.
     */
    function countWords(text) {
        var trimmed = text.trim();
        if (!trimmed) return 0;
        return trimmed.split(/\s+/).length;
    }

    /**
     * Updates the word count display.
     */
    function updateCount() {
        var count = countWords(textInput.value);
        wordCountDisplay.textContent = count;
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
