MyMarble.util = new (function()
{
	this.shuffle = function(arr)
	{
		var curIdx = arr.length, tmp, rndIdx ;

		while (0 !== curIdx)
		{
			rndIdx = Math.floor(Math.random() * curIdx);
			curIdx -= 1;

			tmp = arr[curIdx];
			arr[curIdx] = arr[rndIdx];
			arr[rndIdx] = tmp;
		}

		return arr;
	}

	this.numberFormat = function(n)
	{
		return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

});
