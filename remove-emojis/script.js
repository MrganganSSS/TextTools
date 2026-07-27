(function () {
    'use strict';

    var textInput = document.getElementById('text-input');
    var textOutput = document.getElementById('text-output');
    var processBtn = document.getElementById('process-btn');
    var clearBtn = document.getElementById('clear-btn');
    var copyBtn = document.getElementById('copy-btn');

    function removeEmojis(text) {
        var result = '';
        for (var i = 0; i < text.length; i++) {
            var code = text.charCodeAt(i);
            if (code === 0x200D) continue;
            if (code === 0xFE0F) continue;
            if (code === 0x20E3) continue;
            if (code >= 0xE0020 && code <= 0xE007F) continue;
            if (code >= 0x2600 && code <= 0x27BF) continue;
            var hi = code;
            var lo = (i + 1 < text.length) ? text.charCodeAt(i + 1) : 0;
            if (hi >= 0xD800 && hi <= 0xDBFF && lo >= 0xDC00 && lo <= 0xDFFF) {
                var cp = (hi - 0xD800) * 0x400 + (lo - 0xDC00) + 0x10000;
                if (cp >= 0x1F600 && cp <= 0x1F64F) { i++; continue; }
                if (cp >= 0x1F300 && cp <= 0x1F5FF) { i++; continue; }
                if (cp >= 0x1F680 && cp <= 0x1F6FF) { i++; continue; }
                if (cp >= 0x1F1E0 && cp <= 0x1F1FF) { i++; continue; }
                if (cp >= 0x1F900 && cp <= 0x1F9FF) { i++; continue; }
                if (cp >= 0x1FA00 && cp <= 0x1FA6F) { i++; continue; }
                if (cp >= 0x1FA70 && cp <= 0x1FAFF) { i++; continue; }
                i++;
                result += text.charAt(i);
                continue;
            }
            result += text.charAt(i);
        }
        return result;
    }

    function processText() {
        var result = removeEmojis(textInput.value);
        textOutput.value = result;
    }

    function clearText() {
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
