const http = require('http'); // Import modul http

const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'text/html');
    response.statusCode = 200;
 
    const { method, url } = request;

    if(url === '/') {  // perintah bila url '/'
        if(method === 'GET') {
             response.statusCode = 200;
             response.end('<h1>Ini adalah homepage></h1>')       // respon bila menggunakan GET
        } else {
             response.statusCode = 400;
             response.end(`<h1>Halaman ini tidak bisa diakses dengan ${method} request</h1>`)       // respon bila tidak menggunakan GET
        }
    } else if(url === '/about') {  // perintah bila url '/about'
        if(method === 'GET') {
             response.statusCode = 200;
             response.end('<h1>Halo! ini adalah halaman about</h1>')   // respon bila menggunakan GET
        } else if(method === 'POST') {
             let body = [];   // respon bila menggunakan POST. data akan di tampung dalam array kosong
        
            request.on('data', (chunk) => {
                body.push(chunk);
            });

            request.on('end', () => {
                body = Buffer.concat(body).toString();
                const {name} = JSON.parse(body);
                response.statusCode = 200;
                response.end(`<h1>Halo, ${name}! Ini adalah halaman about</h1>`)
            });
            } else {
            response.statusCode = 400;
            response.end(`<h1>Halaman tidak dapat diakses menggunakan ${method} request</h1>`)    // respon bila client tidak menggunakan GET ataupun POST
        }
    } else {
        response.statusCode = 404;
        response.end('<h1>Halaman tidak ditemukan!</h1>') // perintah bila url bukan keduanya
    }
}

// Buat server HTTP
const server = http.createServer(requestListener);

// Set port dan host server
const port = 5000;
const host = 'localhost';

// Mulai server HTTP
server.listen(port, host, () => {

  // Tampilkan pesan bahwa server berjalan
  console.log(`Server berjalan pada http://${host}:${port}`);
});