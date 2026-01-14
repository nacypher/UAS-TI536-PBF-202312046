require('dotenv').config();
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

// Konfigurasi Database (Manual agar standalone)
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'daily_activity_db',
};

async function seed() {
    let connection;
    try {
        console.log('[INFO] Memulai proses seeding data...');
        connection = await mysql.createConnection(dbConfig);

        // 1. Buat User Dummy
        const passwordRahasia = '123456';
        const hashedPassword = await bcrypt.hash(passwordRahasia, 10);
        
        // Cek dulu apakah user 'demo' sudah ada biar ga error kalau dijalankan 2x
        const [existingUser] = await connection.execute("SELECT * FROM users WHERE username = 'demo'");
        
        let userId;

        if (existingUser.length > 0) {
            console.log('[WARN] User "demo" sudah ada, menggunakan user tersebut.');
            userId = existingUser[0].id;
        } else {
            const [userResult] = await connection.execute(
                'INSERT INTO users (username, password, nama_lengkap) VALUES (?, ?, ?)',
                ['demo', hashedPassword, 'Akun Demo Dosen']
            );
            userId = userResult.insertId;
            console.log(`[OK] Berhasil membuat User: demo / ${passwordRahasia}`);
        }

        // 2. Buat Contoh Aktivitas (Master)
        // Kita hapus dulu aktivitas lama milik user ini biar bersih (Opsional)
        await connection.execute('DELETE FROM activities WHERE user_id = ?', [userId]);

        const [actResult] = await connection.execute(
            'INSERT INTO activities (user_id, judul_aktivitas, kategori, tanggal) VALUES (?, ?, ?, ?)',
            [userId, 'Mengoreksi Tugas Mahasiswa', 'Kerja', new Date()]
        );
        const activityId = actResult.insertId;
        console.log('[OK] Berhasil membuat 1 Aktivitas Master.');

        // 3. Buat Contoh Rincian (Detail)
        await connection.execute(
            'INSERT INTO activity_details (activity_id, deskripsi_detail, durasi, status) VALUES (?, ?, ?, ?)',
            [activityId, 'Membuka Website E-Learning', 15, 'Selesai']
        );
        await connection.execute(
            'INSERT INTO activity_details (activity_id, deskripsi_detail, durasi, status) VALUES (?, ?, ?, ?)',
            [activityId, 'Memberikan Nilai UAS PBF', 45, 'Belum']
        );
        console.log('[OK] Berhasil membuat 2 Rincian Detail.');

        console.log('\n[SUCCESS] SEEDING SELESAI!');
        console.log('---------------------------------------------');
        console.log('Silakan Login dengan akun berikut:');
        console.log(`Username : demo`);
        console.log(`Password : ${passwordRahasia}`);
        console.log('---------------------------------------------');

    } catch (error) {
        console.error('[ERROR] Terjadi kesalahan saat seeding:', error);
    } finally {
        if (connection) await connection.end();
    }
}

seed();