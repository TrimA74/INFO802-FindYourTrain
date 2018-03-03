export class Utilities {
  /**
   * Convert seconds to hh-mm-ss format.
   * @param {number} totalSeconds - the total seconds to convert to hh- mm-ss
   **/
  public static SecondsTohhmmss (totalSeconds): string {
    const hours   = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
    let seconds = totalSeconds - (hours * 3600) - (minutes * 60);

    // round seconds
    seconds = Math.round(seconds * 100) / 100

    let result = (hours < 10 ? '0' + hours : hours);
    result += 'h' + (minutes < 10 ? '0' + minutes : minutes);
    result += 'min';
    return result.toString();
  }
}
