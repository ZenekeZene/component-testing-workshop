import React from 'react'

const MyComponent = ({ title, text, items = [] }) => {
	return (<>
		<h1>{title}aaa</h1>
		<h2>hola</h2>
		<div>{ text }</div>
		<ol>
			{
				items.map((item) => (
					<li>{ item.name }</li>
				))
			}
		</ol>
	</>);
};

export { MyComponent };
