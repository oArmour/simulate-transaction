const { ethers } = require('ethers');
require('dotenv').config()
const abi = require('./abi.json')

const contractAddress = "0xC36442b4a4522E871399CD717aBDD847Ab11FE88"

const signer = new ethers.Wallet(
    process.env.PRIVATE_KEY,
    ethers.getDefaultProvider('mainnet')
);

const contract = new ethers.Contract(contractAddress, abi, signer);

const from = "0xA08ae46AF6a20d7Dc1a4B0e47272373286D30d48"
const to = "0xC41672E349C3F6dAdf8e4031b6D2d3d09De276f9"
const tokenId = 100

const transaction = async () => {
    const a = await contract.transferFrom.staticCall(from, to, tokenId)
    console.log(a)
}

transaction()
