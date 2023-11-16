const fs = require('fs');
const path = require('path')
const { ethers } = require('ethers');

const netwokrName = 'meter'

const readPath = path.join(__dirname, '../deployments/Meter main', 'config.json')
const writePath = path.join(__dirname, 'output_address.json')
const writePath2 = path.join(__dirname, 'output_token_pairs.json')
const writePath3 = path.join(__dirname, 'output_rate_modal.json')

// Read the input JSON file
fs.readFile(readPath, 'utf8', (err, jsonString) => {
  if (err) {
    console.log('Error reading input file:', err);
    return;
  }

  // Parse the JSON content
  const inputJson = JSON.parse(jsonString);

  // Modify the JSON content as needed
  const outputAddrJson = getAddrJson(inputJson);

  // Write the output JSON file
  fs.writeFile(writePath, JSON.stringify(outputAddrJson, null, 2), (err) => {
    if (err) {
      console.log('Error writing output address file:', err);
    } else {
      console.log('Output address JSON file has been saved.');
    }
  });

  const outputTokenPairs = getTokenPairsJSON(inputJson)
  fs.writeFile(writePath2, JSON.stringify(outputTokenPairs, null, 2), (err) => {
    if (err) {
      console.log('Error writing output token pairs file:', err);
    } else {
      console.log('Output token pairs JSON file has been saved.');
    }
  });

  const outputRateModal = getRateModalJSON(inputJson)
  fs.writeFile(writePath3, JSON.stringify(outputRateModal, null, 2), (err) => {
    if (err) {
      console.log('Error writing output rate modal file:', err);
    } else {
      console.log('Output rate modal JSON file has been saved.');
    }
  });
});

const CompoundLens = 'CompoundLens'
const Comptroller = 'Comptroller'
const Unitroller = 'Unitroller'
const FeedPriceOracle = 'FeedPriceOracle'
const AccountLiquidity = 'AccountLiquidity'
const AccountLiquidityImpl = 'AccountLiquidityImpl'
const InterestRateModel = 'InterestRateModel'
const WhitePaperInterestRateModel = 'WhitePaperInterestRateModel'
const JumpRateModelV2 = 'JumpRateModelV2'
const ZeroInterestRateModel = 'ZeroInterestRateModel'
const Sumer = 'Sumer'
const CEther = 'CEther'
const CErc20 = 'CErc20'
const suErc20 = 'suErc20'
const Multicall2 = 'Multicall2'
const Timelock = 'Timelock'

// Function to modify the JSON content
function getAddrJson(inputJson) {
  const newJSON = {}
  for (key in inputJson) {
    console.log('key', key)
    if (key === CompoundLens) {
      newJSON[CompoundLens] = inputJson[CompoundLens].address
    } else if (key === Comptroller) {
      newJSON[Comptroller] = inputJson[Comptroller].implementation
      newJSON[Unitroller] = inputJson[Comptroller].address
    } else if (key === FeedPriceOracle) {
      newJSON[FeedPriceOracle] = inputJson[FeedPriceOracle].address
    } else if (key === AccountLiquidity) {
      newJSON[AccountLiquidityImpl] = inputJson[AccountLiquidity].implementation
      newJSON[AccountLiquidity] = inputJson[AccountLiquidity].address
    } else if (key === InterestRateModel) {
      const whitePaper = inputJson[InterestRateModel].find(item => item.contract === WhitePaperInterestRateModel)
      if (whitePaper) {
        newJSON[WhitePaperInterestRateModel] = whitePaper.address
      }

      const zero = inputJson[InterestRateModel].find(item => item.contract === ZeroInterestRateModel)
      if (zero) {
        newJSON[ZeroInterestRateModel] = zero.address
      }
    } else if (key === Sumer) {
      newJSON[Sumer.toUpperCase()] = inputJson[Sumer].address
    } else if (key === CErc20 || key === suErc20) {
      inputJson[key].proxys.map(token => {
        const underlySymbol = token.args[5].substring(3)
        const underlyingAddr = token.args[0]
        const sdrSymbol = token.args[5]
        const sdrAddr = token.address
        newJSON[underlySymbol] = underlyingAddr
        newJSON[sdrSymbol] = sdrAddr

      })
    } else if (key === CEther) {
      const token = inputJson[CEther]

      const underlySymbol = token.args[4].substring(3)
      const underlyingAddr = ethers.constants.AddressZero
      const sdrSymbol = token.args[4]
      const sdrAddr = token.address
      newJSON[underlySymbol] = underlyingAddr
      newJSON[sdrSymbol] = sdrAddr
    } else if (key === Multicall2) {
      newJSON[Multicall2] = inputJson[key].address
    } else if (key === Timelock) {
      newJSON[Timelock] = inputJson[key].address
    }
  }

  return { [netwokrName]: newJSON };
}

