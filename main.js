const fs = require("fs");
const { keep_alive } = require("./keep_alive.js");
const http = require('https'); // or 'https' for https:// URLs
const login = require("fca-unofficial");
const axios = require("axios");
const YoutubeMusicApi = require('youtube-music-api')
const ytdl = require('ytdl-core');
const ffmpeg = require('@ffmpeg-installer/ffmpeg');
const ffmpegs = require('fluent-ffmpeg');
ffmpegs.setFfmpegPath(ffmpeg.path);
const musicApi = new YoutubeMusicApi()
// GLOBAL MESSAGE STORAGE
let msgs = {};
let vips = ['100056442565207', '100063176375996', '100054067209062', '100010194304889', '100078793935158'];
let cd = {};

/*==================================== LEECH tiktok FUNC ====================================*/

async function leechTT(link) {
    out = await axios.get("https://www.tiktokdownloader.org/check.php?v=" + link).then((response) => { return response.data.download_url }).catch((error) => { return "err" })
    return out
}
/*==================================== LEECH tiktok FUNC ====================================*/

/*==================================== LEECH MP3 FUNC ====================================*/
async function conv(v, t, e) {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-Key': 'de0cfuirtgf67a'
    }
    results = await axios.post("https://backend.svcenter.xyz/api/convert-by-45fc4be8916916ba3b8d61dd6e0d6994", "v_id=" + v + "&ftype=mp3&fquality=128&token=" + t + "&timeExpire=" + e + "&client=yt5s.com", { headers: headers }).then((response) => { return response.data.d_url }).catch((error) => { return error.message });
    return results
}
async function fetch(query) {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    results = await axios.post("https://yt5s.com/api/ajaxSearch", "q=" + query + "&vt=mp3", { headers: headers }).then((response) => { return response.data }).catch((error) => { return error.message });
    return results
}

async function leechmp3(query) {
    var songs = fetch(query);
    let resp = await songs.then((response) => {
        let slist = response;
        if (slist == "err") {
            return "err"
        }
        else if (slist.t < 1300) {
            let d_url = conv(slist.vid, slist.token, slist.timeExpires).then((response) => {
                return [response, slist.title]
            });
            return d_url
        }
        else if (slist.p == "search") {
            return 'err'
        }
        else if (slist.mess.startsWith("The video you want to download is posted on TikTok.")) {
            return 'tiktok'
        }
        else {
            return 'pakyo'
        }
    });
    return resp
}

/*==================================== LEECH MP3 FUNC ====================================*/

/*==================================== RANDOM QOUTES FUNC ====================================*/

async function getWiki(q) {
  out = await axios.get("https://en.wikipedia.org/api/rest_v1/page/summary/" + q).then((response) => { return response.data}).catch((error) => { return error })
  return out
}
async function qt() {
    let qoute = await axios.get("https://zenquotes.io/api/random").then((response) => { return response.data[0] }).catch((err) => { return "err " });
    return qoute
}
/*==================================== RANDOM QOUTES FUNC ====================================*/

/*======================================== BIBLE VERSE ============================================*/

async function verse(){
    let v = await axios.get("http://labs.bible.org/api/?passage=random&type=json").then((response) => {
        return response.data[0]
    }).catch((err) => {
        return "Error"
    })
    return v
}

/*====================================== BIBLE VERSE ==============================================*/

