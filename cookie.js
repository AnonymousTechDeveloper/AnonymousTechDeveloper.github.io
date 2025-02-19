const defaultCookieActiveDays = 30;
const daysToMillisecs = (days) => days*24*60*60*1000;

const bakeCookie = (key, value, expDays = defaultCookieActiveDays) => {
    const currentTime = (new Date()).getTime();
    const expireTime = (new Date());
    expireTime.setTime(currentTime + daysToMillisecs(defaultCookieActiveDays)); // set expiration time to `expDays` days after current time.
    
    document.cookie = `${key}=${value}; expires=${expireTime.toUTCString()}; path=/`;
}

const tasteCookie = (key) => {
    const cookie = document.cookie;
    
    const searchKey = RegExp(`(?:(${key}=))(.*?)(;|$)`);
    const keyMatches = searchKey.exec(cookie);

    if (keyMatches) return keyMatches[2];
    return null;
}

const throwCookie = (key) => {
    try {
        document.cookie = `${key}=;expires=${(new Date(0)).toUTCString()};path=/`;
        return 0;
    }
    catch (error) {
        return error;
    }
}

const throwAllCookies = () => {
    let cookie = document.cookie;
    const searchKey = RegExp("(^|;) ?(.*?)=");
    let matchKeys = searchKey.exec(cookie);
    let failure = 0;

    while (matchKeys !== null) {
        matchKeys = searchKey.exec(cookie);
        console.log(matchKeys)
        if (matchKeys === null) return;
        if (throwCookie(matchKeys[2]) !== 0) failure = 1;
        
        cookie = cookie.replace(RegExp(` ?(?:(${matchKeys[0]}))(.*?)(;|$)`), "");
    }

    return failure;
}