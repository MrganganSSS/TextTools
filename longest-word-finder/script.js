/**
 * Longest Word Finder — Tool Logic
 * Finds the longest word(s) in the given text.
 */
(function () {
    'use strict';

    var textInput = document.getElementById('text-input');
    var findBtn = document.getElementById('find-btn');
    var clearBtn = document.getElementById('clear-btn');
    var longestWord = document.getElementById('longest-word');
    var longestLength = document.getElementById('longest-length');

    /**
     * Finds the longest word(s) in the given text.
     * Splits by whitespace, finds max length, filters words with that length.
     */
    function findLongest(text) {
        var trimmed = text.trim();
        if (!trimmed) return null;

        var words = trimmed.split(/\s+/);
        var maxLength = 0;
        var i;

        for (i = 0; i < words.length; i++) {
            if (words[i].length > maxLength) {
                maxLength = words[i].length;
            }
        }

        var longest = [];
        for (i = 0; i < words.length; i++) {
            if (words[i].length === maxLength) {
                if (longest.indexOf(words[i]) === -1) {
                    longest.push(words[i]);
                }
            }
        }

        return { words: longest, length: maxLength };
    }

    /**
     * Updates the display with the longest word(s).
     */
    function updateResult() {
        var result = findLongest(textInput.value);

        if (!result) {
            longestWord.textContent = '—';
            longestLength.textContent = 'Enter text to find longest word';
            return;
        }

        longestWord.textContent = result.words.join(', ');

        if (result.words.length === 1) {
            longestLength.textContent = result.length + ' characters';
        } else {
            longestLength.textContent = result.words.length + ' words found, ' + result.length + ' characters each';
        }
    }

    /**
     * Clears the textarea and resets the result.
     */
    function clearText() {
        textInput.value = '';
        longestWord.textContent = '—';
        longestLength.textContent = 'Enter text to find longest word';
        textInput.focus();
    }

    // Event listeners
    findBtn.addEventListener('click', updateResult);
    clearBtn.addEventListener('click', clearText);

})();
