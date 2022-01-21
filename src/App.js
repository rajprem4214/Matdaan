import { useState } from 'react';
import {BrowserRouter as Router,Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Voting from './components/Voting';
import Web3 from "web3";
import './App.css';
 import {Link} from "react-router-dom";
import Electionabi from './contracts/Election.json'

function App() {
  
  const[isConnected, setIsConnected] = useState(false); 
  const [currentAccount, setCurrentAccount] = useState(null);
  const [Electionsm,setElectionsm] = useState();
  
  const onLogin = async (provider) =>
  {
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts()
    if (accounts.length === 0){
      console.log("Please connect to MetaMask!")
    } else if (accounts[0] !== currentAccount) {
      setCurrentAccount(accounts[0]);
      setIsConnected(true);
      
      const networkId = await web3.eth.net.getId();
      
      
      
      const networkData = Electionabi.networks[networkId];
      
      
       if(networkData){
        
       
            
    const Election = new web3.eth.Contract([Electionabi],networkData.address);
    
    const candidate1 = await Election.methods.candidates(1).call();
 
    setElectionsm(Election);
   }
   else {
     window.alert('the smart contract is not deployed in current state')
   }
 }
};

 const onLogut = () => {
   setIsConnected(false);
 }
  

  return (

    <div className="App">
         <Navbar currentAccount={currentAccount} />
      <Login onLogin={onLogin} onLogut={onLogut} />
      {isConnected?<button><Link to="main" > VOTE PORTAL </Link></button>: null}

       
    
    </div>
  
  );
}

export default App;
