const { ethers } = require('ethers');
const axios = require('axios');
require('dotenv').config();
const abi = require('./abi.json');

const provider = new ethers.providers.JsonRpcProvider('https://little-few-paper.quiknode.pro/b5d1d2678912de9078cba3c29d6180a685732418/');
const contractAddress = "0xC36442b4a4522E871399CD717aBDD847Ab11FE88";
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contract = new ethers.Contract(contractAddress, abi, signer);

const from = "0xA08ae46AF6a20d7Dc1a4B0e47272373286D30d48";
const to = "0xC41672E349C3F6dAdf8e4031b6D2d3d09De276f9";
const tokenId = 100;

const simulateAndTrace = async () => {
    try {
        const callData = await contract.populateTransaction.transferFrom(from, to, tokenId);

        const traceCallResponse = await axios.post('https://little-few-paper.quiknode.pro/b5d1d2678912de9078cba3c29d6180a685732418/', {
            jsonrpc: '2.0',
            method: 'debug_traceCall',
            params: [
                {
                    to: contractAddress,
                    data: callData.data
                },
                'latest',
                {}
            ],
            id: 1
        });

        const trace = traceCallResponse.data.result;
        console.log('Trace result:', traceCallResponse);
    } catch (error) {
        console.error('Error in trace call:', error);
    }
};

simulateAndTrace();
