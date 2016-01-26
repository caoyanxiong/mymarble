
MyMarble.ui.popup = function()
{
	this.x = null
	this.y = null;
	this.width = null;
	this.height = null;
	this.oPopupSet = null;

	this.set = function(oConfig)
	{
		// 스테이지 인스턴스
		var oStage = MyMarble.ui.stage.getStage();
		var oStagePos = MyMarble.ui.stage.getStageSize();

		// 묶음 그룹 획득
		this.oPopupSet = oStage.set();

		var title = oConfig.title;
		
		this.width = oConfig.width || 300;
		this.height = oConfig.height || 300;
		this.x = oConfig.x || (oStagePos.w/2) - (this.width/2);
		this.y = oConfig.y || (oStagePos.h/2) - (this.height/2);
		
		var fnClose = oConfig.fnClose || false;

		// 팝업 박스
		this.oPopupSet.push( oStage.rect( this.x , this.y , this.width , this.height).attr({fill: "#EFEFEF","stroke-width":"1", "stroke":"#000000"}) );

		// 팝업 제목 표시줄
		this.oPopupSet.push( oStage.rect( this.x , this.y , this.width , 30 ).attr({fill: "#000000","stroke-width":"1", "stroke":"#000000"}) );

		// 팝업 제목 텍스트
		this.oPopupSet.push( oStage.text( this.x + 10 , this.y + 15 , title ).attr({"text-anchor":"start","font-size":"20px","fill":"#ffffff","font-weight":"bold"}) );

		if (fnClose)
		{
			var oCloseSet = oStage.set();

			// 팝업 닫기 버튼
			oCloseSet.push( oStage.rect( this.x + this.width - 30 , this.y , 30 , 30 ).attr({fill: "#cdcdcd","stroke-width":"1", "stroke":"#000000"}) );

			// 팝업 닫기 "X" 텍스트
			oCloseSet.push( oStage.text(  this.x + this.width - 30 + 10 , this.y + 15 , "X" ).attr({"text-anchor":"start","font-size":"20px","fill":"#ffffff","font-weight":"bold"}) );

			oCloseSet.attr({"cursor":"pointer"});

			var _this = this;

			// 팝업 닫기 클릭 이벤트
			oCloseSet.click(function()
			{
				fnClose();
			});
		}

		// y , height 값 변경
		this.y = this.y + 30;
		this.height = this.height - 30;
		
		this.oPopupSet.push( oCloseSet );

		return this.oPopupSet;
	}


};
