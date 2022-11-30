export function convertToddMMYYY(date = "") {
    const temp = date.split("-");
    let res = "";
    for (let i = temp.length - 1; i >= 0; i--) {
        if (i == 0) {
            res += temp[i];
        } else {
            res += temp[i] + "/";
        }
    }
    return res;
}
