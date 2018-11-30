pragma solidity ^0.4.23;

contract Voting {
    //constructor for candidate initialization
    bytes32[] public candidateList;
    mapping (bytes32 => uint8) public votesReceived;
    constructor(bytes32[] candidateNames) public {
        candidateList = candidateNames;
    }
    //vote for condidates
    function voteForCandidate(bytes32 candidate) public {
        require(validCandidate(candidate));
        votesReceived[candidate] +=1;
    }
    //get count of votes for each candidate
    function totalVotesFor(bytes32 candidate) view public returns(uint8) {
        require(validCandidate(candidate));
        return votesReceived[candidate];
    }
    
    //check if valid candidate
    function validCandidate(bytes32 candidate) view public returns(bool) {
        for(uint8 i = 0; i<candidateList.length-1; i++) {
            if (candidateList[i] == candidate) {
                return true;
            }
            return false;
        }
    }
}