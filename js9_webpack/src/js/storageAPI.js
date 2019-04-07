let storageAPI = 
{
	addInStorage:(item) =>
	{
		if(!window.localStorage.choses)
		{
			window.localStorage.choses = '[]';
		}

		let json = JSON.parse(window.localStorage.choses);

		json[Object.keys(json).length] = item;

		window.localStorage.choses = JSON.stringify(json);
	},
	isInStorage:(id) =>
	{
		if(!window.localStorage.choses)
		{
			return false;
		}

		let json = JSON.parse(window.localStorage.choses);

		for (let prop in json)
		{
			if(json[prop]==id)
			{
				return true;
			}
		}

		return false;
	},
	removeInStorage:(id) =>
	{
		if(!window.localStorage.choses)
		{
			window.localStorage.choses = '[]';
		}

		let json = JSON.parse(window.localStorage.choses);

		let newJson = [];

		for (let prop in json)
		{
			if(json[prop]!=id)
			{
				newJson.push(json[prop]);
			}
		}

		window.localStorage.choses = JSON.stringify(newJson);
	}
};
export default storageAPI;