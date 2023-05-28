const ethereumParams = {
    chainId: '0x' + (1).toString(16),
    chainName: 'Ethereum',
    nativeCurrency: {
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrls: ['https://rpc.ankr.com/eth'],
    blockExplorerUrls: ['https://etherscan.io']
}

const lzDomainAddress = "0x45704edaBe7D2e038C35876dd3B6789511e452cF";
const readerWeb3 = new Web3(ethereumParams.rpcUrls[0]);
const writerWeb3 = new Web3(Web3.givenProvider);
var selectedAccount = undefined;

async function initializeWalletState(callback) {
    if (typeof window.ethereum !== 'undefined') {
        window.ethereum.on('accountsChanged', function(accounts) {
            displayAccount(accounts[0]);
        });
        callback();
        try {
            var result = await addNetworkToMetamask();
            if(!result){
                displayAccount(undefined);
            }else{
                const accounts = await ethereum.request({
                    method: 'eth_requestAccounts'
                });
                displayAccount(accounts[0]);
                console.log(1);
            }
        } catch (error) {
            displayAccount(undefined);
        }
    } else {
        displayAccount(undefined);
        callback();
    }
}
async function addNetworkToMetamask() {
    try {
        var result = await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [
                { chainId: ethereumParams.chainId }
            ],
        });
        return true;
    }catch(error)  {
        console.log(error);
        return false;
    };

}
function wrongNetworkError(){
    Swal.fire(
      'Error',
      'You need to switch your wallet\'s network to Ethereum Mainnet.',
      'error'
    );
}

async function connectToMetamask() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            var result = await addNetworkToMetamask();
            if(!result){
                wrongNetworkError();
                displayAccount(undefined);
            }else{
                const accounts = await ethereum.request({
                    method: 'eth_requestAccounts'
                });
                if (accounts.length > 0) {
                    const account = accounts[0];
                    displayAccount(account);                    
                } else {
                    console.log("No account selected");
                    displayAccount(undefined);
                }
            }
        } catch (error) {
            console.log("No account selected");
            displayAccount(undefined);
        }
    } else {
        alert('Metamask is not installed');
    }
}

