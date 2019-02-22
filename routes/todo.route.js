const express = require('express');
const router = express.Router();

const todo_controller = require('../controllers/todo.controller');

router.get('/all', todo_controller.todos_details);
router.get('/auth',todo_controller.todo_authenticate);
router.post('/create',todo_controller.todo_create);
router.get('/:id', todo_controller.todo_details);
router.put('/:id/update', todo_controller.todo_update);
router.delete('/:id/delete', todo_controller.todo_delete);
module.exports = router;