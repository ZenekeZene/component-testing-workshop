import React from 'react'
import './MyTodo.scss';

const MyTodoItem = ({ item, removeItem }) => (
	<li className="my-todo__item">
		<div>{ item.name }</div>
		<button onClick={removeItem}>Delete</button>
	</li>
);

const MyTodoFeed = ({ items, removeItem }) => (
	<ul className="my-todo__list">
		{
			items.map((item, index) => (
				<MyTodoItem
					key={'item' + index}
					item={item}
					removeItem={() => removeItem(index)}
				/>
			))
		}
	</ul>
);

const MyTodo = () => {
	const [text, setText] = React.useState('');
	const [items, setItems] = React.useState(() => {
		const items = localStorage.getItem('items');
		if (items) {
			return JSON.parse(items);
		}
		return [];
	});

	const updateText = (e) => {
		setText(e.target.value);
	};

	const addItem = () => {
		setText('');
		setItems(oldItems => [...oldItems, { name: text }]);
	};

	const removeItem = (index) => {
		const newItems = [...items];
		newItems.splice(index, 1);
		setItems(newItems);
	};

	const clear = () => {
		setItems([]);
	};

	const save = () => {
		localStorage.setItem('items', JSON.stringify(items));
	};

	return (
		<>
			<h1>My Todo</h1>

			{ /* List */ }
			{ items.length === 0 && <p>No items</p>}
			{ items.length > 0 && (
				<MyTodoFeed
					items={items}
					removeItem={removeItem}
			/>)}

			{ /* Controls */ }
			<p>Total items: {items.length}</p>
			<input type="text" value={text} onChange={updateText} />
			<button onClick={addItem} disabled={text.length === 0}>Add item</button>
			<button onClick={clear} disabled={items.length === 0}>Clear</button>

			<button onClick={save}>Save</button>
		</>
	);
};

export { MyTodo };
