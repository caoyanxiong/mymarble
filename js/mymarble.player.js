MyMarble.player = function(playerId, seedMoney, nPlayerCnt, playOrder)
{
	var _this = this;

	// 플레이어 ID
	this.playerId = playerId;

	// 초기 자본금
	this.seedMoney = seedMoney;

	// 현재 보유마블
	this.currentMoney = this.seedMoney;

	// 플레이어의 전광판 객체 생성
	this.scoreboard = null;

	// 플레이어의 아바타를 초기화합니다.
	this.avatar = null;

	// 초기화
	this.init = function(nPlayerCnt, playOrder)
	{
		// 플레이어의 전광판 객체 생성
		this.scoreboard = new MyMarble.ui.scoreboard();

		// 전광판에 플레이어 정보 전달(상호 연결)
		with (this.scoreboard)
		{
			setPlayer(this);
			init(nPlayerCnt, playOrder);
			updateNameText();
			updateAssetsText();
			updateMoneyText();
		}

		// 플레이어의 아바타를 초기화합니다.
		this.avatar = new MyMarble.ui.avatar(this);

		console.log("[플레이어 입장]");
		console.log("플레이어 : " + this.playerId);
		console.log("보유 마블 : " + this.seedMoney + "마블");
		console.log("총 자산 : " + this.currentMoney + "마블");
	}

	// 플레이어 ID 반환
	this.getPlayerId = function()
	{
		return this.playerId;
	}

	// 플레이어 이름 반환
	this.getName = function()
	{
		// NOTE: 임시로 플레이어 ID로 이름을 반환합니다.
		return "플레이어" + this.getPlayerId();
	}

	// 플레이어의 현재 보유마블을 반환하며, comma를 인자로 전달 시, 천단위 콤마를 붙여서 반환합니다.
	this.getCurrentMoney = function(type)
	{
		if (type == "comma")
			return MyMarble.util.numberFormat( this.getCurrentMoney() );
		else
			return this.currentMoney;
	}

	// 플레이어의 현재 자산을 반환하며, comma를 인자로 전달 시, 천단위 콤마를 붙여서 반환합니다.
	this.getAssets = function(type)
	{
		if (type == "comma")
			return MyMarble.util.numberFormat( this.getAssets() );
		else
			return this.getCurrentMoney() + 0; // 현재 보유마블+도시보유량
	}

	// 보유마블을 추가합니다.
	this.addMoney = function(money)
	{
		// 보유마블 추가
		this.currentMoney = this.currentMoney + money;

		// UI 텍스트 갱신
		this.scoreboard.updateAssetsText();
		this.scoreboard.updateMoneyText();
	}

	// 플레이어 아바타 위치 반환
	this.getLocation = function()
	{
		return this.avatar.getLocation();
	}

	// 플레이어의 아바타 움지도록 명령
	this.moveAvatar = function(cellNo)
	{
		this.avatar.move(cellNo, function()
		{
			// 도시 도착을 알림
			MyMarble.onPlayerArrived();
		});
	}

	// 플레이어의 아바타 활성 처리
	this.activeAvatar = function()
	{
		this.avatar.active();
	}

	// 플레이어의 아바타 비활성 처리
	this.inactiveAvatar = function()
	{
		this.avatar.inactive();
	}

	// 플레이어의 전관판 활성 처리
	this.activeScoreboard = function()
	{
		this.scoreboard.active();		
	}

	// 플레이어의 전관판 비활성 처리
	this.inactiveScoreboard = function()
	{
		this.scoreboard.inactive();		
	}

	// 플레이어 정보 갱신
	this.updatePlayerInfo = function()
	{
		this.scoreboard.updateNameText();
		this.scoreboard.updateAssetsText();
		this.scoreboard.updateMoneyText();
	}

	// 초기화
	this.init(nPlayerCnt, playOrder);
};