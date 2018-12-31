/* ===== Blockchain Class ==========================
|  Class with a constructor for new blockchain 		|
|  ================================================*/

const SHA256 = require('crypto-js/sha256');
const LevelSandbox = require('./LevelSandbox.js');
const Block = require('./Block.js');

class Blockchain {

    constructor() {
        this.blockDb = new LevelSandbox();
        this.initialized = false;
        this.generateGenesisBlock();
    }

    // Auxiliar method to create a Genesis Block (always with height= 0)
    async generateGenesisBlock() {
        try {
            console.log("Detecting if the BlockChain needs to be initialized with genesis block")
            const chainHeight = await this.getChainHeight();
            if (chainHeight === -1) {
                const genesisBlock = new Block("Block - 0");
                console.log("Detected new BlockChain. Adding genesis block");
                await this.addBlock(genesisBlock);
            }
        } catch (err) {
            console.log("Error initializing blockchain. Shutting down.. Error - " + JSON.stringify(err));
            process.exit(1);
        };

        console.log("Successfully initialized the blockchain");
        this.initialized = true;
    }

    // Get block height, it is auxiliar method that return the height of the blockchain
    async getChainHeight() {
        try {
            let chainHeight = await this.blockDb.getDbBlockCount();
            // console.log("Current chain height is - " + (chainHeight - 1));
            return chainHeight - 1;
        } catch (err) {
            // console.log("Error retrieving chain height.. Error - " + JSON.stringify(err));
            throw err;
        }
    }

    // Add new block
    async addBlock(block) {
        let chainHeight = await this.getChainHeight();
        let previousBlock = {};

        if (chainHeight === -1) {
            block.height = 0;
            block.previousblockhash = "";
        } else if (chainHeight >= 0) {
            block.height = chainHeight + 1;
            previousBlock = await this.getBlock(chainHeight);
            block.previousblockhash = previousBlock.hash;
        }

        block.time = new Date().getTime().toString().slice(0, -3);
        block.hash = "";
        block.hash = SHA256(JSON.stringify(block)).toString();

        // console.log("Adding new block - " + JSON.stringify(block));

        try {
            await this.blockDb.addDbBlock(block.height, JSON.stringify(block));
            // console.log("Successfully added block to the blockchain");
            return 0;
        } catch (err) {
            // console.log("Error adding block to blockchain. Error - " + JSON.stringify(err));
            throw err;
        }

    }


    // Get Block By Height
    async getBlock(height) {
        try {
            let requestedBlock = await this.blockDb.getDbBlockByHeight(height);
            // console.log("Requested block at height " + height + " is - " + JSON.stringify(requestedBlock));
            return requestedBlock;
        } catch (err) {
            // console.log("Error getting block at height " + height + " - " + JSON.stringify(err));
            throw err;
        }

    }

    // Validate if Block is being tampered by Block Height
    async validateBlock(height) {
        try {
            // console.log("Validating block - " + height);
            let blockToValidate = await this.getBlock(height);
            let previousBlock = {};
            const blockHash = blockToValidate.hash;
            blockToValidate.hash = "";
            const calculatedBlockHash = SHA256(JSON.stringify(blockToValidate)).toString();
            if (blockHash !== calculatedBlockHash) {
                // console.log("Block " + height + " is in-valid");
                return false;
            }
            if (height !== 0) {
                previousBlock = await this.getBlock(height - 1);
                if (blockToValidate.previousblockhash !== previousBlock.hash) {
                    // console.log("Block " + height + " is in-valid");
                    return false;
                }
            }
            // console.log("Block " + height + " is valid");
            return true;

        } catch (err) {
            // console.log("Error validating block. Error - " + JSON.stringify(err));
            throw err;
        }

    }

    // Validate Blockchain
    async validateChain() {
        try {
            // console.log("Validating the entire BlockChain");
            const chainHeight = await this.getChainHeight();
            let blockValidated = true;
            for (let i = 0; i <= chainHeight; i++) {
                blockValidated = await this.validateBlock(i);
                if (!blockValidated) {
                    // console.log("Chain is invalid");
                    return false;
                }
            }
            // console.log("Chain is valid");
            return true;

        } catch (err) {
            // console.log("Error validating chain. Error - " + JSON.stringify(err));
            throw err;
        }

    }

    // Utility Method to Tamper a Block for Test Validation
    // This method is for testing purpose
    _modifyBlock(height, block) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.bd.addDbBlock(height, JSON.stringify(block).toString()).then((blockModified) => {
                resolve(blockModified);
            }).catch((err) => {
                console.log(err);
                reject(err)
            });
        });
    }

}

module.exports.Blockchain = Blockchain;