MyMarble.ui.scoreboard = function()
{
	// 전광판을 소유하고 있는 플레이어
	this.oPlayer = null;

	// 전광판의 크기
	this.width = 200;
	this.height = 60;
	
	// 현재 플레이어의 전광판 사각상자
	var oScoreboardRect = null;

	// 전광판에 표시되는 항목, 그리고 텍스트 객체
	var oLabelMap = {
		"Name" : null,
		"Assets" : null,
		"Money" : null
	};

	this.init = function(nPlayerCnt, playOrder)
	{
		// 참여 플레이어 수에 따라 전광판 표시 위치를 다르게 합니다.
		var arrPlayerPos = this.getScoreboardPos(nPlayerCnt, playOrder);

		// 전광판 표시 위치 값
		var cx = arrPlayerPos[0];
		var cy = arrPlayerPos[1];

		// 스테이지 인스턴스
		var oStage = MyMarble.ui.stage.getStage();

		// 전광판 묶음 배열 획득
		var oScoreboardSet = oStage.set();

		// 현재 플레이어의 전광판 사각상자를 생성
		oScoreboardRect = oStage.rect(cx, cy, this.width, this.height).attr({"stroke":"#000000","stroke-width":"2","stroke-dasharray":"-.","opacity":.5});

		// 묶음에 추가
		oScoreboardSet.push(oScoreboardRect);

		// 전광판에 표시되어야 할 항목별 너비,높이,간격
		var nLabelWidth = this.width*0.8;
		var nLabelHeight = this.height*0.20;
		var nLabelMargin = this.height*0.05;

		var i = 0;

		for (var k in oLabelMap)
		{
			// 항목을 표시할 부분의 사각상자를 생성
			var oLabelRect = oStage.rect(cx+(oScoreboardRect.attr('width')/2)-(nLabelWidth/2), 
											(oScoreboardRect.attr('y')+((i+1)*nLabelHeight)+(nLabelMargin*i)),
											nLabelWidth,
											nLabelHeight).attr({"fill": "#241411","stroke":"#000000","stroke-width":"2","stroke-dasharray":"-.","opacity":.9});

			// 사각상자를 묶음에 추가
			oScoreboardSet.push(oLabelRect);

			// 항목 텍스트 생성
			oLabelMap[k] =  oStage.text( oLabelRect.attr('x') + 10  , oLabelRect.attr('y') + 6 , "" ).attr({"fill": "#fff","text-anchor":"start"})	

			// 항목 텍스트 묶음에 추가
			oScoreboardSet.push(oLabelMap[k]);

			i++;
		}

		// 전관판 UI 만들고 비활성 처리(자기 차례되면 바뀜)
		this.inactive();
	}


	// 플레이어 수에 따른 전광판 표시 위치 값을 반환합니다.
	this.getScoreboardPos = function(playerCnt, playOrder)
	{
		var oStageSize = MyMarble.ui.stage.getStageSize();

		var SCOREBOARD_POSITION = [
			// 1명일 때
			[	[oStageSize.w - this.width,oStageSize.h - this.height] ], 
			// 2명일 때
			[	[oStageSize.w - this.width,oStageSize.h - this.height],
				[0,0] ],
			// 3명일 때
			[	[oStageSize.w - this.width,oStageSize.h - this.height],
				[0, oStageSize.h - this.height],
				[oStageSize.w - this.width, 0] ],
			// 4명일 때
			[	[oStageSize.w - this.width,oStageSize.h - this.height],
				[0, oStageSize.h - this.height],	
				[0,0],
				[oStageSize.w - this.width, 0] ]
		];

		return SCOREBOARD_POSITION[playerCnt - 1][playOrder - 1];
	}

	// 전광판 활성
	this.active = function()
	{
		// 플레이어 전광판 색 원래대로 복원
		oScoreboardRect.attr({"stroke":"#FF0000","fill": "#FF5353"});
	}

	// 전광판 비활성
	this.inactive = function()
	{
		// 플레이어 전광판 색 원래대로 복원
		oScoreboardRect.attr({"stroke":"#000000","fill": "#241411"});
	}

	// 전광판을 가지고 있는 플레이어 셋팅
	this.setPlayer = function(o)
	{
		this.oPlayer = o;
	}

	// 전광판의 이름 정보를 갱신합니다.
	this.updateNameText = function(s)
	{
		oLabelMap["Name"].attr({"text": this.oPlayer.getName()});
	}

	// 전광판의 자산 정보를 갱신합니다.
	this.updateAssetsText = function()
	{
		console.log(this.oPlayer.getName() + "의 총 자산 정보를 갱신했습니다.");
		oLabelMap["Assets"].attr({"text": "총 자산 : " + this.oPlayer.getAssets("comma") + "마블"});
	}

	// 정관판의 보유 마블 정보를 갱신합니다.
	this.updateMoneyText = function()
	{
		console.log(this.oPlayer.getName() + "의 보유 마블 정보를 갱신했습니다.");
		oLabelMap["Money"].attr({"text": "보유 마블 : " + this.oPlayer.getCurrentMoney("comma") + "마블"});
	}

};