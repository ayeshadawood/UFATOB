const Blockchain = require("./blockchain");

const bitcoin = new Blockchain();
// bitcoin.creatNewBlock(849848, "d3d3e3d", "a6a6a6a6a6a");
// bitcoin.createNewTransaction(100, "haide3238282828", "shaeera232323");
// bitcoin.creatNewBlock(12123232, "a8a8a88a", "58gj58jg85g");
// bitcoin.createNewTransaction(300, "haide3238282828", "shaeera232323");
// bitcoin.createNewTransaction(400, "haide3238282828", "shaeera232323");
// bitcoin.createNewTransaction(800, "haide3238282828", "shaeera232323");
// bitcoin.creatNewBlock(9798787978, "SS7A7A7A7", "G6A7GS7SV");

// console.log(bitcoin.chain[2]);

// const previousBlockHash = "H3833H3H3";
// const currentBlockData = [
//   {
//     amount: 100,
//     sender: "G7GG7G77",
//     reciever: "D3D33DDD"
//   },
//   {
//     amount: 200,
//     sender: "HH7D7D7D7",
//     reciever: "DKUFHEW8H8"
//   },
//   {
//     amount: 500,
//     sender: "JD9CJ8DCJ98DEN3",
//     reciever: "D8W3D83D83"
//   }
// ];

// console.log(bitcoin.proofOfWork(previousBlockHash, currentBlockData));

const bc1 = {
  chain: [
    {
      index: 1,
      timeStamp: 1585487100119,
      transactions: [],
      nonce: 100,
      hash: "0",
      previousBlockHash: "0",
    },
    {
      index: 2,
      timeStamp: 1585487247203,
      transactions: [],
      nonce: 18140,
      hash: "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100",
      previousBlockHash: "0",
    },
    {
      index: 3,
      timeStamp: 1585487270253,
      transactions: [
        {
          amount: 12.5,
          sender: "00",
          receiver: "e57db58071bd11ea80c7cb7c8f312d9a",
          transactionId: "3da17da071be11ea80c7cb7c8f312d9a",
        },
        {
          amount: 60,
          sender: "62GD6D6DHDDH6W",
          receiver: "37X737X4Q7",
          transactionId: "47be731071be11ea80c7cb7c8f312d9a",
        },
      ],
      nonce: 9499,
      hash: "00000504a3752a368779532bcc06805abd9bd7d7662f0bfe5779f094f142c650",
      previousBlockHash:
        "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100",
    },
    {
      index: 4,
      timeStamp: 1585487277391,
      transactions: [
        {
          amount: 12.5,
          sender: "00",
          receiver: "e57db58071bd11ea80c7cb7c8f312d9a",
          transactionId: "4ae6dc3071be11ea80c7cb7c8f312d9a",
        },
      ],
      nonce: 243371,
      hash: "00008226ecccccce6bd6b5147b031587c141f883722114ec1f6fd0f2f39364d0",
      previousBlockHash:
        "00000504a3752a368779532bcc06805abd9bd7d7662f0bfe5779f094f142c650",
    },
  ],
  pendingTransactions: [
    {
      amount: 12.5,
      sender: "00",
      receiver: "e57db58071bd11ea80c7cb7c8f312d9a",
      transactionId: "4f27932071be11ea80c7cb7c8f312d9a",
    },
  ],
  currentNodeUrl: "http://localhost:3001",
  networkNodes: [],
};

console.log(bitcoin.chainIsValid(bc1.chain));
