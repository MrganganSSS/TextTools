/**
 * Most Frequent Words — Tool Logic
 * Finds the top 10 most frequent words in the given text.
 */
(function () {
    'use strict';

    var textInput = document.getElementById('text-input');
    var findBtn = document.getElementById('find-btn');
    var clearBtn = document.getElementById('clear-btn');
    var emptyState = document.getElementById('empty-state');
    var freqList = document.getElementById('freq-list');

    /**
     * Counts word frequencies in the given text.
     * Splits by whitespace, counts occurrences using an object.
     */
    function countFrequencies(text) {
        var trimmed = text.trim();
        if (!trimmed) return null;

        var words = trimmed.split(/\s+/);
        var counts = {};
        var i;

        for (i = 0; i < words.length; i++) {
            var word = words[i].toLowerCase();
            if (word.length > 0) {
                if (counts[word]) {
                    counts[word] = counts[word] + 1;
                } else {
                    counts[word] = 1;
                }
            }
        }

        var freqArray = [];
        for (var key in counts) {
            if (counts.hasOwnProperty(key)) {
                freqArray.push({ word: key, count: counts[key] });
            }
        }

        freqArray.sort(function (a, b) {
            return b.count - a.count;
        });

        return freqArray.slice(0, 10);
    }

    /**
     * Renders the frequency results as a list.
     */
    function renderResults(topWords) {
        freqList.innerHTML = '';

        if (!topWords || topWords.length === 0) {
            emptyState.style.display = 'block';
            freqList.style.display = 'none';
            return;
        }

        emptyState.style.display = 'none';
        freqList.style.display = 'block';

        var maxCount = topWords[0].count;

        for (var i = 0; i < topWords.length; i++) {
            var li = document.createElement('li');
            li.className = 'freq-item';

            var barWidth = Math.round((topWords[i].count / maxCount) * 100);

            li.innerHTML =
                '<span class="freq-item__rank">' + (i + 1) + '</span>' +
                '<div style="flex:1">' +
                    '<div style="display:flex;align-items:center;justify-content:space-between">' +
                        '<span class="freq-item__word">' + escapeHtml(topWords[i].word) + '</span>' +
                        '<span class="freq-item__count">' + topWords[i].count + '</span>' +
                    '</div>' +
                    '<div class="freq-item__bar">' +
                        '<div class="freq-item__bar-fill" style="width:' + barWidth + '%"></div>' +
                    '</div>' +
                '</div>';

            freqList.appendChild(li);
        }
    }

    /**
     * Escapes HTML entities to prevent XSS.
     */
    function escapeHtml(text) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(text));
        return div.innerHTML;
    }

    /**
     * Updates the display with the most frequent words.
     */
    function updateResult() {
        var topWords = countFrequencies(textInput.value);
        renderResults(topWords);
    }

    /**
     * Clears the textarea and resets the result.
     */
    function clearText() {
        textInput.value = '';
        emptyState.style.display = 'block';
        freqList.style.display = 'none';
        freqList.innerHTML = '';
        textInput.focus();
    }

    // Event listeners
    findBtn.addEventListener('click', updateResult);
    clearBtn.addEventListener('click', clearText);

})();
