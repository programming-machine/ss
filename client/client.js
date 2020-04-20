console.log('hellow world');

const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
loadingElement.style.display = 'none';

form.addEventListener('submit', (event) => {
    event.preventDefault(); // prevents the text to get disappeared from the console
    //console.log('form submited!');
    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('comment');

    const newComment = {
        name,
        content
    };
    console.log(newComment);

    form.style.display = 'none';
    loadingElement.style.display = '';
    eraseText();
});

function eraseText() {
    document.getElementById("name").value = "";
    document.getElementById("content").value = "";
}