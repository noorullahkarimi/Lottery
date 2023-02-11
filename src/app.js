 //---------------------------timer-------------------------------------------
 function timerFun(){
  // Set the date we're counting down to
  var countDownDate = new Date("Jan 10, 2024 15:37:25").getTime();

  // Update the count down every 1 second
  var x = setInterval(function() {
  
    // Get today's date and time
    var now = new Date().getTime();
      
    // Find the distance between now and the count down date
    var distance = countDownDate - now;
      
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
    // Output the result in an element with id="demo"
    document.getElementById("days").value = days;
    document.getElementById("hours").value = hours;
    document.getElementById("min").value = minutes;
    document.getElementById("sec").value = seconds;
      
    // If the count down is over, write some text 
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("demo").innerHTML = "EXPIRED";
    }
  }, 1000);

 }
 timerFun();
//the solid variable
let contractAddress = "TNJgg7N4vmHbTrcJFz2srLq4vhgB2ZaJXq";
// const getAllAddressWinner = document.getElementById('getAllAddressWinner');

//events
// eventListener();
// function eventListener() {
  // getAllAddressWinner.addEventListener('click',function getAllAddressWinner(){alert()});
  // button_deposit.addEventListener('click', depositAction);
  // button_confirm.addEventListener('click', confirmAction);
  // button_judge.addEventListener('click', judgeAction);
  // button_withdrawWorker.addEventListener('click', withDrawWorkerAction);
  // button_withdrawEmployer.addEventListener('click', withDrawEmployerAction);
  // button_connect_to_wallet.addEventListener('click', getAddress);
// }

//functions 


let abi = [{"entrys":[{"name":"withdrawWinners","stateMutability":"Nonpayable","type":"Function"},{"name":"withdraw","stateMutability":"Nonpayable","type":"Function"},{"outputs":[{"type":"address[]"},{"type":"uint256[]"}],"constant":true,"name":"getAllAddressWinner","stateMutability":"View","type":"Function"},{"name":"pickWinner","stateMutability":"Nonpayable","type":"Function"},{"payable":true,"name":"enter","stateMutability":"Payable","type":"Function"},{"stateMutability":"Nonpayable","type":"Constructor"},{"inputs":[{"name":"addr","type":"address"},{"name":"tokens","type":"uint256"}],"name":"member","type":"Event"},{"inputs":[{"name":"addr","type":"address"},{"name":"tokens","type":"uint256"}],"name":"winners","type":"Event"},{"inputs":[{"name":"tokens","type":"uint256"}],"name":"quantity","type":"Event"}]}];

async function getContract(){
    let res = await TronWeb.contract(abi,"TNJgg7N4vmHbTrcJFz2srLq4vhgB2ZaJXq");
    console.log(res);
}
getContract();


//-----------connectiong to the wallet---------------------------------------
//it set the wallet address to the input header
async function connect(){
    let publicAddress = tronWeb.defaultAddress.base58;
    console.log(publicAddress);
    document.getElementById("address").value = publicAddress;
  }
//--------------show winners------------------------------------------------
 //calling function getAllAddressWinner view
 async function getAllAddressWinner(){
   try{
    console.log('thats work');

    //geting the instance of smart contract
    let instance = await tronWeb.contract().at(contractAddress);
    console.log(instance);
    let result = await instance.methods.getAllAddressWinner().call();
    console.log(result);
    if(result[0] == 0){
      showAlert("there is no winners");
    }else if(result[0] != 0){
      console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
      let elements = "";
      for (let i = 0; i < result[0].length; i++) {
        elements +=`
        <div class="card-item">
					<div class="card-pic">
						<span class="card-icon">`
						+ svgCup +
						`</span>
					</div>
					<div class="card-content">
						<label>address:</label>
						<p>${result[i]}</p>
						<label>total price:</label>
						<h3>26</h3> TRX
					</div>
				</div>
        `;
      }
      console.log("elements");
     document.getElementsByClassName("content-body").innerHTML = elements;
    }
  }catch(e){
    console.log(e);
  }
}


  //------------------------register client-------------------------------
  //send to enter function smart contract and register client
  async function enter(){
    try {
      //get instance
      let instance = await tronWeb.contract().at(contractAddress);
      //send transaction and this function get the wallet address automatically
      //callValue is the quantity of trx you should send with unit sun
      let res = await instance.enter().send({
        feeLimit:100_000_000,
        callValue:1000000,
        shouldPollResponse:true
    });
    console.log(res.length);
    if(res.length == 0){
      showAlert('your register successfull!');
    }else{
      showAlert('somethings went wrong!');
    }
    } catch (error) {
      console.log('error occured' + error);
    }
  }
