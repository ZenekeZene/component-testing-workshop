import React from 'react';
import * as matchers from '@testing-library/jest-dom/matchers'
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MyAwesomeForm } from './MyAwesomeForm';

expect.extend(matchers);

// (1)
const setupWithUserEvent = (jsx) => ({
	user: userEvent.setup(),
	...render(jsx),
});

describe('MyAwesomeForm', () => {

    test('1) the password input exists in the document', () => {
			render(<MyAwesomeForm />);

			const passwordNode = screen.getByRole('textbox', { name: 'Password' });

			expect(passwordNode).toBeInTheDocument();
		});

		test('2) the empty feedback is shown as default', () => {
			render(<MyAwesomeForm />);

			expect(screen.getByText(/Password empty!/)).toBeInTheDocument();
		});

		test('3) if the user types a wrong password, the error feedback is shown', async () => {
			const { user } = setupWithUserEvent(<MyAwesomeForm />);

			const passwordNode = screen.getByRole('textbox', { name: 'Password' });

			await user.type(passwordNode, 'wrong password');

			expect(screen.getByText('Password is not correct')).toBeInTheDocument();
		});

		test('4) if the user types a correct password, the correct feedback is shown', async () => {
				const user = userEvent.setup();

				render(<MyAwesomeForm />);

				const passwordNode = screen.getByRole('textbox', { name: 'Password' });
				const button = screen.getByRole('button');

				await user.type(passwordNode, '123456');
				await user.click(button);

				expect(screen.getByText(/Logged in!/));
		});

		test('5) if the user types a password, the empty message is not shown', async () => {
			const user = userEvent.setup();

			render(<MyAwesomeForm />);

			const passwordNode = screen.getByRole('textbox', { name: 'Password' });

			await user.type(passwordNode, 'random password');

			expect(screen.queryByText(/Password empty!/)).not.toBeInTheDocument(); // (2)
		});

		test('6) if the user types a correct password, the prop "onLogin" is called', async () => {
			const user = userEvent.setup();

			const onLogin = vi.fn(); // (3)

			render(<MyAwesomeForm onLogin={onLogin} />);

			const passwordNode = screen.getByRole('textbox', { name: 'Password' });
			const button = screen.getByRole('button');

			await user.type(passwordNode, '123456');
			await user.click(button);

			expect(onLogin).toBeCalled(); // (4)
		});
});

// (1): Utility function used in the test #3.
// (2): Note that we use "queryByText" instead of "getByText" because we want to check that the element is not in the document.
//      If we use "getByText" and the element is not in the document, the test will fail.
//      "queryByText" returns null if the element is not in the document.
//      "getByText" throws an error if the element is not in the document.
//      See https://testing-library.com/docs/queries/about/#types-of-queries
// (3): Vitest.fn() is a Vitest utility function that returns a mock function.
//      See https://vitest.dev/api/mock.html
// (4): the prop "onLogin" is called when the user types a correct password and clicks the button.
