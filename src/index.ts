import * as CryptoJS from "crypto-js";
class Block {
    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;
    static calculateHash = (index: number, previousHash: string, timestamp: number, data: string): string => {
        return CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
    }
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
const getLatestBlock = (): Block => getBlockChain()[blockChain.length - 1];
const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
    const block: Block = getLatestBlock();
    const newIndex: number = block.index + 1;
    const newTimeStamp: number = getNewTimeStamp();
    const newHash: string = Block.calculateHash(newIndex, block.hash, newTimeStamp, data);
    const newBlock: Block = new Block(newIndex, newHash, block.hash, data, newTimeStamp);
    return newBlock;
}
console.log(createNewBlock("Hello"), createNewBlock("Bye"))

export {};