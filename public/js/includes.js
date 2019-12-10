'use strict';

//Fetching header and footer, kinda useless again since we have one or two different pages.
fetch("./header.html").then(response => {return response.text();}).then(data => {document.querySelector("header").innerHTML = data;});
fetch("./footer.html").then(response => {return response.text();}).then(data => {document.querySelector("footer").innerHTML = data;});

//Nav
const openNav = () => document.getElementById("myNav").style.height = "100%";
const closeNav = () => document.getElementById("myNav").style.height = "0%";
