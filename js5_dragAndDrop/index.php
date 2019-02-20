<?php
?>
<center>
  <img id='commoimg'>
<div class='draganddrop'>
 
</div>
</center>
<style>
center
{
  border: solid 1px black;
  padding: 15px;
}
#commoimg
{
  width: 800px;
  height: 600px;
  display: block;
  margin-bottom: 20px;  
}
img
{
  width: 300px;
  height: 225px;
  display:inline-block;
  padding: 10px;
}
.draganddrop
{

  height: 250px;

  overflow-x:auto; 
}
</style>
<script>

function setImage() 
{
  let commoimg = document.getElementById('commoimg');
  
  if(this.src!='')
  {
    commoimg.src = this.src;
  }
}

listDrop = document.getElementsByClassName('draganddrop');

for(let i=0;i<listDrop.length;i++)
{
  let dropArea = listDrop[i];

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => 
  {
    dropArea.addEventListener(eventName, preventDefaults, false)
  });

  dropArea.addEventListener('drop', handleDrop, false);  
}

function preventDefaults(e) 
{
  e.preventDefault()
  
  e.stopPropagation()
}

function handleDrop(e) 
{
  let dt = e.dataTransfer;
  
  let files = dt.files;

  handleFiles(files, this);
}

function handleFiles(files, parent) 
{
  for(let i=0;i<files.length;i++)
  {    
    let reader = new FileReader();

    reader.readAsDataURL(files[i]);

    reader.onload = function(e) 
    {
      let img = document.createElement('img');

      img.src= e.target.result;

      img.addEventListener("click", setImage, false);

      parent.appendChild(img);
    }
       
  }
}

</script>