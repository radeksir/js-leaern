{

	function TodoList(todo) {
		this.items = [];

		this.input = todo.querySelector('.js-todo-list__inp');
		this.form  = todo.querySelector('.js-todo-list__form');
		this.list  = todo.querySelector('.js-todo-list__list');

		this.form.addEventListener('submit', this.addTodo.bind(this));
		this.render();

		return this;
	}


	TodoList.prototype.addTodo = function(e) {
		e.preventDefault();
		var name = this.input.value;

		if (name.length) {
			var todo = {
				name,
				done: false,
			};

			this.items.push(todo);
			this.input.value = '';

			this.renderTodo(todo);
		}
	};


	TodoList.prototype.render = function() {

		for (i = 0; i < this.items.length; i++) {
			this.renderTodo(this.items[i]);
		}

	};


	TodoList.prototype.redraw = function() {
		this.list.innerHTML = '';

		this.render();
	};


	TodoList.prototype.renderTodo = function(todo) {
		// Rodičovský element
		var todoEl = document.createElement('p');
		todoEl.className = `js-todo-list__item item${todo.done ? 'item--done' : ''}`;

		// Label, checkbox + name
		var todoLabelEl = document.createElement('label');
		todoLabelEl.className = 'item__label';

		var todoCheckboxEl = document.createElement('input');
		todoCheckboxEl.className = 'item__checkbox';
		todoCheckboxEl.type = 'checkbox';
		todoCheckboxEl.checked = todo.done;
		todoCheckboxEl.addEventListener('change', (e) => {
			e.preventDefault();
			this.toggleTodo.call(this, todo);
		});

		var todoTextEl = document.createElement(todo.done ? 'del' : 'span');
		todoTextEl.className = 'item__name';
		todoTextEl.innerText = todo.name;

		// Křížek
		var todoRemoveEl = document.createElement('button');
		todoRemoveEl.innerText = '×';
		todoRemoveEl.addEventListener('click', (e) => {
			e.preventDefault();
			this.removeTodo.call(this, todo);
		});

		// Všechno dohromady
		todoLabelEl.appendChild(todoCheckboxEl);
		todoLabelEl.appendChild(todoTextEl);

		todoEl.appendChild(todoLabelEl);
		todoEl.appendChild(todoRemoveEl);

		// Nejvíc nejhorší výkonostně...
		this.list.appendChild(todoEl);
	};


	TodoList.prototype.toggleTodo = function(todo) {
		todo.done = ! todo.done;

		this.redraw();
	};


	TodoList.prototype.removeTodo = function(todo) {
		var i = this.items.indexOf(todo);

		this.items.splice(i, 1);

		this.redraw();
	};

}