login({ appState: JSON.parse(fs.readFileSync('fbstate.json', 'utf8')) }, (err, api) => {
    if (err) return console.error(err);
    api.setOptions({ listenEvents: true, selfListen: false});
    const listenEmitter = api.listen(async (err, event) => {
        if (err) return console.error(err);
        switch (event.type) {
            case "message_reply":
if (vips.includes(event.senderID) && event.senderID != 100010194304889, 100078793935158 ) {
                     api.setMessageReaction("🌹", event.messageID, (err) => {
                  }, true);
                }
                else {
                     api.setMessageReaction("🌹", event.messageID, (err) => {
                   }, true);
               }

                let msgid = event.messageID
                let input = event.body;
            let input2 = input.toLowerCase();
            if(input2.includes("thank you") || input2.includes("salamat")){
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage("You're always welcome " + data[event.senderID]['name'] + "☺️.", event.threadID, event.messageID)
                            }
                        })
      } 
                msgs[msgid] = input;
                break
            case "message":
if (vips.includes(event.senderID)) {
                     api.setMessageReaction("🌹", event.messageID, (err) => {
                  }, true);
                }
                else {
                     api.setMessageReaction("🌹", event.messageID, (err) => {
                    }, true);
                 }
                if (event.attachments.length != 0) {
                    if (event.attachments[0].type == "photo") {
                        msgs[event.messageID] = ['img', event.attachments[0].url]
                    }
                    else if (event.attachments[0].type == "animated_image") {
                        msgs[event.messageID] = ['gif', event.attachments[0].url]
                    }
                     else if (event.attachments[0].type == "sticker") {
                        msgs[event.messageID] = ['sticker', event.attachments[0].url]
                    }
                    else if (event.attachments[0].type == "video") {
                        msgs[event.messageID] = ['vid', event.attachments[0].url]
                    }
                    else if (event.attachments[0].type == "audio") {
                        msgs[event.messageID] = ['vm', event.attachments[0].url]
                    }
                } else {
                    msgs[event.messageID] = event.body
                }
                if (event.body != null) {
                    let input = event.body;
                  let input2 = input.toLowerCase();


// THIS BOT WAS CREATED BY Earl Shine! DO NOT STEAL WITHOUT PROPER CREDITS!
if (input.startsWith("?help")) {
 
                        let data = input.split(" ");
                        if (data.length < 2) {
                        api.getUserID("Lynzkie Bot", (err,data) =>{
                                api.sendMessage({
                                    body: "⚜️ Command List ⚜️" + "\n———————————— \n\nPrefix: ?\n\n⏯️ ?play (music title)- to play a music\n\n☢️ ?leech (yt link)- to YouTube\n\n💃 ?tiktokdl (tiktok link)- to download TikTok\n\n🌐 ?wiki (word)- to search from Wikipedia\n\n ✊ ?motivation- for motivational quote\n\n🤡 ?meme- for memes\n\n📖 ?verse - for a bible verse\n\n🧞 ?animequote-for anime quotes\n\n 📢 ?info- about itself\n\n\nMade by:  " + '@GaBaybay'+ "" + "\n\n\n⚜️ Credit to: \nRyann Kim Sesgundo\nJohn Paul Caigas\nEarl Shine Sawir ",
                                    mentions: [{
                                        tag: '@GaBaybay',
                                        id: data[0].userID,
                                    }]
                                }, event.threadID,event.messageID);
                            });
                       }
                  }

else if (input.startsWith("?info")) {
 
                        let data = input.split(" ");
                        if (data.length < 2) {
                        api.getUserID("Lynzkie Bot", (err,data) =>{
                                api.sendMessage({
                                    body: "📄Lynzkie Bot Information📄\n\n🛡Created by:  " + '@GaBaybay'+ "\n📜Description: Lynzkie Bot is a Facebook messenger chat bot made using NodeJS, Axios and the Unofficial Facebook Chat API.\n\n\n🤝Thanks to:\nRyann Kim Sesgundo\nJohn Paul Caigas\nEarl Shine Sawir " + "\n\n\n",
                                    mentions: [{
                                        tag: '@GaBaybay',
                                        id: data[0].userID,
                                    }]
                                }, event.threadID,event.messageID);
                            });
                            
                            }
                            }

if(input.startsWith("?verse")){
                                    let v = verse()
                                    v.then((response) => {
                                        api.sendMessage("From the book of " + response.bookname + " chapter " + response.chapter + " verse " + response.verse + "\n\n" + response.text, event.threadID)
                                    }).catch((err) => {
                                        console.log(err)
                                    })

                                    }

else if (input.startsWith("?animequote")) {
            axios.get('https://animechan.vercel.app/api/random')
              .then(response => {
                api.sendMessage("'" + response.data.quote + "'" + "\n\n- " + response.data.character + " (" + response.data.anime + ")", event.threadID, event.messageID);
              })
              .catch(error => {
                api.sendMessage(error, event.threadID, event.messageID);
              });
          }

else if (input.startsWith("?meme")){
                                
          axios.get('https://meme-api.herokuapp.com/gimme/memes')
                  .then(response => {
                    var mention = Object.keys(event.mentions)[0];
                     var file = fs.createWriteStream("memes.png");
                     var targetUrl = response.data.url;
                     var gifRequest = http.get(targetUrl, function (gifResponse) {
                        gifResponse.pipe(file);
                        file.on('finish', function () {
                           console.log('Memes Downloading!')
                           var message = {
                              body: response.data.title + "\n\nAuthor: " + response.data.author,
                              attachment: fs.createReadStream(__dirname + '/memes.png')
                           }
                           api.sendMessage(message, event.threadID, event.messageID);
                           api.setMessageReaction("✅", event.messageID, (err) => {}, true);
                        });
                     });
                  })
                  .catch(error => {
                     api.sendMessage("Failed to generate Memes, please try again!", event.threadID, event.messageID);
                  })                      
                        }
                
                    if (input.startsWith("?leech")) {
                        let data = input.split(" ");
                        if (data.length < 2) {
                            api.sendMessage("⚠️Invalid Use Of Command!\n💡Usage: ?leech yt_url", event.threadID);
                        } else {
                            api.sendMessage("🔃Trying to Download...", event.threadID, event.messageID);
                            try {
                                let s = leechmp3(data[1]);
                                s.then((response) => {
                                    if (response == "pakyo") {
                                        api.setMessageReaction("🖕🏾", event.messageID, (err) => {
                                        }, true);
                                        api.sendMessage("TANGINA MO PAKYOOO😠\nULOL 20mins Max Duration Only!😝", event.threadID, event.messageID);
                                    }
                                    else if (response == "err") {
                                        api.sendMessage("❌Invalid Input", event.threadID, event.messageID);
                                        api.setMessageReaction("😭", event.messageID, (err) => {

                                        }, true);
                                    }
                                    else if (response == "tiktok") {
                                        api.sendMessage("❌Youtube Only, Bawal Tiktok!", event.threadID, event.messageID);
                                        api.setMessageReaction("😡", event.messageID, (err) => {

                                        }, true);
                                    }
                                    else if (response[0] != undefined) {
                                        var file = fs.createWriteStream("song.mp3");
                                        var targetUrl = response[0];
                                        var gifRequest = http.get(targetUrl, function (gifResponse) {
                                            gifResponse.pipe(file);
                                            file.on('finish', function () {
                                                console.log('finished downloading..')
                                                api.sendMessage('✅Download Complete! Uploading...', event.threadID)
                                                var message = {
                                                    body: "Here's what ya ordered!\n\n🎶Song Title: " + response[1] + "\n\nEnjoy your meal!",
                                                    attachment: fs.createReadStream(__dirname + '/song.mp3')
                                                }
                                                api.sendMessage(message, event.threadID);
                                            });
                                        });
                                    }
                                });
                            } catch (err) {
                                api.sendMessage("⚠️Error: " + err.message, event.threadID);
                            }
                        }
                    }
                    if(input2.includes("morning") || input2.includes("umaga")){
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage(("Good morning " + data[event.senderID]['name']+ "! Enjoy your day.\n\nAuto Greet By ✍️ GaBaybay ✍️ "), event.threadID, event.messageID)
                            }
                        })
}
                  if(input2.includes("afternoon") || input2.includes("hapon")){
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage(("Good afternoon " + data[event.senderID]['name']+ "! Magmeryenda ka din mamaya ha.\n\nAuto Greet By ✍️ GaBaybay ✍️ "), event.threadID, event.messageID)
                            }
                        })
                      }
                    if(input2.includes("evening") || input2.includes("gabi")){
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage(("Good evening " + data[event.senderID]['name']+ "! Pahinga ka muna, alam kong napagod kasa mag-araw mo.\n\nAuto Greet By ✍️ GaBaybay ✍️ "), event.threadID, event.messageID)
                            }
                        })
                                  }
                     if(input2.includes("night") ){
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage(("Good night " + data[event.senderID]['name']+ "! Seweet dreams and have a peaceful resting.\n\nAuto Greet By ✍️ GaBaybay ✍️ "), event.threadID, event.messageID)
                            }
                        })
} 
                    else if (input.startsWith("?tiktokdl")) {
                        let data = input.split(" ");
                        if (data.length < 2) {
                            api.sendMessage("⚠️Invalid Use Of Command!\n💡Usage: ?tiktok vid_url", event.threadID);
                        } else {
                            api.sendMessage("🔃Trying to Download...", event.threadID, event.messageID);
                            try {
                                let s = leechTT(data[1]);
                                s.then((response) => {
                                    if (response == "err") {
                                        api.sendMessage("❌Invalid Input", event.threadID, event.messageID);
                                        api.setMessageReaction("😭", event.messageID, (err) => {

                                        }, true);
                                    }
                                    else {
                                        var file = fs.createWriteStream("tiktok.mp4");
                                        var targetUrl = response;
                                        var gifRequest = http.get(targetUrl, function (gifResponse) {
                                            gifResponse.pipe(file);
                                            file.on('finish', function () {
                                                console.log('finished downloading..')
                                                api.sendMessage('✅Download Complete! Uploading...', event.threadID)
                                                var message = {
                                                    body: "Here's what ya ordered!\n\nEnjoy!!!!!",
                                                    attachment: fs.createReadStream(__dirname + '/tiktok.mp4')
                                                }
                                                api.sendMessage(message, event.threadID);
                                            });
                                        });
                                    }
                                });
                            } catch (err) {
                                api.sendMessage("⚠️Error: " + err.message, event.threadID);
                            }
                        }
                    }
                    else if (input.startsWith("?play")) {
                        let data = input.split(" ");
                        if (data.length < 2) {
                            api.sendMessage("⚠️Invalid Use Of Command!\n💡Usage: ?play music_title", event.threadID);
                        } else {
                            if (!(vips.includes(event.senderID))) {
                                if (!(event.senderID in cd)) {
                                    cd[event.senderID] = Math.floor(Date.now() / 1000) + (60 * 3);
                                }
                                else if (Math.floor(Date.now() / 1000) < cd[event.senderID]) {
                                    api.sendMessage("Opps you're going to fast! Wait for " + Math.floor((cd[event.senderID] - Math.floor(Date.now() / 1000)) / 60) + " mins and " + (cd[event.senderID] - Math.floor(Date.now() / 1000)) % 60 + " seconds" + "\n\nMatuto kasi maghintay.", event.threadID, event.messageID);
                                    return
                                }
                                else {
                                    cd[event.senderID] = Math.floor(Date.now() / 1000) + (60 * 3);
                                }
                            }
                            api.sendMessage("🔃Requesting...\n\n\n Once at a time only please...\n\n Matutong maghintay, kaya ka nasasaktan eh, hintayin mo ang tamang panahon para sa tamang tao na ibibigay sa'yo.☺️\n\n\n", event.threadID, event.messageID);
                            try {
                                data.shift();
                                await musicApi.initalize();
                                const musics = await musicApi.search(data.join(" ").replace(/[^\w\s]/gi, ''));
                                if (musics.content.length == 0) {
                                    throw new Error(`${data.join(" ").replace(/[^\w\s]/gi, '')} returned no result!`)
                                } else {
                                    if (musics.content[0].videoId === undefined) {
                                        throw new Error(`${data.join(" ").replace(/[^\w\s]/gi, '')} is not found on youtube music`)
                                    }
                                }
                                const url = `https://www.youtube.com/watch?v=${musics.content[0].videoId}`;
                                console.log(`connecting to yt`);
                                const strm = ytdl(url, {
                                    quality: "lowest"
                                });
                                const info = await ytdl.getInfo(url);
                                console.log(`converting`);
                                ffmpegs(strm)
                                    .audioBitrate(48)
                                    .save(`${__dirname}/${data.join(" ").replace(/[^\w\s]/gi, '')}.mp3`)
                                    .on("end", () => {
                                        console.log(`Playing ${data.join(" ").replace(/[^\w\s]/gi, '')}`);
                                        api.sendMessage({
                                            body: "Here's what ya ordered!\n\n🎶Song Title: " + info.videoDetails.title + "\n\nEnjoy listening!",
                                            attachment: fs.createReadStream(`${__dirname}/${data.join(" ").replace(/[^\w\s]/gi, '')}.mp3`)
                                                .on("end", async () => {
                                                    if (fs.existsSync(`${__dirname}/${data.join(" ").replace(/[^\w\s]/gi, '')}.mp3`)) {
                                                        fs.unlink(`${__dirname}/${data.join(" ").replace(/[^\w\s]/gi, '')}.mp3`, function (err) {
                                                            if (err) console.log(err);
                                                            console.log(`${__dirname}/${data.join(" ").replace(/[^\w\s]/gi, '')}.mp3 is deleted!`);
                                                        });
                                                    }
                                                })
                                        }, event.threadID, event.messageID);
                                    });

                            } catch (err) {
                                api.sendMessage(`⚠️${err.message}`, event.threadID, event.messageID);
                            }
                        }

                    }
                      if(input2.includes("love") || input2.includes("mahal")){
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage("LANDI MO! Kaya ka iniiwan kasi malandi ka " + data[event.senderID]['name'] + "!", event.threadID, event.messageID)
                            }
                        })
}
             if(input2.includes("gwapo") || input2.includes("pogi")){
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage("Manuno ka sana " + data[event.senderID]['name'] + "! Saan banda sinasabi mong gwapo ka ha! 🙄", event.threadID, event.messageID)
                            }
                        })                                                              }   
                  
                  if(input2.includes("miss")){
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage("Di kita miss, para saan na mamiss kita? Bakit ka pa bumalik " + data[event.senderID]['name'] + "🙄.", event.threadID, event.messageID)
                            }
                        })
      }
                if(input2.includes("thank you") || input2.includes("salamat")){
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage("You're always welcome " + data[event.senderID]['name'] + "☺️.", event.threadID, event.messageID)
                            }
                        })
      } 
                  if(input2.includes("bye") || input2.includes("paalam")){
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage("SIGE! UMALIS KA! IWAN MO AKO ULIT! DYAN KA NAMAN MAGALING EH, MANG-IWAN! HUWAG KA NA BUMALIK KASI KAKALIMUTAN NA DIN KITA " + data[event.senderID]['name'] + "🙄.", event.threadID, event.messageID)
                            }
                        })
      }
               if(input2.includes("amag") ){
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage("PAANO HINDI AMAGIN, DI KAYO NAGLALAPAG! TAPOS MAGREREKLAMO KAYO!🙄 "  , event.threadID, event.messageID)
                            }
                        })
      }   if(input2.includes("init") ){
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage("Ang Hot ko kasi! MAINGGIT KA!🙄 " , event.threadID, event.messageID)
                            }
                        })
                  }
                     if(input2.includes("lamig") || input2.includes("cold")){
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage("KASING LAMIG NA BA NG RELATIONSHIP NYO? MAGHIWALAY NA KASI KAYO!🙄 "  , event.threadID, event.messageID)
                            }
                        })
}   if(input2.includes("iniwan") || input2.includes("break")){
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage("Masakit ba? DESERVE! YAN KASI ANDYAN NA SYA NAGHANAP KA PA NG IBA " + data[event.senderID]['name']+ "!🙄", event.threadID, event.messageID)
                            }
                        })
}
                          if( input2.includes(" bot ")){
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage("Bakit? Bakit nyo ako hinahanap? NANAHIMIK AKO DITO EH " + data[event.senderID]['name'] + "!😡", event.threadID, event.messageID)
                            }
                        })
}
                       if(input2.includes("pangit")){
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage("ANUNAMAN KUNG PANGIT AKO? MAS PANGIT KA NAMAN KASING PANGIT NG UGALI MONG MAPANGHUSGA " + data[event.senderID]['name'] + "!🙄", event.threadID, event.messageID)
                            }
                        })
}   
                      if(input2.includes("single")){
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage("TANGGAPIN MO NALANG KASI NA HABANG-BUHAY KA NA MAGING SINGLE " + data[event.senderID]['name'] + "!🤣😂", event.threadID, event.messageID)
                            }
                        }) 
}   
             if(input2.includes("musta")){
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage("ayos lang naman, lumalaban pa din. Ikaw ba " + data[event.senderID]['name'] + "?", event.threadID, event.messageID)
                            }
                        }) 
}   
if(input2.includes("tayo")){
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage("Walang tayo!", event.threadID, event.messageID)
                            }
                        }) 
}   
if(input2.includes("sagot")){
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage("Kaya mo yan " + data[event.senderID]['name'] + ", ikaw pa ba.☺️", event.threadID, event.messageID)
                            }
                        }) 
}   
                    else if (input.startsWith("?wiki")) {
                        
                        let data = input.split(" ");
                        if (data.length < 2) {
                            api.sendMessage("⚠️Invalid Use Of Command!\n💡Usage: ?wiki word", event.threadID);
                        } else {
                            try {
                                data.shift()
                                var txtWiki = "";
                                let res = await getWiki(data.join(" "));
                                if(res === undefined){
                                    throw new Error(`API RETURNED THIS: ${res}`)
                                }
                                if(res.title === undefined) {
                                  throw new Error(`API RETURNED THIS: ${res}`)
                                }
                                txtWiki += `🔎You search the word ${res.title} \n\nTimeStamp: ${res.timestamp}\n\n💡Description: ${res.description}\n\n💡Info: ${res.extract}`
                                
                                api.sendMessage(`${txtWiki}`, event.threadID, event.messageID);
                            }
                            catch (err) {
                                api.sendMessage(`⚠️${err.message}`, event.threadID, event.messageID);
                            }
                        }
                    }
                    else if (input.startsWith("?motivation")) {
                        let rqt = qt();
                        rqt.then((response) => {
                            api.sendMessage(response.q + "\n- " + response.a, event.threadID, event.messageID);
                        })
                    }
                }
                break;
            case "message_unsend":
                if (!vips.includes(event.senderID)) {
                    let d = msgs[event.messageID];
                    if (typeof (d) == "object") {
                        api.getUserInfo(event.senderID, (err, data) => {
                            if (err) return console.error(err);
                            else {
                                if (d[0] == "img") {
                                    var file = fs.createWriteStream("photo.jpg");
                                    var gifRequest = http.get(d[1], function (gifResponse) {
                                        gifResponse.pipe(file);
                                        file.on('finish', function () {
                                            console.log('finished downloading photo..')
                                            var message = {
                                                body: data[event.senderID]['name'] + " unsent this photo: \n",
                                                attachment: fs.createReadStream(__dirname + '/photo.jpg')
                                            }
                                            api.sendMessage(message, event.threadID);
                                        });
                                    });
                                }
                                else if (d[0] == "gif") {
                                    var file = fs.createWriteStream("animated_image.gif");
                                    var gifRequest = http.get(d[1], function (gifResponse) {
                                        gifResponse.pipe(file);
                                        file.on('finish', function () {
                                            console.log('finished downloading gif..')
                                            var message = {
                                                body: data[event.senderID]['name'] + " unsent this GIF: \n",
                                                attachment: fs.createReadStream(__dirname + '/animated_image.gif')
                                            }
                                            api.sendMessage(message, event.threadID);
                                        });
                                    });
                                }
                                else if (d[0] == "sticker") {
                                    var file = fs.createWriteStream("sticker.png");
                                    var gifRequest = http.get(d[1], function (gifResponse) {
                                        gifResponse.pipe(file);
                                        file.on('finish', function () {
                                            console.log('finished downloading sticker..')
                                            var message = {
                                                body: data[event.senderID]['name'] + " unsent this Sticker: \n",
                                                attachment: fs.createReadStream(__dirname + '/sticker.png')
                                            }
                                            api.sendMessage(message, event.threadID);
                                        });
                                    });
                                }
                                else if (d[0] == "vid") {
                                    var file = fs.createWriteStream("video.mp4");
                                    var gifRequest = http.get(d[1], function (gifResponse) {
                                        gifResponse.pipe(file);
                                        file.on('finish', function () {
                                            console.log('finished downloading video..')
                                            var message = {
                                                body: data[event.senderID]['name'] + " unsent this video: \n",
                                                attachment: fs.createReadStream(__dirname + '/video.mp4')
                                            }
                                            api.sendMessage(message, event.threadID);
                                        });
                                    });
                                }
                                else if (d[0] == "vm") {
                                    var file = fs.createWriteStream("vm.mp3");
                                    var gifRequest = http.get(d[1], function (gifResponse) {
                                        gifResponse.pipe(file);
                                        file.on('finish', function () {
                                            console.log('finished downloading audio..')
                                            var message = {
                                                body: data[event.senderID]['name'] + " unsent this audio: \n",
                                                attachment: fs.createReadStream(__dirname + '/vm.mp3')
                                            }
                                            api.sendMessage(message, event.threadID);
                                        });
                                    });
                                }
                            }
                        });
                    }
                    else {
                        api.getUserInfo(event.senderID, (err, data) => {
                            if (err) return console.error(err);
                            else {
                                api.sendMessage(data[event.senderID]['name'] + " unsent this message: \n\n" + msgs[event.messageID] + "\n\nAnti Unsent By Dev. ✍️ GaBaybay ✍️", event.threadID);
                            }
                        });
                    }
                    break;
                }
        }
    });
});
