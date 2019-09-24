const axios = require('axios');

const MAPBOX_KEY = process.env.MAPBOX_KEY;
const MAPBOX_BASE = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
const MAPBOX_URL = addresss => `${MAPBOX_BASE}/${addresss}.json?access_token=${MAPBOX_KEY}&limit=1`;

async function geocode(searchTerms, callback) {
	if (MAPBOX_KEY == null) throw new Error('No Mapbox key configured');

	const response = await axios.get(MAPBOX_URL(encodeURIComponent(searchTerms)));
	const results = response.data.features;
	if (results.length === 0) {
		throw new Error('Unable to find city');
	}

	const [ longitude, latitude ] = results[0].center;
	return {
		latitude,
		longitude,
		location: results[0].place_name,
	};
}

module.exports = geocode;
