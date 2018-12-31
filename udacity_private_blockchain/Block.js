/* ===== Block Class ==============================
|  Class with a constructor for block 			   |
|  ===============================================*/

class Block {
	constructor(data){
		this.hash = "",
		this.height = "",
		this.body = data,
		this.time = "",
		this.previousblockhash = ""
	}
}

module.exports = Block;