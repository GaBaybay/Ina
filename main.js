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
let vips = ['100056442565207', '100063176375996', '100054067209062', '100010194304889'];
let vip = []
let cd = {};
let morning = ""
let afternoon = ""
let evening = ""
let night = ""
let unsentOn = true
let unsentGC = ""
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
    }else if (slist.p == "search") {
      return 'err'
    }else if (slist.mess.startsWith("The video you want to download is posted on TikTok.")) {
      return 'tiktok'
    }else {
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

login({ appState: JSON.parse(process.env['fbstate'])}, (err, api) => {
  if (err) return console.error(err);
  api.setOptions({ listenEvents: true, selfListen: true})
  const listenEmitter = api.listen(async (err, event) => {
    if (err) return console.error(err);
    switch (event.type) {
      case "message_reply":
        if (vips.includes(event.senderID) && event.senderID != 100010194304889) {
          api.setMessageReaction("❤️", event.messageID, (err) => {}, true);
        }/*else {
          api.setMessageReaction("❤️", event.messageID, (err) => {}, true);
    }*/
        let msgid = event.messageID
        let input = event.body;
      msgs[msgid] = input;
      break
      case "message":
        if (vips.includes(event.senderID) && event.senderID != 100010194304889) {
          api.setMessageReaction("❤️", event.messageID, (err) => {}, false);
        }/*else {
          api.setMessageReaction("❤️", event.messageID, (err) => {}, true);
    }*/

        if (event.attachments.length != 0) {
          if (event.attachments[0].type == "photo") {
            msgs[event.messageID] = ['img', event.attachments[0].url]
          }else if (event.attachments[0].type == "animated_image") {
            msgs[event.messageID] = ['gif', event.attachments[0].url]
          }else if (event.attachments[0].type == "sticker") {
            msgs[event.messageID] = ['sticker', event.attachments[0].url]
          }else if (event.attachments[0].type == "video") {
            msgs[event.messageID] = ['vid', event.attachments[0].url]
          }else if (event.attachments[0].type == "audio") {
            msgs[event.messageID] = ['vm', event.attachments[0].url]
          }
        } else {
          msgs[event.messageID] = event.body
        }
        if (event.body != null) {
          let myDay = 0
          if((new Date().getHours() + 8) > 24){
            myDay = (new Date().getHours() + 8) - 24
          }else{
            myDay = new Date().getHours() + 8
          }
          let input = event.body;
          let input2 = input.toLowerCase();
          if(vips.includes(event.senderID)){
          if(input.startsWith("Enable: Unsent") && !unsentOn){
                            unsentOn = true
                            api.sendMessage("Anti Unsent is now active.", event.threadID, event.messageID)
                            for(let i = 0; i < vip.length; i++){
                                if(vip[i] != event.threadID){
                                    api.sendMessage("Anti Unsent has turned on!", vip[i])
                                }
                            }
                        }
                        if(input.startsWith("Disable: Unsent") && unsentOn){
                            unsentOn = false
                            api.sendMessage("Anti Unsent has been disabled.", event.threadID, event.messageID)
                            for(let i = 0; i < vip.length; i++){
                                if(vip[i] != event.threadID){
                                    api.sendMessage("Anti Unsent has turned off!", vip[i])
                                }
                            }
                        }
                        if(input.startsWith("Activate: Unsent") && unsentGC.includes(event.threadID)){
                            unsentGC = unsentGC.replace(event.threadID + " ", "")
                            api.sendMessage("Anti Unsent is now activated for this conversation.", event.threadID, event.messageID)
                            for(let i = 0; i < vip.length; i++){
                                if(vip[i] != event.threadID){
                                    api.sendMessage("Anti Unsent was activated from a custom thread!", vip[i])
                                }
                            }
                        }
                        if(input.startsWith("Kill: Unsent") && !unsentGC.includes(event.threadID)){
                            unsentGC += event.threadID + " "
                            api.sendMessage("Anti Unsent is now deactivated for this conversation.", event.threadID, event.messageID)
                            for(let i = 0; i < vip.length; i++){
                                if(vip[i] != event.threadID){
                                    api.sendMessage("Anti Unsent was deactivated from a custom thread!", vip[i])
                                }
                              }
                            }
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
                  if (response == "bad!") {
                    api.setMessageReaction("✋", event.messageID, (err) => {}, true);
                    api.sendMessage("Nako🤦", event.threadID, event.messageID);
                  }else if (response == "err") {
                    api.sendMessage("❌Invalid Input", event.threadID, event.messageID);
                    api.setMessageReaction("😭", event.messageID, (err) => {}, true);
                  }else if (response == "tiktok") {
                    api.sendMessage("❌Youtube Only, Bawal Tiktok!", event.threadID, event.messageID);
                    api.setMessageReaction("😡", event.messageID, (err) => {}, true);
                  }else if (response[0] != undefined) {
                    var file = fs.createWriteStream("song.mp3");
                    var targetUrl = response[0];
                    var gifRequest = http.get(targetUrl, function (gifResponse) {
                      gifResponse.pipe(file);
                      file.on('finish', function () {
                        console.log('finished downloading..')
                        api.sendMessage('✅Download Complete! Uploading...', event.threadID)
                        var message = {
                          body: "Here's what you ordered!\n\n🎶Song Title: " + response[1] + "\n\nEnjoy Listening!",
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
          }else if (input.startsWith("?tiktokdl")) {
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
                    api.setMessageReaction("😭", event.messageID, (err) => {}, true);
                  }else {
                    var file = fs.createWriteStream("tiktok.mp4");
                    var targetUrl = response;
                    var gifRequest = http.get(targetUrl, function (gifResponse) {
                      gifResponse.pipe(file);
                      file.on('finish', function () {
                        console.log('finished downloading..')
                        api.sendMessage('✅Download Complete! Uploading...', event.threadID)
                        var message = {
                          body: "Here's what you ordered!\n\nEnjoy Listening!",
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
          }else if (input.startsWith("?play")) {
            let data = input.split(" ");
            if (data.length < 2) {
              api.sendMessage("⚠️Invalid Use Of Command!\n💡Usage: ?play music_title", event.threadID);
            } else {
              if (!(vips.includes(event.senderID))) {
                if (!(event.senderID in cd)) {
                  cd[event.senderID] = Math.floor(Date.now() / 1000) + (60 * 3);
                }else if (Math.floor(Date.now() / 1000) < cd[event.senderID]) {
                  api.sendMessage("Opps you're going to fast! Wait for " + Math.floor((cd[event.senderID] - Math.floor(Date.now() / 1000)) / 60) + " mins and " + (cd[event.senderID] - Math.floor(Date.now() / 1000)) % 60 + " seconds", event.threadID, event.messageID);
                  return
                }else {
                  cd[event.senderID] = Math.floor(Date.now() / 1000) + (60 * 3);
                }
              }
              api.sendMessage("🔃Requesting... " + "\n\n Once at a time only please.....", event.threadID, event.messageID);
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
                ffmpegs(strm).audioBitrate(48).save(`${__dirname}/${data.join(" ").replace(/[^\w\s]/gi, '')}.mp3`).on("end", () => {
                  console.log(`Playing ${data.join(" ").replace(/[^\w\s]/gi, '')}`);
                  api.sendMessage({
                    body: "Here's what ya ordered!\n\n🎶Song Title: " + info.videoDetails.title + "\n\nEnjoy Listening!",
                    attachment: fs.createReadStream(`${__dirname}/${data.join(" ").replace(/[^\w\s]/gi, '')}.mp3`).on("end", async () => {
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
          }else if (input.startsWith("?help")) {
            let data = input.split(" ");
                        if (data.length < 2) {
                            api.sendMessage(" Commands List \n\n?help--for commands\n?play (title of a song)--for playing a song\n?motivation-- for motivational quotes\n?wiki (word)--for wiki search\n?leech--for direct links in YouTube\n?tiktokdl (TikTok) --for downloading videos from tiktok\nKill: Unsent-- for custom thread\nActivate: Unsent--for custom thread\nDisable: Unsent--for all thread\nEnable: Unsent--for all thread\n\n\nMade By Dev✒️ GaBaybay ✒️", event.threadID, event.messageID);
                        }
          }else if(input.startsWith("?wiki")) {
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
              }catch (err) {
                api.sendMessage(`⚠️${err.message}`, event.threadID, event.messageID);
              }
            }
          }else if (input.startsWith("?motivation")) {
            let rqt = qt();
            rqt.then((response) => {
              api.sendMessage(response.q + "\n- " + response.a, event.threadID, event.messageID);
            })
          }
          if(input2.includes("hahaha") && event.senderID != 100010194304889){
            api.setMessageReaction("😆", event.messageID, (err) => {}, true)
          }
          if((input2.includes("good morning" ) || input2.includes("magandang umaga")) && (myDay >= 6 && myDay < 12) && !morning.includes(event.senderID) && event.senderID != 100010194304889){
            api.getUserInfo(event.senderID, (err, data) => {
              if(err){
                console.log(err)
              }else{
                api.sendMessage("Good morning."  || "Magandang umaga.", event.threadID, event.messageID)
                morning += event.senderID + " "
                afternoon = ""
                evening = ""
                night  = ""
              }
            } )
          }else if((input2.includes("good afternoon") || input2.includes("magandang hapon")) && (myDay >= 12 && myDay < 18) && !afternoon.includes(event.senderID) && event.senderID != 100010194304889){           
                 api.getUserInfo(event.senderID, (err, data) => {
                   if(err){
                     console.log(err)
                   }else{
                          api.sendMessage("Good afternoon." , event.threadID, event.messageID)
                          morning = ""
                      afternoon += event.senderID + " "
                        evening = ""
                        night = ""
                     }
                            })
                         }
          else if((input2.includes("good evening") || input2.includes("magandang gabi")) && (myDay >= 18 && myDay < 22) && !evening.includes(event.senderID) && event.senderID != 100010194304889){
            api.getUserInfo(event.senderID, (err, data) => {
              if(err){
                console.log(err)
              }else{
                api.sendMessage("Good evening. ", event.threadID, event.messageID)
                morning = ""
                afternoon = ""
                evening += event.senderID + " "
                night = ""
              }
            })
          }else if(input2.includes("good night") && (myDay >= 22 || myDay < 6) && !night.includes(event.senderID) && event.senderID != 100010194304889){
            api.getUserInfo(event.senderID, (err, data) => {
              if(err){
                console.log(err)
              }else{
                api.sendMessage("Good Night, Sleep Well. Sweet dreams. ", event.threadID, event.messageID)
                morning = ""
                afternoon = ""
                evening = ""
                night += event.senderID + " "
              }
            })
          }
          }
      break;
      case"message_unsend":
      if(unsentOn && !unsentGC.includes(event.threadID)){
        if (!vips.includes(event.senderID)) {
          let d = msgs[event.messageID];
          if (typeof (d) == "object") {
            api.getUserInfo(event.senderID, (err, data) => {
              if (err){
                return console.error(err);
              }else {
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
                }else if (d[0] == "gif") {
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
                }else if (d[0] == "sticker") {
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
                }else if (d[0] == "vid") {
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
                }else if (d[0] == "vm") {
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
          }else {
            api.getUserInfo(event.senderID, (err, data) => {
              if (err) return console.error(err);
              else {
                api.sendMessage(data[event.senderID]['name'] + " unsent this message: \n\n" + msgs[event.messageID] + "\n\nAnti Unsent By Dev. ✒️ GaBaybay ✒️", event.threadID);
              }
            });
          }
          }
      break;
      }
    }
  });
});