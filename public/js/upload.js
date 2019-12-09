'use strict';
const url = 'https://localhost:8088'

const ul = document.querySelector('ul');

const createPicCards = (pics) => {
  // clear ul
  ul.innerHTML = '';
  pics.forEach((pic) => {
    // create li with DOM methods
    const img = document.createElement('img');
    img.src = url + '/thumbnails/' + pic.pic_file;
    img.alt = pic.pic_title;

    const figure = document.createElement('figure').appendChild(img);
    const h2 = document.createElement('h2');
    h2.innerHTML = pic.pic_title;
	const li = document.createElement('li');
	
    li.appendChild(h2);
    li.appendChild(figure);
    ul.appendChild(li);
  });
};

// AJAX call
const getPic = async () => {
  try {
    const response = await fetch(url + '/picget');
    const pics = await response.json();
    createPicCards(pics);
  }
  catch (e) {
    console.log(e.message);
  }
};
getPic();