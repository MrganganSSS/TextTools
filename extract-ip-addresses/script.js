(function () {
    'use strict';
    var textInput = document.getElementById('text-input');
    var textOutput = document.getElementById('text-output');
    var processBtn = document.getElementById('process-btn');
    var clearBtn = document.getElementById('clear-btn');
    var copyBtn = document.getElementById('copy-btn');

    function extractIpAddresses(text) {
        var ipv4 = text.match(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g);
        var ipv6 = text.match(/\b(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}\b/g);
        var all = [];
        if (ipv4) all = all.concat(ipv4);
        if (ipv6) all = all.concat(ipv6);
        return all.length > 0 ? all.join('\n') : '';
    }

    function processText() {
        textOutput.value = extractIpAddresses(textInput.value);
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
