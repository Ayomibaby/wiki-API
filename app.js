const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/wikiDB');

const wikiSchema = new mongoose.Schema({
title: String, 
body: String
});

const Article = mongoose.model('Article', wikiSchema);

app.route('/article')
.get(function(req, res){
    Article.find(function(err, foundArticles){
        if(!err){
            res.send(foundArticles);
        }else{
                console.log(err);
        }
    });

})

.post(function(req, res){
   const newArticle = new Article({
    title: req.body.title,
    body: req.body.body
   });
    
   newArticle.save(function(err, newArticle){
    if(!err){
        res.send('Article has been succesfully added')
    }else{
        console.log(err);
    }
   });
});




app.listen(3000, function(){
    console.log('listening on port 3000');
});

