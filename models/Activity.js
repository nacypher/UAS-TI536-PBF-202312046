const db = require('../config/database');

class Activity {
    static async getAllByUserId(userId, filters = {}) {
        let sql = 'SELECT * FROM activities WHERE user_id = ?';
        const params = [userId];

        if (filters.tanggal) {
            sql += ' AND tanggal = ?';
            params.push(filters.tanggal);
        }
        if (filters.kategori) {
            sql += ' AND kategori LIKE ?';
            params.push(`%${filters.kategori}%`);
        }

        sql += ' ORDER BY tanggal DESC, created_at DESC';
        const [rows] = await db.execute(sql, params);
        return rows;
    }

    static async getById(id, userId) {
        const [rows] = await db.execute(
            'SELECT * FROM activities WHERE id = ? AND user_id = ?', 
            [id, userId]
        );
        return rows[0];
    }

    static async create(data) {
        const { user_id, judul_aktivitas, kategori, tanggal } = data;
        const [result] = await db.execute(
            'INSERT INTO activities (user_id, judul_aktivitas, kategori, tanggal) VALUES (?, ?, ?, ?)',
            [user_id, judul_aktivitas, kategori, tanggal]
        );
        return result;
    }

    static async update(id, userId, data) {
        const { judul_aktivitas, kategori, tanggal } = data;
        await db.execute(
            'UPDATE activities SET judul_aktivitas = ?, kategori = ?, tanggal = ? WHERE id = ? AND user_id = ?',
            [judul_aktivitas, kategori, tanggal, id, userId]
        );
    }

    static async delete(id, userId) {
        await db.execute('DELETE FROM activities WHERE id = ? AND user_id = ?', [id, userId]);
    }
}
module.exports = Activity;