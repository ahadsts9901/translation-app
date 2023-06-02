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
                speakPara(data.responseData.translatedText); // Speak the translated text
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
    speakText(inputText);
}

function speakPara() {
    var outputText = document.getElementById("user-output").innerText;
    speakText(outputText);
}

function speakText(text) {
    if ('speechSynthesis' in window) {
        var speech = new SpeechSynthesisUtterance();
        speech.text = text;
        speech.volume = 1;
        speech.rate = 1;
        speech.pitch = 1;
        window.speechSynthesis.speak(speech);
    } else {
        alert('Text-to-speech is not supported in this browser.');
    }
}