const routeHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<body>");
    res.write("<h1>Welcome text.</h1>");
    res.write(
      "<form method='POST' action='/create-user'><input type='text' name='username'></input><button type='submit'>Submit</button></form>"
    );
    res.write("</body>");
    return res.end();
  }
  if (url === "/users") {
    res.write(
      "<body><h1>`${username}`</h1><ul><li>User 1</li><li>User 2</li><li>User 3</li><li>User 4</li><li>User 5</li></ul></body>"
    );
    return res.end();
  }
  if (url === "/create-user" && method === "POST") {
    const body = [];
    res.write("<body>");
    res.write("<h1>User has been created in a console.</h1>");
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const username = parsedBody.split("=")[1];
      console.log(username);
    });
    res.write("</body>");
    return res.end();
  }
};

module.exports = routeHandler;
