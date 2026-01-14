const db = require('../config/database');

class ActivityDetail {
    static async getByActivityId(activityId) {
        const [rows] = await db.execute(
            'SELECT * FROM activity_details WHERE activity_id = ? ORDER BY id ASC',
            [activityId]
        );
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.execute('SELECT * FROM activity_details WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(data) {
        const { activity_id, deskripsi_detail, durasi, status } = data;
        await db.execute(
            'INSERT INTO activity_details (activity_id, deskripsi_detail, durasi, status) VALUES (?, ?, ?, ?)',
            [activity_id, deskripsi_detail, durasi, status]
        );
    }

    static async update(id, data) {
        const { deskripsi_detail, durasi, status } = data;
        await db.execute(
            'UPDATE activity_details SET deskripsi_detail = ?, durasi = ?, status = ? WHERE id = ?',
            [deskripsi_detail, durasi, status, id]
        );
    }

    static async delete(id) {
        await db.execute('DELETE FROM activity_details WHERE id = ?', [id]);
    }

    static async getTotalDuration(activityId) {
        const [rows] = await db.execute(
            'SELECT SUM(durasi) as total FROM activity_details WHERE activity_id = ?',
            [activityId]
        );
        return rows[0].total || 0;
    }
}
module.exports = ActivityDetail;