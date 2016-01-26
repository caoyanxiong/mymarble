MyMarble.data = new (function()
{
	// 등기부
	var oCopy = {};

	// 데이터 초기화
	this.initData = function(i)
	{
		var oCellInfo = MyMarble.map.getCellInfo(i);

		switch (oCellInfo.type)
		{
			// 도시 = 땅, 빌라, 빌딩, 호텔, 랜드마크 보유 현황
			case MyMarble.config.CELL_TYPE_CITY:
				oCopy["map"+i] = {
					ownerPlayerId : null, // 소유한 플레이어 ID
					land : false, // 소유하기 위해서는 반드시 땅을 사야 함.
					villa : false,
					building : false,
					hotel : false,
					landmark : false // 랜드마크는 빌라,빌딩,호텔이 모두 있는 상태에서 만들 수 있음
				};
				break;

			// 섬
			case MyMarble.config.CELL_TYPE_ISLAND:
			case MyMarble.config.CELL_TYPE_ISLAND2:
				oCopy["map"+i] = {
					ownerPlayerId : null, // 소유한 플레이어 ID
					visitCnt : 0 // 방문 횟수
				};
				break;
		}
	}

	this.getData = function(i)
	{
		return oCopy["map"+i];
	}

	// 미리 건물 객체를 생성해 둠
	this.initElement = function(i, oCellRect)
	{
		var oCellInfo = MyMarble.map.getCellInfo(i);

		if (oCellInfo.type != MyMarble.config.CELL_TYPE_CITY)
			return ;

		var nCellWidth = oCellRect.attr("width");
		var nCellHeight = oCellRect.attr("height");

		var nWidth = nCellWidth * 0.25;
		var nHeight = nCellHeight * 0.25;
		var cx, cy;

		var oData = this.getData(i);

		cx = oCellRect.attr("x") + (nCellWidth/2 - nWidth/2);
		cy = oCellRect.attr("y") + (nCellHeight/2 - nHeight/2);

		// 땅
		oData.landRectObject = MyMarble.ui.stage.getStage().rect( cx , cy , nWidth , nHeight).attr({fill: "#EFEFEF","stroke-width":"1", "stroke":"#000000"});

		cx = oCellRect.attr("x") + 5;
		cy = oCellRect.attr("y") + (nCellHeight * 0.70);

		// 빌라
		oData.villaRectObject = MyMarble.ui.stage.getStage().rect( cx , cy , nWidth , nHeight).attr({fill: "#BDBDBD","stroke-width":"1", "stroke":"#000000"});

		// 빌딩
		oData.buildingRectObject = MyMarble.ui.stage.getStage().rect( cx + (nCellWidth * 0.05) + nWidth , cy , nWidth , nHeight).attr({fill: "#5B5B5B","stroke-width":"1", "stroke":"#000000"});

		// 호텔
		oData.hotelRectObject = MyMarble.ui.stage.getStage().rect( cx + (nCellWidth * 0.05 * 2) + (nWidth*2) , cy , nWidth , nHeight).attr({fill: "#292929","stroke-width":"1", "stroke":"#000000"});
		
		// 랜드마크
		cx = oCellRect.attr("x") + 5;
		cy = oCellRect.attr("y") + (nCellHeight/2 - nHeight/2);
		nWidth = ( nCellWidth * 0.25 * 3 ) + (nCellWidth * 0.05 * 2);
		nHeight = nHeight * 2;

		oData.landmarkRectObject = MyMarble.ui.stage.getStage().rect( cx  , cy , nWidth , nHeight).attr({fill: "#FFCC00","stroke-width":"1", "stroke":"#000000"});


		this.updateVisibleElement(i);
	}

	// 등기 상태에 따라 표시 업데이트
	this.updateVisibleElement = function(i)
	{
		var oData = this.getData(i);

		if (oData.land)
			oData.landRectObject.show();
		else
			oData.landRectObject.hide();

		if (oData.villa)
			oData.villaRectObject.show();
		else
			oData.villaRectObject.hide();

		if (oData.building)
			oData.buildingRectObject.show();
		else
			oData.buildingRectObject.hide();

		if (oData.hotel)
			oData.hotelRectObject.show();
		else
			oData.hotelRectObject.hide();

		if (oData.landmark)
			oData.landmarkRectObject.show();
		else
			oData.landmarkRectObject.hide();
		
	}


});
