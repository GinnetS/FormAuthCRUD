import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Vale2507',
    database: 'sena',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection()
    .then(conn => {
        console.log('✅ Conectado a la base de datos');
        conn.release(); // liberar la conexión
    })
    .catch(err => {
        console.error('❌ Error al conectar a la base de datos:', err.message);
    });