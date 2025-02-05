// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract SimpleStorage {
    struct People {
        uint256 id;
        string name;
    }

    People[] public peopleList;

    function addPeople(uint256 _id, string memory _name) public {
        peopleList.push(People(_id, _name));
    }

    function getPeople(uint256 index) public view returns (People memory) {
        return peopleList[index];
    }

    function getPersonName(uint256 index) public view returns (string memory) {
        return peopleList[index].name;
    }

    function deleteAtIndex(uint256 index) public virtual {
        if (peopleList.length > index) {
            delete peopleList[index];
        }
    }

    function getCount() public view returns (uint256) {
        return peopleList.length;
    }
}
