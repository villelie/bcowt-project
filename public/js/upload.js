'use strict';
const url = 'https://localhost:8088'

const ul = document.querySelector('ul');

const createPicCards = (pics) => {
  // clear ul
  ul.innerHTML = '';
  pics.forEach((pic) => {
    // create li with DOM methods
	const p2 = document.createElement('p');
	p2.innerText = pic.pic_title + ' - ' + pic.pic_desc + ' - by: ' + pic.owner;
	const div4 = document.createElement('div');
	div4.classList = 'container';
	div4.appendChild(p2);
	const p1 = document.createElement('p');
	const likes = pic.pic_likes;
	p1.innerText = likes;
	const div3 = document.createElement('div');
	div3.className = 'likecontainer';
	div3.innerHTML = '<button type="button" class="like">♥</button>';
	div3.appendChild(p1);
    const img = document.createElement('img');
    img.src = url + '/thumbnails/' + pic.pic_file;
    img.alt = pic.pic_title;
	const div2 = document.createElement('div');
	div2.className = 'imgbox';
	div2.appendChild(img);																				// Mitä
	div2.appendChild(div3);																				// vittua
	div2.appendChild(div4);																				// Dani.
	const div1 = document.createElement('div');
	div1.className = 'pic';
	div1.appendChild(div2);
	ul.prepend(div1);
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