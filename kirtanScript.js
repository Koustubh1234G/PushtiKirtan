// Preview stored content from local storage
var storedContent = localStorage.getItem('headerContent');
// create elements to put in content div
const contentDiv = document.getElementsByClassName("content");
const headerContent = document.getElementsByClassName('headerContent');
var contentP = document.createElement("p");
var raagP = document.createElement("p");
// set content to content div


headerContent.innerText = storedContent;

// clear items from local storage
// localStorage.removeItem('headerContent');