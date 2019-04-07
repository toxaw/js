let api = 
{
	query:async (query, callback) =>
	{
		let url = 'http://www.omdbapi.com/?s=' + encodeURI(query.toLowerCase()) + '&apikey=d5677312';
		
		let data = null;

		let text = '';

		try
		{
			let response = await fetch(url);
		
			let data = await response.json();

			callback(data, text);	
		}
		catch(e)
		{
			console.log(e);

			text = 'Ошибка сервера';
		}					
	},
	detail:async (query, callback) =>
	{
		let url = 'http://www.omdbapi.com/?i=' + encodeURI(query) + '&apikey=d5677312';
		
		let data = null;

		let text = '';

		try
		{
			let response = await fetch(url);
		
			let data = await response.json();	

			callback(data, text);
		}
		catch(e)
		{	
			console.log(e);
			
			text = 'Ошибка сервера';
		}
	},
};
export default api;