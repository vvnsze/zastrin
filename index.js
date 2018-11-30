Web3 = require( 'web3' );
web3 = new Web3();
web3.setProvider( new web3.providers.httpProvider( 'http://127.0.0.1:8545' ) );
abi = JSON.parse( '[{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]' )
VotingContract = web3.eth.contract( abi );
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = VotingContract.at( '0x8eb672d9c886fce2e59418350b63836979fbb874' );
candidates = { "Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3" }
var account;

function voteForCandidate() {
  candidateName = $( "#candidate" ).val();
  contractInstance.voteForCandidate( candidateName, { from: account }, function () {
    let div_id = candidates[candidateName];
    $( "#" + div_id ).html( contractInstance.totalVotesFor.call( candidateName ).toString() );
  } );
}

$( document ).ready( function () {
  web3.eth.getAccounts( function ( err, accs ) {
    if ( err != null ) {
      alert( 'There was an error fetching your accounts.' )
      return
    }

    if ( accs.length === 0 ) {
      alert( "Couldn't get any accounts! Make sure your Ethereum client is configured correctly." )
      return
    }

    account = accs[0]

    candidateNames = Object.keys( candidates );
    for ( var i = 0; i < candidateNames.length; i++ ) {
      let name = candidateNames[i];
      let val = contractInstance.totalVotesFor.call( name ).toString()
      $( "#" + candidates[name] ).html( val );
    }

  } )
} );
