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
		let contentField = document.getElementsByTagName('main')[0];

		contentList.forEach
		(
			function(element) 
			{
				imageElement = document.createElement('img');

				imageElement.src = element.src;

				headerElement = document.createElement('p');

				headerElement.innerText = element.text;

  				divElement = document.createElement('div');

  				divElement.className = 'film-element';

  				divElement.appendChild(headerElement);

  				divElement.appendChild(imageElement);

  				contentField.appendChild(divElement);
			}
		);
	},
	removeContent:() =>
	{
		let contentField = document.getElementsByTagName('main')[0];
		
		Array.from(contentField.getElementsByClassName('film-element')).forEach 
		(
			(element) =>
			{
				contentField.removeChild(element);				
			}
		);

	}
};

let api = 
{
	query:(query, callback) =>
	{
		let url = 'http://www.omdbapi.com/?s=' + encodeURI(query.toLowerCase()) + '&apikey=d5677312';

		let promise = new Promise
		(
			(resolve, reject) =>
			{
			    let request = new XMLHttpRequest();
			    
			    request.open('GET', url);

			    request.onload = () => 
			    {
			    	if (request.status === 200) 
			    	{
			        	resolve(request.response);
			      	} 
			      	else 
			    	{
			        	reject('Ошибка сервера. Код ошибки:' + request.statusText);
			      	}
			    }

			    request.send();				
			}
		);

		promise.then
		(
			result => 
			{
				callback(JSON.parse(result));
			},
			error => 
			{
				callback(null, text);
			}
		);
	}
};

searchBlock.findEvent
(
	(search) =>
	{
		api.query(search, (content, text = null) =>
			{
				contentBlock.removeContent();

				if(content['Search'])
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