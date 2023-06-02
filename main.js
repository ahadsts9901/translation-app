function translateText(event) {
    event.preventDefault();
    let from = document.getElementById('source-language').value;
    let to = document.getElementById('target-language').value;
    let input = document.getElementById('user-input').value;
    let output = document.getElementById('user-output');

    let apiUrl = `https://api.mymemory.translated.net/get?q=${input}&langpair=${from}|${to}`;

    if (input === "") {
        output.innerText = 'Type Some Text ...';
    } else {
        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                console.log(data.responseData);
                output.innerText = data.responseData.translatedText;
                speakPara(data.responseData.translatedText, to); // Speak the translated text with the target language
            });
    }
}

function copyInput() {
    var copyText = document.getElementById("user-input");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
}

function copyPara() {
    var copyText = document.getElementById("user-output");
    var textToCopy = copyText.innerText;
    navigator.clipboard.writeText(textToCopy);
}

function speakInput() {
    var inputText = document.getElementById("user-input").value;
    speakText(inputText, document.getElementById("source-language").value);
}

function speakPara(text, lang) {
    speakText(text, lang);
}

function speakText(text, lang) {
    if ('speechSynthesis' in window) {
        var speech = new SpeechSynthesisUtterance();
        speech.text = text;
        speech.lang = lang;
        speech.volume = 1;
        speech.rate = 1;
        speech.pitch = 1;

        // Select voice for specific languages
        speech.voice = getVoiceForLanguage(lang);

        window.speechSynthesis.speak(speech);
    } else {
        alert('Text-to-speech is not supported in this browser.');
    }
}

function getVoiceForLanguage(lang) {
    var voices = speechSynthesis.getVoices();
    var voice = voices.find(v => v.lang === lang);

    // Fallback to the default voice if the specific language voice is not found
    if (!voice) {
        voice = voices.find(v => v.lang === 'default');
    }

    return voice;
}