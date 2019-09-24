const axios = require('axios');

const DARKSKY_KEY = process.env.DARKSKY_KEY;
const DARKSKY_BASE = 'https://api.darksky.net/forecast';
const DARKSKY_URL = (lat, lng) => `${DARKSKY_BASE}/${DARKSKY_KEY}/${lat},${lng}?units=si`;

async function forecast({ latitude, longitude }) {
	if (DARKSKY_KEY == null) throw new Error('No DarkSky key configured');

	const response = await axios.get(DARKSKY_URL(latitude, longitude));
	const { currently, timezone } = response.data;
	return {
		precipProbability: currently.precipProbability,
		temperature: currently.temperature,
		timezone: timezone,
	};
}

module.exports = forecast;
