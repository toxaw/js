<?php 
?>
<body>
	<img src='lol.jpeg' id='pict' width='100' height ='200'>
</body>
<script>
time = 5;

trigger = true;

element = document.getElementById('pict');

small = {width:100,
		height:200};

big = {width:200,
		height:400};

element.addEventListener("dblclick", function (e)
{
	trigger =!trigger;

	let obj = this;
	
	if(trigger)
	{
		let w=big.width;
		
		let h=big.height;

		let func = function () 
		{
 			obj.setAttribute('width',w--);

 			obj.setAttribute('height',h-=2);
 			
 			if(w==small.width)
 			{
 	 			clearInterval(timerId);
 			}
		};

		let timerId = setInterval(func, time);
	}
	else
	{
		let w=small.width;
		
		let h=small.height;

		let func = function () 
		{
 			obj.setAttribute('width',w++);

 			obj.setAttribute('height',h+=2);
 			
 			if(w==big.width)
 			{
 	 			clearInterval(timerId);
 			}
		};

		let timerId = setInterval(func, time);
	}
});
</script>