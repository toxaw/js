<?php 
?>
<script>
	class APIPath
	{
		constructor(baseURL,entityName,protocol)
		{
			this.baseURL = baseURL;

			this.entityName = entityName;
			
			this.protocol = protocol;

			this.getURL = () =>
			{	
				let {name: name, params: params, values: values} = this.entityName;

				let stringURL = `${protocol}://${baseURL}/${name}?`;

				//let paramsKey = new Map();

				let obj =[];

				let i =0;

				params.forEach(function callback(currentValue, index, array) {
					obj[i] = {};

   					obj[i].param = currentValue;
   					
   					i++;
   				});

				i = 0;

				values.forEach(function callback(currentValue, index, array) {
   					obj[i].val = currentValue;
   					
   					i++;
   				});

				let paramArr =[];

   				for (let item of obj)
   				{
   					paramArr.push(`${item.param}=${item.val}`);
   				}

   				return stringURL+paramArr.join('&');
			};
		}
	}

	class Entity
	{
		constructor(name,params,values)
		{
			this.name = name;

			this.params = params;
			
			this.values = values;
		}
	}

	data = ['users.get',
			[
				'version',
				'token',
				'expires'
			],
			[
				'5.2',
				'vjcByxY8alu4mGp4E98mI0pQQd0glouY',
				'120'
			],
			];

	entity = new Entity(...data);

	apipath = new APIPath('api.vk.com',entity,'https');

	console.log(apipath.getURL());
</script>