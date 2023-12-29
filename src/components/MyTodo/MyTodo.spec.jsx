import React from 'react';
import * as matchers from '@testing-library/jest-dom/matchers'
import { render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MyTodo } from './MyTodo';

expect.extend(matchers);

const addItem = async (text) => {
	const user = userEvent.setup();
	const textInput = screen.getByRole('textbox');
	const button = screen.getByRole('button', {name: /add item/i});

	await user.type(textInput, text);
	await user.click(button);
};

describe('MyTodo', () => {
	test('User want to add an item to the list', async () => {
		// Arrange:
		render(<MyTodo />);
		const items = screen.queryAllByRole('listitem');
		expect(items.length).toBe(0);

		// Act:
		await addItem('hello world');

		// Assert:
		const item = screen.getByRole('listitem');
		expect(item).toHaveTextContent('hello world');
	});

	test('User want to clear itemlist', async () => {
		// Arrange:
		const user = userEvent.setup();
		render(<MyTodo />);
		await addItem('hello world');
		await addItem('hello world 2');
		const itemsBefore = screen.queryAllByRole('listitem');
		expect(itemsBefore.length).toBeGreaterThan(0);

		// Act:
		const clearButton = screen.getByRole('button',  {name: /clear/i})
		await user.click(clearButton);

		// Assert:
		const itemsAfter = screen.queryAllByRole('listitem');
		expect(itemsAfter.length).toBe(0);
	});

	test('User want to delete one item of the list', async () => {
		// Arrange:
		const user = userEvent.setup();
		render(<MyTodo />);
		await addItem('hello world');
		const items = screen.getAllByRole('listitem');
		expect(items.length).toBeGreaterThan(0);

		// Act:
		const item = screen.getByText('hello world');
		const deleteButton = within(item).getByRole('button'); // (1)
		await user.click(deleteButton);

		// Assert:
		expect(item).not.toBeInTheDocument();
	});

});

// Pattern AAA (Arrange, Act & Assert)
// Arrange: Setup the test and prepare the things that we need to test.
// Act: Execute the code that we want to test.
// Assert: Check that the code works as expected.

// (1) We use within to get the button inside the item.
