(function () {
    'use strict';
    var textInput = document.getElementById('text-input');
    var textOutput = document.getElementById('text-output');
    var processBtn = document.getElementById('process-btn');
    var clearBtn = document.getElementById('clear-btn');
    var copyBtn = document.getElementById('copy-btn');
    var wordMappings = document.getElementById('word-mappings');

    function replaceMultipleWords(text, mappings) {
        var lines = mappings.split('\n');
        var result = text;
        for (var i = 0; i < lines.length; i++) {
            var parts = lines[i].split('=');
            if (parts.length >= 2) {
                var find = parts[0].trim();
                var replace = parts.slice(1).join('=').trim();
                if (find) {
                    var escaped = find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    result = result.replace(new RegExp(escaped, 'gi'), replace);
                }
            }
        }
        return result;
    }

    function processText() {
        textOutput.value = replaceMultipleWords(textInput.value, wordMappings.value);
    }

    function clearText() {
        textInput.value = '';
        textOutput.value = '';
        wordMappings.value = '';
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

    function copyToClipboard() {
        if (!textOutput.value) return;
        var text = textOutput.value;
        function onSuccess() {
            copyBtn.textContent = 'Copied!';
            setTimeout(function () {
                copyBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy to Clipboard';
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

    processBtn.addEventListener('click', processText);
    clearBtn.addEventListener('click', clearText);
    copyBtn.addEventListener('click', copyToClipboard);
})();