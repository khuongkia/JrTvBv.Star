module.exports.config = {
	name: "restart",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "JRT",
	description: "Khởi Động Lại Bot.",
	commandCategory: "Hệ thống admin-bot",
	cooldowns: 0
        };
module.exports.run = ({event, api}) =>api.sendMessage("Địt con mẹ chờ bố mày 1p khởi động lại ... ",event.threadID, () =>process.exit(1))