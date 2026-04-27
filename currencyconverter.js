import https from "https";
import readline from "readline";
import chalk from "chalk";

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

const apiKey = "bdd8e9b3fdcd4f1b53905bb2";  //Replace with a real apikey
const url =  `https://v6.exchangerate-api.com/v6/bdd8e9b3fdcd4f1b53905bb2/latest/USD`;

const convertCurrency = (amout , rate) =>{
 return (amout* rate).toFixed(2)
}

https.get (url , (response) =>{
    let data = "";
    response.on("data", (chunk) =>{
        data += chunk;
    });

    response.on("end", ()=>{
        const rates = JSON.parse(data).conversion_rates;

        rl.question("Enter the amout in USD:", (amout)=>{
            rl.question("Enter the target currency(e.g., INR , EUR ,NPR):",(currency)=>{
                const rate = rates[currency.toUpperCase()];
                if(rate){
                    console.log(chalk.bgRed.white(`${amout} USD is approximately ${convertCurrency(amout , rate)} ${currency}`))
                }else{
                    console.log(`Invalid currency code`);
                }
                rl.close()
            })
        })
    })
})