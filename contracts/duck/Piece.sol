pragma solidity 0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol"
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol"
import "../node_modules/@openzeppelin/contracts/math/safeMath.sol"



contract PieceNFT is ERC721, Ownable {
    using SafeMath for uint256;
    using SafeMath32 for uint32;
    using SafeMath16 for uint16;

    event NewPart(uint256 partId, string name_part, uint256 dna);

    uint256 dnaDigits = 16;
    uint256 dnaModulus = 10 ** dnaDigits;


    struct Piece {
        string name_piece;
        uint256 dna;
        string model;
    }
    
    Piece[] public pieces;
    mapping(uint256 => address) public pieceToModel;
    mapping(address => uint256) modelPieceCount;

    function _createPiece(string _name_Piece, uint256 _dna) internal {
        Piece storage piece = Piece(_name_piece,_dna)

        uint256 id = pieces.push(piece);
        pieces[id].model = 
        pieceToModel[id] = msg.sender
        modelPieceCount[msg.sender].add(1);
    }
    
    function _generateRandomDna(string memory _str)
        private
        view
        returns (uint256)
    {
        uint256 rand = uint256(keccak256(abi.encodePacked(_str)));
        return rand % dnaModulus;
    }

    function createRandomPiece(string memory _name_part) public {
        require(modelPieceCount[msg.sender] < 4);

    }

    
    
}