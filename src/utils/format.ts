class FormatUtil {
  static formatTimeToMMSS(timeSecond: number) {
    const formattedMinute = String(Math.floor(timeSecond / 60)).padStart(
      2,
      '0',
    );
    const formattedSecond = String(Math.floor(timeSecond % 60)).padStart(
      2,
      '0',
    );
    return `${formattedMinute}:${formattedSecond}`;
  }

  static formatTextEllipsis(text: string, maxLength: number) {
    return text
      .slice(0, maxLength + 1)
      .concat(text.length > maxLength ? '...' : '');
  }
}

export default FormatUtil;