function displayAccount(account) {
    console.log(account);
    var metamaskSVG = '<svg fill="none" height="33" viewBox="0 0 35 33" width="35" xmlns="http://www.w3.org/2000/svg"><g stroke-linecap="round" stroke-linejoin="round" stroke-width=".25"><path d="m32.9582 1-13.1341 9.7183 2.4424-5.72731z" fill="#e17726" stroke="#e17726"/><g fill="#e27625" stroke="#e27625"><path d="m2.66296 1 13.01714 9.809-2.3254-5.81802z"/><path d="m28.2295 23.5335-3.4947 5.3386 7.4829 2.0603 2.1436-7.2823z"/><path d="m1.27281 23.6501 2.13055 7.2823 7.46994-2.0603-3.48166-5.3386z"/><path d="m10.4706 14.5149-2.0786 3.1358 7.405.3369-.2469-7.969z"/><path d="m25.1505 14.5149-5.1575-4.58704-.1688 8.05974 7.4049-.3369z"/><path d="m10.8733 28.8721 4.4819-2.1639-3.8583-3.0062z"/><path d="m20.2659 26.7082 4.4689 2.1639-.6105-5.1701z"/></g><path d="m24.7348 28.8721-4.469-2.1639.3638 2.9025-.039 1.231z" fill="#d5bfb2" stroke="#d5bfb2"/><path d="m10.8732 28.8721 4.1572 1.9696-.026-1.231.3508-2.9025z" fill="#d5bfb2" stroke="#d5bfb2"/><path d="m15.1084 21.7842-3.7155-1.0884 2.6243-1.2051z" fill="#233447" stroke="#233447"/><path d="m20.5126 21.7842 1.0913-2.2935 2.6372 1.2051z" fill="#233447" stroke="#233447"/><path d="m10.8733 28.8721.6495-5.3386-4.13117.1167z" fill="#cc6228" stroke="#cc6228"/><path d="m24.0982 23.5335.6366 5.3386 3.4946-5.2219z" fill="#cc6228" stroke="#cc6228"/><path d="m27.2291 17.6507-7.405.3369.6885 3.7966 1.0913-2.2935 2.6372 1.2051z" fill="#cc6228" stroke="#cc6228"/><path d="m11.3929 20.6958 2.6242-1.2051 1.0913 2.2935.6885-3.7966-7.40495-.3369z" fill="#cc6228" stroke="#cc6228"/><path d="m8.392 17.6507 3.1049 6.0513-.1039-3.0062z" fill="#e27525" stroke="#e27525"/><path d="m24.2412 20.6958-.1169 3.0062 3.1049-6.0513z" fill="#e27525" stroke="#e27525"/><path d="m15.797 17.9876-.6886 3.7967.8704 4.4833.1949-5.9087z" fill="#e27525" stroke="#e27525"/><path d="m19.8242 17.9876-.3638 2.3584.1819 5.9216.8704-4.4833z" fill="#e27525" stroke="#e27525"/><path d="m20.5127 21.7842-.8704 4.4834.6236.4406 3.8584-3.0062.1169-3.0062z" fill="#f5841f" stroke="#f5841f"/><path d="m11.3929 20.6958.104 3.0062 3.8583 3.0062.6236-.4406-.8704-4.4834z" fill="#f5841f" stroke="#f5841f"/><path d="m20.5906 30.8417.039-1.231-.3378-.2851h-4.9626l-.3248.2851.026 1.231-4.1572-1.9696 1.4551 1.1921 2.9489 2.0344h5.0536l2.962-2.0344 1.442-1.1921z" fill="#c0ac9d" stroke="#c0ac9d"/><path d="m20.2659 26.7082-.6236-.4406h-3.6635l-.6236.4406-.3508 2.9025.3248-.2851h4.9626l.3378.2851z" fill="#161616" stroke="#161616"/><path d="m33.5168 11.3532 1.1043-5.36447-1.6629-4.98873-12.6923 9.3944 4.8846 4.1205 6.8983 2.0085 1.52-1.7752-.6626-.4795 1.0523-.9588-.8054-.622 1.0523-.8034z" fill="#763e1a" stroke="#763e1a"/><path d="m1 5.98873 1.11724 5.36447-.71451.5313 1.06527.8034-.80545.622 1.05228.9588-.66255.4795 1.51997 1.7752 6.89835-2.0085 4.8846-4.1205-12.69233-9.3944z" fill="#763e1a" stroke="#763e1a"/><path d="m32.0489 16.5234-6.8983-2.0085 2.0786 3.1358-3.1049 6.0513 4.1052-.0519h6.1318z" fill="#f5841f" stroke="#f5841f"/><path d="m10.4705 14.5149-6.89828 2.0085-2.29944 7.1267h6.11883l4.10519.0519-3.10487-6.0513z" fill="#f5841f" stroke="#f5841f"/><path d="m19.8241 17.9876.4417-7.5932 2.0007-5.4034h-8.9119l2.0006 5.4034.4417 7.5932.1689 2.3842.013 5.8958h3.6635l.013-5.8958z" fill="#f5841f" stroke="#f5841f"/></g></svg>';

    if(account != undefined){
        selectedAccount = account.toUpperCase();
    }else{
        selectedAccount = undefined;
    }
    if (account === undefined) {
        document.getElementById("desktopCW").innerHTML = "Connect to Metamask";
        document.getElementById("mobilCW").innerHTML = "Connect to Metamask";
        return;
    }
    else{
        document.getElementById("desktopCW").innerHTML = account.substring(0, 6) + "......" + account.substring(account.length-6, account.length);
        document.getElementById("mobilCW").innerHTML = account.substring(0, 6) + "......" + account.substring(account.length-6, account.length);
    }
    
}

