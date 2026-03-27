# 크롬 기반 브라우저 확장 프로그램

## CHANNEL BLOCKER
1) 채널명(channelName)의 href가 "/@" 로 시작할 것으로 기대했는데, "/channel/UCzJ7PrO2pmCVGgSq18Fr0Dg" 형식의 href 가 있음
   - 여기는 유튜버 한 명의 개인채널이 아니고, 특정 주제로 구성된 테마 체널인것으로 예상됨
     - Susumu Hirasawa - Topic
     - https://www.youtube.com/watch?v=YeIxYcG0YdM&list=RDYeIxYcG0YdM&start_radio=1
   - 여기는 테마 채널이 아니고, 한 유튜버의 채널과 완전 동일한 경우도 있음 - 아래 두 쌍의 url 진입 시, 화면이 동일함
     - https://www.youtube.com/@staywithme_miki
     - https://www.youtube.com/channel/UCz2w1NbLL_hUphhsZRAFljg
     - https://www.youtube.com/@Kassiapiano
     - https://www.youtube.com/channel/UCPmCaKjzYF3pXYLfaRhacwA
   - 채널명의 href가 "/channel/"로 시작해버리면, 이럴 경우 채널 주소(channelHandle)가 빈문자가 됨
2) 로그인 되어있는 상태일 경우, 
   - tp-yt-iron-dropdown > yt-list-item-view-model 에 "채널 추천 안함", "관심 없음"이 있는 경우
   - 메인화면, 상세 추천영상에서는 "채널 추천 안함", "관심 없음" 버튼 노출되면 안됨
3) 브라우저 상단 확장프로그램 아이콘 누르고 나오는 차단 리스트들 오른쪽에 화살표 추가해서 클릭하면 전체 차단 채널 팝업 띄워야 됨
4) "채널 추천 안함", "관심 없음" 버튼 왼쪽에 SVG 아이콘 필요 
5) 메인화면에서 간혈적으로 "채널 추천 안함"이 안먹히는 영상이 있음