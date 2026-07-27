/**
 * Keyword Density Checker — Tool Logic
 * Counts keyword occurrences and calculates density percentage.
 */
(function () {
    'use strict';

    var textInput = document.getElementById('text-input');
    var keywordInput = document.getElementById('keyword-input');
    var checkBtn = document.getElementById('check-btn');
    var clearBtn = document.getElementById('clear-btn');
    var outputArea = document.getElementById('output-area');
    var keywordCountDisplay = document.getElementById('keyword-count');
    var keywordDensityDisplay = document.getElementById('keyword-density');

    function countWords(text) {
        var trimmed = text.trim();
        if (!trimmed) return 0;
        return trimmed.split(/\s+/).length;
    }

    function countOccurrences(text, keyword) {
        if (!keyword || !text) return 0;
        var lowerText = text.toLowerCase();
        var lowerKeyword = keyword.toLowerCase();
        var count = 0;
        var startIndex = 0;
        var foundIndex = lowerText.indexOf(lowerKeyword, startIndex);
        while (foundIndex !== -1) {
            count++;
            startIndex = foundIndex + lowerKeyword.length;
            foundIndex = lowerText.indexOf(lowerKeyword, startIndex);
        }
        return count;
    }

    function checkDensity() {
        var text = textInput.value;
        var keyword = keywordInput.value;

        if (!keyword || !text) {
            outputArea.style.display = 'none';
            return;
        }

        var totalWords = countWords(text);
        var keywordCount = countOccurrences(text, keyword);
        var density = totalWords > 0 ? ((keywordCount / totalWords) * 100) : 0;

        keywordCountDisplay.textContent = keywordCount;
        keywordDensityDisplay.textContent = density.toFixed(2) + '%';
        outputArea.style.display = 'block';
    }

    function clearAll() {
        textInput.value = '';
        keywordInput.value = '';
        outputArea.style.display = 'none';
        keywordCountDisplay.textContent = '0';
        keywordDensityDisplay.textContent = '0%';
        textInput.focus();
    }

    checkBtn.addEventListener('click', checkDensity);
    clearBtn.addEventListener('click', clearAll);

})();
