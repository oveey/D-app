// Replace the following two values
const MoodContractAddress = ...;
const MoodContractABI = [{
    "inputs": [],
    "name": "getMood",
    "outputs": [{
        "internalType": "string",
        "name": "",
        "type": "string"
    }],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [{
        "internalType": "string",
        "name": "_mood",
        "type": "string"
    }],
    "name": "setMood",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}
]

// Currently these two are undefined, we will use Ethers to assign them values
let MoodContract = undefined;
let signer = undefined;
const provider = new ethers.providers.Web3Provider(window.ethereum, "sepolia");
provider.send("eth_requestAccounts", []).then(() => {
    provider.listAccounts().then((accounts) => {
      signer = provider.getSigner(accounts[0]);
      MoodContract = new ethers.Contract(
        MoodContractAddress,
        MoodContractABI,
        signer
      );
    });
});

async function getMood() {
    const mood = await MoodContract.getMood();
    document.getElementById("showMood").innerText = `Your Mood: ${mood}`;
    console.log(mood);
}
  
async function setMood() {
    const mood = document.getElementById("mood").value;
    await MoodContract.setMood(mood);
}
  
  