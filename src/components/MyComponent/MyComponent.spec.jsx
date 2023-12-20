import React from 'react';
import * as matchers from '@testing-library/jest-dom/matchers'
import { render, screen } from '@testing-library/react';
import { MyComponent } from './MyComponent';

expect.extend(matchers);

describe('MyComponent', () => {
	test('given a text, the user can see it', () => {
		render(<MyComponent text={'foo'} />);

		const textElement = screen.getByText('foo');

		expect(textElement.textContent).toBe('foo');
	});

	test('given a title, the user can see it', () => {
		render(<MyComponent text={'foo'} title={'hello'} />);

		const titleElement = screen.getByText(/hello/);

		expect(titleElement.textContent).toMatch('hello');
	});

	test('given a heading, the user can see it', () => {
		render(<MyComponent text={'foo'} title={'hello'} />);

		const heading = screen.getByRole('heading', { name: /hello/ });
		const heading2 = screen.getByRole('heading', { name: /hola/ });

		expect(heading).toHaveTextContent('hello');
		expect(heading2).toHaveTextContent('hola');
	});

	test('when I mount the component, the list is shown', () => {
		render(<MyComponent />)

		expect(screen.getByRole('list')).toBeInTheDocument();
	});

	test('given four items, they are shown', () => {
		const items = [
			{ name: 'foo' }, { name: 'bar' }, { name: 'bar' }, { name: 'bar' }
		];
		render(<MyComponent items={items} />)

		const elements = screen.getAllByRole('listitem')

		expect(elements).toHaveLength(4);
		expect(screen.getByText('foo')).toBeInTheDocument()
	});
});
