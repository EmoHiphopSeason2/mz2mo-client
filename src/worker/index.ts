/// <reference lib="webworker" />

export declare const self: ServiceWorkerGlobalScope;

// 설치 과정에서 오프라인에서 표시할 리소스 캐싱 가능
self.addEventListener('install', (e) => {
  // console.log('👀 - install', e);

  // 전달된 이벤트가 Resolve 될 때 까지 설치 단계 확장
  e.waitUntil(self.skipWaiting());
});

// 이전 서비스워커가 캐싱한 데이터를 지우는 정리작업 수행
self.addEventListener('activate', (e) => {
  // console.log('👀 - activate', e);
});

// 푸쉬 알람 받으면 실행
self.addEventListener('push', (e) => {
  const message = e.data?.text();
  console.log('👀 - message', message);

  const title = 'PUSH ALARM';
  const options = {
    body: e.data?.text(),
  };

  e.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (e) => {
  console.log(e);
  self.clients.openWindow(e.notification.data);
});

self.addEventListener('message', (e) => {
  // HOW TO TEST THIS?
  // Run this in your browser console:
  //     window.navigator.serviceWorker.controller.postMessage({command: 'log', message: 'hello world'})
  // OR use next-pwa injected workbox object
  //     window.workbox.messageSW({command: 'log', message: 'hello world'})
  // console.log(e.data);
});
