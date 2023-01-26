function submitText() {
    const inputText = document.getElementById('input-text').value;
    const additionalText = "Write 4 multiple choice questions in the language of the text to test reading comprehension of the following text. After the 4 questions, append the correct answers";
    const text = inputText + additionalText;

    fetch('/text', {
        method: 'POST',
        body: JSON.stringify({ text: text }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(data => {
        // Handle the response from the server
    })
    .catch(error => console.error('Error:', error));
}
