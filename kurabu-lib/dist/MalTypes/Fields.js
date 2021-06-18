"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allFields = exports.extractFields = exports.fieldsToString = void 0;
function fieldsToString(fields) {
    var entries = Object.entries(fields);
    var str = "";
    for (const key in entries) {
        var entry = entries[key];
        if (str.length > 0) {
            str += ",";
        }
        str += entry[0];
        if (entry[1] != true && entry[1] != false) {
            str += `{${fieldsToString(entry[1])}}`;
        }
    }
    return str;
}
exports.fieldsToString = fieldsToString;
function extractFields(str) {
    var subject = str;
    if (subject[0] == "{") {
        subject = subject.substr(1, subject.length);
    }
    var currentObject = "";
    var createdObj = {};
    function addObject(str, val) {
        if (str == "")
            return;
        createdObj[currentObject] = val;
        currentObject = "";
    }
    function skipSubject() {
        subject = subject.substr(1, subject.length);
    }
    while (subject.length > 0) {
        var subjZero = subject[0];
        if (subjZero == " ") {
            skipSubject();
            if (subject.length == 0) {
                addObject(currentObject, true);
            }
            continue;
        }
        if (subjZero == "{") {
            var res = extractFields(subject);
            addObject(currentObject, res.fields);
            subject = res.remaining;
            continue;
        }
        if (subjZero == "}") {
            addObject(currentObject, true);
            skipSubject();
            if (subject[0] == ",")
                skipSubject();
            return {
                fields: createdObj,
                remaining: subject,
            };
        }
        if (subjZero == ",") {
            addObject(currentObject, true);
            skipSubject();
            continue;
        }
        currentObject += subjZero;
        skipSubject();
        if (subject.length == 0) {
            addObject(currentObject, true);
        }
    }
    return {
        fields: createdObj,
        remaining: "",
    };
}
exports.extractFields = extractFields;
function allFields() {
    return {
        id: true,
        title: true,
        main_picture: true,
        alternative_titles: true,
        start_date: true,
        end_date: true,
        synopsis: true,
        mean: true,
        rank: true,
        popularity: true,
        num_list_users: true,
        num_scoring_users: true,
        nsfw: true,
        created_at: true,
        updated_at: true,
        media_type: true,
        status: true,
        genres: true,
        my_list_status: true,
        num_episodes: true,
        start_season: true,
        broadcast: true,
        source: true,
        average_episode_duration: true,
        rating: true,
        pictures: true,
        background: true,
        related_anime: true,
        related_manga: true,
        recommendations: true,
        studios: true,
        statistics: true,
    };
}
exports.allFields = allFields;
