const express = require('express');
const router = express.Router();
const blockChainController = require("../controllers/BlockChain.js");


/* post a new block */
router.post('/', async function (req, res) {
  let newBlock = req.body;

  if (newBlock.body) {
    try {
      let addedBlock = await blockChainController.addBlock(newBlock);
      res.json(addedBlock);

    } catch (err) {
      res.status(500);
      res.json({
        error: "error adding block"
      });
    }
  } else {
    res.status(400);
    res.json({
      error: "invalid block payload"
    });
  }

});

/* get a block by height*/
router.get('/:blockId', async function (req, res, next) {
  try {
    var block = await blockChainController.getBlock(req.params.blockId)
    res.json(block);
  } catch (err) {
    res.status(404);
    res.json({
      error: "error retrieving block"
    });
  }
});

module.exports = router;