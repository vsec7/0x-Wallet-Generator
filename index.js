const ethutils = require('ethereum-mnemonic-privatekey-utils');
const bip39 = require('bip39');
const { Account } = require('eth-lib/lib');
const rl = require('readline-sync')
const fs = require('fs')

/*
    0x Wallet Generator
    Created by Viloid ( github.com/vsec7 )
*/

async function createWallet(){
	const mnemonic = bip39.generateMnemonic();
	const pk = '0x' + ethutils.getPrivateKeyFromMnemonic(mnemonic);
	const acc = Account.fromPrivate(pk);
	return {
		'address': (acc.address).toLowerCase(), 
		'pk': pk,
		'mnemonic': mnemonic
	}
}

async function generateWallet( n, o){
	for (var i = 1; i <= n; i++) {
		const wallet = await createWallet()
		const data = `Address : ${wallet.address}\nPrivateKey: ${wallet.pk}\nMnemonic: ${wallet.mnemonic}\n`;
		if(o){
			fs.appendFile( o, data+'\n', (err) => { if(err) throw err; })
		}
		console.log(data)
	}
}

(async () => {
	console.log(`
+-----------------------------------------+
|
| 	0x Wallet Generator
| Crafted by Viloid ( github.com/vsec7 )
|
+-----------------------------------------+
		`)
	const n = rl.question('[?] How Many Wallet: ')
	const o = rl.question('[?] Output (just enter if you dont need backup to file): ')
	console.log('\n')
	await generateWallet( n, o)
})();
