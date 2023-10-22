package com.cm.cinematchapp.constants;

/**
 * The `EntityConstants` interface provides a set of constant values that are used throughout the application
 * for defining constraints, keys, and other entity-related configurations.
 */
public interface EntityConstants {

    static final int kMinNameLen = 3;
    static final int kMaxNameLen = 32;
    static final int kMinUsernameLen = 6;
    static final int kMaxUsernameLen = 16;
    static final int kMinUserPasswordLen = 8;
    static final int kMaxUserPasswordLen = 20;

    //used for JWT token generation and verification.
    static final String kSecuritySignKey = "E24Sxcw1SQasd3DSAds3";

    //60 minutes time for session
    static final int kSessionTimeout = 1000 * 60 * 60;

    static final String kAvatarPath = System.getProperty("user.dir") + "/backend/avatars/";
    static final String kDefaultAvatar = System.getProperty("user.dir") + "/backend/avatars/default_avatar.png";





}
