import http from 'node:http';
import fs from 'node:fs'
import path from 'node:path';

const STATIC_PATH = path.join(process.cwd(), "views");

// Create a local server to receive data from
const server = http.createServer((req, res) => {
  try {
    console.log(`${req.method} ${req.url}`)
    console.log(`${req.socket.remoteAddress}`)
    const file_path = path.join(STATIC_PATH, ((req.url === "/") ? "index.html" : req.url))
    fs.accessSync(file_path)
    res.writeHead(200, "OK")
    const stream = fs.createReadStream(file_path);
    stream.pipe(res)
  } catch (err) {
    try {
      console.log(err.message)
      const stream = fs.createReadStream(path.join(STATIC_PATH, "404.html"))
      res.writeHead(404, "Not found")
      stream.pipe(res)
    } catch (err) {
      console.log(err.message)
      res.end("unexpected server error")
    }
  }
});

server.listen(5000,() => {
  console.log("Hosting at http://localhost:5000")
})

