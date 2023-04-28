let headerHeight = 80;
let nav = $('header');
$(window).scroll(function () {
    if ($(this).scrollTop() > headerHeight) {
        nav.addClass("header_fixed");
        $('body').addClass('body_fixed');
    } else {
        nav.removeClass("header_fixed");
        $('body').removeClass("body_fixed");
    }
});

let usersDemo = [
    {
        id: 1,
        active: true,
        name: 'Hanna',
        imgPrev: 'img/img_1.png',
        imgBig: 'img/img-big_1.jpg',

    },
    {
        id: 2,
        active: true,
        name: 'Angelika_23',
        imgPrev: 'img/img_2.png',
        imgBig: 'img/img-big_2.png',

    },
    {
        id: 3,
        active: true,
        name: 'Candy',
        imgPrev: 'img/img_3.png',
        imgBig: 'img/img-big_3.jpg',

    },
    {
        id: 4,
        active: true,
        name: 'Jennifer',
        imgPrev: 'img/img_4.png',
        imgBig: 'img/img-big_4.jpg',

    },
    {
        id: 5,
        active: true,
        name: 'Kate',
        imgPrev: 'img/img_5.png',
        imgBig: 'img/img-big_5.jpg',

    },
    {
        id: 6,
        active: true,
        name: 'Alexa',
        imgPrev: 'img/img_6.png',
        imgBig: 'img/img-big_6.jpg',

    },
    {
        id: 7,
        active: true,
        name: 'Cameron',
        imgPrev: 'img/img_7.png',
        imgBig: 'img/img-big_7.jpg',

    },
    {
        id: 8,
        active: true,
        name: 'Chick_0809',
        imgPrev: 'img/img_8.png',
        imgBig: 'img/img-big_8.jpg',

    },
    {
        id: 9,
        active: true,
        name: 'Olivia',
        imgPrev: 'img/img_9.png',
        imgBig: 'img/img-big_9.jpg',

    },
    {
        id: 10,
        active: true,
        name: 'Clair',
        imgPrev: 'img/img_10.jpg',
        imgBig: 'img/img-big_10.jpg',

    },
];
let randomMessages = [
    'Hi sweety! I’m boring...',
    'Hi, darling)',
    'How about coffee?',
    'Hi, i  miss you)',
];
let id = parseInt(getId());
let chatWrapper = $('.chat-detail');
let messagesList = $('.messagesList');
let btnBlockChat =  $('.btnBlockChat');


//------------------------------------------------- Main area ----------------------------------------------------------



resetData();
showCardsList();
showChatDetail();


//--------------------------------------- Service functions area -------------------------------------------------------



function resetData() {
    if (!sessionStorage.getItem('users')) {
        pushToStorage(usersDemo, 'users');
    }
}

function getId(id) {
    let paramsString = document.location.search;
    let searchParams = new URLSearchParams(paramsString);
    id = searchParams.get("id");

    return id;
}

function changeById(id, field, value) {
    users = getFromStorage('users');
    users[id][field] = value;
    pushToStorage(users, 'users');
}

function pushToStorage (data, dataSet) {
    sessionStorage.setItem(dataSet, JSON.stringify(data));
}

function getFromStorage (dataSet) {
    return JSON.parse(sessionStorage.getItem(dataSet));
}

function blockUser(id) {
    changeById(id, 'active', false);
}

function getDialogs() {
    if(!sessionStorage.getItem('dialogs')) {
        pushToStorage([], 'dialogs');
    }

    return getFromStorage('dialogs');
}

function getDialog(id) {
    let dialogs = getDialogs();
    return dialogs.find( elem => elem.id === id);
}

function addToDialog(id, sender, text) {
    let dialogs = getDialogs();
    // let dialog = dialogs[id];
    let dialog = dialogs.find( elem => elem.id === id);
    if(!dialog) {
        dialog = {id: id, messages: []};
        dialogs.push(dialog);
    }
    dialog.messages.push(
        {
            sender: sender,
            message: text,
        }
    )
    dialogs[dialogs.findIndex(el => el.id === dialog.id)] = dialog;
    pushToStorage(dialogs, 'dialogs');

}

function randomData(dataArray) {
    let rand = Math.floor(Math.random() * dataArray.length);
    return dataArray[rand];
}



//------------------------------------------ Content output area -------------------------------------------------------



