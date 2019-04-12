module.exports = {
    chooseVoiceline: function (replies) {
        // Check for valid replies.
        if (!replies) return "none";

        // Calculate response.
        let index = Math.floor((Math.random() * replies.length));
        let result = "" + replies[index] + "";
        console.log(result);
        // Get result.
        return result;
    } 
}