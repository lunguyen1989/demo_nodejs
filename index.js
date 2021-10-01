const express = require('express');
const { send } = require('process');
const app = new express();

app.use(express.json());
const blogs = [
    {id:1, title:'title 1', content : 'this is new demo 1'},
    {id:2, title:'title 2', content : 'this is new demo 2'},
    {id:3, title:'title 3', content : 'this is new demo 3'},
];

app.get('/', (req, res) => {
    res.send('Demo nodejs');
});

app.get('/api/news', (req, res) => {
    res.send(blogs);
});

app.get('/api/news/:id', (req, res) => {
    let article = blogs.find( a => a.id === parseInt(req.params.id));
    if(!article) {
        res.status(400).send('Find not found');
    }
    res.send(article);
});

app.post('/api/news', (req, res) => {
    if(!req.body.title || !req.body.content) {
        res.status(400).send('title and content are required');
    }
    let article = {
        id : blogs.length + 1,
        title : req.body.title,
        content : req.body.content
    };
    blogs.push(article);
    res.send(article);
});


app.put ('/api/news/:id', (req, res) => {
    if(!req.body.title && !req.body.content) {
        res.status(400).send('title and content are required');
    }
    let article = blogs.find( a => a.id === parseInt(req.params.id));
    if(!article) {
        res.status(400).send('Find not found');
    }
    article.title = req.body.title;
    article.content = req.body.content;
    res.send(article);
});

app.delete('/api/news/:id', (req, res) => {
    let article = blogs.find( a => a.id === parseInt(req.params.id));
    if(!article) {
        res.status(400).send('Find not found');
    }
    let index = blogs.indexOf(article);
    blogs.splice(index,1);
    res.send(article);
});

app.listen(3000, () => {
    console.log('listen 3000');
});