MyMarble.map = new (function()
{
	var MAP_DATA = [
			null,
			{ type : MyMarble.config.CELL_TYPE_START , title : "출발지" },
			{ type : MyMarble.config.CELL_TYPE_CITY , title : "방콕" , group : 1 },
			{ type : MyMarble.config.CELL_TYPE_GAME , title : "보너스 게임" },
			{ type : MyMarble.config.CELL_TYPE_CITY , title : "베이징" , group : 1 },
			{ type : MyMarble.config.CELL_TYPE_ISLAND , title : "독도" },
			{ type : MyMarble.config.CELL_TYPE_CITY , title : "타이베이" , group : 2 },
			{ type : MyMarble.config.CELL_TYPE_CITY , title : "두바이" , group : 2 },
			{ type : MyMarble.config.CELL_TYPE_CITY , title : "카이로" , group : 2 },
			{ type : MyMarble.config.CELL_TYPE_DESERT_ISLAND , title : "무인도" },
			{ type : MyMarble.config.CELL_TYPE_ISLAND2 , title : "발리" },
			{ type : MyMarble.config.CELL_TYPE_CITY , title : "도쿄" , group : 3 },
			{ type : MyMarble.config.CELL_TYPE_CITY , title : "시드니" , group : 3 },
			{ type : MyMarble.config.CELL_TYPE_CHANCE , title : "찬스" },
			{ type : MyMarble.config.CELL_TYPE_CITY , title : "퀘백" , group : 4 },
			{ type : MyMarble.config.CELL_TYPE_ISLAND , title : "하와이" },
			{ type : MyMarble.config.CELL_TYPE_CITY , title : "상파울로" , group : 4 },
			{ type : MyMarble.config.CELL_TYPE_OLYMPIC , title : "올림픽" },
			{ type : MyMarble.config.CELL_TYPE_CITY , title : "프라하" , group : 5 },
			{ type : MyMarble.config.CELL_TYPE_ISLAND , title : "푸켓" },
			{ type : MyMarble.config.CELL_TYPE_CITY , title : "베를린" , group : 5 },
			{ type : MyMarble.config.CELL_TYPE_CHANCE , title : "찬스" },
			{ type : MyMarble.config.CELL_TYPE_CITY , title : "모스크바" , group : 6 },
			{ type : MyMarble.config.CELL_TYPE_CITY , title : "제네바" , group : 6 },
			{ type : MyMarble.config.CELL_TYPE_CITY , title : "로마" , group : 6 },
			{ type : MyMarble.config.CELL_TYPE_TRAVEL , title : "세계여행" },
			{ type : MyMarble.config.CELL_TYPE_ISLAND2 , title : "타이티" },
			{ type : MyMarble.config.CELL_TYPE_CITY , title : "런던" , group : 7 },
			{ type : MyMarble.config.CELL_TYPE_CITY , title : "파리" , group : 7 },
			{ type : MyMarble.config.CELL_TYPE_CHANCE , title : "찬스" },
			{ type : MyMarble.config.CELL_TYPE_CITY , title : "뉴욕" , group : 8 },
			{ type : MyMarble.config.CELL_TYPE_TAX , title : "국세청" },
			{ type : MyMarble.config.CELL_TYPE_CITY , title : "서울" , group : 8 }
		];

	this.getCellInfo = function(index)
	{
		return MAP_DATA[index];
	}

	this.getMapData = function(index, key)
	{
		return MAP_DATA[index][key] == undefined ? "" : MAP_DATA[index][key];
	}
});