function showCardsList() {
    let cardsWrap = document.getElementById('cardsWrap');
    let cardItem, imgInner, imgContent, img, buttons, url;

    for (let user of getFromStorage('users')) {
        if(user.active === true) {
            url = `/idating_singles/cards-detail.html?id=${user.id-1}`;
            cardItem = $('<div>', {class: 'card-item', 'data-id': `${user.id-1}`});
            imgInner = $('<a>', {class: 'card-item__image-inner', href: `${url}`});
            imgContent = $('<div>', {class: 'card-item__image-content'});
            img = $('<div>', {class: 'card-item__image', style: `background-image: url(${user.imgPrev});`});
            buttons = $(` <div class="card-item__btn-wrap">
                <button class="btn btn_small btn_outline btn_icon btn_icon_block btnBlock" data-id="${user.id - 1}">
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#2D2F36"
                              d="M8.0006 5.50332L10.8648 2.64089C11.0333 2.46365 11.0333 2.18892 10.8648 2.01168L8.98489 0.132931C8.81641 -0.0443102 8.53265 -0.0443102 8.3553 0.132931L5.5 2.99537L2.62696 0.132931C2.45848 -0.0443102 2.17473 -0.0443102 1.99738 0.132931L0.12636 2.01168C-0.0421201 2.18006 -0.0421201 2.46365 0.12636 2.64089L2.99053 5.50332L0.12636 8.36576C-0.0421201 8.53414 -0.0421201 8.81772 0.12636 8.99496L2.00625 10.8737C2.17473 11.0421 2.45848 11.0421 2.63583 10.8737L5.5 8.01128L8.36417 10.8737C8.53265 11.0421 8.8164 11.0421 8.99375 10.8737L10.8736 8.99496C11.0421 8.81772 11.0421 8.543 10.8736 8.36576L8.0006 5.50332Z"/>
                    </svg>
                    Block
                </button>
                <button class="btn btn_small btn_icon btn_icon_chat btnChat" data-id="${user.id - 1}">
                    <svg width="14" height="15" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill="white"
                              d="M7.00444 0C3.13777 0 0 2.90166 0 5.40763C0 7.15742 1.39555 8.74014 3.25333 9.68977C2.99555 10.4987 2.48 11.6242 1.45778 12.6354C1.32444 12.7673 1.31555 12.8288 1.35111 12.908C1.42222 13.0575 1.59111 12.9959 1.89333 12.9256C3.50222 12.5475 5.34222 11.2637 6.2311 10.5866C6.48888 10.613 6.74666 10.6306 6.99555 10.6306C10.4533 10.6306 14 8.10705 14 5.40763C14.0089 2.95441 10.88 0 7.00444 0ZM4.11555 7.03432C3.36888 7.03432 2.77333 6.4364 2.77333 5.70659C2.77333 4.97678 3.37777 4.37886 4.11555 4.37886C4.85333 4.37886 5.45777 4.97678 5.45777 5.70659C5.44888 6.4364 4.85333 7.03432 4.11555 7.03432ZM7.16444 7.03432C6.42666 7.03432 5.82221 6.4364 5.82221 5.70659C5.82221 4.97678 6.42666 4.37886 7.16444 4.37886C7.90221 4.37886 8.50666 4.97678 8.50666 5.70659C8.49777 6.4364 7.90221 7.03432 7.16444 7.03432ZM10.1422 7.03432C9.40443 7.03432 8.79999 6.4364 8.79999 5.70659C8.79999 4.97678 9.40443 4.37886 10.1422 4.37886C10.88 4.37886 11.4844 4.97678 11.4844 5.70659C11.4844 6.4364 10.88 7.03432 10.1422 7.03432Z"/>
                    </svg>
                    Chat
                </button>
            </div>`);

            $(cardsWrap).append(cardItem);
            $(cardItem).append(imgInner);
            $(imgInner).append(imgContent);
            $(imgContent).append(img);
            $(cardItem).append(buttons);
        }
    }
}

function showCardDetail() {
    users = getFromStorage('users');
    let imgUrl = users[id].imgBig;
    btnBlockDetail.attr('data-id', `${id}`);
    btnChatDetail.attr('data-id', `${id}`);
    cardDetail.attr('data-id', `${id}`);
    $('.card-item__image').css('background-image', `url(${imgUrl})`);
}

function changeDetailPage(id) {
    window.location.href = `/idating_singles/cards-detail.html?id=${id}`;
}

