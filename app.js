const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

//connect mongodb
mongoose.connect('mongodb://localhost:27017/wikiDB');

//mongoose schema
const wikiSchema = new mongoose.Schema({
title: String, 
body: String
});

//model
const Article = mongoose.model('Article', wikiSchema);

//get all articles
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

//add new article
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
})

//delete all articles
.delete(function(req, res){
    Article.deleteMany(function(err){
        if(err){
            console.log(err)
        }else{
            res.send('sucessfuly deleted articles');
        }

    });
});

//get one article
app.route('/article/:articleTitle')
.get(function(req, res){
    const parameter = req.params.articleTitle;

    Article.findOne({parameter}, function(err, foundArticle){
        if(!err){
            res.send(foundArticle);
        }else{
            res.send("cannot find article");
        }
    });
})

//delete one article
.delete(function(req, res){
    const parameter = req.params.articleTitle;
    Article.deleteOne({parameter}, function(err){
        if(err){
            console.log(err);
        }else{
            res.send('successfully deleted article');
        }
    });
})

//edit one article 
.put(function(req, res){
    const parameter = req.params.articleTitle;

    Article.updateOne(
        {title:req.params.articleTitle},
        {title: req.body.title,
        body: req.body.body},
        {upsert:true}, 
        function(err){
            if(!err){
                res.send('updated article');
            }else{
                console.log(err)
            }
        });
})

//edit one article
.patch(function(req, res){
    Article.updateOne(
        {title:req.params.articleTitle},
        {$set: req.body}, 
        function(err){
            if(!err){
                res.send('successfully updated article')
            }else{
                console.log(err)
            }
        });
});

app.listen(3000, function(){
    console.log('listening on port 3000');
});

