window.onload = function() {

var ul = document.getElementById("queries")
var input = document.getElementById("Search");
var header = document.getElementById("header");
var content = document.getElementById("content");
var wikiUrl = "https://en.wikipedia.org/wiki/"
var searchIcon = document.getElementById("searchIcon");
var searchTerm;

function search() {

  if (event.keyCode == 13){
    header.style.opacity="0";

    setTimeout(function(){header.style.display="none";content.style.marginTop = "5em";}, 800);


    ul.innerHTML = "";
    searchTerm = input.value;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://en.wikipedia.org/w/api.php?action=query&format=json&gsrlimit=15&generator=search&origin=*&gsrsearch=" + searchTerm);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){

          var json = JSON.parse(xhr.responseText);
          var pages = json.query.pages;
          console.log(json);
          for (var key in pages){
            //Li item
            var li = document.createElement("li");
            var liText = document.createTextNode(pages[key].title);
            //Anchor Link
            var anchorHref = pages[key].title.replace(/ /g, "_");
            var anchorLink = document.createElement("a");
            anchorLink.setAttribute("href", wikiUrl + anchorHref);

            li.appendChild(liText);
            anchorLink.appendChild(li);
            ul.appendChild(anchorLink);

          }
        }
    }

  }




}

function changeSearch() {
  searchIcon.removeEventListener("click", changeSearch);
//    searchIcon.style.opacity=0;
    searchIcon.style.opacity=0;
    setTimeout(function(){
      //For accessibility purposes you shouldn't use display: none
//read up on http://alistapart.com/article/now-you-see-me
      searchIcon.style.position="absolute";
      searchIcon.style.top= "-9999px";
      searchIcon.style.left = "-9999px";
    })

    input.style.opacity=1;



}

//EventListener for Search query
input.addEventListener("keydown", search);
//EventListener for search Icon change to input field
searchIcon.addEventListener("click", changeSearch);





}
