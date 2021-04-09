pragma solidity >=0.4.22 <0.9.0;


import "./zombiefactory.sol";

contract ZombieHelper is ZombieFactory {
    uint256 levelUpFee = 0.001 ether;

    modifier onlyOwnerOf(uint256 _zombieId) {
        require(msg.sender == zombieToOwner[_zombieId]);
        _;
    }

    function withdraw() external onlyOwner {
        address _owner = owner();
        address(uint160(_owner)).transfer(address(this).balance);
    }

    function getZombiesByOwner(address _owner)
        external
        view
        returns (uint256[] memory)
    {
        uint256[] memory result = new uint256[](ownerZombieCount[_owner]);
        uint256 counter = 0;
        for (uint256 i = 0; i < zombies.length; i++) {
            if (zombieToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }
}
