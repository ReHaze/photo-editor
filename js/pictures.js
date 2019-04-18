"use strict";
// Создаю массив с объектами, котоыре содержат  всю информацию изображений //

let items = [];
let quotes = [
    "Всё отлично",
    "В целом всё неплохо. Но не всё",
    "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально",
    "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше",
    "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше",
    "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!"
];
let template = document.querySelector("template");
let elements = [];
let render = document.querySelector(".pictures");

(function() {
    for (let i = 1; i <= 25; i++) {
        items.push({
            url: "photos/" + i + ".jpg",
            likes: Math.floor(Math.random() * (200 - 15) + 15),
            comments: quotes[Math.floor(Math.random() * quotes.length)]
        });
    }
})();

function generate() {
    for (let i = 0; i < items.length; i++) {
        elements[i] = template.content.querySelector("a").cloneNode(true);
        elements[i].children[0].src = items[i].url;
        elements[i].children[1].children[1].innerHTML = items[i].likes;
        elements[i].children[1].children[0].innerHTML = items[i].comments;
        render.appendChild(elements[i]);
    }
}

generate();
