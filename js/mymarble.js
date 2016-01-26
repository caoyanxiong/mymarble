var MyMarble = new (function()
{
	var _this = this;

	// 현재 참여하는 플레이어 수
	this.nPlayerCnt = 0;

	// 현재 참여하는 플레이어들의 컨트롤 객체
	this.oPlayerMap = {};

	// 플레이어들의 게임 순서
	this.arrPlayerList = [];

	// 현재 게임을 하고 있는 플레이어 인덱스
	this.curPlayerIdx = 0;

	// 마블 게임 초기화
	this.init = function(initElement)
	{

		// 스테이지 초기화
		this.initStage(initElement);

		// 플레이어 초기화
		this.initPlayer();

		// 주사위 초기화
		this.initDice();

		// 첫번째 플레이어 게임 시작
		this.startGame();

	}

	// 스테이지와 기본 UI 요소를 셋팅합니다.
	this.initStage = function(initElement)
	{
		// 스테이지 초기화
		MyMarble.ui.stage.init(initElement);

		// 보드판 초기화
		MyMarble.ui.board.init();
	}

	// 플레이어 정보를 셋팅합니다.
	this.initPlayer = function()
	{
		console.log("플레이어 정보를 셋팅합니다.");

		// 참여 플레이어 수 셋팅(NOTE: 추후, 입력을 받으면 됨)
		this.nPlayerCnt = 4;

		// 참여하는 플레이어 컨트롤 객체를 추가한다.
		this.arrPlayerList = [];
		for (var i = 1; i <= this.nPlayerCnt ; i++ )
			this.arrPlayerList.push(i);

		// 플레이어 순서를 랜덤을 섞는다. (NOTe: 추후, 네트워크 방식에서 사용자들이 선택한 순서에 따라 변경하면 됨)
		this.arrPlayerList = MyMarble.util.shuffle(this.arrPlayerList);

		console.log("플레이어 순서를 섞음");
		console.log(this.arrPlayerList);

		// 참여자 수 만큼 플레이어 객체를 초기화
		for (var plaerOrder = 1; plaerOrder <= this.nPlayerCnt ; plaerOrder++ )
			this.addPlayer(plaerOrder, this.arrPlayerList[plaerOrder-1]);

	}

	// 주사위 초기화
	this.initDice = function()
	{
		MyMarble.ui.dice.init();
	}

	// 현재 게임을 하고 있는 플레이어 반환
	this.getPlayer = function(playerId)
	{
		if (playerId == undefined)
			playerId = this.getCurrentPlayerId();

		return this.oPlayerMap["player"+playerId];
	}

	// 현재 플레이어 ID 획득
	this.getCurrentPlayerId = function()
	{
		return this.arrPlayerList[this.curPlayerIdx];
	}

	// 게임 시작
	this.startGame = function()
	{
		// 현재 플레이어 객체 획득
		var oPlayer = this.getPlayer();

		console.log( oPlayer.getName() + "의 차례입니다. 주사위를 던지세요." );

		// 주사위 버튼 보이기
		MyMarble.ui.dice.showRollButton();

		// 플레이어 준비
		oPlayer.activeAvatar();

		// 플레이어 전광판 색 변경(진행 중 표시)
		oPlayer.activeScoreboard();
	}

	// 다음 플레이어 게임 시작
	this.startNextPlayer = function()
	{
		// 다음 플레이어 인덱스를 구한다.
		// 플레이어 참여자 초과시 처음 플레이어로 돌림
		if (this.curPlayerIdx + 1 >= this.arrPlayerList.length)
			this.curPlayerIdx = 0;
		else
			this.curPlayerIdx++;

		// 게임 다시 시작
		this.startGame();
	}

	// 플레이어 객체를 생성합니다.
	this.addPlayer = function(playOrder, playerId)
	{
		// 플레이어 객체 생성
		var oPlayer = new MyMarble.player(playerId, MyMarble.config.SEED_MONEY, this.nPlayerCnt, playOrder);

		// 플레이어 객체 맵에 추가
		this.oPlayerMap["player"+playerId] = oPlayer;

		this.updatePlayerInfo(playerId);

		return oPlayer;
	}

	// 플레이어 총자산, 보유마블 갱신
	this.updatePlayerInfo = function(playerId)
	{
		this.getPlayer(playerId).updatePlayerInfo();
	}

	// 현재 플레이어 말 이동
	this.moveCurrentPlayer = function(moveNo)
	{
		// 현재 플레이어
		var oPlayer = this.getPlayer();

		console.log(oPlayer.getName()+"의 말을 " + moveNo + "칸 이동합니다.");

		// 현재 플레이어의 현재 위치를 확인
		var curPos = oPlayer.getLocation();

		// 현재 플레이어 아바타를 현재 위치 + 주사위 던져 나온 수 만큼 이동 명령
		oPlayer.moveAvatar(curPos + moveNo);
	}

	// 현재 플레이어 도시 도착
	this.onPlayerArrived = function()
	{
		// 플레이어의 위치로 현재 도시 정보 획득
		var nCellNo = this.getPlayer().getLocation();
		var oCellInfo = MyMarble.map.getCellInfo(nCellNo);

		console.log(oCellInfo.title + "에 도착했습니다.");

		var oCell = MyMarble.ui.board.getCell(nCellNo);
		var oData = oCell.getData();
	
		switch (oCellInfo.type)
		{
			// if 셀 유형이 도시인가?
			case MyMarble.config.CELL_TYPE_CITY:
				if (oCell.isEmptyOwner())
				{	//	if 무소유인가? 도시 건설 팝업
					console.log("소유주가 없는 도시입니다. 건물을 지을 수 있습니다.");
					MyMarble.ui.popupBuyBuilding.show(nCellNo, function() { _this.onEndCurrentPlayer(); });
				}
				else if (oCell.isOwnerPlayer( this.getCurrentPlayerId ) == false)
				{	//	else if 다른 플레이어껀가? 통행료를 지불한다
					console.log("다른 플레이어가 점유한 도시입니다. 통행료를 지불합니다.");
					_this.onEndCurrentPlayer();
				}
				else
				{	//	else 내꺼인가?
					console.log("내가 소유한 도시에 도착했습니다.");
					_this.onEndCurrentPlayer();
					//		if 건설할 수 있는 남아 있는 건물이 있나? 도시 건설 팝업
					//		else if 건물 3개 보유, 랜드마크 미 건설인가? 랜드마크 구매 팝업
					//		else 건설할 수 있는 남아 있는 건물이 없나? 그대로
				}
				break;
			// else if 셀 유형이 관광지인가?
			case MyMarble.config.CELL_TYPE_ISLAND:
			case MyMarble.config.CELL_TYPE_ISLAND2:
				//	if 소유주가 있나?
				//		if 내꺼인가?
				//			if 두번째 방문인가? 통행료 올린다
				//			else if 세번째 방문인가? 통행료 올린다
				//	else if 다른 플레이어껀가? 통행료 지불한다
				//	else 무소유인가? 관광지를 구매할 것인가? 관광지 구매 팝업
				_this.onEndCurrentPlayer();
				break;
			// else if 셀 유형이 시작인가? 월급을 플레이어에게 준다
			case MyMarble.config.CELL_TYPE_START:
				_this.onEndCurrentPlayer();
				break;
			// else if 셀 유형이 찬스인가? 찬스카드를 랜덤하게 하나 뽑는다
			case MyMarble.config.CELL_TYPE_CHANCE:
				_this.onEndCurrentPlayer();
				break;
			// else if 셀 유형이 올림픽인가? 올림픽 개최 도시를 선택할 수 있게 한다
			case MyMarble.config.CELL_TYPE_OLYMPIC:
				_this.onEndCurrentPlayer();
				break;
			// else if 셀 유형이 세계여행인가? 다음 턴에 세계여행 할 수 있다고 알려준다 , 다은 턴에 세계여행해야 한다(여행비 청구)
			case MyMarble.config.CELL_TYPE_TRAVEL:
				_this.onEndCurrentPlayer();
				break;
			// else if 셀 유형이 국세청인가? 도시 소유분에 대한 세금을 징수 받는다.
			case MyMarble.config.CELL_TYPE_TAX:
				_this.onEndCurrentPlayer();
				break;
			// else if 셀 유형이 무인도인가? 주사위를 던저 짝수가 나오면 탈출 할 수 있다.(3회이내)
			case MyMarble.config.CELL_TYPE_DESERT_ISLAND:
				_this.onEndCurrentPlayer();
				break;
			// else if 셀 유형이 보너스 게임인가? 좌/우 게임을 해서 승률 만큼 보너스로 돈을 받아간다
			case MyMarble.config.CELL_TYPE_GAME:
				_this.onEndCurrentPlayer();
				break;
		}



	}

	// 현재 플레이어 게임이 끝남
	this.onEndCurrentPlayer = function()
	{
		// 현재 플레이어 객체 획득
		var oPlayer = this.getPlayer();

		// 플레이어 전광판 색 원래대로 복원
		oPlayer.inactiveScoreboard();

		// 플레이어 아바타 비활성
		oPlayer.inactiveAvatar();

		// 다음 플레이어 진행하도록 넘긴다.
		this.startNextPlayer();
	}


	// 게임에서 사용하는 이미지 경로 반환
	this.getImgUrl = function(path)
	{
		return "img/"+path;
	}
});

