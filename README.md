# 나만의 마블 (HTML 5 with Raphael.js)

![나만의 마블](http://www.autoset.net/marble/github-img/mymarble6.jpg)

DEMO : [데모 페이지(F12 눌러 콘솔 메시지를 보세요 --;)](http://www.autoset.net/marble/main.html)

## 이게 뭐죠?

`나만의 마블`은 HTML 5을 기반으로 개발하고 있던(!) 보드 게임입니다.
하지만, 완성은 커녕 목표로 세웠던 것의 10%도 진척시키지 못한 상태로 GitHub에 올려 놓습니다.

## 뭘로 만들고 있었냐구요?

`나만의 마블`은 Raphael.js를 사용해서 SVG를 기반으로 게임 UI를 구성하고 있는데요,
제 입맛대로 잘게 잘게 쪼개 놓은 여러 Javascript 객체들로 동작합니다.

## 지금 이 소스로 뭐가 되냐구요?

아마도...

- 플레이어는 1명에서 4명까지 셋팅할 수 있습니다.
- 말 판(맵)을 구성할 수 있습니다.
- 주사위(..라고 우기는 동그란 버튼)를 던져(..클릭해) 나온 숫자 만큼 말 판을 이동 시킬 수 있습니다.
- 이동한 말판에 주인이 없으면, 건물을 지을 수 있는 팝업을 띄울 수 있습니다. (휴양지면, 건물 팝업이 안뜨고 한 텀 쉽니다.)
- 건물 구매 팝업에서 선택된 건물들을 해당 도시 위에 지을 수 있습니다. (네모 박스들로...)

## 뭘하려고 했냐구요?

- 핵심은 여러명이 네트워크 기반으로 같이 즐길 수 있는 보드 게임

## 이거 왜 만들기 시작했을까...

- 한참 모두의 마블에 빠져 있을 때...
- 게임 승률이 점점 떨어지기도 했고...
- 금요일 퇴근하면서 잉여 시간에 뭔가 만들고 싶다는 생각으로 주말까지 개발 하다가...
- 동력을 잃어버림...

## 그래서, 하고 싶은 말은...?

몇 번의 리팩토링 과정을 통해 Javascript로 나름의 구조화를 진행하며 다듬었지만...
코드의 디자인 패턴이나, 게임 그래픽 인터페이스 등등 여러 요소에서 부족한 것이 많습니다.

하지만, `누군가가 완성시켜 주면 좋겠다`는 생각으로 GitHub에 공개해 두니 관심있으신 분은 이어서 개발해 주시면 좋겠습니다.

## 라이선스는?

- 브루마블, 모두의 마블 등...  많은데 라이선스 문제는 좀 꼬여 있는 것 같인함. 잘 모르겠지만... [나무위키 참조](https://namu.wiki/w/%EB%B6%80%EB%A3%A8%EB%A7%88%EB%B6%88)
- 게임은 그렇다 치고... 그러면 GitHub에 공개한 소스에 대한 라이선스는 없다. (단지 최초 누가 시작했고, 누가 수정했으며 등으로 꼬리표 정도 붙여 주면 땡큐)

## 크레딧?

처음 만든 놈은 차오이 <caoy@autoset.org> (사실 소스 문의해도 기억이 가물해서 잘 답변 못합니다...)
게임 개발자 아닙니다. 그래서 이따구에요...

## 개발 히스토리

### 2015.01.16

- 자료 구조를 머릿속에서 구상했다.
- UI를 HTML 5 캔바스를 이용해 구현 시작했다. 그래서 기본 판 모형 완성 시켰다.

![나만의 마블](http://www.autoset.net/marble/github-img/mymarble1.jpg)

### 2015.01.17 0시

- 모두의 마블을 벤치마킹하여, 각 칸의 이름을 채우고 색상을 지정했다.
- 맵 데이터도 생성 했다.
- 그리고 웹브라우저 리사이징에 따른 확대/축소가 되도록 처리했다.

![나만의 마블](http://www.autoset.net/marble/github-img/mymarble2.jpg)

### 2015.01.17 아침 10시쯤 일어나 다시 작업 시작

- 시작,무인도,올림필,세계여행을 이미지로 교체했다.
- 배경 메타포 깔고, 보드 판에 나만의 마블 로고 배경 삽입했다.
- 플레이어 컨트롤을 위한 객체 작성하여 플레이어별 보유마블, 총자산을 관리할 수 있는 메서드까지 작업 완료함.

![나만의 마블](http://www.autoset.net/marble/github-img/mymarble3.jpg)

### 2015.01.17 점심먹고 두어시간 작업

- 뽀로로와 그 친구들을 나만의 마블로 초대해 보았다.
- 말들이 주어진 수치 만큼 말판에서 움직이도록 처리하였고, 움직이는 플레이어의 전광판을 적색 배경,테두리로 변경되도록 처리 했다.
- 턴 수를 지정하고 테스트 플레이할 수 있는 메서드로 테스트 중...

![나만의 마블](http://www.autoset.net/marble/github-img/mymarble4.jpg)

### 2015.01.17 오후에 잠깐...

- 플레이어 순서를 랜덤하게 섞도록 로직 추가했다.
- 플레이어별로 주사위를 던지기 위한 동그라미 버튼 임시로 추가했다.
- 도시와 섬에 대해 등본 자료구조 초기화 처리했다.
- 도시에 대해 땅, 빌라, 빌딩, 호텔, 랜드마크를 지었을 때 표시되어야 할 위치에 미리 객체 할당(해당 시점에 객체 할당하는게 좋을것 같기도한데, 일단 미리 만들어 두고 안보이게 해둠)
- 플레이어의 아바타만 활성 처리하고 나머지는 오파시티를 확 낮춰서 투명도 줌
- 그외 소소한 리팩토링...
- 주사위를 던져 도착한 도시에 건물을 지을지 말지 물을 팝업 만들기 직전...

### 2015.01.17 드라마 보러가야지...

- 생각해 보니 도시별로 건물 값을 안 매겨뒀네...
- 한땀 한땀 그릴려니 시간 무지 들어가네 ㅠㅠ
- 일단 도시 도착하면 건물 구매 팝업뜨도록은 했음...

![나만의 마블](http://www.autoset.net/marble/github-img/mymarble5.jpg)

### 2015.01.18
- 소스 리팩토링 진행하여, stage/board/cell/dice/player/scoreboard/avatar/popup/button/checkbox 등으로 객체 단위로 분리함.
- 도시 도착 시, 무소유 도시에 대해 건물을 지을 수 있도록 팝업이 제시되었고, 소유 정보를 등기부에 반영하도록 처리함
- 보유마블과 관계 없이 데이터 입출력만 테스트 함.


![나만의 마블](http://www.autoset.net/marble/github-img/mymarble6.jpg)
