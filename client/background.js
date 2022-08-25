


var id;
var pass;




document.addEventListener('DOMContentLoaded', function() {
	chrome.storage.sync.get('captchaId', function(result) {
		if(result.captchaId)
		document.getElementById("id").value=result.captchaId 
	  });

	  chrome.storage.sync.get('captchaPass', function(result) {
		if(result.captchaPass)
		document.getElementById("pass").value=result.captchaPass
	  });
    
	document.getElementById("go").addEventListener("click",value)
    document.getElementById("clear").addEventListener("click",removeData)
})
function value()
{
	document.getElementById("Idle").style.display="none";
	document.getElementById("running").style.display="inherit"
   id=document.getElementById("id").value;
   pass=document.getElementById("pass").value
   saveData()
   setTimeout(()=>{chrome.tabs.update(undefined, { url:"https://aims.iith.ac.in/aims/" });},100)
   
}

function saveData()
{
	chrome.storage.sync.set({"captchaId": id});
	chrome.storage.sync.set({"captchaPass": pass});
}

function removeData()
{
	chrome.storage.sync.clear();
	window.close()
}




{
	chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {

		
		if (changeInfo.status == 'complete') {
	  
			setTimeout(()=>{
				chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
                    if(tabs[0].url=="https://aims.iith.ac.in/aims/")
					{
						chrome.scripting.executeScript( {
							target: {
								tabId: tab.id,
							  },
							  func:captcha1

						});
					}

					if(tabs[0].url=="https://aims.iith.ac.in/aims/login/loginHome")
					{
						chrome.scripting.executeScript( {
							target: {
								tabId: tab.id,
							  },
							  func:captcha2,
						});
					}
				});
			   },500)
		}
	  })
   
}

function captcha1(){
	const captcha= document.getElementById("appCaptchaLoginImg").src;
	var capid;
	var capass
	chrome.storage.sync.get("captchaId",(res)=>{
capid=res.captchaId
	})
	chrome.storage.sync.get("captchaPass",(res)=>{
		capass=res.captchaPass
			})
			document.getElementById("appCaptchaLoginImg").addEventListener("load", ()=>{
				console.log("vndjnbjdn")});
				
	setTimeout(()=>{
		document.getElementById("captcha").value=captcha.split("/")[6];
		document.getElementById("uid").value=capid
		document.getElementById("pswrd").value=capass
		document.getElementById("login").click()
	},500)
}

