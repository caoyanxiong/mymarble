
MyMarble.ui.checkbox = function(oConfig)
{
	// scope 문제로 별칭 생성
	var _this = this;

	var oChk = null;

	var _disabled = false;
	var _checked = false;
	var _readOnly = false;

	var _fnClick = null;

	// 스테이지 인스턴스
	var oStage = MyMarble.ui.stage.getStage();
	var oStagePos = MyMarble.ui.stage.getStageSize();

	// 묶음 그룹 획득
	var oSet = oStage.set();

	var cx = oConfig.x || 0;
	var cy = oConfig.y || 0;
	var nWidth = 15;
	var nHeight = 15;

	var oChk = oStage.rect( cx , cy , nWidth , nHeight).attr({fill: "#EFEFEF","stroke-width":"1", "stroke":"#000000", "cursor" : "pointer"});
	oSet.push( oChk );

	var oTxt = oStage.text( cx + nWidth + 5 , cy + 8 , oConfig.label ).attr({"text-anchor":"start","font-size":"12px","fill":"#000000","font-weight":"bold", "cursor" : "pointer"});
	oSet.push( oTxt );

	oSet.click(function()
	{
		_this.checked(_checked);

		if (_fnClick)
			_fnClick();
	});

	this._check = function()
	{
		oChk.attr({fill: "#FF0000"});
		oTxt.attr({fill: "#FF0000"});
	}

	this._uncheck = function()
	{
		oChk.attr({fill: "#EFEFEF"});
		oTxt.attr({fill: "#000000"});
	}

	this.readOnly = function(b)
	{
		_readOnly = b;
	}

	this.disabled = function(b)
	{
		_disabled = b;
	}

	this.isReadOnly = function()
	{
		return _readOnly;
	}

	this.isDisabled = function()
	{
		return _disabled;
	}

	this.checked = function(checked)
	{
		if (_readOnly || _disabled)
			return ;

		if (_checked)
			this._uncheck();
		else
			this._check();

		_checked = !_checked;
	}

	this.isChecked = function()
	{
		return _checked;
	}

	this.value = function()
	{
		return this.checked ? oConfig.value : null;
	}

	this.getNextY = function()
	{
		return cy + nHeight;
	}

	this.set = function()
	{
		return oSet;
	}

	this.click = function(fn)
	{
		_fnClick = fn;
	}

};
