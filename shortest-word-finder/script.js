/**
 * Shortest Word Finder — Tool Logic
 * Finds the shortest word(s) in the given text.
 */
(function () {
    'use strict';

    var textInput = document.getElementById('text-input');
    var findBtn = document.getElementById('find-btn');
    var clearBtn = document.getElementById('clear-btn');
    var shortestWord = document.getElementById('shortest-word');
    var shortestLength = document.getElementById('shortest-length');

    /**
     * Finds the shortest word(s) in the given text.
     * Splits by whitespace, finds min length (excluding empty), filters words with that length.
     */
    function findShortest(text) {
        var trimmed = text.trim();
        if (!trimmed) return null;

        var words = trimmed.split(/\s+/);
        var validWords = [];
        var i;

        for (i = 0; i < words.length; i++) {
            if (words[i].length > 0) {
                validWords.push(words[i]);
            }
        }

        if (validWords.length === 0) return null;

        var minLength = validWords[0].length;
        for (i = 1; i < validWords.length; i++) {
            if (validWords[i].length < minLength) {
                minLength = validWords[i].length;
            }
        }

        var shortest = [];
        for (i = 0; i < validWords.length; i++) {
            if (validWords[i].length === minLength) {
                if (shortest.indexOf(validWords[i]) === -1) {
                    shortest.push(validWords[i]);
                }
            }
        }

        return { words: shortest, length: minLength };
    }

    /**
     * Updates the display with the shortest word(s).
     */
    function updateResult() {
        var result = findShortest(textInput.value);

        if (!result) {
            shortestWord.textContent = '—';
            shortestLength.textContent = 'Enter text to find shortest word';
            return;
        }

        shortestWord.textContent = result.words.join(', ');

        if (result.words.length === 1) {
            shortestLength.textContent = result.length + ' character' + (result.length === 1 ? '' : 's');
        } else {
            shortestLength.textContent = result.words.length + ' words found, ' + result.length + ' character' + (result.length === 1 ? '' : 's') + ' each';
        }
    }

    /**
     * Clears the textarea and resets the result.
     */
    function clearText() {
        textInput.value = '';
        shortestWord.textContent = '—';
        shortestLength.textContent = 'Enter text to find shortest word';
        textInput.focus();
    }

    // Event listeners
    findBtn.addEventListener('click', updateResult);
    clearBtn.addEventListener('click', clearText);

})();
