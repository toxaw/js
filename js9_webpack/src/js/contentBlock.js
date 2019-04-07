let contentBlock = 
{
	setContent:(contentList, modalEvent, storageAPI, api) =>
	{
		let proto  = this;

		let contentField = document.getElementsByTagName('main')[0];

		contentList.forEach
		(
			function(element) 
			{
				let imageElement = document.createElement('img');

				imageElement.src = element.src;

				let headerElement = document.createElement('p');

				let choseElement = document.createElement('span');

				choseElement.className = 'fa fa-star' + (!storageAPI.isInStorage(element.id)?'-o':'') + ' icon';

				choseElement.addEventListener('mousedown',
					function(e)
					{
						let elementId = this.closest('.film-element').getAttribute('id');

						if(!storageAPI.isInStorage(elementId))
						{
							storageAPI.addInStorage(elementId);
						}
						else
						{	
							storageAPI.removeInStorage(elementId);
						}

						this.className = 'fa fa-star' + (!storageAPI.isInStorage(elementId)?'-o':'') + ' icon';
					}
				);

				headerElement.innerText = element.text;

  				let divElement = document.createElement('div');

  				divElement.className = 'film-element';

				divElement.setAttribute('id', element.id);

  				divElement.appendChild(headerElement);

  				divElement.appendChild(choseElement);

  				divElement.appendChild(imageElement);

  				imageElement.addEventListener('mousedown',
					function(e)
					{
						let elementId = this.closest('.film-element').getAttribute('id');

						modalEvent(elementId, storageAPI, api);
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
export default contentBlock;