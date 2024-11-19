const express = require('express');
const app = express();

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.send("Hello World!")
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', (req, res) => {
    res.send("Login Post")
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', (req, res) => {
    res.send("Register Post")
})

app.get('/logout', (req, res) => {
    res.send("logout Get")
})

app.post('/logout', (req, res) => {
    res.send("logout Post")
})

app.get('/protected', (req, res) => {
    res.send("protected Get")
})



app.listen(3000, (req, res) => {
    console.log("listening to port 3000");
})