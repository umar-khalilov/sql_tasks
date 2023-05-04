const { createServer } = require('node:http');
const { configuration } = require('./config');

const main = () => {
    const server = createServer(async (req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Welcome to my test backend');
    });

    server.listen(configuration.serverPort, () => {
        console.log(
            `Server is running at http://localhost:${configuration.serverPort}`,
        );
    });
};

void main();
