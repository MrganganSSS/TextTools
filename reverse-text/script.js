/**
 * Reverse Text — Tool Logic
 * Reverses text by characters or by words.
 */
(function () {
    'use strict';

    var textInput = document.getElementById('text-input');
    var textOutput = document.getElementById('text-output');
    var reverseCharsBtn = document.getElementById('reverse-chars-btn');
    var reverseWordsBtn = document.getElementById('reverse-words-btn');
    var clearBtn = document.getElementById('clear-btn');
    var copyBtn = document.getElementById('copy-btn');

    function reverseCharacters(text) {
        return text.split('').reverse().join('');
    }

    function reverseWords(text) {
        return text.split(/\s+/).reverse().join(' ');
    }

    function handleReverseChars() {
        textOutput.value = reverseCharacters(textInput.value);
    }

    function handleReverseWords() {
        textOutput.value = reverseWords(textInput.value);
    }

    function handleClear() {
        textInput.value = '';
        textOutput.value = '';
        textInput.focus();
    }

    function fallbackCopy(text) {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(ta);
    }

    function handleCopy() {
        if (!textOutput.value) return;
        var text = textOutput.value;
        function onSuccess() {
            copyBtn.textContent = 'Copied!';
            setTimeout(function () {
                copyBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy Result';
            }, 2000);
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(onSuccess)['catch'](function () {
                fallbackCopy(text);
                onSuccess();
            });
        } else {
            fallbackCopy(text);
            onSuccess();
        }
    }

    reverseCharsBtn.addEventListener('click', handleReverseChars);
    reverseWordsBtn.addEventListener('click', handleReverseWords);
    clearBtn.addEventListener('click', handleClear);
    copyBtn.addEventListener('click', handleCopy);

})();
