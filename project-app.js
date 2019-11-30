'use strict';

const express = require('express');
const dbUsers = require('./models/bcowt-users');
//const dbPics = require('./models/bcowt-pics');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const app = express();
<<<<<<< HEAD
const httpPort = 3033;
=======

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
>>>>>>> 16f452c912cc37b76ea1a923ae4594b30cb312f9

app.use(express.urlencoded({extended: true}));

const sesOptions = {
	secret: process.env.SESSION_SECRET,
	resave: true,
	saveUninitialized: true,
	cookie: {maxAge: 60000, secure: false}
};

app.use(require('express-session')(sesOptions));

passport.use(new LocalStrategy((username, password ,done) => {
    console.log('login', username);
    if (username !== 'exampleUser' || password !== 'examplePass') {
        console.log('login', 'wrong username or password');
        return done(null, false);
    }
    return done(null, {username: username});
}));

if (process.env.SERVER === 'server') {
	app.set('trust proxy', 1);
	sesOptions.cookie.secure = true;
	console.log('Using secure cookie');
} else console.log('Using unsecure cookie');

<<<<<<< HEAD
=======
app.use(require('express-session')(sesOptions));

passport.use(new localStrategy((username, password, done) => {
	if(username !== 'villa') {
		console.log('wrong user');
		return done(null, false);
	}
	return done(null, {username: username});
}));
>>>>>>> 16f452c912cc37b76ea1a923ae4594b30cb312f9

passport.serializeUser((user, done) => {
	done(null, user.username);
});

<<<<<<< HEAD
passport.deserializeUser((user, done) => {
	done(null, {username: user});
=======
passport.deserializeUser((username, done) => {
	done(err, {username: username});
>>>>>>> 16f452c912cc37b76ea1a923ae4594b30cb312f9
});

app.use(passport.initialize());
app.use(passport.session());


if (process.env.SERVER === 'local') {
	require('./secure/localhost')(app);
} else {
	require('./secure/server')(app);
	app.listen(3033, () => {
		console.log('Started');
	});
}

<<<<<<< HEAD
app.use(express.static('public'));

app.get('/usergetall', async (req, res) => {
=======
app.post('/userlogin', passport.authenticate('local', {failureRedirect: '/fail'}), (req, res) => {
	console.log('trying to login');
	res.redirect('/');
});

app.post('/useradd', async (req, res) => {
>>>>>>> 16f452c912cc37b76ea1a923ae4594b30cb312f9
	try {
		const salt = bcrypt.genSaltSync(12);
		const hash = bcrypt.hashSync(req.body.register_userpass, salt);
		res.json(await dbUsers.insert(req.body.register_username, req.body.register_useremail, hash));
	} catch (e) {
		console.log(e);
		res.send('db error :(');
	}
});

app.get('/usergetall', async (req, res) => {
	try {
		res.json(await dbUsers.getAll());
	} catch (e) {
		console.log(e);
		res.send('db error :(');
	}
});

app.get('/usersearch', async (req, res) => {
	try {
<<<<<<< HEAD
		const salt = bcrypt.genSaltSync(12);
		const hash = bcrypt.hashSync(req.body.register_userpass, salt);
		await res.json(await dbUsers.insert(req.body.register_username, req.body.register_useremail, hash));
	} catch (e) {
		console.log(e);
=======
		res.json(await dbUsers.search(req.query.search_username));
	} catch(e) {
>>>>>>> 16f452c912cc37b76ea1a923ae4594b30cb312f9
		res.send('db error :(');
	}
});

<<<<<<< HEAD
app.post('/userlogin', passport.authenticate('local', {failureRedirect:'/fail'}),
    (req, res) => {
	console.log('trying to login');
	res.redirect('/');
});

=======
>>>>>>> 16f452c912cc37b76ea1a923ae4594b30cb312f9
app.get('/', (req, res) => {
	console.log('is user in req', req.user);
	res.sendFile('./public/main.html', {root: __dirname});
});

app.get('/fail', (req, res) => {
	res.send('failed to login');
});

<<<<<<< HEAD
=======

>>>>>>> 16f452c912cc37b76ea1a923ae4594b30cb312f9
app.get('/register', (req, res) => {
	console.log('is user in req', req.user);
	res.sendFile('./public/register.html', {root: __dirname});
});