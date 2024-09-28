const axios = require("axios");
const cheerio = require("cheerio");
const qs = require("qs");


const url ="https://yourdomain/api/ajaxSearch";

async function getvid(){
    const data = {
        q: "your_url_video",
        t: "media",
        lang: "en",
        v: "v2"
    };

    const headers = {
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Accept-Language': 'id,en;q=0.9,en-GB;q=0.8,en-US;q=0.7',
        'Content-Length': '140',
        'Content-Type': 'application/x-www-form-urlencoded;',
        'Origin': 'yourdomain.com',
        'Referer': 'yourdomain.com',
        'Sec-CH-UA': '"Brave";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
        'Sec-CH-UA-Mobile': '?1',
        'Sec-CH-UA-Platform': '"Android"',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        'Sec-GPC': '1',
        'User-Agent': 'your_user_agent',
        'X-Requested-With': 'XMLHttpRequest',
      };

      try {
        const res = await axios.post(url, qs.stringify(data), { headers });
        console.log(JSON.stringify(res.data, null, 2)); 

        
        if (!res.data.data) {
            console.log("Tidak ada data ditemukan dalam respons.");
            return;
        }

        const $ = cheerio.load(res.data.data); 
        const filter1 = $(".download-items"); 

        
        const maindata = filter1.find(".download-items__btn a").attr("href");
        console.log(maindata || "Tidak ditemukan tautan unduhan");
    } catch (err) {
        console.error(err);
    }
      

}
getvid()