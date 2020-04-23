console.log('hellow world');

const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const API_URL = 'http://localhost:5000/mytwitter';
const commentsElement = document.querySelector('.comments');




loadingElement.style.display = '';


listAllComments();


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

            form.reset();
            setTimeout(() => {

                form.style.display = '';
            }, 30000);

            listAllComments();
            //loadingElement.style.display = 'none';

        });
    // eraseText();
});


function eraseText() {
    document.getElementById("name").value = "";
    document.getElementById("content").value = "";
}

function listAllComments() {
    commentsElement.innerHTML = '';
    fetch(API_URL)
        .then(response => response.json())
        .then(comments => {
            console.log(comments);
            comments.reverse();
            comments.forEach(comment => {
                const div = document.createElement('div');
                const header = document.createElement('h3');
                header.textContent = comment.name;

                const contents = document.createElement('p');
                contents.textContent = comment.content;
                const date = document.createElement('small');
                date.textContent = new Date(comment.created);
                div.appendChild(header);
                div.appendChild(contents);
                div.appendChild(date);


                commentsElement.appendChild(div);

            });
            loadingElement.style.display = 'none';

        });


}