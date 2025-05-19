const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Submit form</title></head>");
    res.write(
      "<body><form method='POST' action='/message'><input type='text' name='message'><button type='submit' >Submit</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      console.log(typeof message, message);
      fs.writeFile("message.txt", message, (whatDo) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  // res.setHeader("Content-Type", "text-html");
  // res.write("<html>");
  // res.write("<head><title>Message Screen</title></head>");
  // res.write("<body>");
  // res.write("<h1>Thank you for the message</h1>");
  // res.write(`<h1>${message}</h1>`);
  // res.write("</body>");
  // res.write("</html>");
  // res.end();
  res.write("<html>");
  res.write("<head><title>Node Server</title></head>");
  res.write("<body><h1>You shouldn't be here ¦[  </body>");
  res.write("</html>");
  res.end();

  // process.exit();
});

server.listen("3000");
