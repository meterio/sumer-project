import { task } from 'hardhat/config';
import '@nomicfoundation/hardhat-ethers';
import { parseUnits } from 'ethers';

task('se', 'Prints the list of accounts', async (taskArgs, bre) => {
  const accounts = await bre.ethers.getSigners();
  const wallet = accounts[0];
  for (let i = 1; i < accounts.length; i++) {
    let account = accounts[i];
    let address = await account.getAddress();
    let receipt = await wallet.sendTransaction({
      to: address,
      value: parseUnits('10'),
    });
    console.log('tx:', receipt.hash);
    await receipt.wait();
    console.log(`(${i})`, address, (await bre.ethers.provider.getBalance(address)).toString());
  }
});
