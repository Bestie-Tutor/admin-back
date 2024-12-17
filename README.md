# 🐾 베스티 튜터 관리자 백엔드 서버 🐾

안녕하세요! 베스티 튜터 관리자 백엔드 서버에 오신 것을 환영합니다! 이 서버는 서비스 분석, 회원 관리, 공지사항 및 이벤트 관리 등을 위한 API를 제공합니다.

## 🚀 기능

- **회원 관리**: 회원가입, 로그인, 정보 수정 및 탈퇴
- **공지사항 관리**: 공지사항 추가, 수정, 삭제 및 조회
- **이벤트 관리**: 이벤트 추가, 수정, 삭제 및 조회
- **문의 관리**: 문의 조회, 답변 추가
- **회화 관리**: 언어, 주제, 캐릭터 추가, 수정, 삭제 및 조회
- **서비스 분석**: 월별 이용자 수 및 인기 언어 통계 

## 📦 설정 방법

### 1. 프로젝트 클론
레포지토리를 클론합니다.
```bash
git clone https://github.com/Bestie-Tutor/admin-back.git
```

### 2. .env 파일 준비
루트 디렉토리에 `.env` 파일을 생성하고 아래 내용을 추가하세요.
```
1. MongoDB 설치
MongoDB가 설치되어 있어야 합니다. 설치가 완료되면 데이터베이스를 사용할 수 있도록 설정합니다.

2. keys.js 파일 수정
/back-end/config/keys.js 파일에서 dbPasswordDev 변수에 있는 데이터베이스 이름을 자신에게 맞게 수정해야 합니다.

3. SSL 키와 인증서 추가
.env 파일에 SSL 키와 인증서를 추가해야 합니다. 이 파일을 통해 보안 연결을 설정할 수 있습니다.
```

### 3. Node.js 패키지 설치
필요한 패키지를 설치합니다.
```bash
npm install
```

### 4. 서버 실행
서버를 실행합니다.
```bash
nodemon` or `node app.js
```

## 파일 구조
```
.
├── Documentation
│   └── documentation.html
├── CHANGELOG.md
├── ISSUE_TEMPLATE.md
├── LICENSE
├── README.md
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── assets
    │   ├── css
    │   │   ├── argon-dashboard-react.css
    │   │   ├── argon-dashboard-react.css.map
    │   │   └── argon-dashboard-react.min.css
    │   ├── fonts
    │   │   └── nucleo
    │   ├── img
    │   │   ├── brand
    │   │   ├── icons
    │   │   │   └── common
    │   │   └── theme
    │   ├── scss
    │   │   ├── argon-dashboard-react.scss
    │   │   ├── bootstrap
    │   │   │   ├── mixins
    │   │   │   └── utilities
    │   │   ├── core
    │   │   │   ├── alerts
    │   │   │   ├── avatars
    │   │   │   ├── badges
    │   │   │   ├── buttons
    │   │   │   ├── cards
    │   │   │   ├── charts
    │   │   │   ├── close
    │   │   │   ├── custom-forms
    │   │   │   ├── dropdowns
    │   │   │   ├── footers
    │   │   │   ├── forms
    │   │   │   ├── headers
    │   │   │   ├── icons
    │   │   │   ├── list-groups
    │   │   │   ├── maps
    │   │   │   ├── masks
    │   │   │   ├── mixins
    │   │   │   ├── modals
    │   │   │   ├── navbars
    │   │   │   ├── navs
    │   │   │   ├── paginations
    │   │   │   ├── popovers
    │   │   │   ├── progresses
    │   │   │   ├── separators
    │   │   │   ├── tables
    │   │   │   ├── type
    │   │   │   ├── utilities
    │   │   │   └── vendors
    │   │   ├── custom
    │   │   └── react
    │   └── vendor
    │       ├── @fortawesome
    │       │   └── fontawesome-free
    │       │       ├── LICENSE.txt
    │       │       ├── css
    │       │       ├── js
    │       │       ├── less
    │       │       ├── scss
    │       │       ├── sprites
    │       │       ├── svgs
    │       │       │   ├── brands
    │       │       │   ├── regular
    │       │       │   └── solid
    │       │       └── webfonts
    │       └── nucleo
    │           ├── css
    │           └── fonts
    ├── components
    │   ├── Footers
    │   │   ├── AdminFooter.jsx
    │   │   └── AuthFooter.jsx
    │   ├── Headers
    │   │   ├── Header.jsx
    │   │   └── UserHeader.jsx
    │   ├── Navbars
    │   │   ├── AdminNavbar.jsx
    │   │   └── AuthNavbar.jsx
    │   └── Sidebar
    │       └── Sidebar.jsx
    ├── index.js
    ├── layouts
    │   ├── Admin.jsx
    │   └── Auth.jsx
    ├── routes.js
    ├── variables
    │   └── charts.jsx
    └── views
        ├── Index.jsx
        └── examples
            ├── Icons.jsx
            ├── Login.jsx
            ├── Maps.jsx
            ├── Profile.jsx
            ├── Register.jsx
            └── Tables.jsx
```

## 🎉 기여하기
기여하고 싶으신가요? 언제든지 PR을 보내주세요! 