function nextPage(id) {
    let count = getFromStorage('users').length;

    for(let i = id; i <=  count - 1; i++) {
        if(i === count - 1) {
            i = -1;
        }
        if(users[i + 1].active) {
            changeDetailPage(i + 1);

            break;
        }

    }
}

function previousPage(id) {
    let count = getFromStorage('users').length;

    for(let i = id; i >= 0; i--){
        if(i === 0) {
            i = count;
        }
        if( getFromStorage('users')[i - 1].active) {
            changeDetailPage(i - 1);

            break;
        }
    }
}

function openChatPage(id) {
    window.location.href = `/idating_singles/chat-detail.html?id=${id}`;
}

function showChatDetail() {
    if(window.location.href.includes('chat-detail')) {
        let users = getFromStorage('users');
        fillImg(id);
        $('.imgPrev').css('background-image', `url(${users[id].imgPrev})`);
        $('.userName').html(`${users[id].name}`);
        btnBlockChat.attr('data-id', `${id}`);
        chatWrapper.attr('data-id', `${id}`);

        let dialog = getDialog(id);
        if(!dialog) {
            setTimeout(initMessage, 2000);
        } else {
            dialog.messages.forEach(function (e) {
                appendMessage(e.sender, e.message);
            });
        }
    }
}

function chatDetailOnLoad() {
    inputMessage.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
}

function showChatList() {
    let dialogs = getFromStorage('dialogs');
    let users = getFromStorage('users');
    let chatWrap = document.getElementById('chat-list');
    if (dialogs) {
        for (let dialog of dialogs) {
            let id = dialog.id;
            let img = users[id].imgPrev;
            let name = users[id].name;
            let lastMessage = dialog.messages[dialog.messages.length - 1].message;
            let chatItem = `
            <a class="chat-person chat-person_online" href="/idating_singles/chat-detail.html?id=${id}">
          <div>
              <div class="chat-person__img" style='background-image: url(${img})'></div>
          </div>
           <div>
               <div class="chat-person__name">${name}</div>
               <p class="chat-person__text">${lastMessage}</p>
       </div>
    </a>`
            $(chatWrap).append(chatItem);

        }
    }
}

function fillImg(id) {
    let users = getFromStorage('users');
    if (id >= 0 && id < users.length) {
        $('.imgPrev').css('background-image', `url(${users[id].imgPrev})`);
    }
}

function initMessage() {
    let messageInner = randomData(randomMessages);
    appendMessage(id, messageInner);
    addToDialog(id, id, messageInner);
}

function appendMessage(id, messageData) {
    let message;

    if (id < 0) {
        message = `<div class="message-item message-item_myself">
            <div class="message-item__text myMessage">${messageData}</div>
        </div>`
    } else {
        message = `<div class="message-item">
            <div class="message-item__img imgPrev"></div>
            <div class="message-item__text userMessage">${messageData}</div>
        </div>`

    }
    messagesList.append(message);
    fillImg(id);
}

//функція обробки повідомлень та збереження їх у локалсторедж
function sendMessage() {
    let messageText = inputMessage.value;
    appendMessage(-1, messageText);
    addToDialog(id, -1, messageText);
    inputMessage.value = '';
}



//------------------------------------------- Event handlers area ------------------------------------------------------


let btnChatDetail =  $('.btnChat');
let cardDetail = $('.cardDetail');
let prevCardArrow = $('.prevCard');
let nextCardArrow = $('.nextCard');
let inputMessage = document.getElementById('messageInput');
let btnBlockDetail =  $('.btnBlockDetail');


// block user
$('.btnBlock').on('click', function() {
    let thisBut = $(this);
    let id = thisBut.data('id');
    thisBut.closest('.card-item').remove();
    blockUser(id);
});

btnBlockDetail.on('click', function() {
    let thisBut = $(this);
    let id = thisBut.data('id');
    blockUser(id);
    nextPage(id);
});

btnBlockChat.on('click', function() {
    let thisBut = $(this);
    let id = thisBut.data('id');
    blockUser(id);
    window.location.href = `/idating_singles/chat-list.html`;

});

prevCardArrow.on('click', function () {
    let id = cardDetail.data('id');
    previousPage(id);

});

nextCardArrow.on('click', function () {
    let id = cardDetail.data('id');
    nextPage(id);
});

btnChatDetail.on('click', function () {
    let thisBut = $(this);
    let id = thisBut.data('id');
    openChatPage(id);
});

$('.btnSend').on('click', function () {
    sendMessage();
});

