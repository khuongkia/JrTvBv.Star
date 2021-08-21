module.exports.config = {
	name: "cony",
	version: "1.0.0", 
	hasPermssion: 0,
	credits: "JRT",
	description: "Tỉ lệ có Ny của bạn trong năm nay",
	commandCategory: "Game", 
	usages: "", 
	cooldowns: 0,
	dependencies: [] 
};
module.exports.run = async function({ api, event, Users }) {
    var tle = Math.floor(Math.random() * 101);
    var name = (await Users.getData(event.senderID)).name
        var msg = {body: `🎉Chúc mừng ${name}\n🤤Tỉ lệ có người yêu của bạn là: ${tle}%\nNếu bạn có người đó thì hãy yêu thương thật lòng nhé >,< <3`}
        return api.sendMessage(msg, event.threadID, event.messageID)
      }
