/* ===== Executable Test ==================================
|  Use this file to test your project.
|  =========================================================*/

const BlockChain = require('./BlockChain.js');
const Block = require('./Block.js');

let myBlockChain = new BlockChain.Blockchain();

let timer = setTimeout(function () {
	if (!myBlockChain.initialized) {
		console.log("Waiting...")
	} else {
		clearTimeout(timer);


		/******************************************
		 ** Function for Create Tests Blocks   ****
		 ******************************************/


		// (function theLoop(i) {
		// 	setTimeout(async function () {
		// 		let blockTest = new Block("Test Block - " + (i + 1));
		// 		// Be careful this only will work if your method 'addBlock' in the Blockchain.js file return a Promise
		// 		let result = await myBlockChain.addBlock(blockTest);
		// 		console.log(result);
		// 		i++;
		// 		if (i < 10) theLoop(i);
		// 	}, 1000);
		// })(0);


		/***********************************************
		 ** Function to get the Height of the Chain ****
		 ***********************************************/

		/*
		// Be careful this only will work if `getBlockHeight` method in Blockchain.js file return a Promise
		myBlockChain.getBlockHeight().then((height) => {
			console.log(height);
		}).catch((err) => { console.log(err);});
		*/
		(async function () {
			//Test load block chain
			// (function theLoop(i) {
			// 	setTimeout(async function () {
			// 		let blockTest = new Block("Test Block - " + (i + 1));
			// 		// Be careful this only will work if your method 'addBlock' in the Blockchain.js file return a Promise
			// 		let result = await myBlockChain.addBlock(blockTest);
			// 		console.log(result);
			// 		i++;
			// 		if (i < 10) theLoop(i);
			// 	}, 1000);
			// })(0);

			//Test get block height
			try {
				console.log("BlockChain height is - " + await myBlockChain.getChainHeight());
			} catch (err) {
				console.log("Error getting block height. Error - " + JSON.stringify(err));
			}

			//Test get Block
			const blockIndex = 2;
			try {
				const block = await myBlockChain.getBlock(blockIndex);
				console.log("Block at index " + blockIndex + " is - " + JSON.stringify(block));
			} catch (err) {
				console.log("Error retriveing block at index " + blockIndex + "Error - " + JSON.stringify(err));
			}

			//Test validate block
			try {
				const blockStatus = await myBlockChain.validateBlock(blockIndex);
				console.log("Validation status of Block at index " + blockIndex + " is - " + blockStatus);
			} catch (err) {
				console.log("Error validating block at index " + blockIndex + "Error - " + JSON.stringify(err));
			}

			//Test validate chain 
			try {
				const chainStatus = await myBlockChain.validateChain();
				console.log("BlockChain validation status is - " + JSON.stringify(chainStatus));
			} catch (err) {
				console.log("Error validating BlockChain. Error - " + JSON.stringify(err));
			}

		})();
		/***********************************************
		 ******** Function to Get a Block  *************
		 ***********************************************/

		/*
		// Be careful this only will work if `getBlock` method in Blockchain.js file return a Promise
		myBlockChain.getBlock(0).then((block) => {
			console.log(JSON.stringify(block));
		}).catch((err) => { console.log(err);});
		*/


		/***********************************************
		 ***************** Validate Block  *************
		 ***********************************************/

		/*
		// Be careful this only will work if `validateBlock` method in Blockchain.js file return a Promise
		myBlockChain.validateBlock(0).then((valid) => {
			console.log(valid);
		})
		.catch((error) => {
			console.log(error);
		})
		*/



		/** Tampering a Block this is only for the purpose of testing the validation methods */
		/*
		myBlockChain.getBlock(5).then((block) => {
			let blockAux = block;
			blockAux.body = "Tampered Block";
			myBlockChain._modifyBlock(blockAux.height, blockAux).then((blockModified) => {
				if(blockModified){
					myBlockChain.validateBlock(blockAux.height).then((valid) => {
						console.log(`Block #${blockAux.height}, is valid? = ${valid}`);
					})
					.catch((error) => {
						console.log(error);
					})
				} else {
					console.log("The Block wasn't modified");
				}
			}).catch((err) => { console.log(err);});
		}).catch((err) => { console.log(err);});

		myBlockChain.getBlock(6).then((block) => {
			let blockAux = block;
			blockAux.previousBlockHash = "jndininuud94j9i3j49dij9ijij39idj9oi";
			myBlockChain._modifyBlock(blockAux.height, blockAux).then((blockModified) => {
				if(blockModified){
					console.log("The Block was modified");
				} else {
					console.log("The Block wasn't modified");
				}
			}).catch((err) => { console.log(err);});
		}).catch((err) => { console.log(err);});

		/***********************************************
		 ***************** Validate Chain  *************
		 ***********************************************/

		/*
		// Be careful this only will work if `validateChain` method in Blockchain.js file return a Promise
		myBlockChain.validateChain().then((errorLog) => {
			if(errorLog.length > 0){
				console.log("The chain is not valid:");
				errorLog.forEach(error => {
					console.log(error);
				});
			} else {
				console.log("No errors found, The chain is Valid!");
			}
		})
		.catch((error) => {
			console.log(error);
		})
		*/


	}
}, 1000);