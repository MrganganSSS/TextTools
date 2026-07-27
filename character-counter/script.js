/**
 * Character Counter — Tool Logic
 * Counts characters in real-time as the user types or pastes text.
 */
(function () {
    'use strict';

    var textInput = document.getElementById('text-input');
    var charCountDisplay = document.getElementById('char-count');
    var clearBtn = document.getElementById('clear-btn');

    /**
     * Counts characters in the given text.
     */
    function countCharacters(text) {
        return text.length;
    }

    /**
     * Updates the character count display.
     */
    function updateCount() {
        var count = countCharacters(textInput.value);
        charCountDisplay.textContent = count;
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
