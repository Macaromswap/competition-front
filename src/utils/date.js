import dayjs from 'dayjs'

export function unixToDate(unix, format = 'YYYY-MM-DD') {
    return dayjs.unix(unix).utc().format(format)
}

export const formatTime = (iso8601, buffer) => {
    const timestamp = dayjs(iso8601).add(buffer || 0, 'min');
    const now = dayjs();
    const diffInSeconds = now.diff(timestamp, 'second');

    const intervals = [
        { label: 'y', seconds: 31536000 },
        { label: 'm', seconds: 2592000 },
        { label: 'd', seconds: 86400 },
        { label: 'h', seconds: 3600 },
        { label: 'min', seconds: 60 },
        { label: 'second', seconds: 1 },
    ];

    for (const interval of intervals) {
        const intervalInSeconds = interval.seconds;
        const diffInInterval = Math.floor(diffInSeconds / intervalInSeconds);

        if (diffInInterval >= 1) {
            return { num: diffInInterval, label: interval.label }
        }
    }

    return 'recently';
}