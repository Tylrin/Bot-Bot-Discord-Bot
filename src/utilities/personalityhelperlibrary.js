module.exports = {
    chooseVoiceline: function (replies, message, custom) {
        const st = require("stjs");

        // Check for valid replies.
        if (!replies) return "none";

        var data = {
            "author": `${message.author.username}`,
            "guildName": message.guild.name,
            "mentionUser": message.guild.member(message.mentions.users.first()),
            "custom": custom
        }

        // Calculate response.
        let index = Math.floor((Math.random() * replies.length));
        let template = replies[index];
        
        let result = st.transform(template, data);
        console.log(template);
        // Get result.
        return result;
    }
}