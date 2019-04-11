let filmsVue = new Vue(
{
  el: 'main',
  data: 
  	{
  		films: []
	}
});

let searchBlock = 
{
	findEvent : (callback) =>
	{
		let element = document.getElementById('search-container');

		let inputSearch, inputCheckbox;

		Array.from(element.getElementsByTagName('input')).forEach
		(
			(input) =>
			{
		  		if(input.type=='text')
		  		{
		  			inputSearch = input;
		  		}
		  		else if(input.type=='checkbox')
		  		{
		  			inputCheckbox = input;
		  		}
			}
		);

		let iStatic = element.getElementsByClassName('static')[0];

		inputSearch.addEventListener('keydown', (e)=>
			{
				if(e.keyCode==13)
				{
					if(inputSearch.value)
					{
						callback(inputSearch.value);

						element = document.getElementById('search-danger');

						element.innerText = '';

						inputCheckbox.checked = true;						
					}
				}
			}
		);

		iStatic.addEventListener('mousedown', (e)=>
			{
				if(inputSearch.value)
				{
					callback(inputSearch.value);

					element = document.getElementById('search-danger');

					element.innerText= '';

					inputCheckbox.checked = true;					
				}
				else
				{
					inputCheckbox.checked = false;
				}
			}
		);					
	},
	done : (danger = '') =>
	{
		let element = document.getElementById('search-container');

		let inputCheckbox;

		Array.from(element.getElementsByTagName('input')).forEach
		(
			(input) =>
			{
		  		if(input.type=='checkbox')
		  		{
		  			inputCheckbox = input;
		  		}
			}
		);

		inputCheckbox.checked = false;

		element = document.getElementById('search-danger');

		element.innerText = danger;		
	}
};

let contentBlock = 
{
	setContent:(contentList) =>
	{
		filmsVue.films = contentList;	      	
	},
	removeContent:() =>
	{
		filmsVue.films = [];
	}
};

let api = 
{
	query:async (query, callback) =>
	{
		let url = 'http://www.omdbapi.com/?s=' + encodeURI(query.toLowerCase()) + '&apikey=d5677312';
		
		try
		{
			let response = await fetch(url);
		
			let data = await response.json();

			callback(data);
		}
		catch(e)
		{
			//console.log(e);

			callback(null, 'Ошибка сервера');
		}
	}
};

searchBlock.findEvent
(
	(search) =>
	{
		api.query(search, (content, text = null) =>
			{
				contentBlock.removeContent();

				if(content && content['Search'])
				{
					contentList = [];

					Array.from(content['Search']).forEach
					(
						(element) =>
						{
							contentList.push
							(
								{
									src: element.Poster!='N/A'?element.Poster:'image/not_found.jpg',
									text: element.Title + ' ' + (element.Year!='N/A'?`(${element.Year} год)`:'')
								}
							);
						}
					);

					contentBlock.setContent(contentList);
						
					searchBlock.done();
				}
				else if (!text && !content['Search']) 
				{
					searchBlock.done('Поиск не дал результатов');
				}
				else
				{
					searchBlock.done(text?text:'');
				}
			}
		);
	}
);