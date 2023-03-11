import React from "react";
import ReactDOM from "react-dom/client";
import "./Style/globalStyle.ts";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { GoogleOAuthProvider } from '@react-oauth/google';

declare global {
  interface Window {
    kakao: any;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //다른 창을 갔다 왔을 떄 api콜을 다시 해줄 것인지(최신화를 시켜줄 것인지)에 대한 옵션
      refetchOnWindowFocus: false,
      //api 요청에서 error 발생 시 다시 요청을 보내 주는 옵션 (3번 정도 다시 보내 줌)
      retry: false,
      //캐시 결과를 먼저 확인하지 않고 api 요청을 보낼 것인지에 대한 옵션
      refetchOnMount: false,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);


root.render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      {/* <React.StrictMode> */}
      <Router>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}
        onScriptLoadError={() => console.log("실패")}
        onScriptLoadSuccess={() => console.log("성공")}>
          <App />
        </GoogleOAuthProvider>
      </Router>
      {/* </React.StrictMode> */}
    </RecoilRoot>
  </QueryClientProvider>
);
