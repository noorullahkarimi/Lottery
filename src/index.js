
const TronWeb = require('tronweb')

// let abi =[{"entrys":[{"name":"withdrawWinners","stateMutability":"Nonpayable","type":"Function"},{"name":"withdraw","stateMutability":"Nonpayable","type":"Function"},{"outputs":[{"type":"address[]"},{"type":"uint256[]"}],"constant":true,"name":"getAllAddressWinner","stateMutability":"View","type":"Function"},{"name":"pickWinner","stateMutability":"Nonpayable","type":"Function"},{"payable":true,"name":"enter","stateMutability":"Payable","type":"Function"},{"stateMutability":"Nonpayable","type":"Constructor"},{"inputs":[{"name":"addr","type":"address"},{"name":"tokens","type":"uint256"}],"name":"member","type":"Event"},{"inputs":[{"name":"addr","type":"address"},{"name":"tokens","type":"uint256"}],"name":"winners","type":"Event"},{"inputs":[{"name":"tokens","type":"uint256"}],"name":"quantity","type":"Event"}]}];
// let contractAddress = "TL4KdTKQ2YLvNxR8VCHK4W8eCSrz7oJstc";
//is contract connect trutly or not
// async function getContract(){
//         try{
//                 let instance = await tronWeb.contract(abi,contractAddress);
//                 console.log("this is out result --->>>");
//                 console.log( instance );
//         }catch(e){
//                 console.log("errorsssssssssssssssss"+e);
//         }
        
// }
// getContract();


// getContract()
// async function enter(){
//         const publicAddress = TronWeb.defaultAddress.base58
//         console.log(publicAddress);
// }
// enter();
// let res = await instance.totalSupply().call({_isConstant:true})
// getContract();// Execute the function
