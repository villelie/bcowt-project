'use strict';
const url = 'https://localhost:8088'

const ul = document.querySelector('ul');

//Create picture cards using dom
const createPicCards = (pics) => {
	ul.innerHTML = '';
	pics.forEach((pic) => {
		const p2 = document.createElement('p');
		p2.innerText = pic.pic_desc;
		const div4 = document.createElement('div');
		div4.classList = 'container';
		div4.appendChild(p2);
		const p1 = document.createElement('p');
		const likes = pic.pic_likes;
		const div3 = document.createElement('div');
		div3.className = 'likecontainer';
		const but = document.createElement('button');
		but.type = 'button';
		but.alt = pic.pic_id;
		but.className = 'like';
		but.innerText = '♥ ' + likes;
		const id = pic.pic_id;
		but.addEventListener('click', () => {
			getLikes(id);
		});
		const span = document.createElement('span');
		span.innerText = pic.owner + ': ' + pic.pic_title;
		div3.appendChild(but);
		div3.appendChild(span);
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
		ul.appendChild(div1);
	});
};

//Get pictures from db
const getPic = async () => {
	try {
		const response = await fetch(url + '/picget');
		const pics = await response.json();
		createPicCards(pics);
	} catch (e) {
		console.log(e.message);
	}
};

//Get pictures from db that are send by logged in user
const getOwn = async () => {
	console.log('own');
	try {
		const response = await fetch(url + '/getown');
		const pics = await response.json();
		createPicCards(pics);
	} catch (e) {
		console.log(e.message);
	}
};

//Update likes and check if current cookie has liked picture already.
const getLikes = async (value) => {
	if (!document.cookie.includes('{' + value + '}')) { 
		try {
			await fetch(url + '/piclike' + value);
			document.cookie += '{' + value + '}';
		} catch (e) {
			console.log(e.message);
		}
		getPic();
	}
};


//Edit navigation bar based on logged in user.
const editForUser = (user) => {
	const navupload = document.getElementById('navupload');
	const navsignup = document.getElementById('navsignup');
	const navsignin = document.getElementById('navsignin');
	const navlogout = document.getElementById('navlogout');
	const navprofile = document.getElementById('navprofile');
	
	//If there is user logged in, hide signup and signin buttons and show upload and profile
	if(user) {
		navupload.classList.remove('hidden');
		navsignup.classList.add('hidden');
		navsignin.classList.add('hidden');
		navlogout.classList.remove('hidden');
		navprofile.classList.remove('hidden');
		navprofile.innerText = user;
	}	
}

//Get username and send that to editForUser()
const getUser = async () => {
	try {
		const response = await fetch(url + '/getuser');
		const user = await response.json();
		editForUser(user);
	} catch (e) {
		console.log(e.message);
	}
}

//"onLoad()"
getUser();
getPic();