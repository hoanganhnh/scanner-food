import { format, parseISO } from "date-fns";

export function groupByKeyDay(data = [], key = "") {
    const temp = {};
    data.forEach((item) => {
        const day = format(parseISO(item[key]), "dd/MM/yyyy");
        if (temp[day]) {
            temp[day].push(item);
        } else {
            temp[day] = [item];
        }
    });
    const result = Object.keys(temp).map((k) => ({
        [`${key}`]: k,
        data: temp[k],
    }));
    return result;
}
