(function () {
    'use strict';
    var textInput = document.getElementById('text-input');
    var textOutput = document.getElementById('text-output');
    var processBtn = document.getElementById('process-btn');
    var clearBtn = document.getElementById('clear-btn');
    var copyBtn = document.getElementById('copy-btn');
    var justifyWidth = document.getElementById('justify-width');

    function justifyText(text, width) {
        var paragraphs = text.split(/\n\s*\n/);
        var result = [];
        for (var p = 0; p < paragraphs.length; p++) {
            var words = paragraphs[p].replace(/\n/g, ' ').split(/\s+/);
            var lines = [];
            var currentLine = '';
            for (var i = 0; i < words.length; i++) {
                var testLine = currentLine.length === 0 ? words[i] : currentLine + ' ' + words[i];
                if (testLine.length > width && currentLine.length > 0) {
                    lines.push(currentLine);
                    currentLine = words[i];
                } else {
                    currentLine = testLine;
                }
            }
            if (currentLine.length > 0) {
                lines.push(currentLine);
            }
            for (var j = 0; j < lines.length; j++) {
                if (j < lines.length - 1 && lines[j].length < width) {
                    var lineWords = lines[j].split(' ');
                    if (lineWords.length > 1) {
                        var totalSpaces = width - lines[j].length + (lineWords.length - 1);
                        var spacesPerGap = Math.floor(totalSpaces / (lineWords.length - 1));
                        var extraSpaces = totalSpaces % (lineWords.length - 1);
                        var justified = '';
                        for (var k = 0; k < lineWords.length; k++) {
                            justified += lineWords[k];
                            if (k < lineWords.length - 1) {
                                var sp = spacesPerGap + (k < extraSpaces ? 1 : 0);
                                for (var s = 0; s < sp; s++) {
                                    justified += ' ';
                                }
                            }
                        }
                        lines[j] = justified;
                    }
                }
            }
            result.push(lines.join('\n'));
        }
        return result.join('\n\n');
    }

    function processText() {
        var width = parseInt(justifyWidth.value, 10) || 80;
        textOutput.value = justifyText(textInput.value, width);
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
