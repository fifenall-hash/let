// 창고(캐시)의 이름입니다.
const CACHE_NAME = 'lets-number-cache-v1';

// 💡 오프라인 상태에서도 열려야 하는 모든 파일들의 이름을 여기에 정확히 적어주세요!
// (사용하시는 이미지나 사운드 파일명에 맞게 리스트를 수정하시면 됩니다.)
const ASSETS_TO_CACHE = [
  './index.html',
  './lets-number.json', // manifest 파일명을 변경하셨다면 그 이름을 적어주세요.
  './images/로고.png',
  './images/셈놀이.png',
  './images/셈놀이고마워.png',
  // 사운드 파일들도 자주 쓰는 것 위주로 등록해두면 오프라인에서 소리가 잘 납니다.
  './sounds_basic/beep.wav',
  './sounds_basic/고마워.wav',
  './sounds_basic/다시해보자.wav'
];

// 1. 서비스 워커가 설치될 때 파일들을 창고에 저장합니다.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('오프라인 창고에 파일 저장 완료!');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// 2. 새로운 서비스 워커가 활성화될 때 예전 창고를 비웁니다.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('이전 캐시 삭제 중...');
            return caches.delete(cache);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// 3. 웹사이트에서 파일을 요청할 때, 인터넷이 없으면 창고(캐시)에서 파일을 꺼내다 줍니다.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse; // 창고에 있으면 바로 전달
      }
      return fetch(event.request); // 창고에 없으면 인터넷에서 가져옴
    })
  );
});