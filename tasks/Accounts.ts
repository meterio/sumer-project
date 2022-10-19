import { task } from 'hardhat/config';
task('accounts', 'Prints the list of accounts', async (taskArgs, bre) => {
    const accounts = await bre.ethers.getSigners();
    for (const account of accounts) {
        let address = await account.getAddress();
        console.log(address, (await bre.ethers.provider.getBalance(address)).toString());
    }
});
