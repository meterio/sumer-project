import { task } from 'hardhat/config';


task('account', 'Prints the list of accounts')
    .addParam("pk", "proxy admin private key")
    .setAction(async ({ pk }, { ethers }) => {

        const wallet = new ethers.Wallet(pk, ethers.getDefaultProvider());
        let address = await wallet.getAddress();
        console.log(address, (await ethers.provider.getBalance(address)).toString());
    });
