const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/Todo');
const {User} = require('./models/User');

const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
	const todo = new Todo({
		text: req.body.text
	});

	todo.save()
	.then((doc) => {
		res.send(doc);
	})
	.catch((err) => {
		res.status(400).send(err);
	});
});

app.get('/todos', (req, res) => {
	Todo.find()
	.then((todos) => {
		res.send({
			todos
		});
	})
	.catch((err) => {
		res.status(400).send(err);
	});
});

app.get('/todos/:id', (req, res) => {
	const {id} = req.params;

	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	Todo.findById(id)
	.then((value) => {
		if (value) {
			res.send(value);
		} else {
			res.status(404).send();
		}
	})
	.catch((err) => {
		console.log(err);
		res.status(400).send();
	});

	// Validate ID
	// 	404 - empty
	//
	// findByid
	// 	success
	// 		exists - send it back
	// 		!exists - 404 - empty
	// 	error
	// 		400 - empty

});

app.listen(3000, () => {
	console.log('Started server on port 3000');
});

module.exports = {
	app
};
