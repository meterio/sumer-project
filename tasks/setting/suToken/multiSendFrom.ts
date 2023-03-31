import { task, types } from 'hardhat/config';
import { log } from '../../../log_settings';
import { readFileSync } from 'fs';
import { SumerOFTUpgradeable } from '../../../typechain';
import { constants } from 'ethers';
import { formatUnits, parseUnits } from 'ethers/lib/utils';

/**
npx hardhat send \
--from "from chian config json file" \
--dst "dst chain id"
 */

task('msend', 'send oft')
  .addParam('json', 'from chian config json file')
  .addParam('dst', 'dst chain id')
  .setAction(async ({ json, dst }, { ethers, run, network }) => {
    let config = JSON.parse(readFileSync(json).toString());

    const accounts = await ethers.getSigners();
    const wallet = accounts[0];
    let receipt;
    const amount = parseUnits('10');

    let suUsd = (await ethers.getContractAt(
      'SumerOFTUpgradeable',
      config.suTokens.tokens[0].underly
    )) as SumerOFTUpgradeable;
    let suEth = (await ethers.getContractAt(
      'SumerOFTUpgradeable',
      config.suTokens.tokens[1].underly
    )) as SumerOFTUpgradeable;
    let suBtc = (await ethers.getContractAt(
      'SumerOFTUpgradeable',
      config.suTokens.tokens[2].underly
    )) as SumerOFTUpgradeable;

    for (let j = 0; j < 98; j++) {
      for (let i = 0; i < accounts.length; i++) {
        let account = accounts[i];
        let address = await account.getAddress();
        // let suUsdBalance = formatUnits((await suUsd.balanceOf(address)).toString());
        // let suEthBalance = formatUnits((await suEth.balanceOf(address)).toString());
        // let suBtcBalance = formatUnits((await suBtc.balanceOf(address)).toString());

        // console.log(`(${i}):${address}`, {
        //   suUsd: suUsdBalance,
        //   suEth: suEthBalance,
        //   suBtc: suBtcBalance
        // });
        // let receipt = await suToken.connect(wallet).transfer(address,parseUnits('10'));
        // console.log('transfer tx:', receipt.hash);
        // if (parseInt(suUsdBalance) < 100) {
        //   receipt = await suUsd.connect(wallet).transfer(address, parseUnits('100'));
        //   console.log('transfer tx:', receipt.hash);
        // }
        // if (parseInt(suEthBalance) < 100) {
        //   receipt = await suEth.connect(wallet).transfer(address, parseUnits('100'));
        //   console.log('transfer tx:', receipt.hash);
        // }
        // if (parseInt(suBtcBalance) < 100) {
        //   receipt = await suBtc.connect(wallet).transfer(address, parseUnits('100'));
        //   console.log('transfer tx:', receipt.hash);
        // }
        receipt = await suUsd
          .connect(account)
          .sendFrom(address, dst, address, parseUnits('1'), address, constants.AddressZero, '0x');
        console.log('sendFrom tx:', receipt.hash);

        receipt = await suEth
          .connect(account)
          .sendFrom(address, dst, address, parseUnits('1'), address, constants.AddressZero, '0x');
        console.log('sendFrom tx:', receipt.hash);

        receipt = await suBtc
          .connect(account)
          .sendFrom(address, dst, address, parseUnits('1'), address, constants.AddressZero, '0x');
        console.log('sendFrom tx:', receipt.hash);

        delay(1);
      }
    }
  });

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms * 1000));
}