//----------------pick winner--------------------------------------------------
//choose the winner with owner address start
async function pickWinner(){
    try {
      let instance = await tronWeb.contract().at(contractAddress);
      let res = await instance.pickWinner().send({
        feeLimit:100_000_000,
        callValue:0,
        shouldPollResponse:true,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
 //---------------------withdraw admin---------------------------------------------
//request for withdraw for admin
async function withdraw(){
    try {
      let instance = await tronWeb.contract().at(contractAddress);
      let res = await instance.withdraw().send({
        feeLimit:100_000_000,
        callValue:0,
        shouldPollResponse:true,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
//-------------------withdraw winners----------------------------------------
//request for withdraw money for winners 
async function withdrawWinners(){
    try {
      let instance = await tronWeb.contract().at(contractAddress);
      let res = await instance.withdrawWinners().send({
        feeLimit:100_000_000,
        callValue:0,
        shouldPollResponse:true,
      });
      if(res.length == 0){
        showAlert('withdraw was successfull !');
      }else{
        showAlert('somethings went wrong!');
      }
    } catch (error) {
      console.log(error);
    }
  }

//-------logs of blockhcain----------------------------------------------------
async function logBlockchain(){
  // let ss = tronWeb.address.toHex("TAzZzaCGFhYhvwQe5piKNpQKsyQgKhzdFy");
  let logs = tronWeb.getEventResult(
    contractAddress,{eventName:"member",size:2}).then(result => {console.log(result[0].result.addr)});
    console.log(logs);
  // x  = "0x0b3a108e35c97d66d1fdca02214fa11c5ff077aa";
  // const addressInBase58 = tronWeb.address.fromHex(x);
  // const element="";
  // for (let index = 0; index < array.length; index++) {
  //   element = `<li></li>`;
  // }
  // document.getElementById("listUser").innerHTML = element;
}

//  function loader() {
//     let display = document.querySelector(".loader");
//     console.log(display.style);
//     if (display.style == '') {
//       document.querySelector(".loader").style.display = "none";
//     } else {
//       document.querySelector(".loader").style.display = "block";
//     }
//  }
function showAlert(textAlert) {
  let alertBox = document.querySelector('.alert');
  console.log(alertBox);
  alertBox.style.display = "block";
  alertBox.textContent = textAlert;
  setTimeout(() => {
    alertBox.style.display = "none";
  }, 4000);
}

let svgCup = `
<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
		viewBox="0 0 512 512" xml:space="preserve">
	<g>
		<rect x="235.772" y="244.961" style="fill:#FFC26D;" width="40.456" height="123.838"/>
		<path style="fill:#FF9A1B;" d="M276.228,244.961v34.293c-6.235,2.593-13.067,4.033-20.228,4.033c-7.161,0-13.993-1.44-20.228-4.033
			v-34.293H276.228z"/>
		<g>
			<g>
				<path style="fill:#FA8916;" d="M376.139,404.643c-2.911,0-5.699-1.653-7.009-4.466c-1.801-3.868-0.126-8.465,3.742-10.266
					c33.433-15.57,58.051-37.549,73.172-65.325c12.132-22.286,18.304-48.464,18.345-77.807c0.07-50.778-18.462-93.854-18.649-94.283
					c-1.705-3.909,0.079-8.463,3.987-10.171c3.907-1.707,8.46,0.072,10.171,3.979c0.812,1.857,19.901,46.081,19.944,100.006
					c0.039,50.542-17.355,118.913-100.446,157.61C378.341,404.41,377.231,404.643,376.139,404.643z"/>
				<g>
					<g>
						<path style="fill:#FFDBAA;" d="M453.15,90.275c8.479,24.552,10.734,60.247-0.366,64.081s-31.353-25.647-39.832-50.199
							c-8.479-24.552-1.973-34.877,9.128-38.711C433.18,61.614,444.671,65.724,453.15,90.275z"/>
					</g>
				</g>
				<g>
					<path style="fill:#FFC26D;" d="M452.781,154.351c-2.583,0.895-5.669-0.021-8.993-2.264c3.539-12.882,0.679-37.349-5.638-55.643
						c-6.708-19.415-15.3-26.041-24.097-26.072c2.161-2.264,4.908-3.858,8.025-4.928c11.102-3.827,22.595,0.278,31.073,24.827
						C461.63,114.831,463.883,150.524,452.781,154.351z"/>
				</g>
				<g>
					<path style="fill:#FFB54E;" d="M472.526,249.627c-5.124,3.786-15.752-0.978-26.864-9.456
						c-9.373-7.161-19.096-16.956-26.165-26.515c-15.444-20.897-12.326-32.688-2.881-39.674c9.178-6.781,20.959-6.513,35.795,12.696
						c0.432,0.545,0.854,1.111,1.286,1.698C469.13,209.263,481.971,242.641,472.526,249.627z"/>
					<path style="fill:#FF9A1B;" d="M472.526,249.627c-5.124,3.786-15.752-0.978-26.864-9.456c-0.607-4.383-0.782-9.332-0.525-14.826
						c0.566-12.244,3.241-26.319,7.274-38.666c0.432,0.545,0.854,1.111,1.286,1.698C469.13,209.263,481.971,242.641,472.526,249.627z
						"/>
					<path style="fill:#FFDBAA;" d="M467.778,186.414c-9.153,24.308-12.392,59.928-1.402,64.067
						c10.99,4.138,32.049-24.772,41.201-49.081c9.153-24.308,2.934-34.809-8.056-38.948
						C488.531,158.314,476.931,162.106,467.778,186.414z"/>
					<path style="fill:#FFC26D;" d="M507.58,201.403c-9.157,24.302-30.208,53.214-41.207,49.078c-2.562-0.957-4.342-3.632-5.463-7.47
						c10.968-7.552,24.488-28.325,31.34-46.516c7.213-19.168,4.877-29.745-1.821-35.394c3.035-0.319,6.091,0.216,9.095,1.348
						C510.512,166.595,516.727,177.09,507.58,201.403z"/>
				</g>
				<g>
					<path style="fill:#FFB54E;" d="M446.021,354.317c-6.204,1.461-14.086-7.12-20.948-19.302
						c-5.793-10.268-10.855-23.119-13.581-34.684c-5.947-25.28,1.574-34.9,13.005-37.586c11.122-2.613,21.843,2.284,27.893,25.805
						c0.175,0.669,0.34,1.348,0.504,2.047C458.831,315.888,457.452,351.621,446.021,354.317z"/>
					<path style="fill:#FF9A1B;" d="M446.021,354.317c-6.204,1.461-14.086-7.12-20.948-19.302c1.163-4.27,2.953-8.879,5.361-13.828
						c5.361-11.03,13.376-22.893,21.957-32.637c0.175,0.669,0.34,1.348,0.504,2.047C458.831,315.888,457.452,351.621,446.021,354.317
						z"/>
					<path style="fill:#FFDBAA;" d="M466.605,294.358c-18.003,18.723-35.037,50.174-26.571,58.313s39.224-10.114,57.227-28.837
						c18.003-18.723,16.433-30.826,7.968-38.966C496.763,276.729,484.608,275.635,466.605,294.358z"/>
					<path style="fill:#FFC26D;" d="M497.26,323.831c-18.006,18.726-48.759,36.978-57.227,28.84
						c-1.307-1.255-2.006-3.076-2.181-5.319c13.067-3.838,31.752-16.627,44.273-29.643c17.532-18.232,16.503-30.188,8.622-38.326
						c5.782-0.576,10.536,1.687,14.477,5.484C513.692,293.005,515.266,305.115,497.26,323.831z"/>
				</g>
			</g>
			<g>
				<path style="fill:#FA8916;" d="M135.861,404.643c-1.092,0-2.202-0.233-3.257-0.724C49.513,365.221,32.119,296.851,32.158,246.308
					c0.042-53.924,19.131-98.149,19.944-100.006c1.711-3.909,6.266-5.691,10.177-3.979c3.907,1.711,5.689,6.264,3.981,10.172l0,0
					c-0.187,0.43-18.719,43.505-18.649,94.283c0.041,29.344,6.213,55.522,18.345,77.807c15.121,27.776,39.739,49.755,73.172,65.325
					c3.868,1.801,5.543,6.398,3.742,10.266C141.56,402.989,138.772,404.643,135.861,404.643z"/>
				<g>
					<path style="fill:#FFDBAA;" d="M58.85,90.275c-8.479,24.552-10.734,60.247,0.366,64.081s31.353-25.647,39.832-50.199
						s1.973-34.877-9.128-38.711S67.329,65.724,58.85,90.275z"/>
				</g>
				<g>
					<path style="fill:#FFC26D;" d="M99.047,104.162c-8.478,24.55-28.727,54.027-39.829,50.19c-2.727-0.936-4.651-3.797-5.865-7.953
						c10.803-7.727,23.881-29.035,30.27-47.535c6.4-18.541,4.26-28.974-1.955-34.602c2.737-0.226,5.505,0.237,8.252,1.183
						C101.023,69.282,107.525,79.602,99.047,104.162z"/>
				</g>
				<g>
					<path style="fill:#FFB54E;" d="M39.474,249.627c5.124,3.786,15.752-0.978,26.864-9.456c9.373-7.161,19.096-16.956,26.165-26.515
						c15.444-20.897,12.326-32.688,2.881-39.674c-9.178-6.781-20.959-6.513-35.795,12.696c-0.432,0.545-0.854,1.111-1.286,1.698
						C42.87,209.263,30.029,242.641,39.474,249.627z"/>
					<path style="fill:#FF9A1B;" d="M92.503,213.657c-7.069,9.558-16.792,19.353-26.165,26.515
						c-11.112,8.478-21.741,13.242-26.864,9.456c-1.389-1.029-2.305-2.644-2.788-4.692c4.301-1.873,9.147-4.908,14.086-8.674
						c9.373-7.161,19.096-16.956,26.165-26.515c15.197-20.557,12.419-32.307,3.334-39.324c5.669-1.337,10.7,0.298,15.114,3.56
						C104.83,180.969,107.947,192.76,92.503,213.657z"/>
					<path style="fill:#FF9A1B;" d="M39.474,249.627c5.124,3.786,15.752-0.978,26.864-9.456c0.607-4.383,0.782-9.332,0.525-14.826
						c-0.566-12.244-3.241-26.319-7.274-38.666c-0.432,0.545-0.854,1.111-1.286,1.698C42.87,209.263,30.029,242.641,39.474,249.627z"
						/>
					<path style="fill:#FFDBAA;" d="M44.222,186.414c9.153,24.308,12.392,59.928,1.402,64.067S13.575,225.709,4.422,201.4
						s-2.934-34.809,8.056-38.948C23.469,158.314,35.069,162.106,44.222,186.414z"/>
					<path style="fill:#FFC26D;" d="M45.627,250.481c-2.768,1.039-6.173-0.01-9.867-2.562c4.013-12.408,0.473-38.265-6.667-57.227
						c-6.513-17.285-14.25-24.189-22.132-25.249c1.626-1.255,3.488-2.233,5.515-2.994c10.989-4.136,22.595-0.339,31.741,23.963
						C53.374,210.725,56.616,246.345,45.627,250.481z"/>
				</g>
				<g>
					<path style="fill:#FFB54E;" d="M65.979,354.317c6.204,1.461,14.086-7.12,20.948-19.302
						c5.793-10.268,10.855-23.119,13.581-34.684c5.947-25.28-1.574-34.9-13.005-37.586c-11.122-2.613-21.843,2.284-27.893,25.805
						c-0.175,0.669-0.34,1.348-0.504,2.047C53.169,315.888,54.548,351.621,65.979,354.317z"/>
					<path style="fill:#FF9A1B;" d="M100.508,300.331c-2.727,11.565-7.789,24.416-13.581,34.684
						c-6.863,12.182-14.744,20.763-20.948,19.302c-2.922-0.689-5.186-3.539-6.842-7.82c4.013-3.426,8.18-9.126,12.017-15.948
						c5.793-10.268,10.855-23.119,13.581-34.684c4.311-18.314,1.543-28.418-4.651-33.604c2.418-0.309,4.908-0.103,7.418,0.484
						C98.934,265.431,106.455,275.051,100.508,300.331z"/>
					<path style="fill:#FF9A1B;" d="M65.979,354.317c6.204,1.461,14.086-7.12,20.948-19.302c-1.163-4.27-2.953-8.879-5.361-13.828
						c-5.361-11.03-13.376-22.893-21.957-32.637c-0.175,0.669-0.34,1.348-0.504,2.047C53.169,315.888,54.548,351.621,65.979,354.317z
						"/>
					<path style="fill:#FFDBAA;" d="M45.395,294.358c18.003,18.723,35.037,50.174,26.571,58.313s-39.224-10.114-57.227-28.837
						c-18.003-18.723-16.433-30.826-7.968-38.966S27.392,275.635,45.395,294.358z"/>
					<path style="fill:#FFC26D;" d="M71.967,352.671c-2.706,2.603-7.696,2.51-13.818,0.556c2.274-11.678-12.779-37.905-28.572-54.326
						c-8.643-8.993-15.938-13.407-22.121-14.672c8.427-7.542,20.413-8.097,37.935,10.135
						C63.396,313.079,80.434,344.532,71.967,352.671z"/>
				</g>
			</g>
		</g>
		<path style="fill:#EFE2DD;" d="M378.046,364.952v93.221H133.954v-93.221c0-5.687,4.605-10.292,10.281-10.292h223.529
			C373.441,354.66,378.046,359.265,378.046,364.952z"/>
		<path style="fill:#CDBFBB;" d="M378.047,364.951v93.228h-23.665v-93.228c0-5.68-4.609-10.289-10.289-10.289h23.665
			C373.438,354.662,378.047,359.271,378.047,364.951z"/>
		<g>
			<path style="fill:#FFF5F5;" d="M419.925,487.78H92.075c-5.682,0-10.289-4.607-10.289-10.289v-26.08
				c0-5.682,4.607-10.289,10.289-10.289h327.85c5.682,0,10.289,4.607,10.289,10.289v26.08
				C430.214,483.174,425.608,487.78,419.925,487.78z"/>
			<path style="fill:#EFE2DD;" d="M430.213,451.409v26.082c0,5.68-4.609,10.289-10.289,10.289h-22.718
				c5.68,0,10.289-4.609,10.289-10.289v-26.082c0-5.68-4.609-10.289-10.289-10.289h22.718
				C425.603,441.12,430.213,445.729,430.213,451.409z"/>
		</g>
		<path style="fill:#FFC26D;" d="M297.761,404.641h-83.521c-4.267,0-7.726-3.459-7.726-7.726c0-4.267,3.459-7.726,7.726-7.726h83.521
			c4.267,0,7.726,3.459,7.726,7.726C305.487,401.182,302.028,404.641,297.761,404.641z"/>
		<path style="fill:#FFDBAA;" d="M294.326,230.556c0,9.435-3.416,18.088-9.075,24.766c-7.038,8.293-17.532,13.561-29.251,13.561
			c-11.719,0-22.214-5.268-29.251-13.561c-5.659-6.678-9.075-15.331-9.075-24.766c0-21.164,17.162-38.326,38.326-38.326
			S294.326,209.392,294.326,230.556z"/>
		<path style="fill:#FFC26D;" d="M294.326,230.556c0,9.435-3.416,18.088-9.075,24.766L256,239.94l-29.251,15.382
			c-5.659-6.678-9.075-15.331-9.075-24.766c0-21.164,17.162-38.326,38.326-38.326S294.326,209.392,294.326,230.556z"/>
		<g>
			<g>
				<path style="fill:#FFCE8B;" d="M374.23,125.369l-49.974,48.697l11.796,68.777c1.764,10.301-9.04,18.148-18.299,13.292
					L256,223.669l-61.753,32.465c-9.259,4.856-20.063-2.991-18.299-13.292l6.385-37.237l5.411-31.54l-49.974-48.697
					c-7.478-7.293-3.344-20.013,6.99-21.509l69.046-10.032l30.885-62.576c4.621-9.376,17.997-9.376,22.617,0l30.885,62.576
					l23.004,3.344l46.042,6.688C377.574,105.356,381.707,118.076,374.23,125.369z"/>
				<path style="fill:#FFB54E;" d="M374.23,125.369l-49.974,48.697l11.796,68.777c1.764,10.301-9.04,18.148-18.299,13.292
					L256,223.669l-61.753,32.465c-9.259,4.856-20.063-2.991-18.299-13.292l6.385-37.237
					c95.831-17.492,128.194-70.104,138.865-108.433l46.042,6.688C377.574,105.356,381.707,118.076,374.23,125.369z"/>
			</g>
		</g>
	</g>
						</svg>
`;