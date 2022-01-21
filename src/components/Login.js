import React from 'react'
import { useState } from 'react';

const Login = (props) => {
  
     

    const[isConnecting, setIsConnecting] = useState(false);
  
   const detectProvider = () => {
        let provider;    //variable
        //checks whether browser has active wallet or not
        if( window.ethereum ) {
            provider = window.ethereum;  
        }
        else if(window.web3) {
            //assigns other wallet
            provider= window.web3.currentProvider;


        }
        else {
            //Error message
            window.alert("No Ethereum Browser Detected ! Check Out Metamask");

        }
        return provider;
        
   };

      const onLoginHandler = async () => {
         const provider = detectProvider();
         if(provider){
             if(provider !== window.ethereum){
                 console.error("Not window.ethereum provider. Do you have multiple wallet installed ?");
             }
             setIsConnecting(true);
                await provider.request({
                    method: "eth_requestAccounts"
                });
                setIsConnecting(false);
                props.onLogin(provider);
         }
        
     };
     //if(isConnect==="true" ) return <div> hello</div>

    return (
        <div>
              <button onClick={onLoginHandler}  type="button" class="btn btn-primary btnstyle"> 
             {!isConnecting && "Connect To MetaMask" } 
             {isConnecting && "Loading....."}    
             </button> 


            
        </div>
    );
};


export default Login;
