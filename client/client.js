console.log('hellow world');

const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const API_URL = 'http://localhost:5000/mytwitter';


loadingElement.style.display = 'none';

function eraseText() {
    document.getElementById("name").value = "";
    document.getElementById("content").value = "";
}

form.addEventListener('submit', (event) => {
    event.preventDefault(); // prevents the text to get disappeared from the console
    //console.log('form submited!');
    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('content');

    const newComment = {
        name,
        content
    };
    console.log(newComment);

    form.style.display = 'none';
    loadingElement.style.display = '';

    fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(newComment),
            headers: {
                'content-type': 'application/json'
            }


        }).then(response => response.json())
        .then(createdComment => {
            console.log(createdComment);

        });
    // eraseText();
});