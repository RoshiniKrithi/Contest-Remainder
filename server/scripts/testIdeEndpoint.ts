import http from "http";

const data = JSON.stringify({
  code: "console.log('Hello CodeArena IDE');",
  language: "javascript",
  stdin: "sample input"
});

const options = {
  hostname: "localhost",
  port: 5000,
  path: "/api/dsa/problems/1/run",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": data.length
  }
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  let body = "";
  res.on("data", (chunk) => body += chunk);
  res.on("end", () => console.log("BODY:", body));
});

req.on("error", (e) => console.error("Error:", e));
req.write(data);
req.end();
