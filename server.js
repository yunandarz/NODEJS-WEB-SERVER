/*
// Memuat modul `http` dari Node.js.
const http = require('http'); 

const requestListener = (request, response) => { // Mendeklarasikan fungsi `requestListener` yang akan menangani permintaan HTTP yang masuk.
  response.setHeader('Content-Type', 'text/html'); // Mengatur header respons dengan tipe konten `text/html`.

  response.statusCode = 200; // Mengatur kode status respons menjadi 200, yang berarti permintaan berhasil diproses.

  response.end('<h1>Halo HTTP Server!</h1>'); // Mengirimkan respons dengan teks "Halo HTTP Server!".
};

const server = http.createServer(requestListener); // Membuat server HTTP menggunakan fungsi `createServer()` dari modul `http` dan melewati fungsi `requestListener` sebagai argumen.

const port = 5000; // Mendeklarasikan port tempat server akan mendengarkan permintaan HTTP.
const host = 'localhost'; // Mendeklarasikan host tempat server akan mendengarkan permintaan HTTP.

server.listen(port, host, () => { // Memulai server HTTP pada port dan host yang telah dideklarasikan sebelumnya.
  console.log(`Server berjalan pada http://${host}:${port}`); // Mencetak pesan ke konsol bahwa server telah berhasil dijalankan.
});
*/

// Latihan dibawah yaitu cara mendapatkan data pada body request ketika client mengirimkan request menggunakan method POST
// baris kode dibawah merupakan web server yang merespon permintaan method POST yang akan menampilkan sapaan nama
// berdasarkan data body yang dikirim client. data body akan dikirim dalam format JSON

// Import modul http
const http = require('http');

// Definisikan fungsi requestListener
// Fungsi ini akan dipanggil ketika server menerima permintaan
const requestListener = (request, response) => {

  // Set header Content-Type respons ke text/html
  // Ini berarti bahwa respons akan berupa HTML
  response.setHeader('Content-Type', 'text/html');

  // Set status kode respons ke 200
  // Ini berarti bahwa permintaan berhasil
  response.statusCode = 200;

  // Dapatkan metode permintaan
  const { method } = request;

  // Jika metode permintaan adalah GET
  if (method === 'GET') {

    // Kirim respons dengan teks Hello!
    response.end('<h1>Hello!</h1>');

  // Jika metode permintaan adalah POST
  } else if (method === 'POST') {

    // Inisialisasi variabel body untuk menyimpan isi permintaan
    let body = [];

    // Buat event listener untuk event `data`
    // Event ini akan dipanggil ketika server menerima data dari permintaan
    request.on('data', (chunk) => {

      // Tambahkan chunk ke variabel body
      body.push(chunk);
    });

    // Buat event listener untuk event `end`
    // Event ini akan dipanggil ketika server menerima semua data dari permintaan
    request.on('end', () => {

      // Konvert variabel body menjadi string
      // Ini diperlukan untuk mengurai JSON
      body = Buffer.concat(body).toString();

      // Cobalah mengurai JSON dari body
      try {

        // Dapatkan properti `name` dari objek JSON
        const { name } = JSON.parse(body);

        // Kirim respons dengan teks Hai, {name}!
        response.end(`<h1>Hai, ${name}!</h1>`);

      // Jika parsing gagal
      } catch (error) {

        // Set status kode respons ke 400
        // Ini berarti bahwa permintaan gagal
        response.statusCode = 400;

        // Kirim respons dengan pesan kesalahan
        response.end('Data yang dikirim tidak valid JSON');
      }
    });
  }
};

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

// untuk menguji, coba permintaan ke server melalui terminal < curl -X POST -H "Content-Type: application/json" http://localhost:5000 -d "{\"name\": \"isi_nama\"}" >