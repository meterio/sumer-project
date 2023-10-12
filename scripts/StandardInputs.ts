import { contracts_config } from './helper';
import { readFileSync, writeFileSync } from 'fs';

const main = async () => {
  const save_path = './verify/';
  for (let i = 0; i < contracts_config.length; i++) {
    let name = contracts_config[i].contract;
    let path = contracts_config[i].path;
    let full_path = `./artifacts/contracts/${path}${name}.sol/`;
    let dbg_file = `${name}.dbg.json`;
    let dbg_json = JSON.parse(readFileSync(full_path + dbg_file).toString());
    let input_file = dbg_json.buildInfo.split('build-info/');
    let input_json = JSON.parse(readFileSync('./artifacts/build-info/' + input_file[1]).toString());
    console.log('saving ' + save_path + name + '.json');
    writeFileSync(save_path + name + '.json', JSON.stringify(input_json.input, null, 2));
  }
};

main();
