import * as CryptoJS from "crypto-js";
class Block {
    static calculateHash = (index: number, previousHash: string, timestamp: number, data: string): string => {
        return CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
    }
    static validateStructure = (aBlock: Block): boolean => 
        typeof aBlock.index === 'string' &&
        typeof aBlock.hash === 'string' &&
        typeof aBlock.previousHash === 'string' &&
        typeof aBlock.timestamp === 'number' &&
        typeof aBlock.data === 'string';

    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;

    constructor(index: number,
        hash: string,
        previousHash: string,
        data: string,
        timestamp: number){
            this.index = index;
            this.hash = hash;
            this.previousHash = previousHash;
            this.data = data;
            this.timestamp = timestamp;
        }
}

let genesisBlock:Block = new Block(0, "123123", "", "Hello", 123456);
const blockChain: Block[] = [genesisBlock];

const getBlockChain = (): Block[] => blockChain;
const getLatestBlock = (): Block => blockChain[blockChain.length - 1];
const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
    const block: Block = getLatestBlock();
    const newIndex: number = block.index + 1;
    const newTimeStamp: number = getNewTimeStamp();
    const newHash: string = Block.calculateHash(newIndex, block.hash, newTimeStamp, data);
    const newBlock: Block = new Block(newIndex, newHash, block.hash, data, newTimeStamp);
    addBlock(newBlock);
    return newBlock;
};

const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
    if (Block.validateStructure(candidateBlock)) {
        return false;
    } else if (candidateBlock.index - 1 !== previousBlock.index){
        return false;
    } else if (candidateBlock.previousHash !== previousBlock.hash){
        return false;
    } else {
        return true;
    }
};

const addBlock = (candidateBlock: Block): void => {
    if (isBlockValid(candidateBlock, getLatestBlock())){
        blockChain.push(candidateBlock);
    }
}

console.log(createNewBlock('Hello'), createNewBlock('Bye'))
export {};