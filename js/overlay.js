"use strict";
var image = document.querySelector(".gallery-overlay-image");
image.src = items[0].url;
var count_like = document.querySelector(".likes-count");
count_like.innerHTML = items[0].likes;
var comments_count = document.querySelector(".comments-count");
comments_count.innerHTML = items[0].comments;

var window_overlay = document.querySelector(".gallery-overlay");
var picture = document.querySelectorAll(".picture");
var overlay_close = document.querySelector(".gallery-overlay-close");

var numbers = [];
for (var i = 0; i < picture.length; i++) {
    numbers.push(i);
}

numbers.forEach(function(elem) {
    picture[elem].addEventListener("click", function(event) {
        event.preventDefault();

        window_overlay.classList.remove("hidden");
        window_overlay.children[1].children[0].src =
            "photos/" + (elem + 1) + ".jpg";
        window_overlay.children[1].children[1].children[0].children[0].innerText =
            items[elem].likes;
        window_overlay.children[1].children[1].children[1].children[0].innerHTML =
            items[elem].comments;
        document.addEventListener("keydown", function(event) {
            if (event.keyCode === 27) {
                window_overlay.classList.add("hidden");
            }
        });
    });
});

overlay_close.addEventListener("click", function() {
    window_overlay.classList.add("hidden");
});
