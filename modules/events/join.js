  ﻿module.exports.config = {
	name: "joinNoti",
	eventType: ["log:subscribe"],
	version: "1.0.3",
	credits: "Mirai Team",
	description: "Thông báo bot hoặc người vào nhóm",
	dependencies: {
		"fs-extra": ""
	}
};

module.exports.run = async function({ api, event, Users }) {
	const { join } = global.nodemodule["path"];
	const { threadID } = event;
	if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
		api.changeNickname(`[ ${global.config.PREFIX} ] • ${(!global.config.BOTNAME) ? "Bot của JRT <3" : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
		return api.sendMessage(`Bot đã được kích hoạt hoàn tất. Connected successfully!\nCảm ơn bạn đã sử dụng con bot này, chúc bạn sử dụng vui vẻ UwU <3\nĐiều khoản sử dụng bot trong box:\n⚠ Vui lòng chấp hàn nghiêm chỉnh để tránh bị hạn chế dùng lệnh ( user ban )\n1: Không spam lệnh bot, spam prefix quá nhiều gây die bot,cp....\n2: Không chửi bot vì nó hoạt động 100% là máy!\n3: Không lạm dụng lệnh của bot mà spam....\n4: Không lạm dụng các chửi năng của bot vào việc xấu\n5: Xài lệnh ngu thì đừng có chửi, thời đại 4.0 rồi văn minh lên...\n6: Nếu phát hiện sẽ bị ăn ban (là không sử dụng được bot nữa)\n7: Chửi bot nó sẽ tự động out nên là đừng thắc mắc và khi out nó sẽ để lại tin nhắn cho các bạn\n8: Xin cảm ơn đã đọc...UwU\n© Admin: Nguyễn Hải Đăng`, threadID);
	}
	else {
		try {
			const { createReadStream, existsSync, mkdirSync } = global.nodemodule["fs-extra"];
			let { threadName, participantIDs } = await api.getThreadInfo(threadID);

			const threadData = global.data.threadData.get(parseInt(threadID)) || {};
			const path = join(__dirname, "cache", "joinGif");
			const pathGif = join(path, `${threadID}.gif`);

			var mentions = [], nameArray = [], memLength = [], i = 0;
			
			for (id in event.logMessageData.addedParticipants) {
				const userName = event.logMessageData.addedParticipants[id].fullName;
				nameArray.push(userName);
				mentions.push({ tag: userName, id });
				memLength.push(participantIDs.length - i++);

				if (!global.data.allUserID.includes(id)) {
					await Users.createData(id, { name: userName, data: {} });
					global.data.allUserID.push(id);
					logger(global.getText("handleCreateDatabase", "newUser", id), "[ DATABASE ]");
				}
			}
			memLength.sort((a, b) => a - b);
			
			(typeof threadData.customJoin == "undefined") ? msg = "👋Hi cậu {name}.\nChào mừng cậu đã đến với {threadName} là 1 trong những thế hệ trẻ tuổi sáng giá hiện nay⚜.\n{type} là thành viên sáng giá thứ {soThanhVien} của nhóm 🤤\nKhi vô các bạn hãy dùng lệnh để xem luật box nhé:\n/-rule" : msg = threadData.customJoin;
			msg = msg
			.replace(/\{name}/g, nameArray.join(', '))
			.replace(/\{type}/g, (memLength.length > 1) ?  'Các cậu' : 'Cậu')
			.replace(/\{soThanhVien}/g, memLength.join(', '))
			.replace(/\{threadName}/g, threadName);

			if (existsSync(path)) mkdirSync(path, { recursive: true });

			if (existsSync(pathGif)) formPush = { body: msg, attachment: createReadStream(pathGif), mentions }
			else formPush = { body: msg, mentions }

			return api.sendMessage(formPush, threadID);
		} catch (e) { return console.log(e) };
	}
}