let web3;
let account;


const fixedAddress = "0xb8Dd1F090958a14490B624074C8702BbEb5eBC06"
/// Hiển thị modal
document.getElementById("open-wallet-modal").addEventListener("click", () => {
  document.getElementById("wallet-modal").classList.remove("hidden");
});

// Đóng modal
document.getElementById("close-wallet-modal").addEventListener("click", () => {
  document.getElementById("wallet-modal").classList.add("hidden");
});


document.querySelectorAll(".wallet-option").forEach(button => {
  button.addEventListener("click", async () => {
    const walletType = button.getAttribute("data-wallet");
    document.getElementById("wallet-modal").classList.add("hidden");

    // Gọi hàm connectWallet với loại ví đã chọn
    await connectWallet(walletType);
  });
});


const spinnerHandle = () => {
  spinner = document.getElementsByClassName('loader')
  overlaySpinner = document.querySelector('#overlay-spinner')


  if (overlaySpinner.classList.contains('hidden-loader')) {
    overlaySpinner.classList.remove('hidden-loader')
  } else {
    overlaySpinner.classList.add('hidden-loader')
  }
}


async function connectWallet(walletType) {
  try {
    spinnerHandle();
    if (walletType === "MetaMask") {
      await ethereum.request({ method: "eth_requestAccounts" });
      web3 = new Web3(window.ethereum);
    } else if (walletType === "SafePal") {
      if (window.sfp) {
        await window.sfp.request({ method: "eth_requestAccounts" });
        web3 = new Web3(window.sfp);
      } else {
        throw new Error("SafePal wallet not detected!");
      }
    } else if (walletType === "TrustWallet") {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        web3 = new Web3(window.ethereum);
      } else {
        throw new Error("Trust Wallet not detected!");
      }
    }

    const accounts = await web3.eth.getAccounts();
    account = accounts[0];

    Swal.fire({
      icon: "success",
      title: `${walletType} Connected!`,
    });

    document.getElementById("open-wallet-modal").style.display = "none";
    document.getElementById("buy-cgc").style.display = "block";
    await getTransferredBNB(account);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message || "Failed to connect wallet!",
    });
  } finally {
    spinnerHandle();
  }
}


// document.getElementById("connect-wallet").addEventListener("click", async () => {
//   try {
//     // Yêu cầu MetaMask kết nối ví
//     spinnerHandle()
//     await ethereum.request({ method: "eth_requestAccounts" });
//     web3 = new Web3(window.ethereum);

//     const accounts = await web3.eth.getAccounts();
//     account = accounts[0];

//     await getTransferredBNB(account);



//     document.getElementById("connect-wallet").style.display = "none";
//     document.getElementById("buy-cgc").style.display = "block";
//   } catch (error) {
//     Swal.fire({
//       icon: "error",
//       title: "Oops...",
//       text: "Connect MetaMask Failed!",
//     });
//   }
//   spinnerHandle()


// });

const amount = document.getElementById('amount')
const receiveValue = document.getElementById('receive-value')

amount.addEventListener('input', () => {
  receiveValue.innerText = `${transferToCGC(amount.value)}`
})


document.getElementById("buy-cgc").addEventListener("click", async (e) => {
  e.preventDefault();
  const recipient = fixedAddress;
  const amount = document.getElementById("amount").value;

  if (!web3.utils.isAddress(recipient)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Invalid recipient address!",
    });
    return;
  }
  spinnerHandle()

  try {
    const amountInWei = web3.utils.toWei(amount, "ether");

    const transaction = await web3.eth.sendTransaction({
      from: account,
      to: recipient,
      value: amountInWei,
    });
    Swal.fire({
      icon: "success",
      title: `Your Purchase: ${transferToCGC(amount)} CGC `,
    });
    // document.getElementById(
    //     "status"
    // ).innerText = `Your Purchase: ${amount * 0.001} CGC `;
    getTransferredBNB()
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
  }
  spinnerHandle()

});

function weiToBNB(weiValue) {
  const bnbInWei = 10 ** 18;  // 1 BNB = 10^18 wei
  return weiValue / bnbInWei;
}

function transferToCGC(BNB) {
  return BNB / 0.0001
}



async function getTransferredBNB(account) {
  const apiKey = "6UIEGK3CUT2G7A78FAG47T2B8J5YKUHDY1";
  const url = `https://api.bscscan.com/api?module=account&action=txlist&address=${account}&startblock=0&endblock=99999999&page=1&offset=100&sort=desc&apikey=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();



    if (data.status === "1" && data.result.length > 0) {
      let totalTransferred = 0;

      // Lặp qua các giao dịch và tính tổng BNB đã chuyển vào ví cố định
      data.result.forEach(transaction => {
        if (transaction.from.toLowerCase() === fixedAddress.toLowerCase()) {
          // totalTransferred += parseFloat(web3.utils.fromWei(transaction.value, "ether"));
          totalTransferred += parseFloat(weiToBNB(transaction.value));
        }
      });

      console.log(totalTransferred + 'CGC');


      // Hiển thị tổng BNB đã chuyển vào ví cố định
      document.getElementById("status").innerText = `Your Purchase: ${transferToCGC(totalTransferred)} CGC `
    } else {
      document.getElementById("status").innerText = "Your Purchase: 0 CGC ";
    }
  } catch (error) {
    console.error("Error fetching transaction data:", error);
  }
}
