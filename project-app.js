'use strict';
const express = require('express');
const dbUsers = require('./models/bcowt-users');
const dbPics = require('./models/bcowt-pics');
const resize = require('./models/resize');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const app = express();
const httpPort = 3033;

app.use(express.urlencoded({extended: true}));

//Options for express-session
const sesOptions = {
	secret: process.env.SESSION_SECRET,
	resave: true,
	saveUninitialized: true,
	cookie: {maxAge: 60000, secure: false}
};

app.use(require('express-session')(sesOptions));

//Choose which secure cookie to use
if (process.env.SERVER === 'server') {
	app.set('trust proxy', 1);
	sesOptions.cookie.secure = true;
	console.log('Using secure cookie');
} else console.log('Using unsecure cookie');

//Passport-local strategy
passport.use(new LocalStrategy(async (username, password ,done) => {
	const userpass  = await dbUsers.getPass(username);
	const pwdCheck = await bcrypt.compare(password, userpass);
	console.log('check user login', userpass, pwdCheck);
	if (userpass !== "no pass found" && pwdCheck) {
		return done(null, {username: username});
	} else {
		console.log('login', 'wrong username or password');
		return done(null, false);
	}
}));

//More passport stuff
passport.serializeUser((user, done) => {
	done(null, user.username);
});

passport.deserializeUser((user, done) => {
	done(null, {username: user});
});

app.use(passport.initialize());
app.use(passport.session());

//Choose which secure script to use based on env file
if (process.env.SERVER === 'local') {
	require('./secure/localhost')(app);
	console.log('Started on local, port:', httpPort);
} else {
	require('./secure/server')(app);
	app.listen(httpPort, () => {
		console.log('Started on server, port:', httpPort);
	});
}

//Static folders
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use('/thumbnails', express.static('thumbnails'));

//Adding user to database
app.post('/useradd', async (req, res) => {
	try {
		const salt = bcrypt.genSaltSync(12);
		const hash = bcrypt.hashSync(req.body.register_userpass, salt);
		await dbUsers.insert(req.body.register_username, req.body.register_useremail, hash);
		res.redirect('./');
	} catch (e) {
		console.log(e);
		res.send('db error :(');
	}
});

//Logging user
app.post('/userlogin', passport.authenticate('local', {failureRedirect:'./'}), (req, res) => {
	console.log('At /userlogin - Current logged in user:', req.user);
	res.redirect('./');
});

//Log out
app.get('/userlogout', async (req, res) => {
	req.logout();
	console.log('At /userlogout - Current logged in user:', req.user);
	res.redirect('./');
});

//Add picture to database
app.post('/picadd', upload.single('pic_file'), async (req, res) => {
	try {
		await resize.makeThumbnail(req.file.path, {width:600, height:600}, 'thumbnails/' + req.file.filename);
		await dbPics.insert((await dbUsers.getId(req.user.username)), req.body.pic_title, req.body.pic_desc, req.file.filename);
		res.redirect('./');
	} catch (e) {
		console.log(e);
		res.send('db error :(');
	}
});

//Get all pics from database
app.get('/picget', async (req, res) => {
	try {
		res.json(await dbPics.getAll());
	} catch (e) {
		console.log(e);
		res.send('db error :(');
	}
});

//Get specific pic from database with id to like
app.get('/piclike:id', async (req, res) => {
	try {
		await dbPics.like(req.params.id);
		res.redirect('./');
	} catch (e) {
		console.log(e);
		res.send('db error :(');
	}
});

//Get username, used to change navbar based on login status
app.get('/getuser', async (req, res) => {
	if (req.user.username) {
		try {
			console.log('Sending username to js: ', req.user.username);
			res.json(req.user.username);
		} catch (e) {
			console.log(e);
		}
	} else res.redirect('./');
});

//Get pictures that are send by the user
app.get('/getown', async (req, res) => {
	if (req.user.username) {
		try {
			res.json(await dbPics.getOwner(await dbUsers.getId(req.user.username)));
		} catch (e) {
			console.log(e);
			res.send('db error :(');
		}
	} else res.redirect('./');
});

//Main redirect
app.get('/', (req, res) => {
	console.log('Current logged in user:', req.user);
	res.sendFile('./public/template.html', {root: __dirname});
});