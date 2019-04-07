import storageAPI from './storageAPI';
import searchBlock from './searchBlock';
import contentBlock from './contentBlock';
import modalEvent from './modalEvent';
import api from './api';

document.getElementById('modal').getElementsByTagName('span')[0].addEventListener('mousedown', 
	function(e)
	{
		let elementId = document.getElementById('modal').getElementsByTagName('input')[0].value;

		if(!storageAPI.isInStorage(elementId))
		{
			storageAPI.addInStorage(elementId);
		}
		else
		{	
			storageAPI.removeInStorage(elementId);
		}

		let className = 'fa fa-star' + (!storageAPI.isInStorage(elementId)?'-o':'') + ' icon';

		this.className = className;

		document.getElementById(elementId).getElementsByTagName('span')[0].className = className;
	}
);

document.getElementById('modal').addEventListener('mousedown',
	function (e)
	{
		if(e.target.localName!='span')
		{
			this.style.display = 'none';
		}
	}
);

searchBlock.findEvent
(
	(search) =>
	{
		api.query(search, (content, text = null) =>
			{
				contentBlock.removeContent();

				if(content && content['Search'])
				{
					let contentList = [];

					Array.from(content['Search']).forEach
					(
						(element) =>
						{
							contentList.push
							(
								{
									src: element.Poster!='N/A'?element.Poster:'image/not_found.jpg',
									text: element.Title + ' ' + (element.Year!='N/A'?`(${element.Year} год)`:''),
									id: element.imdbID.trim()
								}
							);
						}
					);

					contentBlock.setContent(contentList, modalEvent, storageAPI, api);
						
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