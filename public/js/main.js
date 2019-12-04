'use strict';
const url = 'https://localhost:8088';

// select existing html elements
const addForm = document.querySelector('#addPicForm');
const ul = document.querySelector('ul');

// create pic cards
const createPicCards = (pics) => {
  // clear ul
  ul.innerHTML = '';
  pics.forEach((pic) => {
    // create li with DOM methods
    const img = document.createElement('img');
    img.src = url + '/' + pic.pic_file;
    img.alt = pic.pic_title;
    img.classList.add('resp');

    const figure = document.createElement('figure').appendChild(img);

    const h2 = document.createElement('h2');
    h2.innerHTML = pic.pic_title;

    

    const li = document.createElement('li');
    li.classList.add('light-border');

    li.appendChild(h2);
    li.appendChild(figure);
    ul.appendChild(li);
  });
};

// AJAX call
const getPic = async () => {
  try {
    const response = await fetch(url + '/picadd');
    const pics = await response.json();
    createPicCards(pics);
  }
  catch (e) {
    console.log(e.message);
  }
};
getPic();


// submit add pic form
addForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const fd = new FormData(addForm);
  const fetchOptions = {
    method: 'POST',
    body: fd,
  };
  const response = await fetch(url + '/picadd', fetchOptions);
  const json = await response.json();
  console.log('add response', json);
  getPic();
});
