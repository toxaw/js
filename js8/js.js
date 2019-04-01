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

		iStatic.addEventListener('mousedown', (e) =>
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
	setContent:(contentList, modalEvent) =>
	{
		let proto  = this;

		let contentField = document.getElementsByTagName('main')[0];

		let addInStorage = (item) =>
		{
			let json = JSON.parse(window.localStorage.choses);

			json[Object.keys(json).length] = item;

			window.localStorage.choses = JSON.stringify(json);
		};

		let isInStorage = (id) =>
		{
			if(!window.localStorage.choses)
			{
				return false;
			}

			let json = JSON.parse(window.localStorage.choses);

			for (prop in json)
			{
				if(json[prop]==id)
				{
					return true;
				}
			}

			return false;
		};

		let removeInStorage = (id) =>
		{
			let json = JSON.parse(window.localStorage.choses);

			let newJson = [];

			for (prop in json)
			{
				if(json[prop]!=id)
				{
					newJson.push(json[prop]);
				}
			}

			window.localStorage.choses = JSON.stringify(newJson);
		};

		contentList.forEach
		(
			function(element) 
			{
				imageElement = document.createElement('img');

				imageElement.src = element.src;

				headerElement = document.createElement('p');

				choseElement = document.createElement('span');

				choseElement.className = 'fa fa-star' + (!isInStorage(element.id)?'-o':'') + ' icon';

				choseElement.addEventListener('mousedown',
					function(e)
					{
						let elementId = this.closest('.film-element').getAttribute('id');

						if(!isInStorage(element.id))
						{
							addInStorage(elementId);
						}
						else
						{	
							removeInStorage(elementId);
						}

						this.className = 'fa fa-star' + (!isInStorage(elementId)?'-o':'') + ' icon';
					}
				);

				headerElement.innerText = element.text;

  				divElement = document.createElement('div');

  				divElement.className = 'film-element';

				divElement.setAttribute('id', element.id);

  				divElement.appendChild(headerElement);

  				divElement.appendChild(choseElement);

  				divElement.appendChild(imageElement);

  				imageElement.addEventListener('mousedown',
					function(e)
					{
						let elementId = this.closest('.film-element').getAttribute('id');

						modalEvent(elementId);
					}
				);

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
			callback(null, 'Ошибка сервера');
		}
	},
	detail:async (query, callback) =>
	{
		let url = 'http://www.omdbapi.com/?i=' + encodeURI(query.toLowerCase()) + '&apikey=d5677312';
		
		try
		{
			let response = await fetch(url);
		
			let data = await response.json();

			callback(data);
		}
		catch(e)
		{
			callback(null, 'Ошибка сервера');
		}
	},
};

document.getElementById('modal').addEventListener('mousedown',
	function ()
	{
		this.style.display = 'none';
	}
);

let modalEvent = (id) =>
{
	api.detail(id,
		(data, text = '') =>
		{
			document.getElementById('modal').style.display = 'block';

			let modal = document.getElementById('modal');

			let properties = modal.getElementsByTagName('p');

			modal.getElementsByTagName('img')[0].src = (data['Poster'] && data.Poster!='N/A')?data.Poster:'image/not_found.jpg';

			let setParam = (objectp, value) =>
			{
				objectp.getElementsByTagName('span')[0].innerText = value!='N/A'?value:'Информация недоступна';
			};

			setParam(properties[0], data.Title);

			setParam(properties[1], data.Released);

			setParam(properties[2], data.Plot);

			setParam(properties[3], data.Country);

			setParam(properties[4], data.Language);

			setParam(properties[5], data.imdbRating);
		}
	);
}
;

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
									text: element.Title + ' ' + (element.Year!='N/A'?`(${element.Year} год)`:''),
									id: element.imdbID
								}
							);
						}
					);

					contentBlock.setContent(contentList, modalEvent);
						
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