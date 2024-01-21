## 프론트엔드 이종원 사전과제

- 이름: 이종원
- 기술스택: NEXT.js, tailwind, typescript

### 프로젝트 구동방법

1. **node version = 18.17.0 권장**
   - $nvm install 18.17.0
   - $nvm use 18.17.0
2. **패키지 설치**
   - $npm install or $yarn install
3. **.env 파일 생성**
   ```
   NEXT_PUBLIC_API_URL=https://itunes.apple.com/us/rss/topalbums
   NEXT_PUBLIC_SERVER_URL=http://localhost:3000
   ```
4. **프로젝트 실행**
   - $npm run dev or $yarn dev

### 구현

1. **기본**

   - page 마크업 및 UI 스타일링
   - 반응형 UI 구현

1. **Data Table**

   - API 데이터 패칭 및 가공 후 table 컴포넌트 생성 후 렌더
   - 데이터 재사용을 위해 커스텀훅 작성
   - 하단 아이콘 버튼 클릭시 데이터 갯수 추가(10개)

1. **앨범 표지 생성 기능**
   - 앨범 생성 공용 Modal 컴포넌트 생성
   - 각 canvas 그림 그리기 기능 추가 커스텀 훅 작성
   - 생성 버튼 클릭시 A canvas 그림과 B canvas 그림 겹쳐진 후 교차점에 점 찍힌 그림 생성 handler 추가
   - 각 Item별 생성된 앨범표지 그림 렌더
