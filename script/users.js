import callApiFetch from './callApi.js';
import handlerStorage from './handlerStorage.js';

const url = 'https://jsonplaceholder.typicode.com/users';
const handlerStorageData = new handlerStorage();
const storageState = handlerStorageData.getDataFromLocal('usersData') || null;
const dc = document;

function printInterfaceList(data, callBackPrint = stylize) {
    const list = document.createElement('ul');

    if (data) {
        data.map(({ name, email, id }) => {

            const li = dc.createElement('li');
            const link = dc.createElement('a');
            const p1 = dc.createElement('p');
            const p2 = dc.createElement('p');
            const text1 = dc.createTextNode(name);
            const text2 = dc.createTextNode(email);

            p1.appendChild(text1);
            p2.appendChild(text2);
            link.appendChild(p1);
            link.appendChild(p2);

            link.id = id;
            link.href = `detail.html?id=${id}`;
            link.title = `detail.html?id=${id}`;
            link.setAttribute('_blank', 'self');

            li.appendChild(link);
            list.appendChild(li);

        });

        dc.querySelector('#main').appendChild(list);
        callBackPrint();
    }
};

function stylize() {
    const list = dc.querySelector('ul');
    const item = dc.querySelectorAll('li');
    const link = dc.querySelectorAll('a');
    const sndParaph = dc.querySelectorAll('a > p:nth-child(2)');

    if (!dc.querySelector('.list')) {
        list.classList.add('list');
        for (let i = 0; i < link.length; i++) {
            item[i].classList.add(`item-${i + 1}`)
            link[i].classList.add('link');
            sndParaph[i].classList.add('snd-p');
        }
    }
};

function searchFilter(data) {
    const input = dc.querySelector('input');
    const classHidden = 'hidden';
    let inputValue;
    input.addEventListener('input', (e) => {
        inputValue = e.target.value.toLowerCase();
        data.map(({ name, email, id }) => {
            const isVisible = name.toLowerCase().includes(inputValue) || email.toLowerCase().includes(inputValue);
            dc.querySelector(`.item-${id}`).classList.toggle(classHidden, !isVisible);
        });
    });
}

function callApiExecuteAndSaveInStorage(url) {
    callApiFetch(url)
        .then(res => {
            printInterfaceList(res);
            searchFilter(res);
            handlerStorageData.setDataInLocal('usersData', res);
        });
}

function animateElementByScroll() {
    let scrollInit = window.scrollY;
    const element = document.querySelector('form');
    window.addEventListener('scroll', () => {
        let scrollCurrent = window.scrollY;
        element.classList.toggle('anima', scrollInit < scrollCurrent);
        scrollInit = scrollCurrent;        
    });
}

function init() {
    if (!storageState) {
        callApiExecuteAndSaveInStorage(url);
    } else {
        printInterfaceList(handlerStorageData.getDataParseFromLocal('usersData'));
        searchFilter(handlerStorageData.getDataParseFromLocal('usersData'));
    }
    animateElementByScroll();
};

//window.addEventListener('DOMContentLoaded', () => {}); //defer attr in script tag
init();
