// Определяем новый компонент, названный button-counter
Vue.component('search-container', {  
  template: '<center><div id="search-container"><input v-on:keydown="search" type="text" placeholder ="Я ищу.."><input type="checkbox" id="search-trigger"><i v-on:click="search" class="fa fa-search static" aria-hidden="true"></i><i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw dynamic"></i></div><div id="search-danger"></div></center>',
  /*	data: function()
  	{
  		//let searchInput = {};
  	},*/
	methods: {
	    search: function (event) 
	    {
	    	if(event.type=='click' || (event.type=='keydown' && event.keyCode==13))
	    	{
	    		let searchBlock = 
				{
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

	    		let callbackFind = (search) =>
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
				};

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
	    	
				if(inputSearch.value)
				{
					callbackFind(inputSearch.value);

					element = document.getElementById('search-danger');

					element.innerText= '';

					inputCheckbox.checked = true;					
				}
				else
				{
					inputCheckbox.checked = false;
				}	
			}    		
	    }
	}
});

new Vue(
{ 
	el: 'header' 
}
);

Vue.component('content-container', 
{
	props:['film'],
	template: '<div style="display:inline-block"><div class="film-element"><p>{{ film.text }}</p><img :src="film.src"></div></div>',


});


let filmsVue = new Vue(
{
  		el: 'main',
		data: 
		{
		 	films: []
		}

});

