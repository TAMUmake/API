export class Settings {
    // API Endpoints
    public static INVALID_MESSAGE = "Invalid request. Please try again.";
    public static DISABLED_MESSAGE = "API Endpoint has been disabled. Please try again later.";
    public static UNAUTHORIZED_MESSAGE = "Please login through the website before using this endpoint.";
}

export class MiscSettings {
    public static getStats = true;
}

export class UserSettings {
    public static createUserMetaData = true;
    public static updateUserCount = true;
    public static getAppliedStatus = true;
    public static registerUser = true;
}