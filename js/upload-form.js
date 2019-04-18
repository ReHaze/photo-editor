let photo_overlay = document.querySelector(".upload-overlay");
let inputElement = document.querySelector("#upload-file");
let photo_close = document.querySelector(".upload-form-cancel");
let upload_form_submit = document.querySelector(".upload-form-submit");

filter_image = document.querySelector("#filter-image");

inputElement.addEventListener("change", handleFiles, false);
function handleFiles(e) {
    file = e.target.files[0];

    let reader = new FileReader();

    reader.addEventListener(
        "load",
        function () {
            filter_image.src = reader.result;
            load();
        },
        load,
        false
    );

    if (file) {
        reader.readAsDataURL(file);
    }

    function load() {
        photo_overlay.classList.remove("hidden");
    }

    document.addEventListener("keydown", function (event) {
        if (event.keyCode === 27) {
            photo_overlay.classList.add("hidden");
        }
    });
}

photo_close.addEventListener("click", function () {
    photo_overlay.classList.add("hidden");
    inputElement.click();
});

let increase_size = document.querySelector(
    ".upload-resize-controls-button-inc"
);
let decrease_size = document.querySelector(
    ".upload-resize-controls-button-dec"
);
let increase_input = document.querySelector(".upload-resize-controls-value");
let effect = document.querySelector(".upload-effect-controls");
let photo_preview = document.querySelector(".effect-image-preview");
let lineWidth = 455;
let result;
let pin = document.querySelector(".upload-effect-level-pin");

increase_size.addEventListener("click", function () {
    let x = parseInt(increase_input.value);
    x += 25;
    if (x == 50) {
        photo_preview.style.transform = "scale(0.5)";
    } else if (x == 75) {
        photo_preview.style.transform = "scale(0.75)";
    } else if (x == 100) {
        photo_preview.style.transform = "scale(1)";
    }

    if (x > 100) {
        x = 100;
    }
    increase_input.value = x;
});

decrease_size.addEventListener("click", function () {
    let x = parseInt(increase_input.value);
    x -= 25;
    if (x == 75) {
        photo_preview.style.transform = "scale(0.75)";
    } else if (x == 50) {
        photo_preview.style.transform = "scale(0.5)";
    } else if (x == 25) {
        photo_preview.style.transform = "scale(0.25)";
    }

    if (x < 25) {
        x = 25;
    }
    increase_input.value = x;
});

let effect_line = document.querySelector(".upload-effect-level");

effect.addEventListener(
    "click",
    function (e) {
        let target = e.target;

        if (target.classList.contains("upload-effect-none")) {
            photo_preview.className = "none";
            photo_preview.style = "";
            effect_line.style.display = "none";
        } else if (target.classList.contains("upload-effect-chrome")) {
            photo_preview.className = "";
            photo_preview.style = "";
            effect_line.style.display = "block";
            photo_preview.classList.add("effect-chrome");
        } else if (target.classList.contains("upload-effect-sepia")) {
            photo_preview.className = "";
            photo_preview.style = "";
            effect_line.style.display = "block";
            photo_preview.classList.add("effect-sepia");
        } else if (target.classList.contains("upload-effect-marvin")) {
            photo_preview.className = "";
            photo_preview.style = "";
            effect_line.style.display = "block";
            photo_preview.classList.add("effect-marvin");
        } else if (target.classList.contains("upload-effect-phobos")) {
            photo_preview.className = "";
            photo_preview.style = "";
            effect_line.style.display = "block";
            photo_preview.classList.add("effect-phobos");
        } else if (target.classList.contains("upload-effect-heat")) {
            photo_preview.className = "";
            photo_preview.style = "";
            effect_line.style.display = "block";
            photo_preview.classList.add("effect-heat");
        }
    },
    false
);

level_bar = document.querySelector(".upload-effect-level-val");

//Make the DIV element draggagle:

dragElement(pin);

function dragElement(elmnt) {
    let pos1 = 0,
        pos2 = 0,
        pos3 = 0;
    document.querySelector(
        ".upload-effect-level-pin"
    ).onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos3 = e.clientX;
        level_bar.style.width = pin.style.left;

        if (filter_image.classList.contains("effect-chrome")) {
            result = +pin.style.left.slice(0, -2) / lineWidth;
            photo_preview.style.filter = "grayscale(" + result + ")";
        } else if (filter_image.classList.contains("effect-sepia")) {
            result = +pin.style.left.slice(0, -2) / lineWidth;
            photo_preview.style.filter = "sepia(" + result + ")";
        } else if (filter_image.classList.contains("effect-marvin")) {
            result = +pin.style.left.slice(0, -2) / lineWidth;
            photo_preview.style.filter = "invert(" + result + ")";
        } else if (filter_image.classList.contains("effect-phobos")) {
            result = +pin.style.left.slice(0, -2) / 90;
            photo_preview.style.filter = "blur(" + result + "px)";
        } else if (filter_image.classList.contains("effect-heat")) {
            result = +pin.style.left.slice(0, -2) / 150;
            photo_preview.style.filter = "brightness(" + result + ")";
        }

        if ((elmnt.style.left = elmnt.offsetLeft - pos1 < 0)) {
            elmnt.style.left = 0 + "px";
        }

        if ((elmnt.style.left = elmnt.offsetLeft - pos1 > 450)) {
            elmnt.style.left = 445 + "px";
        } else elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

let form = document.querySelector(".upload-form");

form.addEventListener("submit", function (evt) {
    evt.preventDefault();
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost");
    request.send(new FormData(form));
});
