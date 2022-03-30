
import callApiFetch from './callApi.js';
import responsabilityChainAppendChild from './responsChain.js';
import handlerStorage from './handlerStorage.js';

const urlSearch = new URLSearchParams(window.location.search);
const id = urlSearch.get('id');
const url = `https://jsonplaceholder.typicode.com/users/${id}`;
const handlerStorageData = new handlerStorage();
const storageState = handlerStorageData.getDataFromLocal('userDetail') || null;
const dc = document;

function getIdFormLocalStorage() {
    if (storageState) {
        const { id:idLocal } = handlerStorageData.getDataParseFromLocal('userDetail');
        return  idLocal === Number(id);        
    }
}

function printInterfaceDetail(data) {
    if(!data) {
        print404();
    }
    else {
        const {name, username, email, phone} = data;
        const container = dc.createElement('div');
        container.classList.add('container');
    
        const p1 = dc.createElement('p');
        const p2 = dc.createElement('p');
        const p3 = dc.createElement('p');
        const p4 = dc.createElement('p');
        const text1 = dc.createTextNode(`name: ${name}`);
        const text2 = dc.createTextNode(`username: ${username}`);
        const text3 = dc.createTextNode(`email: ${email}`);
        const text4 = dc.createTextNode(`phone: ${phone}`);
    
        p1.appendChild(text1);
        p2.appendChild(text2);
        p3.appendChild(text3);
        p4.appendChild(text4);
    
        const elementContainer = new responsabilityChainAppendChild(container);
    
        elementContainer
            .appendChildElement(p1)
            .appendChildElement(p2)
            .appendChildElement(p3)
            .appendChildElement(p4);
    
        dc.querySelector('.loading').remove();
        dc.querySelector('#main').appendChild(container);     
    } 
};

function print404() {
    const error = dc.createElement('p');
    const text = dc.createTextNode('Error 404, user not found');

    error.appendChild(text);
    dc.querySelector('#main').appendChild(error);
    dc.querySelector('.loading').remove();
};

function callApiExecuteAndSaveInStorage(url) {
    callApiFetch(url)
        .then(res => {
            printInterfaceDetail(res);
            if (res) {
                handlerStorageData.setDataInLocal('userDetail', res);
                }
            });  
}

function init() {
    const idLocal = getIdFormLocalStorage();

    if (!storageState || !idLocal) {
        setTimeout(() => {
            callApiExecuteAndSaveInStorage(url);
        }, 300);
    } else {
        printInterfaceDetail(handlerStorageData.getDataParseFromLocal('userDetail'));
    }
};

//window.addEventListener('DOMContentLoaded', () => {}); //defer attr in script tag
init();


