'use strict';

const express = require('express');
// database
const dbUsers = require('./models/bcowt-users');
const dbPics = require('./models/bcowt-pics');
// passport and authentication
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const app = express();
const httpPort = 3033;

app.use(express.urlencoded({extended: true}));
app.use(express.static('uploads'));

const sesOptions = {
	secret: process.env.SESSION_SECRET,
	resave: true,
	saveUninitialized: true,
	cookie: {maxAge: 60000, secure: false}
};

app.use(require('express-session')(sesOptions));

passport.use(new LocalStrategy(async (username, password ,done) => {
    // if(username !== dbUsers.getName(username) || !bcrypt.compareSync(password, dbUsers.getPass(password))) { 
	if ((username !== await dbUsers.getName(username)) || !(await bcrypt.compare(password, await dbUsers.getPass(username)))) {
		console.log('Login', 'Wrong username or password!');
        return done(null, false);
    }
    return done(null, {username: username});
}));

if (process.env.SERVER === 'server') {
	app.set('trust proxy', 1);
	sesOptions.cookie.secure = true;
	console.log('Using secure cookie');
} else console.log('Using unsecure cookie');


passport.serializeUser((user, done) => {
	done(null, user.username);
});

passport.deserializeUser((user, done) => {
	done(null, {username: user});
});

app.use(passport.initialize());
app.use(passport.session());

if (process.env.SERVER === 'local') {
	require('./secure/localhost')(app);
} else {
	require('./secure/server')(app);
	app.listen(httpPort, () => {
		console.log('Started');
	});
}

app.use(express.static('public'));

app.get('/usergetall', async (req, res) => {
	try {
		res.json(await dbUsers.getAll());
	} catch (e) {
		console.log(e);
		res.send('db error :(');
	}
});

app.get('/usersearch', async (req, res) => {
	console.log(req.query);
	try {
		res.json(await dbUsers.search(req.query.search_username));
	} catch(e) {
		res.send('db error :(');
	}
});

app.post('/useradd', async (req, res) => {
	console.log(req.body);
	try {
		const salt = bcrypt.genSaltSync(12);
		const hash = bcrypt.hashSync(req.body.register_userpass, salt);
		await res.json(await dbUsers.insert(req.body.register_username, req.body.register_useremail, hash));
	} catch (e) {
		console.log(e);
		res.send('db error :(');
	}
});

app.post('/userlogin', passport.authenticate('local', {failureRedirect:'/'}), (req, res) => {
	console.log('At /userlogin - Current logged in user:', req.user);
	res.send('logged in');
});

app.get('/userlogout', async (req, res) => {
	req.logout();
	console.log('At /userlogout - Current logged in user:', req.user);
	res.send('logged out');
});


app.post('/picadd', async (req, res) => {
	console.log(req.body);
	try {
		await res.json(await dbPics.insert(req.body.pic_title, req.body.pic_desc, req.body.pic_file));
	} catch (e) {
		console.log(e);
		res.send('db error :(');
	}
});
const picRoute = require('./models/picRouter');
app.use('/picadd', picRoute);

app.get('/', (req, res) => {
	console.log('Current logged in user:', req.user);
	res.sendFile('./public/sign_up.html', {root: __dirname});
});

app.get('/register', (req, res) => {
	console.log('Current logged in user:', req.user);
	res.sendFile('./public/register.html', {root: __dirname});
});


app.get('/template', (req, res) => {
	res.sendFile('./public/template.html', {root: __dirname});
});
