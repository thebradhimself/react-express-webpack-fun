var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Board = mongoose.model('Board');
var List = mongoose.model('List');

router.get('/', function(req, res, next) {
 Board.find( function( err, boards, count ) {
   res.json(boards);
 });
});

router.get('/:id', function(req, res, next) {
   res.render('board');
});

router.post('/', function(req, res, next) {
  new Board({
    name: req.body.name
  }).save( function(err, board, count) {
    res.json(board);
  });
});

router.put('/:id', function( req, res, next ){
  Board.findByIdAndUpdate(
    req.params.id,
    { $set: { name: req.body.name, description: req.body.description }},
    function(err, board) {
      res.json(board);
    });
});

router.delete('/:id', function(req, res) {
  Board.findById(req.params.id, function(err, board) {
    board.remove();
    List.find({'boardId': req.params.id}, function( err, lists) {
      lists.forEach( function( err, index) {
        var list = lists[index];
        Card.find({'listId': list._id}).remove().exec();
        list.remove();
      });
      res.status(200).send({success: true});
    });
  });
});

module.exports = router;
