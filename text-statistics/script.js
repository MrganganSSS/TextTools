/**
 * Text Statistics — Tool Logic
 * Calculates comprehensive text statistics on demand.
 */
(function () {
    'use strict';

    var textInput = document.getElementById('text-input');
    var analyzeBtn = document.getElementById('analyze-btn');
    var clearBtn = document.getElementById('clear-btn');

    var wordCountEl = document.getElementById('word-count');
    var charCountEl = document.getElementById('char-count');
    var charCountSpacesEl = document.getElementById('char-count-spaces');
    var sentenceCountEl = document.getElementById('sentence-count');
    var paragraphCountEl = document.getElementById('paragraph-count');
    var avgWordsSentenceEl = document.getElementById('avg-words-sentence');
    var avgCharsWordEl = document.getElementById('avg-chars-word');

    function countWords(text) {
        var trimmed = text.trim();
        if (!trimmed) return 0;
        return trimmed.split(/\s+/).length;
    }

    function countSentences(text) {
        var trimmed = text.trim();
        if (!trimmed) return 0;
        var matches = trimmed.match(/[.!?]+/g);
        if (!matches) return 0;
        return matches.length;
    }

    function countParagraphs(text) {
        var trimmed = text.trim();
        if (!trimmed) return 0;
        var blocks = trimmed.split(/\n\s*\n/);
        var count = 0;
        for (var i = 0; i < blocks.length; i++) {
            if (blocks[i].trim().length > 0) {
                count++;
            }
        }
        return count;
    }

    function getWordsWithoutSpaces(text) {
        var trimmed = text.trim();
        if (!trimmed) return [];
        return trimmed.split(/\s+/);
    }

    function analyzeText() {
        var text = textInput.value;
        var trimmed = text.trim();

        if (!trimmed) {
            wordCountEl.textContent = '0';
            charCountEl.textContent = '0';
            charCountSpacesEl.textContent = '0';
            sentenceCountEl.textContent = '0';
            paragraphCountEl.textContent = '0';
            avgWordsSentenceEl.textContent = '0';
            avgCharsWordEl.textContent = '0';
            return;
        }

        var words = getWordsWithoutSpaces(text);
        var wordCount = words.length;
        var charCount = trimmed.length;
        var charCountNoSpaces = trimmed.replace(/\s/g, '').length;
        var sentenceCount = countSentences(text);
        var paragraphCount = countParagraphs(text);

        var avgWordsPerSentence = sentenceCount > 0 ? (wordCount / sentenceCount).toFixed(1) : '0';

        var totalCharsInWords = 0;
        for (var i = 0; i < words.length; i++) {
            totalCharsInWords += words[i].length;
        }
        var avgCharsPerWord = wordCount > 0 ? (totalCharsInWords / wordCount).toFixed(1) : '0';

        wordCountEl.textContent = wordCount;
        charCountEl.textContent = charCount;
        charCountSpacesEl.textContent = charCountNoSpaces;
        sentenceCountEl.textContent = sentenceCount;
        paragraphCountEl.textContent = paragraphCount;
        avgWordsSentenceEl.textContent = avgWordsPerSentence;
        avgCharsWordEl.textContent = avgCharsPerWord;
    }

    function clearAll() {
        textInput.value = '';
        wordCountEl.textContent = '0';
        charCountEl.textContent = '0';
        charCountSpacesEl.textContent = '0';
        sentenceCountEl.textContent = '0';
        paragraphCountEl.textContent = '0';
        avgWordsSentenceEl.textContent = '0';
        avgCharsWordEl.textContent = '0';
        textInput.focus();
    }

    analyzeBtn.addEventListener('click', analyzeText);
    clearBtn.addEventListener('click', clearAll);

})();
