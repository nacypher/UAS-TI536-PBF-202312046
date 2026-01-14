const db = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
    static async findByUsername(username) {
        const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
        return rows[0];
    }

    static async create(data) {
        const { username, password, nama_lengkap } = data;
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.execute(
            'INSERT INTO users (username, password, nama_lengkap) VALUES (?, ?, ?)',
            [username, hashedPassword, nama_lengkap]
        );
        return result;
    }
}
module.exports = User;