"use strict";
const tileTypes = document.querySelectorAll(".tile");
const tileClass = 'livetile';
const basicTileURL = 'tiles/0.png';

var _x = 0;
var _y = 0;

// ini
var selectedTileType = 0;
container.style.display = 'none';


function generateCode()
{// generates C# code based on the grid data-id values
	/*
	level example:
    {
	 {4, 4, 4, 4, 4, 4, 4},
     {1, 9, 9, 9, 9, 2, 4},
     {4, 4, 4, 4, 4, 4, 4}
	}
	*/
	var liveTiles = document.querySelectorAll(`.${tileClass}`);
	
	var rows = [];
	var row = []
	var columnCount = 0;
	
	liveTiles.forEach(liveTileId => {
		
		row.push(liveTileId.dataset.id);
		
		columnCount++;
		if(columnCount == _x)
		{
			rows.push(`{${row.join(',')}}`);
			row = [];
			columnCount = 0;
		}
	
	});
	
	levelcode.value = `{${rows.join(',\r\n')}}`;
	
}

// this builds the grid and sets up every control
start.addEventListener("click", function(){
	
	// gatekeeper: empty value
	if(x.value == '' || y.value == ''){
		alert('missing values');
		return;
	}
	
	_x = parseInt(x.value);
	_y = parseInt(y.value);
	
	// geetkeeper: only positive numbers accepted
	if(_x <= 0 || _y <= 0)
	{
		alert('0 or negative width or height makes no sense');
		return;
		
	}
	
	// gatekeeper: grid should be at least two tiles
	if( _x + _y < 3)
	{
		alert('at least two tiles must fit in a level');
		return;
	}		
	
	grid.innerHTML = '';

	let gridElement = document.createElement('div');
	let gridImg = document.createElement('img');
	
	gridElement.className = tileClass;
	
	gridImg.src = basicTileURL;
	
	gridElement.appendChild(gridImg);
	
	// draw the initial grid
	for(let i = 0; i < _y; i++)
	{
		
		for(let ii = 0; ii < _x; ii++)
		{
			
			let newElement = gridElement.cloneNode(true);
			
			newElement.dataset.id = 0;
			grid.appendChild(newElement);
			
		}
		
		grid.appendChild(document.createElement('br'));
		
	}
	
	// set up tile clicks
	let liveTiles = document.querySelectorAll(`.${tileClass}`);
	
	liveTiles.forEach(liveTile => {
		
		liveTile.addEventListener('click',function(){
			
			liveTile.getElementsByTagName('img')[0].src = `tiles/${selectedTileType}.png`;
			liveTile.dataset.id = selectedTileType;
			
			generateCode();

		});
		
	});

	generateCode();
	
	container.style.display = 'block';
});

// tile palette controls
tileTypes.forEach(tileType => {
	
	tileType.addEventListener('click',function(){
		
		let selectedElements = document.querySelectorAll('.selected');
		
		selectedElements.forEach(element => {
			element.classList.remove('selected');
		});
		
		selectedTileType = this.dataset.id;
		
		this.classList.add('selected');
	
	});
});

levelcode.addEventListener('click', function() {
    this.select();
});
