
MyMarble.ui.board = new (function()
{
	// 보드판에 대한 그룹 정보
	var oBoardSet = null;
	var oBoardRect = null;

	// 보드판 스타일 정보
	var oBoardStyle = { width : 500 , height : 500 };
	
	// 보드판에 그려진 셀 사각형 객체
	var arrBoardCell = [];

	this.init = function()
	{
		// 보드판 만들기
		this.createBoardHolder();

		// 도시,관광지,찬스카드 등의 셀 만들기
		this.initBoardCell();

	}

	this.getSize = function()
	{
		return oBoardStyle;
	}

	// 보드판을 만듭니다.
	this.createBoardHolder = function()
	{
		console.log("[보드 셀 셋팅]");

		// 스테이지 인스턴스
		var oStage = MyMarble.ui.stage.getStage();

		// 보드판 묶음 그룹 획득
		oBoardSet = oStage.set();

		// 스테이지 사이즈 획득
		var stageSize = MyMarble.ui.stage.getStageSize();

		oBoardRect = oStage.rect((stageSize.w/2)-(oBoardStyle.width/2),
									(stageSize.h/2)-(oBoardStyle.height/2),
									oBoardStyle.width, oBoardStyle.height, 0).attr({fill: "#949393"});
		oBoardSet.push( oBoardRect );

		var oBoardImg = oStage.image( MyMarble.getImgUrl("bg_board.png") , oBoardRect.attr('x') , oBoardRect.attr('y') , oBoardRect.attr('width') , oBoardRect.attr('height') );
		oBoardSet.push( oBoardImg );
	}

	// 도시,관광지,찬스카드 등의 셀 만듭니다.
	this.initBoardCell = function()
	{
		// 셀 배열 초기화
		arrBoardCell = ["*"];

		var cx = 0, cy = 0, pos;
		
		// 보드판에는 총 32개의 셀이 올 수 있음.
		for (var i = 1; i <= 32 ; i++ )
		{			
			arrBoardCell.push( new MyMarble.ui.cell(i, oBoardRect, oBoardSet, cx , cy) );

			pos = arrBoardCell[i].getPos();
			cx = pos.x;
			cy = pos.y;
		}
	}

	this.getCell = function(cellNo)
	{
		return arrBoardCell[cellNo];
	}

	// 보드 셀에 대한 객체 반환
	this.getCellObject = function(cellNo)
	{
		return arrBoardCell[cellNo].getCellRect();
	}

	// 특정 셀의 x,y 좌표 정보를 반환합니다.
	this.getCellPos = function(cellNo)
	{
		return { x : this.getCellObject(cellNo).attr("x") , y : this.getCellObject(cellNo).attr("y") };
	}

	// 특정 셀의 너비 정보를 반환합니다.
	this.getCellSize = function(cellNo,scale)
	{
		if (scale == undefined)
			scale = 1;

		return { w : this.getCellObject(cellNo).attr("width")*scale , h : this.getCellObject(cellNo).attr("height")*scale };
	}

	// 보드를 회전 시킴
	this.rotateBoard = function()
	{
		var l_coord = oBoardSet.getBBox().x,
			r_coord = oBoardSet.getBBox().x2,
			t_coord = oBoardSet.getBBox().y,
			b_coord = oBoardSet.getBBox().y2;

		var cx = (l_coord + r_coord)/2,
			cy = (t_coord + b_coord)/2;

		oBoardSet.rotate(45,cx,cy);
	}

});
