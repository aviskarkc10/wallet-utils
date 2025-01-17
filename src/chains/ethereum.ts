import { ethers } from 'ethers'

export default class utils {

    static createWallet(): object {
        const wallet = ethers.Wallet.createRandom()
        const mnemonic = wallet.mnemonic

        return {
            mnemonic: mnemonic.phrase,
            privateKey: wallet.privateKey,
            publicKey: wallet.privateKey,
            address: ethers.utils.computeAddress(wallet.privateKey)
        }
    }

    static getWallet(mnemonic: string): object {
        const wallet = ethers.Wallet.fromMnemonic(mnemonic)

        return {
            mnemonic: wallet.mnemonic.phrase,
            privateKey: wallet.privateKey,
            publicKey: wallet.privateKey,
            address: ethers.utils.computeAddress(wallet.privateKey)
        }
    }

    static getPublicKey(privateKey: string): string {
        const wallet = new ethers.Wallet(privateKey)
        return wallet.publicKey
    }

    static getAddress(privateKey: string): string {
        return ethers.utils.computeAddress(privateKey)
    }

    static async signMessage(privateKey: string, message: string): Promise<string> {
        const wallet = new ethers.Wallet(privateKey)
        return await wallet.signMessage(message)
    }

    /**
     * Recover an address from a message and signature
     * 
     * @param message 
     * @param signature 
     */
    static recoverAddress(message: string, signature: string) {
        const address = ethers.utils.verifyMessage(message, signature)
        if (address) {
            return address
        }
    }

}