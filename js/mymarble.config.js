MyMarble.config = new (function()
{
	// 참여 가능한 최대 플레이어 수
	this.MAX_PLAYER_CNT = 4;

	// 초기 자본금으로 지불되는 마블 수
	this.SEED_MONEY = 5000000;

	// 셀 유형 정의 상수 값
	this.CELL_TYPE_START = "start";
	this.CELL_TYPE_CITY = "city";
	this.CELL_TYPE_GAME = "game";
	this.CELL_TYPE_ISLAND = "island";
	this.CELL_TYPE_ISLAND2 = "island2";
	this.CELL_TYPE_CHANCE = "chance";
	this.CELL_TYPE_DESERT_ISLAND = "desrt_island";
	this.CELL_TYPE_OLYMPIC = "olympic";
	this.CELL_TYPE_TRAVEL = "travel";
	this.CELL_TYPE_TAX = "tax";

	// 셀 유형이 도시일 때, 도시 그룹별 색상값
	var GROUP_COLOR_MAP = {
		"GROUP_1" : "#85AC18",
		"GROUP_2" : "#288010",
		"GROUP_3" : "#3999D0",
		"GROUP_4" : "#2D78C8",
		"GROUP_5" : "#D26AC6",
		"GROUP_6" : "#835ABB",
		"GROUP_7" : "#C06000",
		"GROUP_8" : "#BA2A00"
	};

	// 셀 유형이 도시가 아닌 셀에 대한 색상값
	var TYPE_COLOR_MAP = {
		"start" : "#efefef",
		"game" : "#cdcdcd",
		"island" : "#01CEAF",
		"island2" : "#F2A3C1",
		"chance" : "#efefef",
		"desert_island" : "#A3EFF2",
		"olympic" : "#A3EFF2",
		"travel" : "#A3EFF2",
		"tax" : "#A3EFF2"
	};

	// 도시인 셀의 그룹 색상 반환
	this.getGroupColor = function(groupId)
	{
		return GROUP_COLOR_MAP["GROUP_"+groupId] == undefined ? "#ffffff" : GROUP_COLOR_MAP["GROUP_"+groupId];
	}

	// 도시 이외의 셀의 색상 반환
	this.getTypeColor = function(typeId)
	{
		return TYPE_COLOR_MAP[typeId] == undefined ? "#ffffff" : TYPE_COLOR_MAP[typeId];
	}

});
