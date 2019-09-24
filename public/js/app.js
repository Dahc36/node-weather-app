console.log('Hello from js file');

async function fetchData(url) {
	const response = await fetch(url)
	const data = await response.json();
	return data;
}

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const msg1 = document.getElementById('message-1');
const msg2 = document.getElementById('message-2');

function setResults(msgOne = '', msgTwo = '') {
	msg1.textContent = msgOne;
	msg2.textContent = msgTwo;
}

searchForm.addEventListener('submit', event => {
	event.preventDefault();
	const { value } = searchInput;
	setResults('Loading...');

	fetchData(`/weather?address=${value}`)
		.then(data => {
			if (data.error) {
				setResults(data.error);
			} else {
				setResults(data.location, data.forecast);
				searchInput.value = '';
			}
		})
		.catch(error => {
			console.log(error);
			setResults(error);
		});
});
