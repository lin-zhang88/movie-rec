
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2e6b38c860mshb732a7155bf7869p12e5a5jsnf4d9e954641e',
		'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url+genre, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}