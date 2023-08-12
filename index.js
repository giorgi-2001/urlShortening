const burger = document.querySelector('.burger');
const navbar = document.querySelector('.navbar-container');
const form = document.querySelector('form');
const linkList = document.querySelector('.link-container');
const getStarted = document.getElementById('get-started');
const addLink = document.getElementById('add-link');


// main events

document.addEventListener('click', e => {
    
    if (e.target.closest('div') !== burger && e.target.closest('div') === navbar) return;
    if (e.target.closest('div') !== burger && 
    e.target.parentElement.closest('div') === navbar) return;
    if (e.target.closest('div') !== burger && 
    e.target.parentElement.classList.contains('login')) return;

    if (e.target.closest('div') === burger && !navbar.classList.contains('active')){
        navbar.classList.add('active');
    } else if (navbar.classList.contains('active')){
        navbar.classList.remove('active');
    }
})


form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validateForm()) return;
    getLink();
})

linkList.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        const getLink = e.target.parentElement.querySelector('.short-link').textContent;
        navigator.clipboard.writeText(getLink);
    }
}) 

getStarted.addEventListener('click', () => {
    const links = document.querySelectorAll('.link')
    links.forEach(link => {
        link.remove();
    })

    saveData();
})


// functions


const getLink = async () => {

    const url = 'https://api.shrtco.de/v2/shorten?url=';

    const res = await fetch(url + addLink.value, {
        method: "GET"
    });
    const data = await res.json();
    const shortLink = data.result.full_short_link3;
    const longLink = data.result.original_link;
    console.log(data);

    if(data) {
        const div = document.createElement('div');
        div.classList.add('link');
        const div1 = document.createElement('div');
        div1.classList.add('long-link');
        const div2 = document.createElement('div');
        div2.classList.add('short-link');
        const button = document.createElement('button');
        button.classList.add('rectangular-btn');

        div1.textContent = longLink;
        div2.textContent = shortLink;
        button.textContent = 'Copy';

        div.appendChild(div1);
        div.appendChild(div2);
        div.appendChild(button);
        linkList.appendChild(div);

        addLink.value = '';

        saveData();
    }
}


// form validation

const validateForm = () => {
    let formIsValid
    if (addLink.value === '') {
        addLink.closest('form').classList.add('error');
        formIsValid = false;
    } else {
        addLink.closest('form').classList.remove('error');
        formIsValid = true;
    }

    return formIsValid;
}


const saveData = () => {localStorage.setItem('linkData', linkList.innerHTML)};
const getData = () => {linkList.innerHTML = localStorage.getItem('linkData')};


getData();