const lzDomainAbi = [ { "inputs": [ { "internalType": "string", "name": "baseURI_", "type": "string" }, { "internalType": "address", "name": "_layerZeroEndpoint", "type": "address" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" } ], "name": "ApprovalForAll", "type": "event" }, { "inputs": [ { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "domainName", "type": "string" } ], "name": "burnExpiredDomain", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "changePaused", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "int256", "name": "a", "type": "int256" }, { "internalType": "int256", "name": "b", "type": "int256" }, { "internalType": "int256", "name": "c", "type": "int256" } ], "name": "changePrice", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "newTolerance", "type": "uint256" } ], "name": "changeTolerance", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint16", "name": "_srcChainId", "type": "uint16" }, { "internalType": "bytes", "name": "_srcAddress", "type": "bytes" }, { "internalType": "uint64", "name": "_nonce", "type": "uint64" }, { "internalType": "bytes", "name": "_payload", "type": "bytes" } ], "name": "lzReceive", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint16", "name": "_srcChainId", "type": "uint16" }, { "indexed": false, "internalType": "bytes", "name": "_srcAddress", "type": "bytes" }, { "indexed": false, "internalType": "uint64", "name": "_nonce", "type": "uint64" }, { "indexed": false, "internalType": "bytes", "name": "_payload", "type": "bytes" } ], "name": "MessageFailed", "type": "event" }, { "inputs": [ { "internalType": "uint16", "name": "_srcChainId", "type": "uint16" }, { "internalType": "bytes", "name": "_srcAddress", "type": "bytes" }, { "internalType": "uint64", "name": "_nonce", "type": "uint64" }, { "internalType": "bytes", "name": "_payload", "type": "bytes" } ], "name": "onLzReceive", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "domainName", "type": "string" }, { "internalType": "uint256", "name": "newTime", "type": "uint256" } ], "name": "otherChainRenew", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [ { "internalType": "string", "name": "domainName", "type": "string" }, { "internalType": "uint256", "name": "year", "type": "uint256" } ], "name": "register", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "domainName", "type": "string" }, { "internalType": "uint256", "name": "year", "type": "uint256" } ], "name": "renew", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint16", "name": "_srcChainId", "type": "uint16" }, { "internalType": "bytes", "name": "_srcAddress", "type": "bytes" }, { "internalType": "uint64", "name": "_nonce", "type": "uint64" }, { "internalType": "bytes", "name": "_payload", "type": "bytes" } ], "name": "retryMessage", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" } ], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" } ], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "URI", "type": "string" } ], "name": "setBaseURI", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "newVal", "type": "uint256" } ], "name": "setGasForDestinationLzReceive", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint16", "name": "_chainId", "type": "uint16" }, { "internalType": "bytes", "name": "_trustedRemote", "type": "bytes" } ], "name": "setTrustedRemote", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint16", "name": "_chainId", "type": "uint16" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "traverseChains", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "payable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "baseURI", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "chainName", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "domainName", "type": "string" } ], "name": "checkDomainAvaliable", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "domainInfo", "outputs": [ { "internalType": "string", "name": "name", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "domainName", "type": "string" } ], "name": "domainPrice", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "", "type": "string" } ], "name": "domainsData", "outputs": [ { "internalType": "uint256", "name": "time", "type": "uint256" }, { "internalType": "uint256", "name": "nftID", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint16", "name": "_chainId", "type": "uint16" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "estimateFeesView", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "ethUSD", "outputs": [ { "internalType": "int256", "name": "", "type": "int256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint16", "name": "", "type": "uint16" }, { "internalType": "bytes", "name": "", "type": "bytes" }, { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "failedMessages", "outputs": [ { "internalType": "uint256", "name": "payloadLength", "type": "uint256" }, { "internalType": "bytes32", "name": "payloadHash", "type": "bytes32" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "getApproved", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getCount", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" } ], "name": "isApprovedForAll", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "ownerOf", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "paused", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" } ], "name": "supportsInterface", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "index", "type": "uint256" } ], "name": "tokenByIndex", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "index", "type": "uint256" } ], "name": "tokenOfOwnerByIndex", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "tokenURI", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint16", "name": "", "type": "uint16" } ], "name": "trustedRemoteLookup", "outputs": [ { "internalType": "bytes", "name": "", "type": "bytes" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_owner", "type": "address" } ], "name": "walletOfOwner", "outputs": [ { "internalType": "uint256[]", "name": "", "type": "uint256[]" } ], "stateMutability": "view", "type": "function" } ];


/* */
var lzContractRead = undefined;
var lzContractWrite = undefined;

$( document ).ready(function() {
    initializeWalletState(function(){
        initialize();
    });
    $( "#desktopCW" ).click(function() {
        connectToMetamask();
    });
    $( "#mobilCW" ).click(function() {
        connectToMetamask();
    });
    $( "#search" ).click(function() {
        registerDomain();
    });
});
$(document).keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        $( "#search" ).click();
    }
});


