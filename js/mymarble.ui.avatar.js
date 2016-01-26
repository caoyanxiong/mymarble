
MyMarble.ui.avatar = function(myPlayer)
{
	// scope 문제로 별칭 생성
	var _this = this;

	// 아바타를 가지고 있는 플레이어 정보 (private)
	var oPlayer = null;

	// 아바타 이미지 객체
	var oAvatarImgObject = null;

	// 아바타의 현재 위치
	this.currentAvatarPos = 1;

	// 플레이어의 아바타를 초기화합니다.
	this.init = function(myPlayer)
	{
		// 넘겨 받은 플레이어 정보 셋팅
		oPlayer = myPlayer;

		console.log(oPlayer.getName() + "의 아바타를 말판에 초기화합니다.");
		
		// 1번 셀(시작 위치)의 x,y,w,h 정보 획득해 셋팅
		var size = MyMarble.ui.board.getCellSize(1,0.8);
		var pos = MyMarble.ui.board.getCellPos(1);

		// 플레이어 ID별로 부여된 이미지명
		var avatarImgName = "img_player_"+oPlayer.getPlayerId()+".png";

		// 아바타를 스테이지 위에 올립니다.
		
		// 스테이지 인스턴스
		var oStage = MyMarble.ui.stage.getStage();
		oAvatarImgObject = oStage.image( MyMarble.getImgUrl(avatarImgName) , pos.x , pos.y , size.w , size.h );

		// 아바타를 비활성 상태로 전환(플레이 순서되면 다시 활성으로 처리함)
		this.inactive();

		return this;
	}


	// 아바타 활성 상태로
	this.active = function()
	{
		// 아바타 투명도 없앰
		oAvatarImgObject.attr({"opacity":1});
	}

	// 아바타 비활성 상태로
	this.inactive = function()
	{
		// 아바타 투명도 낮게
		oAvatarImgObject.attr({"opacity":.4});
	}

	// 아바타의 현재 위치 반환
	this.getLocation = function()
	{
		return this.currentAvatarPos;
	}

	// 아바타 이동 명령
	this.move = function(cellNo, fnCallback)
	{
		this._move(this.getLocation()+1, cellNo, fnCallback);
	}

	// 아바타 이동 처리를 위한 재귀 메서드
	this._move = function(cellNo, goalCellNo, fnCallback)
	{
		var orgCellNo = cellNo;

		// 셀 번호는 32까지 이므로, 주사위 합산이 32를 초과하면 목적지 셀 번호를 다시 계산
		if (orgCellNo > 32)
		 cellNo = orgCellNo-(32*(Math.ceil(orgCellNo/32,1)-1));

		var oTarPos = MyMarble.ui.board.getCellPos(cellNo);
		var oTarSize = MyMarble.ui.board.getCellSize(cellNo);

		var nWidth = parseInt(oAvatarImgObject.attr("width"),10);
		var nHeight = parseInt(oAvatarImgObject.attr("height"),10);

		var cx = oTarPos.x; - (oTarSize.w/2) - (nWidth/2);
		var cy = oTarPos.y; + (oTarSize.h/2) - (nHeight/2);


		// NOTE : 라파엘 버그인지, x/y값만으로는 애니메이션효과가 작동않아서 width를 줌.
		// 그런데 값에 변화가 없음 또 작동안해서 width/height 값을 0.99비율로 줄이고 복원하도록 로직 처리
		oAvatarImgObject.animate({"width":nWidth*0.99,"height":nHeight*0.99,"x":cx,"y":cy}, 150, "easeIn", function()
		{
			this.attr("width", nWidth);	
			this.attr("height", nHeight);

			// 한 칸씩 이동하다가 최종 목적지 셀에 도착하면, 콜백 함수를 호출
			if (orgCellNo != goalCellNo)
				_this._move(orgCellNo+1,goalCellNo, fnCallback);
			else
				fnCallback();
		});

		this.currentAvatarPos = cellNo;
	}

	// 초기화
	this.init(myPlayer);
};