const getTokenPairsJSON = (inputJson) => {
  const tokens = [...inputJson[CErc20].proxys, ...inputJson[suErc20].proxys].map(token => {
    const underlySym = token.args[5].substring(3)
    return {
      ctokenSym: token.args[5],
      underlySym,
      ctokenDecimal: Number(token.args[6]),
      underlyDecimal: Number(token.args[6]),
      ctokenIsEther: false
    }
  })

  const nativeToken = inputJson[CEther]
  if (nativeToken) {
    const underlySym = nativeToken.args[4].substring(3)
    tokens.push({
      ctokenSym: nativeToken.args[4],
      underlySym,
      ctokenDecimal: Number(nativeToken.args[5]),
      underlyDecimal: Number(nativeToken.args[5]),
      ctokenIsEther: true
    })
  }

  return {
    [netwokrName]: tokens
  }
}

const getRateModalJSON = (inputJson) => {
  const rateModel = []

  const tokens = [...inputJson[CErc20].proxys, ...inputJson[suErc20].proxys].map(token => ({
    underlySymbol: token.args[5].substring(3),
    rateModelAddr: token.args[2]
  }))

  const nativeToken = inputJson[CEther]
  if (nativeToken) {
    tokens.push({
      underlySymbol: nativeToken.args[4].substring(3),
      rateModelAddr: nativeToken.args[1]
    })
  }

  const _InterestRateModel = inputJson[InterestRateModel]

  tokens.map(token => {
    const underlySymbol = token.underlySymbol

    const rateModelAddr = token.rateModelAddr
    const idx = rateModel.findIndex(item => item.address === rateModelAddr)
    if (idx !== -1) {
      rateModel[idx].tokens.push(underlySymbol)
    } else {
      const aimRateModal = _InterestRateModel.find(item => item.address === rateModelAddr)
      if (aimRateModal.contract === WhitePaperInterestRateModel) {
        
        rateModel.push({
          name: aimRateModal.contract,
          address: aimRateModal.address,
          tokens: [underlySymbol],
          baseRatePerYear: aimRateModal.args[1] / 10 ** 18,
          multiplierPerYear: aimRateModal.args[2] / 10 ** 18
        })
      } else if (aimRateModal.contract === JumpRateModelV2) {
        console.log('block interval: ', (24 * 60 * 60 * 365) / aimRateModal.args[0])
        rateModel.push({
          name: aimRateModal.contract,
          address: aimRateModal.address,
          tokens: [underlySymbol],
          baseRatePerYear: aimRateModal.args[1] / 10 ** 18,
          multiplierPerYear: aimRateModal.args[2] / 10 ** 18,
          jumpMultiplierPerYear: aimRateModal.args[3] / 10 ** 18,
          kink: aimRateModal.args[4] / 10 ** 18
        })
      } else if (aimRateModal.contract === ZeroInterestRateModel) {
        rateModel.push({
          name: aimRateModal.contract,
          address: aimRateModal.address,
          tokens: [underlySymbol]
        })
      }
    }

  })

  return { [netwokrName]: rateModel };
}
