import React from 'react';

const MY_SECRET_PASSWORD = '123456';

const MyAwesomeForm = ({ onLogin = () => {}}) => {
	const [isValidPassword, setIsValidPassword] = React.useState(false);
	const [password, setPassword] = React.useState('');

	const handleChangePassword = (event) => {
		const value = event.target.value;
		setPassword(value);
	};

	const handleLogin = () => {
		if (password === MY_SECRET_PASSWORD) {
			setIsValidPassword(true);
			onLogin();
		}
	};

	return (
		<>
			<label htmlFor="email">Email</label>
			<input type="text" id="email" name="email" />

			<label htmlFor="password">Password</label>
			<input role="textbox" type="password" id="password" name="password" onChange={handleChangePassword}/>

			<button onClick={handleLogin}>Login</button>

			{isValidPassword && <p>Logged in!</p>}
			{password.length === 0 && <p>Password empty!</p>}

			{(!isValidPassword && password.length > 0) && <p>Password is not correct</p>}
		</>
	);
};

export { MyAwesomeForm };
