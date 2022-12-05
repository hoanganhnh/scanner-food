import { formatDistance, parseISO } from "date-fns";

export const formatTime = (dateString) => {
    const dateParts = dateString.split("/");
    const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    return dateObject;
};

export const timeAgo = (timestamp) => {
    const distance = formatDistance(parseISO(timestamp), Date.now(), {
        addSuffix: true,
    });
    return distance.substring(distance.indexOf(distance.match(/\d+/g)));
};
