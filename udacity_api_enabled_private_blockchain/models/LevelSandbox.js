/* ===== Persist data with LevelDB ==================
|  Learn more: level: https://github.com/Level/level |
/===================================================*/

const level = require('level');
const chainDB = './chaindata';

class LevelSandbox {

    constructor() {
        this.db = level(chainDB);
    }

    // Get data from levelDB with key (Promise)
    getDbBlockByHeight(blockHeight) {
        let self = this;
        return new Promise(function (resolve, reject) {
            self.db.get(blockHeight)
                .then((block) => {
                    // console.log("DAL: Data retrieved from database at height " + blockHeight + " - " + JSON.stringify(block));
                    resolve(JSON.parse(block));
                })
                .catch((err) => {
                    // console.log("DAL: Error retrieving block from database at height " + blockHeight + " - " + JSON.stringify(err));
                    reject(err);
                });
        });
    }

    // Add data to levelDB with key and value (Promise)
    addDbBlock(key, value) {
        let self = this;
        // console.log("DAL: Adding block to database with key " + key + " - " + value);
        return new Promise(function (resolve, reject) {
            self.db.put(key, value)
                .then((val) => {
                    // console.log("DAL: Successfully added block to database with key - " + key);
                    resolve(val);
                })
                .catch((err) => {
                    // console.log("DAL: Error adding block to database with key " + key + " - " + JSON.stringify(err));
                    reject(err);
                });
        });
    }

    // Method that return the height
    getDbBlockCount() {
        let self = this;
        let blockCount = 0;
        return new Promise(function (resolve, reject) {
            self.db.createKeyStream()
                .on('data', function (data) {
                    blockCount++;
                })
                .on('error', function (err) {
                    // console.log("DAL: Error counting blocks in the database - " + JSON.stringify(err));
                    reject(err);
                })
                .on('end', function () {
                    // console.log("DAL: Count of blocks in the database is - " + blockCount);
                    resolve(blockCount);
                });
        });
    }



}

module.exports = LevelSandbox;