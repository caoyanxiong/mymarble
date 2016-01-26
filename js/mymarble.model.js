MyMarble.model = new (function()
{

	this.buyBuilding = function(nCellNo, arrTarget)
	{
		var oCell = MyMarble.ui.board.getCell(nCellNo);
		var oData = oCell.getData();

		// 소유자 설정
		oCell.setData( "ownerPlayerId" , MyMarble.getCurrentPlayerId() );

		for (var i = 0; i < arrTarget.length ; i++ )
		{
			// 건물 소유 체크
			oCell.setData( arrTarget[i] , true );
		}

		// 건물 상태 업데이트
		oCell.updateVisibleElement();


	}

});
