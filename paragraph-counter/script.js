/**
 * Paragraph Counter — Tool Logic
 * Counts paragraphs in real-time as the user types or pastes text.
 */
(function () {
    'use strict';

    var textInput = document.getElementById('text-input');
    var paragraphCountDisplay = document.getElementById('paragraph-count');
    var clearBtn = document.getElementById('clear-btn');

    /**
     * Counts paragraphs in the given text.
     * Splits by blank lines and filters out empty blocks.
     */
    function countParagraphs(text) {
        var trimmed = text.trim();
        if (!trimmed) return 0;
        var blocks = trimmed.split(/\n\s*\n/);
        var count = 0;
        for (var i = 0; i < blocks.length; i++) {
            if (blocks[i].trim()) count++;
        }
        return count;
    }

    /**
     * Updates the paragraph count display.
     */
    function updateCount() {
        var count = countParagraphs(textInput.value);
        paragraphCountDisplay.textContent = count;
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
