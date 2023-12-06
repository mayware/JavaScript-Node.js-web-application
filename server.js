const { log } = require("console");
const http = require("http");

const server = http.createServer((req, res) => {
    console.log("request made")
    //set header content type

    res.setHeader('Content-Type', 'text/plain');

    res.write("Response text");
    res.end();
})

server.listen(3000, "localhost", () => {
    console.log("Listening to the request from port 3000");
});