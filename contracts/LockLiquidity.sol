pragma solidity 0.5.16;
import {EIP20NonStandardInterface as IERC20} from './EIP20NonStandardInterface.sol';
import {CErc20Interface} from './CTokenInterfaces.sol';

contract LockLiquidity {
  function deposit(address cToken, uint256 amount) public {
    address underlying = CErc20Interface(cToken).underlying();
    require(IERC20(cToken).balanceOf(address(this)) == 0, 'liquidity exist!');
    IERC20(underlying).transferFrom(msg.sender, address(this), amount);
    CErc20Interface(cToken).mint(amount);
  }
}
