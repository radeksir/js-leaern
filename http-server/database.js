const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');


const initializeDatabase = () => new Promise((resolve, reject) => {
	const sql = `CREATE TABLE todos (
		id INTEGER PRIMARY KEY,
		text TEXT NOT NULL,
		created_at INTEGER NOT NULL,
		done INTEGER NOT NULL
	)`;

	db.run(sql, (error) => {
		if (error) {
			reject(error);
			return;
		}

		resolve();
	});
});

const getTodos = () => new Promise((resolve, reject) => {
	db.all('SELECT * FROM todos ORDER BY done, created_at DESC', (error, rows) => {
		if (error) {
			reject(error);
			return;
		}

		resolve(rows);
	});
});

const getTodo = (todoId) => new Promise((resolve, reject) => {
	db.get('SELECT * FROM todos WHERE id = $id', { $id: todoId }, (error, row) => {
		if (error) {
			reject(error);
			return;
		}

		resolve(row);
	});
});

const addTodo = (todo) => new Promise((resolve, reject) => {
	db.run('INSERT INTO todos (text, created_at, done) VALUES ($text, $createdAt, $done)', {
		$text: todo.text,
		$createdAt: Math.floor(+new Date() / 1000),
		$done: 0,
	}, function (error) {
		if (error) {
			reject(error);
			return;
		}

		resolve(this.lastID);
	});
}).then(getTodo);

const updateTodo = (todoId, done) => new Promise((resolve, reject) => {
	db.run('UPDATE todos SET done = $done WHERE id = $id', {
		$id: todoId,
		$done: done,
	}, (error) => {
		if (error) {
			reject(error);
			return;
		}

		resolve(todoId);
	});
}).then(getTodo);

const removeTodo = (todoId) => new Promise((resolve, reject) => {
	db.run('DELETE FROM todos WHERE id = $id', { $id: todoId }, (error) => {
		if (error) {
			reject(error);
			return;
		}

		resolve();
	});
});


module.exports = {
	initializeDatabase,
	getTodos,
	addTodo,
	updateTodo,
	removeTodo,
};
