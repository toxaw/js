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
export default searchBlock;