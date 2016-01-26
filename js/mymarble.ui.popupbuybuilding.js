
MyMarble.ui.popupBuyBuilding = new (function()
{
	this.__proto__ = new MyMarble.ui.popup();

	var _this = this;

	var oSet = null;

	var oChkLand, oChkVilla, oChkBuilding, oChkHotel, oTotalPrice;
	var nCellNo;

	// 가격
	var landPrice = 100000;
	var villaPrice = 250000;
	var buildingPrice = 500000;
	var hotelPrice = 750000;
	var totalPrice = 0;

	this.fnEnd = null;

	this.show = function(curPos, fnEnd)
	{
		nCellNo = curPos;
		this.fnEnd = fnEnd;

		// 도시 정보
		var oCellData = MyMarble.ui.board.getCell(curPos).getData();

		// 셀 정보
		var oCellInfo = MyMarble.map.getCellInfo(curPos);



		// 스테이지 인스턴스
		var oStage = MyMarble.ui.stage.getStage();

		// 팝업
		oSet = this.set({	title : oCellInfo.title,
										width : 300,
										height : 250 });

		// 대지 (무조건 사야 함)
		oChkLand = new MyMarble.ui.checkbox({label:"대지", value:"land", x:this.x+10, y:this.y+10});
		oChkLand.checked(true);
		oChkLand.click(function()
		{
			oChkLand.checked(true);
		});

		// 이미 구매한 경우, checked, disabled
		//oChkLand.disabled(true);

		// 대지가격
		oSet.push( oStage.text( this.x+60 , this.y+18 , "(가격: "+MyMarble.util.numberFormat(landPrice)+"원)" ).attr({"text-anchor":"start","font-size":"12px","fill":"#000000","font-weight":"bold"}) );

		// 빌라
		oChkVilla = new MyMarble.ui.checkbox({label:"빌라",value:"villa", x:this.x+10, y:oChkLand.getNextY()+10 });
		oChkVilla.click(function()
		{
			_this.calcPrice();
		});
		
		// 빌라가격
		oSet.push( oStage.text( this.x+60 , oChkLand.getNextY()+18 , "(가격: "+MyMarble.util.numberFormat(villaPrice)+"원)" ).attr({"text-anchor":"start","font-size":"12px","fill":"#000000","font-weight":"bold"}) );

		// 빌딩
		oChkBuilding = new MyMarble.ui.checkbox({label:"빌딩",value:"building", x:this.x+10, y:oChkVilla.getNextY()+10});
		oChkBuilding.click(function()
		{
			_this.calcPrice();
		});

		// 빌딩 가격
		oSet.push( oStage.text( this.x+60 , oChkVilla.getNextY()+18 , "(가격: "+MyMarble.util.numberFormat(buildingPrice)+"원)" ).attr({"text-anchor":"start","font-size":"12px","fill":"#000000","font-weight":"bold"}) );

		// 호텔
		oChkHotel = new MyMarble.ui.checkbox({label:"호텔",value:"hotel", x:this.x+10, y:oChkBuilding.getNextY()+10});
		oChkHotel.click(function()
		{
			_this.calcPrice();
		});

		// 빌딩 가격
		oSet.push( oStage.text( this.x+60 , oChkBuilding.getNextY()+18 , "(가격: "+MyMarble.util.numberFormat(hotelPrice)+"원)" ).attr({"text-anchor":"start","font-size":"12px","fill":"#000000","font-weight":"bold"}) );

		oSet.push( oChkLand.set() );
		oSet.push( oChkVilla.set() );
		oSet.push( oChkBuilding.set() );
		oSet.push( oChkHotel.set() );

		// 총 가격
		oTotalPrice = oStage.text( this.x+60 , oChkHotel.getNextY()+25 , "" ).attr({"text-anchor":"start","font-size":"12px","fill":"#0000FF","font-weight":"bold"});
		oSet.push( oTotalPrice );

		// 총 가격 처리
		this.calcPrice();

		// 구매 버튼
		var oBtnBuy = new MyMarble.ui.button({label:"건물 구매하기", x:this.x+10, y:oChkHotel.getNextY()+50 , fn: function() { 
							_this.buy();
						}});
		oSet.push( oBtnBuy.set() );

		// 취소 버튼
		var oBtnCancel = new MyMarble.ui.button({label:"구매 취소", width: 80 , x:this.x+10+130, y:oChkHotel.getNextY()+50 , fn: function() {
							// 구매 취소
							console.log("건물을 구매를 취소합니다.");
							_this.onClose();
						}});
		oSet.push( oBtnCancel.set() );
	}

	this.onClose = function()
	{
		oSet.remove();
		this.fnEnd();
	}

	this.calcPrice = function()
	{
		totalPrice = 0;

		if (oChkLand.isChecked() && !oChkLand.isDisabled())
			totalPrice += landPrice;

		if (oChkVilla.isChecked() && !oChkVilla.isDisabled())
			totalPrice += villaPrice;

		if (oChkBuilding.isChecked() && !oChkBuilding.isDisabled())
			totalPrice += buildingPrice;

		if (oChkHotel.isChecked() && !oChkHotel.isDisabled())
			totalPrice += hotelPrice;

		oTotalPrice.attr({"text": "총 구매 가격: "+MyMarble.util.numberFormat(totalPrice)+"원" });
	}

	// 건물 구매를 진행합니다.
	this.buy = function()
	{
		// 건물 구매 처리
		console.log("건물을 구매합니다.");

		// 구매 대상
		var arrTarget = [];
		
		if (oChkLand.isChecked() && !oChkLand.isDisabled() && !oChkLand.isReadOnly())
			arrTarget.push("land");
		
		if (oChkVilla.isChecked() && !oChkVilla.isDisabled() && !oChkVilla.isReadOnly())
			arrTarget.push("villa");
		
		if (oChkBuilding.isChecked() && !oChkBuilding.isDisabled() && !oChkBuilding.isReadOnly())
			arrTarget.push("building");
		
		if (oChkHotel.isChecked() && !oChkHotel.isDisabled() && !oChkHotel.isReadOnly())
			arrTarget.push("hotel");

		// 구매 처리
		MyMarble.model.buyBuilding(nCellNo, arrTarget);

		_this.onClose();
	}

});

