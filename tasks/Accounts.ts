import { task } from 'hardhat/config';
import { formatUnits } from 'ethers';

task('accounts', 'Prints the list of accounts', async (taskArgs, bre) => {
  const accounts = await bre.ethers.getSigners();
  for (let i = 0; i < accounts.length; i++) {
    let account = accounts[i];
    let address = await account.getAddress();
    console.log(`(${i})`, address, formatUnits(await bre.ethers.provider.getBalance(address)).toString());
  }
});
