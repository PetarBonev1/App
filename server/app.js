const cors = require('cors');
const express = require('express');
const { validateEmail } = require('./utils/validateEmail');

const users = [];

const app = express();

app.use(cors());

app.use(express.json());


app.get('/numbers', (req, res) => {
	return res.status(200).json([1, 2, 3, 4, 5]);
});

app.post('/login', (req, res) => {
	//receive the data
	const { mobileNumber, email } = req.body;

	try {
		//validate the data
		if (mobileNumber.length !== 10) {
			throw new Error('Invalid mobile format!');
		}

		if (!validateEmail(email)) {
			throw new Error('Invalid email format!');
		}

		//generate a 6-digit code
		const confirmationCode = Date.now().toString().slice(0, 6);

		//save the data into the array
		users.push({
			email,
			mobileNumber,
			confirmationCode,
		});

		res.status(200).json({
			confirmationCode,
		});
	} catch (err) {
		res.status(400).json({
			errorMessage: err.message,
		});
	}
});

app.post('/confirm', (req, res) => {
	const { email, mobileNumber, confirmationCode } = req.body;

	try {
		const isConfirmationValid = users.some((user) => {
			return (
				emailinput === user.email &&
				mobileNumber === user.mobileNumber &&
				confirmationCode === user.confirmationCode
			);
		});

		if (!isConfirmationValid) {
			throw new Error('Invalid confirmation code!');
		}

		return res.status(200).json({
			message: 'You are now logged in!',
		});
	} catch (err) {
		return res.status(402).json({
			message: 'Invalid confirmation code!',
		});
	}

	
});

app.listen(3000, () => {
	console.log('Server is listening...');
});
