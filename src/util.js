/**
 * Used to get a random key from an object. E.g. for an object of the form
 *  {"a": "b",
 *   "c": "d"},
 * this function randomly returns either "a" or "c".
 *
 * returns {string}
 */
const randomObjectKey = function (obj) {
    var keys = Object.keys(obj);
    return keys[ keys.length * Math.random() << 0];
};
