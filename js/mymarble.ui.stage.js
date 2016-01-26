
MyMarble.ui.stage = new (function()
{
	// 스테이지 객체(private)
	var oStage = null;

	// 스테이지 스타일 정보(private)
	var oStageStyle = { x : 0 , y : 0 , width : 1000 , height : 600 };

	this.init = function(initElement)
	{
		console.log(initElement + " / " + oStageStyle.width + " / " + oStageStyle.height);

		// 스테이지 SVG 문서 만들기 (모든 게임의 요소는 이 스테이지 위에 그려짐)
		oStage = new ScaleRaphael(initElement, oStageStyle.width, oStageStyle.height);

		// 스테이지 영역을 설정합니다.
		var oStageRect = oStage.rect(0, 0, oStageStyle.width, oStageStyle.height, 0).attr({"fill": "#5C3423","stroke-width":"0"});

		// 스테이지 배경을 올립니다.
		oStage.image( MyMarble.getImgUrl("bg_stage.png") , oStageRect.attr('x') , oStageRect.attr('y') , oStageRect.attr('width') , oStageRect.attr('height') );

		// 브라우저 창 리사이즈에 반응하도록 처리
		$(window).resize(this.resizeStage);

		this.resizeStage();
	}

	// 스테이지 인스턴스를 반환합니다.
	this.getStage = function()
	{
		return oStage;
	}

	// 스테이지 크기 반환
	this.getStageSize = function()
	{
		return { w: oStageStyle.width, h: oStageStyle.height };
	}

	// 창 크기에 따라 스테이지 사이즈를 재 조정합니다.
	this.resizeStage = function()
	{
		var win = $(window);
		oStage.changeSize(win.width(), win.height(), true, true);
	}

});
