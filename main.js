function translateText(event) {

    event.preventDefault()
    let from = document.getElementById('source-language').value
    let to = document.getElementById('target-language').value
    let input = document.getElementById('user-input').value
    let output = document.getElementById('user-output')

    let apiUrl = `https://api.mymemory.translated.net/get?q=${input}&langpair=${from}|${to}`;

    if (input === "") {
        output.innerText = 'Type Some Text ...'
    } else {
        fetch(apiUrl).then(res => res.json()).then(data => {

            console.log(data.responseData)
            output.innerText = data.responseData.translatedText;
        });
    }

}