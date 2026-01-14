CREATE DATABASE IF NOT EXISTS daily_activity_db;
USE daily_activity_db;

-- Tabel Users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    nama_lengkap VARCHAR(100) NOT NULL
);

-- Tabel Activities (Master)
CREATE TABLE activities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    judul_aktivitas VARCHAR(255) NOT NULL,
    kategori VARCHAR(50) NOT NULL,
    tanggal DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabel Activity Details (Detail)
CREATE TABLE activity_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    activity_id INT NOT NULL,
    deskripsi_detail TEXT NOT NULL,
    durasi INT NOT NULL, -- Menit
    status ENUM('Selesai', 'Belum') DEFAULT 'Belum',
    FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE
);