const express = require('express');
const router = express.Router();

const Post = require('../../models/post');
const Profile = require('../../models/profile');

router.post('/createPost/:username', (req, res) => {

    if ((typeof req.body.postContent) === 'undefined') {
        return res.status(400).json({message: "postContent field is missing from json"})
    }

    if(req.body.postContent == "") {
        return res.status(400).json({message: "The post is empty (postContent field is empty)"})
    }

    Profile.findOne({username: req.params.username})
    .exec(function(err, data) {
        if(data == null) {
            return res.status(400).json({message:"This user does not exist"})
        }
        const post = new Post({
            postContent: req.body.postContent,
            poster: data._id
        })
        post.save()
            .then(data => res.json(data))
            .catch(error => {
                console.log(error)
                res.status(500).json({
                    error: error
                });
            });
    });

});

module.exports = router;