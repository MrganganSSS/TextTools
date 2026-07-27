/**
 * Duplicate Word Finder — Tool Logic
 * Detects repeated words in the given text.
 */
(function () {
    'use strict';

    var textInput = document.getElementById('text-input');
    var findBtn = document.getElementById('find-btn');
    var clearBtn = document.getElementById('clear-btn');
    var emptyState = document.getElementById('empty-state');
    var dupList = document.getElementById('dup-list');

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

        return counts;
    }

    /**
     * Finds duplicate words (count > 1) and returns them sorted by frequency.
     */
    function findDuplicates(text) {
        var counts = countFrequencies(text);
        if (!counts) return null;

        var duplicates = [];
        for (var key in counts) {
            if (counts.hasOwnProperty(key)) {
                if (counts[key] > 1) {
                    duplicates.push({ word: key, count: counts[key] });
                }
            }
        }

        duplicates.sort(function (a, b) {
            return b.count - a.count;
        });

        return duplicates;
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
     * Renders the duplicate results as a list.
     */
    function renderResults(duplicates) {
        dupList.innerHTML = '';

        if (!duplicates || duplicates.length === 0) {
            emptyState.textContent = 'No duplicate words found!';
            emptyState.style.display = 'block';
            dupList.style.display = 'none';
            return;
        }

        emptyState.style.display = 'none';
        dupList.style.display = 'block';

        var totalDuplicates = 0;

        for (var i = 0; i < duplicates.length; i++) {
            var li = document.createElement('li');
            li.className = 'dup-item';

            var countLabel = duplicates[i].count + ' times';

            li.innerHTML =
                '<span class="dup-item__icon" aria-hidden="true">' +
                    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                        '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>' +
                        '<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>' +
                    '</svg>' +
                '</span>' +
                '<span class="dup-item__word">' + escapeHtml(duplicates[i].word) + '</span>' +
                '<span class="dup-item__count">' + countLabel + '</span>';

            dupList.appendChild(li);
            totalDuplicates += duplicates[i].count;
        }

        var summary = document.createElement('div');
        summary.className = 'dup-summary';
        summary.textContent = duplicates.length + ' duplicate word' + (duplicates.length === 1 ? '' : 's') + ' found (' + totalDuplicates + ' total occurrences)';
        dupList.parentNode.appendChild(summary);
    }

    /**
     * Updates the display with the duplicate words.
     */
    function updateResult() {
        var existingSummary = document.querySelector('.dup-summary');
        if (existingSummary) {
            existingSummary.parentNode.removeChild(existingSummary);
        }

        var duplicates = findDuplicates(textInput.value);
        renderResults(duplicates);
    }

    /**
     * Clears the textarea and resets the result.
     */
    function clearText() {
        textInput.value = '';
        var existingSummary = document.querySelector('.dup-summary');
        if (existingSummary) {
            existingSummary.parentNode.removeChild(existingSummary);
        }
        emptyState.textContent = 'Enter text above and click "Find Duplicates"';
        emptyState.style.display = 'block';
        dupList.style.display = 'none';
        dupList.innerHTML = '';
        textInput.focus();
    }

    // Event listeners
    findBtn.addEventListener('click', updateResult);
    clearBtn.addEventListener('click', clearText);

})();
