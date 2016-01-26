
MyMarble.ui.button = function(oConfig)
{
	// scope 문제로 별칭 생성
	var _this = this;

	var oChk = null;

	var _checked = false;
	var _readOnly = false;

	// 스테이지 인스턴스
	var oStage = MyMarble.ui.stage.getStage();
	var oStagePos = MyMarble.ui.stage.getStageSize();

	// 묶음 그룹 획득
	var oSet = oStage.set();

	var cx = oConfig.x || 0;
	var cy = oConfig.y || 0;
	var nWidth = oConfig.width || 100;
	var nHeight = oConfig.height || 25;
	var fnCallback = oConfig.fn || function() { };

	var oBox = oStage.rect( cx , cy , nWidth , nHeight).attr({fill: "#555555","stroke-width":"1", "stroke":"#000000", "cursor" : "pointer"});
	oSet.push( oBox );

	var oTxt = oStage.text( cx + 10 , cy + 12 , oConfig.label ).attr({"text-anchor":"start","font-size":"12px","fill":"#ffffff","font-weight":"bold", "cursor" : "pointer"});
	oSet.push( oTxt );

	oSet.click(function()
	{
		fnCallback();
	});


	this.getNextY = function()
	{
		return cy + nHeight;
	}

	this.set = function()
	{
		return oSet;
	}

};
