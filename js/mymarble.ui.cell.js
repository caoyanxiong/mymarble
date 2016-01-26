
MyMarble.ui.cell = function(i, oBoardRect, oBoardSet, cx, cy)
{
	// 스테이지 인스턴스
	var oStage = MyMarble.ui.stage.getStage();

	var oBoardStyle = MyMarble.ui.board.getSize();

	// 코너 셀의 너비와 높이(정사각형)
	var nConnerCellWH = 60;

	// 한 셀의 너비를 결정합니다. ( 보드판의 너비 - (코너 셀*양쪽) ) / 7
	var nCellWidth = (oBoardStyle.width - (nConnerCellWH*2)) / 7;

	// 코너에 해당하는 위치인지 구합니다.
	var bConner = i%8 == 1;

	// 셀이 놓여질 라인 방향을 구합니다.
	var nGroup = Math.ceil(i/8);

	// 개별 셀에 대한 사각형, 텍스트, 이미지 객체를 할당할 변수 초기화
	var oCellRect, oCellText, oCellImg;

	// 등기 정보
	var oData = {
					ownerPlayerId : 0, // 소유한 플레이어 ID
					land : false, // 소유하기 위해서는 반드시 땅을 사야 함.
					villa : false,
					building : false,
					hotel : false,
					landmark : false, // 랜드마크는 빌라,빌딩,호텔이 모두 있는 상태에서 만들 수 있음
					visitCnt : 0 // 방문 횟수
				};

	this.init = function()
	{
		// 셀별 이미지 객체 초기화
		oCellImg = null;

		// 현재 셀에 대한 정보를 맵으로 부더 가져옵니다.
		var oCellInfo = MyMarble.map.getCellInfo(i);

		// 현재 셀의 명칭을 콘솔에 출력합니다.
		console.log(oCellInfo.title);

		// 현재 셀에 대한 배경 색 정보를 셀 유형에 따라 다르게 가져옵니다.
		// 도시(CELL_TYPE_CITY)의 경우, 도시가 속한 그룹에 대한 색을 가져옵니다.
		// 도시 이외의 경우, 지정된 색상을 가져옵니다.
		var bgColor = (oCellInfo.type == MyMarble.config.CELL_TYPE_CITY) ? 
						MyMarble.config.getGroupColor(oCellInfo.group) 
						: MyMarble.config.getTypeColor(oCellInfo.type);

		// 셀이 놓여질 라인 방향에 따라
		switch (nGroup)
		{
			// 아랫쪽의 시작 셀이 있는 라인
			case 1:
				if (bConner)
				{
					cx = oBoardRect.attr('x') + oBoardRect.attr('width') - nConnerCellWH;
					cy = oBoardRect.attr('y') + oBoardRect.attr('height') - nConnerCellWH;
				}
				else
					cx -= nCellWidth;

				oCellRect = oStage.rect( cx , cy , bConner ? nConnerCellWH : nCellWidth , nConnerCellWH).attr({fill: bgColor,"stroke-width":"0"});
				break;
			// 왼쪽 라인
			case 2:
				if (bConner)
				{
					cx = oBoardRect.attr('x');
					cy = oBoardRect.attr('y') + oBoardRect.attr('height') - nConnerCellWH;
				}
				else
					cy -= nCellWidth;

				oCellRect = oStage.rect( cx , cy , nConnerCellWH , bConner ? nConnerCellWH : nCellWidth).attr({fill: bgColor,"stroke-width":"0"});
				break;
			// 윗쪽 라인
			case 3:
				if (bConner)
				{
					cx = oBoardRect.attr('x');
					cy = oBoardRect.attr('y');
				}

				oCellRect = oStage.rect( cx , cy , bConner ? nConnerCellWH : nCellWidth , nConnerCellWH).attr({fill: bgColor,"stroke-width":"0"});

				if (bConner)
					cx += nConnerCellWH;
				else
					cx += nCellWidth;
				break;
			// 오른쪽 라인
			case 4:
				if (bConner)
				{
					cx = oBoardRect.attr('x') + oBoardRect.attr('width') - nConnerCellWH;
					cy = oBoardRect.attr('y');
				}

				oCellRect = oStage.rect( cx , cy , nConnerCellWH , bConner ? nConnerCellWH : nCellWidth).attr({fill: bgColor,"stroke-width":"0"});

				if (bConner)
					cy += nConnerCellWH;
				else
					cy += nCellWidth;
				break;
		}

		// 셀 유형 중, 도시/관광지가 아닌 셀에 대해서는 지정된 이미지를 불러와 셀 자리를 채웁니다.
		switch (oCellInfo.type)
		{
			case MyMarble.config.CELL_TYPE_START:
				oCellImg = oStage.image( MyMarble.getImgUrl("bg_start.png") , oCellRect.attr('x') , oCellRect.attr('y') , oCellRect.attr('width') , oCellRect.attr('height') );
				break;
			case MyMarble.config.CELL_TYPE_DESERT_ISLAND:
				oCellImg = oStage.image( MyMarble.getImgUrl("bg_desrt_island.png") , oCellRect.attr('x') , oCellRect.attr('y') , oCellRect.attr('width') , oCellRect.attr('height') );
				break;
			case MyMarble.config.CELL_TYPE_OLYMPIC:
				oCellImg = oStage.image( MyMarble.getImgUrl("bg_olympic.png") , oCellRect.attr('x') , oCellRect.attr('y') , oCellRect.attr('width') , oCellRect.attr('height') );
				break;
			case MyMarble.config.CELL_TYPE_TRAVEL:
				oCellImg = oStage.image( MyMarble.getImgUrl("bg_travel.png") , oCellRect.attr('x') , oCellRect.attr('y') , oCellRect.attr('width') , oCellRect.attr('height') );
				break;
			default:
				oCellText = oStage.text( oCellRect.attr('x') + 5 , oCellRect.attr('y') + 10 , oCellInfo.title ).attr({"text-anchor":"start"});
				break;
		
		}

		// 셀 유형에 초기화되어야 하는 UI를 초기화 (NOTE: 리팩토링 필요)
		if (oCellInfo.type == MyMarble.config.CELL_TYPE_CITY)
		{
			this.initCityElement(i, oCellRect);
		}

		// 셀 객체를 보드와 보드판을 한 묶음 처리합니다.
		oBoardSet.push( oCellRect );

		// 셀 이미지를 사용한 경우, 보드판과 한 묶음 처리합니다.
		if (oCellImg)
			oBoardSet.push( oCellImg );

		// 셀 텍스트를 사용한 경우, 보드판과 한 묶음 처리합니다.
		if (oCellText)
			oBoardSet.push( oCellText );
	}

	// 도시 유형에 대한 초기화
	this.initCityElement = function(i, oCellRect)
	{
		var nCellWidth = oCellRect.attr("width");
		var nCellHeight = oCellRect.attr("height");

		var oStage = MyMarble.ui.stage.getStage();

		var nWidth = nCellWidth * 0.25;
		var nHeight = nCellHeight * 0.25;
		var cx, cy;

		cx = oCellRect.attr("x") + (nCellWidth/2 - nWidth/2);
		cy = oCellRect.attr("y") + (nCellHeight/2 - nHeight/2);

		// 땅
		oData.landRectObject = oStage.rect( cx , cy , nWidth , nHeight).attr({fill: "#EFEFEF","stroke-width":"1", "stroke":"#000000"});

		cx = oCellRect.attr("x") + 5;
		cy = oCellRect.attr("y") + (nCellHeight * 0.70);

		// 빌라
		oData.villaRectObject = oStage.rect( cx , cy , nWidth , nHeight).attr({fill: "#BDBDBD","stroke-width":"1", "stroke":"#000000"});

		// 빌딩
		oData.buildingRectObject = oStage.rect( cx + (nCellWidth * 0.05) + nWidth , cy , nWidth , nHeight).attr({fill: "#5B5B5B","stroke-width":"1", "stroke":"#000000"});

		// 호텔
		oData.hotelRectObject = oStage.rect( cx + (nCellWidth * 0.05 * 2) + (nWidth*2) , cy , nWidth , nHeight).attr({fill: "#292929","stroke-width":"1", "stroke":"#000000"});
		
		// 랜드마크
		cx = oCellRect.attr("x") + 5;
		cy = oCellRect.attr("y") + (nCellHeight/2 - nHeight/2);
		nWidth = ( nCellWidth * 0.25 * 3 ) + (nCellWidth * 0.05 * 2);
		nHeight = nHeight * 2;

		oData.landmarkRectObject = oStage.rect( cx  , cy , nWidth , nHeight).attr({fill: "#FFCC00","stroke-width":"1", "stroke":"#000000"});

		this.updateVisibleElement();
	}

	// 셀 사각형 반환
	this.getCellRect = function()
	{
		return oCellRect;
	}

	// 셀 좌표 반환
	this.getPos = function()
	{
		return { x : cx, y : cy };
	}

	// 등기 데이터 반환
	this.getData = function()
	{
		return oData;
	}

	this.setData = function(k, v)
	{
		if (oData[k] == undefined)
		{
			console.log("데이터 갱신 요청한 " + k + "(은)는 정의되어 있지 않습니다.");
			return ;
		}

		console.log("등기부의 " + k + " 값이 " + v + "(으)로 변경되었습니다.");

		oData[k] = v;
	}

	// 소유주 인가?
	this.isOwnerPlayer = function(playerId)
	{
		return oData.ownerPlayerId == playerId;
	}

	// 소유주가 없는가>
	this.isEmptyOwner = function()
	{
		return oData.ownerPlayerId == 0;
	}

	// 등기 상태에 따라 표시 업데이트
	this.updateVisibleElement = function()
	{
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

	// 초기화
	this.init();
};
