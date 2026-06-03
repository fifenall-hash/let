// 캐시(창고)의 이름을 지정합니다. (내용이 바뀌었으므로 v2로 업데이트)
const CACHE_NAME = 'lets-number-cache-v2';

// 💡 오프라인 상태에서도 열려야 하는 모든 파일의 경로 목록입니다.
const ASSETS_TO_CACHE = [
  './index.html',
  './manifest.json', // HTML에서 연결한 매니페스트 파일
  
  // [이미지 폴더]
  './images/단추.png',
  './images/딸기.png',
  './images/로고.png',
  './images/블록.png',
  './images/빗.png',
  './images/빵.png',
  './images/셈놀이.png',
  './images/셈놀이고마워.png',
  './images/셈놀이완료.png',
  './images/수박.png',
  './images/숟가락.png',
  './images/숫자세기.png',
  './images/숫자세기고마워.png',
  './images/숫자세기완료.png',
  './images/안녕.png',
  './images/연필.png',
  './images/자동차.png',
  './images/칫솔.png',

  // [기본 사운드 폴더]
  './sounds_basic/10개줄래.wav',
  './sounds_basic/11개줄래.wav',
  './sounds_basic/12개줄래.wav',
  './sounds_basic/13개줄래.wav',
  './sounds_basic/14개줄래.wav',
  './sounds_basic/15개줄래.wav',
  './sounds_basic/16개줄래.wav',
  './sounds_basic/17개줄래.wav',
  './sounds_basic/18개줄래.wav',
  './sounds_basic/19개줄래.wav',
  './sounds_basic/1개줄래.wav',
  './sounds_basic/20개줄래.wav',
  './sounds_basic/2개줄래.wav',
  './sounds_basic/3개줄래.wav',
  './sounds_basic/4개줄래.wav',
  './sounds_basic/5개줄래.wav',
  './sounds_basic/6개줄래.wav',
  './sounds_basic/7개줄래.wav',
  './sounds_basic/8개줄래.wav',
  './sounds_basic/9개줄래.wav',
  './sounds_basic/beep.wav',
  './sounds_basic/bgm.wav',
  './sounds_basic/고마워.wav',
  './sounds_basic/곱하기.wav',
  './sounds_basic/곱하면몇개인지알려줄래.wav',
  './sounds_basic/는.wav',
  './sounds_basic/다시해보자.wav',
  './sounds_basic/다했어고마워.wav',
  './sounds_basic/단추.wav',
  './sounds_basic/딸기.wav',
  './sounds_basic/몇시몇분인지알려줄래.wav',
  './sounds_basic/모두다해냈어도와줘서고마워다음에또만나자.wav',
  './sounds_basic/모두더해서몇개인지알려줄래.wav',
  './sounds_basic/블럭.wav',
  './sounds_basic/블록.wav',
  './sounds_basic/빗.wav',
  './sounds_basic/빵.wav',
  './sounds_basic/빼고나면몇개인지알려줄래.wav',
  './sounds_basic/수박.wav',
  './sounds_basic/숟가락.wav',
  './sounds_basic/연필.wav',
  './sounds_basic/자동차.wav',
  './sounds_basic/칫솔.wav',

  // [숫자 사운드 폴더]
  './sounds_number/0.wav',
  './sounds_number/0[고유어].wav',
  './sounds_number/1.wav',
  './sounds_number/10.wav',
  './sounds_number/100.wav',
  './sounds_number/10[고유어].wav',
  './sounds_number/11.wav',
  './sounds_number/11[고유어].wav',
  './sounds_number/12.wav',
  './sounds_number/12[고유어].wav',
  './sounds_number/13.wav',
  './sounds_number/13[고유어].wav',
  './sounds_number/14.wav',
  './sounds_number/14[고유어].wav',
  './sounds_number/15.wav',
  './sounds_number/15[고유어].wav',
  './sounds_number/16.wav',
  './sounds_number/16[고유어].wav',
  './sounds_number/17.wav',
  './sounds_number/17[고유어].wav',
  './sounds_number/18.wav',
  './sounds_number/18[고유어].wav',
  './sounds_number/19.wav',
  './sounds_number/19[고유어].wav',
  './sounds_number/1[고유어].wav',
  './sounds_number/2.wav',
  './sounds_number/20.wav',
  './sounds_number/20[고유어].wav',
  './sounds_number/21.wav',
  './sounds_number/24.wav',
  './sounds_number/25.wav',
  './sounds_number/27.wav',
  './sounds_number/28.wav',
  './sounds_number/2[고유어].wav',
  './sounds_number/3.wav',
  './sounds_number/30.wav',
  './sounds_number/32.wav',
  './sounds_number/35.wav',
  './sounds_number/36.wav',
  './sounds_number/3[고유어].wav',
  './sounds_number/4.wav',
  './sounds_number/40.wav',
  './sounds_number/42.wav',
  './sounds_number/45.wav',
  './sounds_number/48.wav',
  './sounds_number/49.wav',
  './sounds_number/4[고유어].wav',
  './sounds_number/5.wav',
  './sounds_number/50.wav',
  './sounds_number/54.wav',
  './sounds_number/56.wav',
  './sounds_number/5[고유어].wav',
  './sounds_number/6.wav',
  './sounds_number/60.wav',
  './sounds_number/63.wav',
  './sounds_number/64.wav',
  './sounds_number/6[고유어].wav',
  './sounds_number/7.wav',
  './sounds_number/70.wav',
  './sounds_number/72.wav',
  './sounds_number/7[고유어].wav',
  './sounds_number/8.wav',
  './sounds_number/80.wav',
  './sounds_number/81.wav',
  './sounds_number/8[고유어].wav',
  './sounds_number/9.wav',
  './sounds_number/90.wav',
  './sounds_number/9[고유어].wav'
];

// 1. 서비스 워커가 설치될 때 위 파일들을 전부 창고에 저장합니다.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('오프라인 창고에 모든 에셋 파일 저장 완료!');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  // 설치 즉시 대기 상태를 건너뛰고 새 서비스 워커를 활성화합니다.
  self.skipWaiting();
});

// 2. 새로운 서비스 워커가 활성화될 때 예전 창고를 비웁니다.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('이전 버전의 캐시를 삭제합니다...');
            return caches.delete(cache);
          }
        })
      );
    })
  );
  // 활성화 즉시 현재 클라이언트(열려있는 웹페이지)를 제어하기 시작합니다.
  return self.clients.claim();
});

// 3. 웹사이트에서 파일을 요청할 때 동작 방식 (캐시 우선 전략)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // 창고(캐시)에 파일이 있으면 인터넷을 거치지 않고 바로 꺼내줍니다.
      if (cachedResponse) {
        return cachedResponse; 
      }
      // 창고에 없는 파일은 인터넷에서 가져옵니다.
      return fetch(event.request); 
    })
  );
});
