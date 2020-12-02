export const getStringFromObject = (obj) => {
    let str = "";
    for (var key of Object.keys(obj)) {
        if (typeof obj[key] !== 'object') {
            str += obj[key] + " , ";
        }
    }

    return str.slice(0, str.length - 2);
}