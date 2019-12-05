const url = https://localhost:8088
const createPicCards = (pics) => {
  // clear ul
  ul.innerHTML = '';
  pics.forEach((pic) => {
    // create li with DOM methods
    const img = document.createElement('img');
    img.src = url + '/' + pic.filename;
    img.alt = pic.name;
    img.classList.add('resp');

    const figure = document.createElement('figure').appendChild(img);

    const h2 = document.createElement('h2');
    h2.innerHTML = pic.name;

    const p1 = document.createElement('p');
    p1.innerHTML = `Title: ${pic.age}`;

    const p2 = document.createElement('p');
    p2.innerHTML = `Desc: ${pic.weight}kg`;

    const li = document.createElement('li');
    li.classList.add('light-border');

    li.appendChild(h2);
    li.appendChild(figure);
    li.appendChild(p1);
    li.appendChild(p2);
    li.appendChild(modButton);
    li.appendChild(delButton);
    ul.appendChild(li);
  });
};

// AJAX call
const getpic = async () => {
  try {
    const response = await fetch(url + '/pic');
    const pics = await response.json();
    createPicCards(pics);
  }
  catch (e) {
    console.log(e.message);
  }
};
getpic();