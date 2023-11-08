/**
 * Useful tools for developing presences
 * @link https://docs.premid.app/en/dev/presence/class
 */
// @ts-ignore
class Presence {
    /**
     * Create a new Presence
     */
    constructor(presenceOptions) {
        this._events = {};
        this.trayTitle = "";
        this.playback = true;
        this.internalPresence = {};
        this.port = chrome.runtime.connect({ name: "devHelper" });
        this.genericStyle = "font-weight: 800; padding: 2px 5px; color: white;";
        this.presenceStyle = "";
        this.clientId = presenceOptions.clientId;
        this.injectOnComplete = presenceOptions.injectOnComplete || false;
        this.appMode = presenceOptions.appMode || false;
        // @ts-ignore
        this.metadata = PreMiD_Metadata;
        this.presenceStyle = `background: ${this.metadata.color}; color: ${this.getFontColor(this.metadata.color)};`;
        window.addEventListener("PreMiD_TabPriority", (data) => {
            if (!data.detail)
                this.clearActivity();
        });
    }
    //TODO Make this return the active presence shown in Discord.
    /**
     * Get the current activity
     * @link https://docs.premid.app/en/dev/presence/class#getactivity
     */
    getActivity() {
        return this.internalPresence;
    }
    /**
     * Sets the presence activity and sends it to the application.
     * @param data PresenceData or Slideshow
     * @param playback Is presence playing
     * @link https://docs.premid.app/dev/presence/class#setactivitypresencedata-boolean
     */
    setActivity(data = {}, playback = true) {
        if (data instanceof Slideshow)
            data = data.currentSlide;
        // Remove empty strings
        for (let [k, v] of Object.entries(data)) {
            if (typeof v === "string" && !v)
                delete data[k];
        }
        // Round decimal timestamps
        data.startTimestamp = Math.floor(data.startTimestamp);
        data.endTimestamp = Math.floor(data.endTimestamp);
        this.internalPresence = data;
        this.playback = playback;
        // Fix 00:00 timestamp bug
        if (data.endTimestamp && Date.now() >= data.endTimestamp)
            playback = false;
        this.sendData({
            clientId: this.clientId,
            presenceData: this.internalPresence,
            trayTitle: this.trayTitle,
            playback: this.playback
        });
    }
    /**
     * Clears the activity shown in discord as well as the Tray and keybinds
     * @link https://docs.premid.app/dev/presence/class#clearactivity
     */
    clearActivity() {
        this.internalPresence = {};
        this.trayTitle = "";
        const data = {
            clientId: undefined,
            presenceData: {},
            playback: false,
            hidden: true
        };
        if (this.appMode)
            data.clientId = this.clientId;
        //* Send data to app
        this.sendData(data);
    }
    /**
     * Sets the tray title on the Menubar in Mac OS (Mac OS only, supports ANSI colors)
     * @param trayTitle Tray Title
     * @link https://docs.premid.app/dev/presence/class#settraytitlestring
     * @since 2.0-BETA3
     */
    setTrayTitle(trayTitle = "") {
        this.trayTitle = trayTitle;
    }
    /**
     * Get translations from the extension
     * @param strings String object with keys being the key for string, keyValue is the string value
     * @param language Language
     * @link https://docs.premid.app/dev/presence/class#getstringsobject
     */
    getStrings(strings, language) {
        return new Promise(resolve => {
            const listener = function (detail) {
                window.removeEventListener("PreMiD_ReceiveExtensionData", listener);
                resolve(detail.strings);
            };
            // TODO currently unhandled
            this.port.postMessage({ action: "getStrings", language, strings });
            //* Receive data from PreMiD
            window.addEventListener("PreMiD_ReceiveExtensionData", (detail) => listener(detail.detail));
            const pmdRED = new CustomEvent("PreMiD_RequestExtensionData", {
                detail: {
                    strings: strings,
                    language: language ?? null
                }
            });
            //* Trigger the event
            window.dispatchEvent(pmdRED);
        });
    }
    /**
     * Get letiables from the actual site
     * @param {Array} letiables Array of letiable names to get
     * @example let pagelet = getPageletiable('pagelet') -> "letiable content"
     * @link https://docs.premid.app/presence-development/coding/presence-class#getpageletiable-string
     */
    getPageletiable(letiable) {
        return new Promise(resolve => {
            let script = document.createElement("script"), _listener = (data) => {
                script.remove();
                resolve(JSON.parse(data.detail));
                window.removeEventListener("PreMiD_Pageletiable", _listener, true);
            };
            window.addEventListener("PreMiD_Pageletiable", _listener);
            script.id = "PreMiD_Pageletiables";
            script.appendChild(document.createTextNode(`
        var pmdPL = new CustomEvent("PreMiD_Pageletiable", {detail: (typeof window["${letiable}"] === "string") ? window["${letiable}"] : JSON.stringify(window["${letiable}"])});
        window.dispatchEvent(pmdPL);
      `));
            (document.body || document.head || document.documentElement).appendChild(script);
        });
    }
    /**
     * Returns an array of the past 100 logs, you can filter these logs with a RegExp.
     * @param regExp Filter of the logs
     */
    async getLogs(regExp) {
        let logs = (await this.getPageletiable("console")).logs;
        if (regExp) {
            logs = logs.filter(l => typeof l === "string" && new RegExp(regExp).test(l));
        }
        if (logs == undefined)
            logs = [];
        return logs;
    }
    /**
     * Returns extension version
     * @param onlyNumeric version nubmer without dots
     * @link https://docs.premid.app/en/dev/presence/class#getextensionversionboolean
     * @since 2.1
     */
    getExtensionVersion(onlyNumeric = true) {
        if (onlyNumeric)
            return parseInt(chrome.runtime.getManifest().version.replace(/\D/g, ""));
        return chrome.runtime.getManifest().version;
    }
    /**
     * Get a setting from the presence metadata
     * @param setting Id of setting as defined in metadata
     * @link https://docs.premid.app/dev/presence/class#getsettingstring
     * @since 2.1
     */
    getSetting(setting) {
        return new Promise((resolve, reject) => {
            chrome.storage.local.get(`pSettings_${this.metadata.service}`, settings => {
                const settingValue = settings[`pSettings_${this.metadata.service}`].find(s => s.id === setting);
                const res = settingValue !== undefined
                    ? settingValue.value
                    : this.metadata.settings[setting]
                        ? this.metadata.settings[setting].value
                        : undefined;
                if (res !== undefined)
                    resolve(res);
                else
                    reject(res);
            });
        });
    }
    /**
     * Hide a setting
     * @param setting Id of setting / Array of setting Id's
     * @link https://docs.premid.app/dev/presence/class#hidesettingstring
     * @since 2.1
     */
    hideSetting(settings) {
        return new Promise((resolve, reject) => {
            chrome.storage.local.get(`pSettings_${this.metadata.service}`, storageSettings => {
                const errors = [];
                if (!Array.isArray(settings))
                    settings = [settings];
                settings.forEach(setting => {
                    let settingToHide = storageSettings[`pSettings_${this.metadata.service}`].find(s => s.id === setting);
                    if (!settingToHide)
                        errors.push(`Setting "${setting}" does not exist.`);
                    else {
                        settingToHide.hidden = true;
                    }
                });
                chrome.storage.local.set(storageSettings, resolve);
                if (errors.length > 0)
                    reject(errors);
            });
        });
    }
    /**
     * Show a setting
     * @param setting Id of setting / Array of setting Id's
     * @link https://docs.premid.app/dev/presence/class#showsettingstring
     * @since 2.1
     */
    showSetting(settings) {
        return new Promise((resolve, reject) => {
            chrome.storage.local.get(`pSettings_${this.metadata.service}`, storageSettings => {
                const errors = [];
                if (!Array.isArray(settings))
                    settings = [settings];
                settings.forEach(setting => {
                    let settingToShow = storageSettings[`pSettings_${this.metadata.service}`].find(s => s.id === setting);
                    if (!settingToShow)
                        errors.push(`Setting "${setting}" does not exist.`);
                    else {
                        settingToShow.hidden = false;
                    }
                });
                chrome.storage.local.set(storageSettings, resolve);
                if (errors.length > 0)
                    reject(errors);
            });
        });
    }
    /**
     * Similar to `getTimestamps` but takes in a media element and returns snowflake timestamps
     * @param media Media object
     */
    getTimestampsfromMedia(media) {
        return this.getTimestamps(media.currentTime, media.duration);
    }
    /**
     * Converts time and duration integers into snowflake timestamps
     * @param {Number} elementTime Current element time seconds
     * @param {Number} elementDuration Element duration seconds
     */
    getTimestamps(elementTime, elementDuration) {
        const startTime = Date.now(), endTime = Math.floor(startTime / 1000) - elementTime + elementDuration;
        return [Math.floor(startTime / 1000), endTime];
    }
    /**
     * Converts a string with format `HH:MM:SS` or `MM:SS` or `SS` into an integer (Does not return snowflake timestamp)
     * @param format The formatted string
     */
    timestampFromFormat(format) {
        return format
            .split(":")
            .map(time => {
            return parseInt(time);
        })
            .reduce((prev, time) => 60 * prev + time);
    }
    /**
     * Converts a hex string into an RGB object
     * @param hex The hex string
     */
    hexToRGB(hex) {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, (_, r, g, b) => {
            return r + r + g + g + b + b;
        });
        const result = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
        return result
            ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            }
            : null;
    }
    /**
     * Calculates the font color based on the luminosity of the background
     * @param backgroundHex The hex string of the background
     */
    getFontColor(backgroundHex) {
        const rgb = this.hexToRGB(backgroundHex), r = rgb.r, g = rgb.g, b = rgb.b, hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
        if (hsp < 127.5) {
            return "white";
        }
        else {
            return "black";
        }
    }
    /**
     * Console logs with an info message
     * @param message The log message
     */
    info(message) {
        console.log(`%cPreMiD%c${this.metadata.service}%cINFO%c ${message}`, this.genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;", this.genericStyle + this.presenceStyle, this.genericStyle + "border-radius: 0 25px 25px 0; background: #5050ff;", "color: unset;");
    }
    /**
     * Console logs with a success message
     * @param message The log message
     */
    success(message) {
        console.log(`%cPreMiD%c${this.metadata.service}%cSUCCESS%c ${message}`, this.genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;", this.genericStyle + this.presenceStyle, this.genericStyle +
            "border-radius: 0 25px 25px 0; background: #50ff50; color: black;", "color: unset;");
    }
    /**
     * Console logs with an error message
     * @param message The log message
     */
    error(message) {
        console.error(`%cPreMiD%c${this.metadata.service}%cERROR%c ${message}`, this.genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;", this.genericStyle + this.presenceStyle, this.genericStyle + "border-radius: 0 25px 25px 0; background: #ff5050;", "color: unset;");
    }
    /**
     * Creates a slideshow that allows for alternating between sets of
     * presence data at specific intervals
     */
    createSlideshow() {
        return new Slideshow();
    }
    /**
     * Sends data back to application
     * @param data Data to send back to application
     */
    sendData(data) {
        //* Send data to app
        const pmdUP = new CustomEvent("PreMiD_UpdatePresence", {
            detail: this.encryptData(encodeURIComponent(JSON.stringify(data)))
        });
        window.dispatchEvent(pmdUP);
    }
    /**
     * Generates a AES key from the app identifier
     */
    getEncryptionKey() {
        if (this.encryptionKey) {
            return this.encryptionKey;
        }
        // @ts-ignore
        const key = PreMiD_Identifier;
        let keySize;
        if (key.length >= 32) {
            keySize = 32;
        }
        else if (key.length >= 24) {
            keySize = 24;
        }
        else if (key.length >= 16) {
            keySize = 16;
        }
        else {
            throw new Error("String is not long enough to create encryption key.");
        }
        //@ts-expect-error
        this.encryptionKey = aesjs.utils.utf8.toBytes(key.substring(0, keySize));
        return this.encryptionKey;
    }
    /**
     * Encrypts a string using AES algorithm
     * @param data String to be encrypted
     */
    encryptData(data) {
        const key = this.getEncryptionKey();
        //@ts-expect-error
        const aesCtr = new aesjs.ModeOfOperation.ctr(key);
        //@ts-expect-error
        const textBytes = aesjs.utils.utf8.toBytes(data);
        const encryptedBytes = aesCtr.encrypt(textBytes);
        //@ts-expect-error
        const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
        return encryptedHex;
    }
    /**
     * Subscribe to events emitted by the extension
     * @param eventName EventName to subscribe to
     * @param callback Callback function for event
     * @link https://docs.premid.app/dev/presence/class#events
     */
    on(eventName, callback) {
        this._events[eventName] = callback;
        switch (eventName) {
            case "UpdateData":
                document.addEventListener("PreMiD_UpdateData", () => {
                    //* Run callback
                    if (this.injectOnComplete && document.readyState !== "complete")
                        return;
                    this._events[eventName]();
                });
                return;
            case "iFrameData":
                window.addEventListener("PreMiD_iFrameData", (data) => {
                    if (this.injectOnComplete && document.readyState !== "complete")
                        return;
                    this._events[eventName](data.detail);
                });
                return;
            default:
                console.error(Error(`${eventName} is not a valid event.`));
                return;
        }
    }
}
/**
 * Minimum amount of time in ms between slide updates
 */
const MIN_SLIDE_TIME = 5000;
/**
 * Represents a slideshow slide
 */
class SlideshowSlide {
    constructor(id, data, interval) {
        this.id = id;
        this.data = data;
        this.interval = interval;
    }
    get interval() {
        return this._interval;
    }
    set interval(interval) {
        if (interval <= MIN_SLIDE_TIME) {
            interval = MIN_SLIDE_TIME;
        }
        this._interval = interval;
    }
    /**
     * Updates the slide presenceData
     * Passing null will keep the original value
     * @param data The slide presenceData
     */
    updateData(data = null) {
        this.data = data || this.data;
    }
    /**
     * Updates the slide interval
     * Passing null will keep the original value
     * @param interval The slide interval
     */
    updateInterval(interval = null) {
        this.interval = interval || this.interval;
    }
}
/**
 * Controller for alternating between multiple sets of
 * presence data at specific intervals
 */
class Slideshow {
    constructor() {
        this.index = 0;
        this.slides = [];
        this.currentSlide = {};
        this.pollSlide();
    }
    /**
     * Sets the current slide
     */
    pollSlide() {
        if (this.index > this.slides.length - 1)
            this.index = 0;
        if (this.slides.length !== 0) {
            const slide = this.slides[this.index];
            this.currentSlide = slide.data;
            this.index++;
            setTimeout(() => {
                // necessary to keep 'this' bound
                this.pollSlide();
            }, slide.interval);
        }
        else {
            this.currentSlide = {};
            setTimeout(() => {
                // necessary to keep 'this' bound
                this.pollSlide();
            }, MIN_SLIDE_TIME);
        }
    }
    /**
     * Adds a slide to the queue
     * If a slide already exists with the given id, it will be updated with a new value
     * @param id The slide id
     * @param data The slide presenceData
     * @param interval Interval until next slide
     */
    addSlide(id, data, interval) {
        if (this.hasSlide(id))
            return this.updateSlide(id, data, interval);
        const slide = new SlideshowSlide(id, data, interval);
        this.slides.push(slide);
        return slide;
    }
    /**
     * Deletes a slide from the queue
     * @param id The slide id
     */
    deleteSlide(id) {
        this.slides = this.slides.filter(slide => slide.id !== id);
    }
    /**
     * Clears the queue
     */
    deleteAllSlides() {
        this.slides = [];
        this.currentSlide = {};
    }
    /**
     * Updates a slide already in queue
     * Passing null will keep the old value
     * @param id The slide id
     * @param data The slide presenceData
     * @param interval Interval until next slide
     */
    updateSlide(id, data = null, interval = null) {
        for (const slide of this.slides) {
            if (slide.id === id) {
                slide.updateData(data);
                slide.updateInterval(interval);
                return slide;
            }
        }
    }
    /**
     * Returns if a slide exists in the queue
     * @param id The slide id
     */
    hasSlide(id) {
        return this.slides.filter(slide => slide.id === id).length > 0;
    }
    /**
     * Returns all slides
     */
    getSlides() {
        return this.slides;
    }
}
/**
 * Is used to gather information from iFrames
 * @link https://docs.premid.app/en/dev/presence/iframe
 */
// @ts-ignore
class iFrame {
    constructor() {
        this._events = {};
    }
    /**
     * Send data from iFrames back to the presence script
     * @param data Data to send
     * @link https://docs.premid.app/dev/presence/class#iframedata
     */
    send(data) {
        const pmdIFD = new CustomEvent("PreMiD_iFrameData", {
            detail: data
        });
        document.dispatchEvent(pmdIFD);
    }
    /**
     * Returns the iframe url
     * @link https://docs.premid.app/dev/presence/iframe#geturl
     * @since 2.0-BETA3
     */
    getUrl() {
        return new Promise(async (resolve) => {
            const _listener = (data) => {
                resolve(data.detail);
                document.removeEventListener("PreMiD_iFrameURL", _listener, true);
            };
            document.addEventListener("PreMiD_iFrameURL", _listener);
            const pmdGIFU = new CustomEvent("PreMiD_GETiFrameURL");
            document.dispatchEvent(pmdGIFU);
        });
    }
    /**
     * Subscribe to events emitted by the extension
     * @param eventName
     * @param callback
     * @link https://docs.premid.app/dev/presence/class#updatedata
     */
    on(eventName, callback) {
        this._events[eventName] = callback;
        switch (eventName) {
            case "UpdateData": {
                document.addEventListener("PreMiD_UpdateData", () => {
                    //* Run callback
                    this._events[eventName]();
                });
                return;
            }
        }
    }
}
// @ts-ignore
window.Presence = Presence;
// @ts-ignore
window.iFrame = iFrame;
// @ts-ignore
window.Slideshow = Slideshow;
