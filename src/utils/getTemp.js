const forecast = require('./forecast');
const geocode = require('./geocode');

async function getTemp(searchTerms) {
	if (!searchTerms) {
		throw new Error('No address provided');
	}

	console.log(`Fetching weather for ${searchTerms}`);
	const geoData = await geocode(searchTerms);
	const foreData = await forecast({
		latitude: geoData.latitude,
		longitude: geoData.longitude,
	});

	return {
		location: geoData.location,
		precipProbability: foreData.precipProbability,
		temperature: foreData.temperature,
		timezone: foreData.timezone,
	};
}

module.exports = getTemp;
