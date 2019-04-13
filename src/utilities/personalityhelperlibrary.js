module.exports = {
    chooseMessageResponse: function (replies, message, custom) {
        const st = require("stjs");

        // Check for valid replies.
        if (!replies) return "none";

        var data = {
            "author": `${message.author.username}`,
            "guild": `${message.guild.name}`,
            "user": message.guild.member(message.mentions.users.first()),
            "channel": `${message.channel}`,
            "custom": custom
        }

        // Calculate response.
        let index = Math.floor((Math.random() * replies.length));
        let template = replies[index];
        
        // Fill in variables for template.
        let result = st.transform(template, data);

        // Get result.
        return result;
    }

    // chooseEventResponse: function (client) {}

    
}