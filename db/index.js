const mysql = require('mysql');
const config = require('./config.js')

const query = (sql, database) => {
    
    return new Promise((resolve, reject) => {
		if (database) {
			config.database = database;
		}
        const connection = mysql.createConnection(config);
		// 连接数据库
		connection.connect(err => {
			if (err) {
				console.log('数据库链接失败');
				reject(err);
			}
			// 查询数据
			connection.query(sql, (error, results, fields) => {
				if (error) {
					console.log('数据库操作失败');
					reject(err);
				}
				resolve(results);
				// 关闭连接
				connection.end(err => {
					if (err) {
						console.log('关闭数据库失败');
						reject(err);
					}
				});
			});
		})
    })
};

module.exports = {
    query
}