function captcha2() {

	(function() {
	
        
		(async function() {
			// document.getElementById("appCaptchaLoginImg").src="/aims/captcha/getCaptchaByString/aaaaa";
			const data=document.getElementById("appCaptchaLoginImg").src;
			let blob = await fetch(data).then(r => r.blob());
			let dataUrl = await new Promise(resolve => {
			  let reader = new FileReader();
			  reader.onload = () => resolve(reader.result);
			  reader.readAsDataURL(blob);
			});
			// console.log(dataUrl)
			
			var finalarray=[]
			var arr2=[]
			labels_map = {
				0: "2", 1: "3", 2: "4", 3: "5", 4: "6", 5: "7", 6: "8", 7: "9", 8: "A", 9: "B", 10: "C", 11: "D",
				12: "E", 13: "F", 14: "G", 15: "H", 16: "J", 17: "K", 18: "L", 19: "M", 20: "P", 21: "Q", 22: "R",
				23: "S", 24: "T", 25: "U", 26: "V", 27: "W", 28: "X", 29: "Y", 30: "a", 31: "b", 32: "c", 33: "d", 34: "e",
				35: "f", 36: "h", 37: "j", 38: "k", 39: "m", 40: "n", 41: "p", 42: "q", 43: "r", 44: "s",
				45: "t", 46: "u", 47: "v", 48: "w", 49: "x", 50: "y"
			}
				var canvas = document.createElement('canvas');
				canvas.height = window.innerHeight;
				canvas.width = window.innerWidth;
				var ctx = canvas.getContext('2d');
			  
				var img = new Image();
				img.src = dataUrl;
				img.onload = function(){
		
					var ptrn = ctx.createPattern(img,'no-repeat');
					ctx.fillStyle = ptrn;
					ctx.fillRect(0,0,canvas.width,canvas.height);
				  var imgData = ctx.getImageData(0, 0, img.width, img.height);
				  const temparr=imgData.data
				  var points=[] 
				  setTimeout(()=>
			{
			const arr=[]
		
			for(var i = 0,y=1000; i < imgData.data.length;i+=4) 
			 
          {
              if(imgData.data[i] == 255 && imgData.data[i+1] == 255 && imgData.data[i+2] == 255) // check for white
                
              {
                var temp=parseInt(i/4);
                y=temp%150;
                if(!(arr.includes(y)))
                {
                arr.push(y)
                }
                  
              }
              }
              arr.sort(function(a, b){return a - b})
              var finalimg=[]
              var tempimg=[]
              
              points.push(arr[0])
              {
                {
                  for(var x=0;x<arr.length;x++)
                  {
                    if(!(arr[x]===(arr[x+1]-1)))
                    {
                    points.push(arr[x])
                    if(arr[x+1])
                    points.push(arr[x+1])
                    }
                  }
				  for(var f=0;f<10;f+=2)
				  {
			        let temp2=(30-(points[f+1]-points[f]))/2;
                    points[f]-=temp2;
					points[f+1]+=temp2;
					if(points[f]<0)
					{
						var add=-1*points[f]
						points[f+1]+=add
					points[f]=0;
					}
					if(points[f+1]>150)
					{
						var sub=points[f+1]-150
						points[f]-=sub
					points[f+1]=150
					}
				  }
                  console.log(points)
				
				  
				{
					var arr3=[]
					{
						// console.log(arr2)
						for(var i=0;i<10;i+=2)
						{
							var min=Math.floor(points[i]);
						var max=Math.floor(points[i+1]);
						for(var f=10;f<50;f++)
						{
							for(var g=min;g<max;g++)
							{
								if((arr2[g+150*f])/255>0.5)
								arr3.push(true)
								else
								arr3.push(false)
							}
							
						}
						finalarray.push(arr3)
						// console.log(finalarray)
						arr3=[]
						
					}}
					const obj={
						"array": finalarray
					}
					
					{
						async function postData(url = '') {
							
							const response = await fetch(url, {
							  method: 'POST', 
							  mode: 'cors', 
							  cache: 'no-cache', 
							  credentials: 'same-origin', 
							  headers: {
								'Content-Type': 'application/json'
								
							  },
							  redirect: 'follow', 
							  referrerPolicy: 'no-referrer',
							  body: JSON.stringify(obj) 
							});
							return response.json();
						  }
						  
						  postData('https://captcha14387.herokuapp.com/data')
							.then((data) => {
                              var finalval=""
							//   console.log(data);
							  data.map((k,index)=>{
								finalval=finalval.concat(labels_map[data[index]])
								// console.log(labels_map[data[index]])
							  })
							  console.log(finalval)
							  document.getElementById("captcha").value=finalval;
							  document.getElementById("submit").click()
                              setTimeout(() => {
								if(document.getElementsByClassName("appMsgDiv").length>0)
								{
							  console.log("err")
							  document.getElementById("loginCapchaRefresh").click()
							  setTimeout(()=>{
								captcha2()
							  },1000)
							 
								}
								else
								window.close()
							  }, 1000);
							  
                             

							});
					}
				}
                }
}}
			,200)
				  for (i = 0; i < imgData.data.length; i += 4) {
					let count = imgData.data[i] + imgData.data[i + 1] + imgData.data[i + 2];
					let colour = 0;
					if (count > 510) colour = 255;
					else if (count > 255) colour = 127.5;
				
					imgData.data[i] = colour; 
					imgData.data[i + 1] = colour;
					imgData.data[i + 2] = colour;
					imgData.data[i + 3] = 255;
				  }

				  
                for(var i=0;i<30000;i+=4)
                {
                  var temp=0.2989 * temparr[i] + 0.5870 * temparr[i+1] + 0.1140 * temparr[i+2]
				  temp=Math.floor(temp)
                  arr2.push(temp)
                }
		}}
)();

	
	})();
};
