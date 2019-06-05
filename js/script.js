


// var myList = document.getElementById("list");

// fetch(https://www.reddit.com/search.json?q=+nsfw:no)
//   .then(function(data) {
//     return data.json();
//   })
//   .then(function(json) {
//     var astros = json;
//     astros.people.forEach(function(astro) {
//         var item = document.createElement('li');
//         item.textContent = astro.name;
//         myList.appendChild(item);
//     })
// });

var button;
var content;
var slides;
var mainPage;
var searchBox;
//this holds user search phrase
var searchTerm = "";
var firstPart = "http://www.reddit.com/search.json?q=";
var lastPart = "cats+nsfw:no";
var url = '';
var imageIndex = 0;
var handle = null;

// This event fires when the page is fully loaded
// domcontentloaded makes sure it is loaded before running makes sure it is safe and best practice.
document.addEventListener('DomContentLoaded', function(){
    button = document.getElementById("button1");
    searchBox = document.getElementById('searchterm');
    mainPage = document.getElementById("mainpage");
    slides = document.getElementById("slides");
    content = document.getElementById('content');
    stopButton = document.getElementById('stop');

    stopButton.addEventListener('click', function(e){  
        clearInterval(handle);
        mainPage.classList.add('visible');
        mainPage.classList.remove('hidden');
        content.classList.remove('visible');
        content.classList.add('hidden');
    })

    button.addEventListener("click", function(e){
        searchTerm = searchBox.value;
        searchBox.value = "";
        mainPage.classList.remove('visible');
        mainPage.classList.add('hidden');
        content.classList.add('visible');
        mainPage.classList.remove('hidden');
        url = firstPart+ searchTerm + lastPart;
        fetch(url)
            .then(function(data){
                return data.json();
            })
            .then(function(json){
                //console.log(json.data.children[1].data.thumbnail);
                var newThumbs = json.data.children.map(function(thumb){
                    return thumb.data.thumbnail;
                });
                show.src = newThumbs[0];
                handle = setInterval(function(){
                    if (imageIndex > 25){
                        imageIndex = -1;
                        //resets image counter
                    }
                    imageIndex++;
                    show.src = newThumbs[imageIndex];
                }, 3000);
            });
});


});