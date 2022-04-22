pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

import "../Comptroller.sol";
import '../CTokenInterfaces.sol';

contract ComptrollerScenario is Comptroller {
    uint256 public blockNumber;
    address public compAddress;

    constructor() public  {}

    function fastForward(uint256 blocks) public returns (uint256) {
        blockNumber += blocks;
        return blockNumber;
    }

    function setCompAddress(address compAddress_) public {
        compAddress = compAddress_;
    }

    function getCompAddress() public view returns (address) {
        return compAddress;
    }

    function setBlockNumber(uint256 number) public {
        blockNumber = number;
    }

    function getBlockNumber() public view returns (uint256) {
        return blockNumber;
    }

    function membershipLength(address account, string memory groupName)
        public
        view
        returns (uint256)
    {
        return accountAssets[account].length;
    }

    function unlist(address cToken) public {
        markets[address(cToken)].isListed = false;
    }

    function setCompBorrowerIndex(
        address cToken,
        address borrower,
        uint256 index
    ) public {
        compBorrowerIndex[cToken][borrower] = index;
    }

    function setCompSupplierIndex(
        address cToken,
        address supplier,
        uint256 index
    ) public {
        compSupplierIndex[cToken][supplier] = index;
    }

    /**
     * @notice Recalculate and update COMP speeds for all COMP markets
     */
    function refreshCompSpeeds() public {
        address[] memory allMarkets_ = allMarkets;

        for (uint256 i = 0; i < allMarkets_.length; i++) {
            address cToken = allMarkets_[i];
            Exp memory borrowIndex = Exp({mantissa: CTokenInterface(cToken).borrowIndex()});
            updateCompSupplyIndex(cToken);
            updateCompBorrowIndex(cToken, borrowIndex);
        }

        Exp memory totalUtility = Exp({mantissa: 0});
        Exp[] memory utilities = new Exp[](allMarkets_.length);
        for (uint256 i = 0; i < allMarkets_.length; i++) {
            address cToken = allMarkets_[i];
            if (
                compSupplySpeeds[cToken] > 0 ||
                compBorrowSpeeds[cToken] > 0
            ) {
                Exp memory assetPrice = Exp({
                    mantissa: PriceOracle(oracle).getUnderlyingPrice(cToken)
                });
                Exp memory utility = mul_(assetPrice, CTokenInterface(cToken).totalBorrows());
                utilities[i] = utility;
                totalUtility = add_(totalUtility, utility);
            }
        }

        for (uint256 i = 0; i < allMarkets_.length; i++) {
            address cToken = allMarkets[i];
            uint256 newSpeed = totalUtility.mantissa > 0
                ? mul_(compRate, div_(utilities[i], totalUtility))
                : 0;
            setCompSpeedInternal(cToken, newSpeed, newSpeed);
        }
    }
}
