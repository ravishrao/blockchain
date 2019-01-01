# Project #3. Private Blockchain with REST interface

This is Project 3, Private Blockchain with REST interface, in this project I created the classes to manage my private blockchain, to be able to persist my blochchain I used LevelDB. The projects also exposed two REST APIs which can be used to add a new block or retrieve a existing block

## Setup project for Review.

To setup the project for review do the following:
1. Download the project.
2. Run command __npm install__ to install the project dependencies.
3. Run command __npm start__ in the root directory.

## API details

### To add a new block

http://<hostname>:8000/block

HTTP Method: POST
HTTP Body:
```
{
    "body": "<block data>"
}
```

### To retrieve a block

http://<hostname>:8000/block/<block_height>

HTTP Method: GET
HTTP Body: NA

## Testing the project

