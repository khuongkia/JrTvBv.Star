module.exports.config = {
    name: "tagy",
    version: "1.0.0",
    hasPermssion: 1,
    credits: "JRT",
    description: "Tag liên tục người bạn tag trong 3 lần\nCó thể gọi là gọi hồn người đó",
    commandCategory: "Tag",
    usages: "tagy @tag",
    cooldowns: 10,
    dependencies: {
        "fs-extra": "",
        "axios": ""
    }
}

module.exports.run = async function({ api, args, Users, event}) {
    var mention = Object.keys(event.mentions)[0];
    if(!mention) return api.sendMessage("Cần phải tag 1 người bạn muốn chửi", event.threadID);
    let data = await api.getUserInfo(mention);
    let name = data[parseInt(mention)].name;
    var arraytag = [];
        arraytag.push({id: mention, tag: name});
    var a = function (a) { api.sendMessage(a, event.threadID); }
a("????? !");
setTimeout(() => {a({body: "Hiện hồn ra đây bbi ơi :<" + " " + name, mentions: arraytag})}, 3000);
setTimeout(() => {a({body: "con lợn này mày đâu rồi" + " " + name, mentions: arraytag})}, 5000);
setTimeout(() => {a({body: "có người kêu mày kìa" + " " + name, mentions: arraytag})}, 7000);
  }