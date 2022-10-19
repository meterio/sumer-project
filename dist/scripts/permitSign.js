"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSign = void 0;
async function getSign(wallet, verifyingContract, owner, spender, value, nonce, deadline, chainId) {
    const name = "PermitToken";
    const version = "1.0";
    let signer = wallet;
    let signature = await signer._signTypedData({ name, version, chainId, verifyingContract }, {
        Permit: [
            { name: "owner", type: "address" },
            { name: "spender", type: "address" },
            { name: "value", type: "uint256" },
            { name: "nonce", type: "uint256" },
            { name: "deadline", type: "uint256" },
        ],
    }, { owner: owner, spender: spender, value: value, nonce: nonce, deadline: deadline });
    return signature;
}
exports.getSign = getSign;
//# sourceMappingURL=permitSign.js.map