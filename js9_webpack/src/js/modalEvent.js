let modalEvent = (id, storageAPI, api) =>
{
	api.detail(id,
		(data, text = '') =>
		{		
			document.getElementById('modal').style.display = 'block';

			let modal = document.getElementById('modal');

			let properties = modal.getElementsByTagName('p');

			modal.getElementsByTagName('img')[0].src = (data.Poster!='N/A')?data.Poster:'image/not_found.jpg';

			modal.getElementsByTagName('span')[0].className = 'fa fa-star' + (!storageAPI.isInStorage(data.imdbID.trim())?'-o':'') + ' icon';

			document.getElementById('modal').getElementsByTagName('input')[0].value = data.imdbID.trim();

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
};
export default modalEvent;