async function initialize() {
    lzContractRead = new readerWeb3.eth.Contract(
       lzDomainAbi,
       lzDomainAddress
    );
    lzContractWrite = new writerWeb3.eth.Contract(
       lzDomainAbi,
       lzDomainAddress
    );
    loadPage();
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('chainChanged', function(chainId){
        loadPage();
      });
    }
}


async function loadPage(){
  try {
    readerWeb3.eth.clearSubscriptions();
  }catch(error){
    console.log(error);
  }
}

function accountChanged(){
    loadPage();
}
async function registerDomain(){
    const hexToDecimal = hex => parseInt(hex, 16);
    try{
        $("#loader").show();

        var name = $("#domainName").val().toString().toLowerCase();
        var year = $("#year option:selected").val();
        console.log(year);
        console.log(name);
        var result = await addNetworkToMetamask();
        var accounts = null;
        var balance = 0;
        var domainLength = name.length;
        if (domainLength < 1) {
            $("#errorText").html('Name is too short. Names must be at least 3 characters long.');
            $("#errordomain").show();
            $("#loader").hide();
            Swal.close();
            return;
        }
        var checkStatus = await lzContractRead.methods.checkDomainAvaliable(name).call();
        if (checkStatus == false) {
            $("#errorText").html('Domain already registered.');
            $("#errordomain").show();
            $("#loader").hide();
            Swal.close();
            return;

        }
        var value = await lzContractRead.methods.domainPrice(name).call();
        value = value * year;
        console.log("Domain Value: " + value + "(wei)");

        if(!result){  wrongNetworkError(); return; }
        if (typeof window.ethereum !== 'undefined') {
            accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            balance = await ethereum.request({ method: 'eth_getBalance', params: [accounts[0], "latest"]});
            if (balance < value) {
                alert("Insufficient balance.");
                $("#loader").hide();
                Swal.close();
                return;
            }
        } else {
            alert("no eth_requestAccounts");
            Swal.close();
            return;
        }
        var gasEstimate;

        try{
            gasEstimate = await lzContractWrite.methods.register(name , year).estimateGas({
                from: accounts[0].toUpperCase(),
                value: value,
            });
            console.log(gasEstimate);
        }catch(error){
            var message = "An error occured.";
            var errorMessage = "";
            if(error !== undefined && error !== null && error.message !== undefined && error.message.indexOf('"message": "') != -1){
                errorMessage = error.message.split('"message": "')[1].split('"\n}')[0];
            }
            alert(error);
            console.log(228);
            $("#loader").hide();
            Swal.close();
            return;
        }
        var gasPrice = await readerWeb3.eth.getGasPrice();
        console.log("gasprice:" + gasPrice);
        gasPrice = parseInt(gasPrice * 1.2);
        console.log(gasPrice);
        var goRegister = await lzContractWrite.methods.register(name , year).send({
             from: accounts[0].toUpperCase(),
             value: value,
             gas: gasEstimate,
             gasPrice: gasPrice
         }).on('receipt', function(receipt){
            window.location.replace("/myDomains?chain=eth");
         }).once('transactionHash', function(hash){ 
            $("#loader").hide();
            console.log("Transaction Hash: " + hash);
            Swal.close();
            Swal.fire({
              showConfirmButton: false,
              text: 'Awaiting confirmation of the transaction.',
              footer: '<a target="_blank" href="' + ethereumParams.blockExplorerUrls[0] + '/tx/' + hash + '">Transaction Hash: ' + hash.substring(0, 10) + "..." + hash.substring(hash.length-10, hash.length) + '</a>',
            });
            

        });
    }catch(error){
        Swal.close();
        alert("Cancel transaction.");
        alert(error);
        $("#loader").hide();
        console.log(error);
    }
}