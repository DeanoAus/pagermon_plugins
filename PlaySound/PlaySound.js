function run(trigger, scope, data, config, callback) {
    try {
        if (!config.soundURL) {
            console.log("[PlaySound] Missing sound URL configuration, skipping...");
            return callback(data);
        }

        let shouldPlaySound = false;

        // Check if "Play for all messages" is enabled
        if (config.playForAll) {
            shouldPlaySound = true;
        } else if (config.regexPattern) {
            let regex = new RegExp(config.regexPattern, "i"); // Case-insensitive regex
            if (data.alias && regex.test(data.alias) || regex.test(data.address)) {
                shouldPlaySound = true;
            }
        }

        if (shouldPlaySound) {
            console.log(`[PlaySound] Playing sound for message: ${data.alias || data.address}`);

            // Pass sound info to the frontend via pluginData
            data.pluginData.playSound = {
                soundURL: config.soundURL
            };
        }

    } catch (error) {
        console.error("[PlaySound] Error:", error);
    }

    callback(data);
}

module.exports = {
    run: run
};
