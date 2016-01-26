
MyMarble.ui.dice = new (function()
{
	// scope 문제로 별칭 생성
	var _this = this;

	// 주시위 던지기 버튼
	var oBtnRoll = null;

	// 스테이지 생성 이후, 초기화해야 함.
	this.init = function()
	{
		// 스테이지 인스턴스
		var oStage = MyMarble.ui.stage.getStage();
		var stageSize = MyMarble.ui.stage.getStageSize();

		// 주사위 크기
		var nWidth = 50;
		var nHeight = 50;

		// 주사위 굴리기 위한 버튼 생성
		oBtnRoll = oStage.ellipse(( stageSize.w/2)-(nWidth/2), (stageSize.h/2)-(nHeight/2), nWidth, nHeight );
		oBtnRoll.attr({fill: "#FF00F6",cursor:"pointer"});
		oBtnRoll.click(function()
		{
			_this.hideRollButton();
			_this.rollDice();
		});

		this.hideRollButton();
	}

	// 주사위 굴리기 위한 버튼을 노출 시킴
	this.showRollButton = function()
	{
		oBtnRoll.show();
	}

	// 주사위 굴리기 위한 버튼을 감춤
	this.hideRollButton = function()
	{
		oBtnRoll.hide();
	}

	// 주사위를 던진다
	this.rollDice = function()
	{
		var diceNo1 = Math.floor(Math.random() * 6) + 1;
		var diceNo2 = Math.floor(Math.random() * 6) + 1;
		var diceNo = diceNo1 + diceNo2;

		console.log("주사위를 던져 각각 " + diceNo1 + " / " + diceNo2 + "(이)가 나왔습니다.");

		// 현재 플레이어 이동 명령
		MyMarble.moveCurrentPlayer(diceNo);
	}


});
