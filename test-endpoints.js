const http = require("http");

function fetch(path, method = "GET", body = null) {
  return new Promise((resolve) => {
    const req = http.request({
      hostname: "localhost",
      port: 5000,
      path: path,
      method: method,
      headers: {
        "Content-Type": "application/json"
      }
    }, (res) => {
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => resolve({ status: res.statusCode, data }));
    });
    
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function test() {
  console.log("Testing endpoints...");
  
  const submissions = await fetch("/api/submissions", "POST", { problemId: "1", userId: "1", code: "test", language: "javascript", status: "pending" });
  console.log("POST /api/submissions:", submissions);

  const problems = await fetch("/api/problems/1");
  console.log("GET /api/problems/1:", problems);

  const activity = await fetch("/api/user/activity");
  console.log("GET /api/user/activity:", activity);

  const daily = await fetch("/api/daily-challenge");
  console.log("GET /api/daily-challenge:", daily);
}

test();
