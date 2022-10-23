function checkTransactionconfirmation(txhash) {

	let checkTransactionLoop = () => {
	  return  window.ethereum.request({method:'eth_getTransactionReceipt',params:[txhash]}).then(r => {
		if(r !=null) return 'confirmed';
		else return checkTransactionLoop();
	  });
	};

	return checkTransactionLoop();
  }