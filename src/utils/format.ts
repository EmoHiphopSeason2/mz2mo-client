class FormatUtil {
    static formatTimeToMMSS(timeSecond: number) {
        const formattedMinute = String(Math.floor(timeSecond / 60)).padStart(2, '0');
        const formattedSecond = String(Math.floor(timeSecond % 60)).padStart(2, '0');
        return `${formattedMinute}:${formattedSecond}`
    }
}

export default FormatUtil