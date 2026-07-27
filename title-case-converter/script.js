/**
 * Title Case Converter — Tool Logic
 * Converts text to proper title case, handling small words correctly.
 */
(function () {
    'use strict';

    var SMALL_WORDS = ['a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of'];

    var textInput = document.getElementById('text-input');
    var textOutput = document.getElementById('text-output');
    var convertBtn = document.getElementById('convert-btn');
    var clearBtn = document.getElementById('clear-btn');
    var copyBtn = document.getElementById('copy-btn');

    function toTitleCase(text) {
        var words = text.split(/\s+/);
        var result = [];

        for (var i = 0; i < words.length; i++) {
            var word = words[i];
            if (!word) {
                result.push('');
                continue;
            }

            var lower = word.toLowerCase();

            // Always capitalize first and last word
            if (i === 0 || i === words.length - 1) {
                result.push(word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
            } else if (SMALL_WORDS.indexOf(lower) !== -1) {
                result.push(lower);
            } else {
                result.push(word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
            }
        }

        return result.join(' ');
    }

    function handleConvert() {
        textOutput.value = toTitleCase(textInput.value);
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

    convertBtn.addEventListener('click', handleConvert);
    clearBtn.addEventListener('click', handleClear);
    copyBtn.addEventListener('click', handleCopy);

})();
