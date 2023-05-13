import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';

/* ABIファイルをインポートする */
import daiAbi from './abis/DaiToken.json';
import dappAbi from './abis/DappToken.json';
import tokenfarmAbi from './abis/TokenFarm.json';
import './App.css';

function App() {
  /* ユーザーのパブリックウォレットを保存するために使用する状態変数を定義 */
  const [currentAccount, setCurrentAccount] = useState('');
  const [currentDaiBalance, setDaiBalance] = useState('0');
  const [currentDappBalance, setDappBalance] = useState('0');

  // コントラクトアドレスを記載
  const daiTokenAddress = '0x52345Ed1d933FA0f4aA592bA33c64D061317Bc95';
  const dappTokenAddress = '0x6FCdEC94F86A32a6f0De4E64381631879e3f2037';
  const tokenfarmAddress = '0x1279FFF27C02529E8bA40C87093AEB2bfe4B0f1d';

  //ウォレットアドレス(コントラクトの保持者)を記載
  const walletAddress = '0x04CD057E4bAD766361348F26E847B546cBBc7946';

  /* ABIの内容を参照する変数を作成 */
  const daiTokenABI = daiAbi.abi;
  const dappTokenABI = dappAbi.abi;
  const tokenfarmABI = tokenfarmAbi.abi;

  function convertEth(n) {
    return n / 10 ** 18;
  }

  const getBalance = async () => {
    const { ethereum } = window;
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        console.log(signer);

        const daiContract = new ethers.Contract(
          daiTokenAddress,
          daiTokenABI,
          signer,
        );
        const dappContract = new ethers.Contract(
          dappTokenAddress,
          dappTokenABI,
          signer,
        );
        const tokenfarmContract = new ethers.Contract(
          tokenfarmAddress,
          tokenfarmABI,
          signer,
        );
        setDaiBalance(convertEth(await daiContract.balanceOf(currentAccount)));
        setDappBalance(
          convertEth(await dappContract.balanceOf(currentAccount)),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const stake = async (event) => {
    try {
      if (currentAccount !== '') {
        // setStakedToken(event.target.value)
        console.log('value is:', event.target.value);
      }
      console.log('Connect Wallet');
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log('Make sure you have MetaMask!');
        return;
      } else {
        console.log('We have the ethereum object', ethereum);
      }
      /* ユーザーのウォレットへのアクセスが許可されているかどうかを確認 */
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log('Found an authorized account:', account);
        setCurrentAccount(account);
        getBalance();
      } else {
        console.log('No authorized account found');
      }
    } catch (error) {
      console.log(error);
    }
  };
  /* connectWalletメソッドを実装 */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.error('Get MetaMask!');
        return;
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      console.log('Connected: ', accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  });

  return (
    <div className="h-screen w-screen flex-col flex">
      <div className="text-ellipsis h-20 w-full flex items-center justify-between bg-black">
        <div className="flex items-center">
          <img src={'farmer.png'} alt="Logo" className="px-5" />;
          <div className="text-white text-3xl">ETH Yield Farm</div>
        </div>
        {currentAccount === '' ? (
          <button
            className="text-white mr-10 px-3 py-1 text-2xl border-solid border-2 border-white flex items-center justify-center"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        ) : (
          <div className="text-gray-400 text-lg pr-5">{currentAccount}</div>
        )}
      </div>
      <div className=" w-screen h-full flex-1 items-center justify-center flex flex-col">
        <div className="w-1/2 h-1/3 flex justify-center items-center pt-36">
          <div className="w-1/2 h-1/2 flex justify-center items-center flex-col">
            <div>Staking Balance</div>
            <div>{currentDaiBalance} DAI</div>
          </div>
          <div className="w-1/2 h-1/2 flex justify-center items-center flex-col">
            <div>Reward Balance</div>
            <div>{currentDappBalance} DAPP</div>
          </div>
        </div>
        <div className="h-1/2 w-1/2 flex justify-start items-center flex-col">
          <div className="flex-row flex justify-between items-end w-full px-20">
            <div className="text-xl">Stake Tokens</div>
            <div className="text-gray-300">
              Balance: {currentDaiBalance} Dai
            </div>
          </div>
          <div className="felx-row w-full flex justify-between items-end px-20 py-3">
            <input
              placeholder="0"
              className="flex items-center justify-start border-solid border-2 border-black w-full h-10 pl-3"
              type="text"
              id="message"
              name="message"
              onChange={stake}
            />
            <div className="flex-row flex justify-between items-end">
              <img src={'dai.png'} alt="Logo" className="px-5 h-9 w-18" />
              <div>DAI</div>
            </div>
          </div>
          <div className="w-full h-14 bg-blue-500 text-white m-3 flex justify-center items-center">
            Stake!
          </div>
          <div className="text-blue-400">UN-STAKE..</div>
          {currentAccount.toUpperCase() === walletAddress.toUpperCase() ? (
            <>
              <div className="text-xl pt-20">Transfer Token</div>
              <div className="felx-row w-full flex justify-between items-end px-20 py-3">
                <input
                  placeholder="0x..."
                  className="flex items-center justify-start border-solid border-2 border-black w-full h-10 pl-3"
                  type="text"
                  id="message"
                  name="message"
                  onChange={stake}
                />
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="flex-1"></div>
      </div>
    </div>
  );
}

export default App;
