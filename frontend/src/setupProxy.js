const { createProxyMiddleware } = require("http-proxy-middleware");
//localhost:8080 포트를 현재 전역으로 쓸 수 있도록 설정되어있다.
//middleware는 말 그대로 중간 다리 역할을 함.

module.exports=function(app){
    app.use(
        "/api",
        createProxyMiddleware({
            target:"http://localhost:8080",
            changerOrigin : true,
        })
    );
};

/*이 Proxy설정이 되어있는 부분을 잊고 Reducer.js에서 전체 경로를 작성하면
다음과 같이 인식되고 만다. -> http://localhost:8080/http://localhost:8080/경로/경로
*/