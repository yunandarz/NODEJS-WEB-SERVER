const http = require('http');

const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'text/html');
    response.statuscode = 200;

    const { method } = request;

    if(method === 'GET') {
        response.end('<h1>Method untuk mengambil data</h1>');
    }

    if(method === 'PUT') {
        response.end('<h1>Method untuk mengubah data</h1>');
    }

    if(method === 'DELETE') {
        response.end('<h1>Method untuk menghapus data</h1>');
    }
};

const server = http.createServer(requestListener);

const port = 4000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`server berjalan di http://${host} di port ${port}`)
});