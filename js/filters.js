var popular = document.querySelector("#filter-popular");

popular.addEventListener("click", function() {
    var bleh = Array.from(elements);
    bleh.sort(function(first, second) {
        var x1 = parseInt(first.children[1].children[1].innerHTML);
        var x2 = parseInt(second.children[1].children[1].innerHTML);

        if (x2 > x1) {
            return 1;
        } else if (x2 < x1) {
            return -1;
        } else {
            return 0;
        }
    });

    bleh.forEach(function(e) {
        render.appendChild(e);
    });
});

var random = document.querySelector("#filter-random");

random.addEventListener("click", function() {
    var rand_array = Array.from(elements);

    var currentIndex = rand_array.length,
        temporaryValue,
        randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = rand_array[currentIndex];
        rand_array[currentIndex] = rand_array[randomIndex];
        rand_array[randomIndex] = temporaryValue;
    }

    rand_array.forEach(function(e) {
        render.appendChild(e);
    });
});

var filter_recommend = document.querySelector("#filter-recommend");

filter_recommend.addEventListener("click", function() {
    for (var i = 0; i < items.length; i++) {
        render.appendChild(elements[i]);
    }
});
