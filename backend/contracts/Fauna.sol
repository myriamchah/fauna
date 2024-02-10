// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;
import "@openzeppelin/contracts/access/Ownable.sol";

contract Fauna is Ownable {
    
  struct Donator {
    uint totalDonated;
    bool hasVoted;
    uint votedProjectId;
  }

  struct Project {
    string name;
    string desc;
    address projAddress;
    uint voteCount;
    uint fundsReceived;
    bool usageCertified; 
  }

  enum  Phase {
    ProjectsCuration,
    VotesStarted,
    VotesEnded,
    FundsSent
  }

  Phase public phase;
  Project[] projects;
  mapping (address => Donator) donators;
  uint public totalVotes;

  event NewPhase(Phase current);
  event DonationReceived(address donator, uint amount); 
  event ProjectCurated(uint projectId);
  event Voted (address donator, uint votedProjectId);
  event FundsGranted(uint amount, uint projectId);
  event ProperFundsUsageCertified(uint projectId, string comment);

  constructor() Ownable(msg.sender) {    }

  modifier onlyDonators() {
    require(donators[msg.sender].totalDonated > 0, "Not donator");
    _;
  }

 // *********************************** GETTERS ***********************************  

  function getDonator(address _addr) external view returns (Donator memory donator) {
    donator = donators[_addr];
  }

  function getProject(uint _id) external view returns (Project memory project) {
    project =  projects[_id];
  }

  function getProjects() external view returns(Project[] memory) {
    return projects;
  }

  function getContractBalance() external view returns(uint) {
    return address(this).balance;
  }


//  *********************************** FUNDS ************************************  

  function donate() external payable {
    require(msg.value > 0, "Not enough funds deposited");
    donators[msg.sender].totalDonated += msg.value;
    emit DonationReceived(msg.sender, msg.value); 
  }

  function sendFunds() external onlyOwner {
    require(phase >= Phase.VotesEnded, "Votes not ended");
    require(address(this).balance > 0, "Empty balance");
    uint balance = address(this).balance;

    for(uint i;i < projects.length;i++){
      if (projects[i].voteCount > 0) {
        uint amount = (balance * projects[i].voteCount) / totalVotes;
        (bool received, ) = projects[i].projAddress.call{value: amount}("");
        require(received, "Payment failed");
        projects[i].fundsReceived = amount;
        emit FundsGranted(amount, i);
      }
    }
    phase = Phase.FundsSent;
    emit NewPhase(phase);  
  }

  function certifyFundsUsage(uint _id, string calldata _comment) external onlyOwner {
    require(projects[_id].fundsReceived > 0, "No funds received");
    projects[_id].usageCertified = true;
    emit ProperFundsUsageCertified(_id, _comment);
  }

// *********************************** PROJECTS ***********************************  


  function addCuratedProject(string calldata _name, string calldata _desc, address _projAddress) external onlyOwner {
    require(phase == Phase.ProjectsCuration, "Project curation is over");
    require(bytes(_name).length > 0, "No name");
    require(bytes(_desc).length > 0, "No description");
    require(_projAddress != address(0), "No address");

    projects.push(Project(_name, _desc, _projAddress, 0, 0, false));
    emit ProjectCurated(projects.length -1);
  }


// *********************************** VOTES ***********************************  


  function startVotes() external onlyOwner {
    require(phase == Phase.ProjectsCuration, "Cannot start votes now");
    require(0 < projects.length, "No projects to vote for");
    phase = Phase.VotesStarted;
    emit NewPhase(phase);
  }

  function submitVote(uint _id) external onlyDonators {
    require(phase == Phase.VotesStarted, "Cannot vote now");
    require(donators[msg.sender].hasVoted != true, "You already voted");
    require(_id < projects.length, "Unknown project"); 

    donators[msg.sender].votedProjectId = _id;
    donators[msg.sender].hasVoted = true;
    projects[_id].voteCount++;
    totalVotes++;

    emit Voted(msg.sender, _id);
  }

  function endVotes() external onlyOwner {
    require(phase == Phase.VotesStarted, "Cannot end votes now");
    require(totalVotes > 0, "No votes submitted yet");
    phase = Phase.VotesEnded;
    emit NewPhase(phase);
  }
}