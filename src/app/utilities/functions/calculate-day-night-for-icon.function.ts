/**
 * This helper function calculates, if it is night or day based on the current time and returns boolean value,
 * where true represents night and false day.
 *
 * @param currentOptionalTime - Optional Date value to calculate day/night based on that value.
 * @return Boolean - Boolean, where true represents night and false day.
 */
export function calculateDayNightForIcon(currentOptionalTime?: Date) {

    // Setup current time and limits for correct
    let currentTime: Date;
    const nightTimeLimit = new Date(Date.now());
    const dayTimeLimit = new Date(Date.now());

    // Set current time based provided time value
    if (currentOptionalTime) {
        currentTime = currentOptionalTime;
    } else {
        currentTime = new Date(Date.now());
    }

    // Set time limit for night
    nightTimeLimit.setHours(20);
    nightTimeLimit.setMinutes(0);
    nightTimeLimit.setSeconds(0);

    // Set time limit for day
    dayTimeLimit.setHours(6);
    dayTimeLimit.setMinutes(0);
    dayTimeLimit.setSeconds(0);

    // This condition is checks if current time is within night range. If true, it's night. Otherwise, it's day.
    return currentTime >= nightTimeLimit || currentTime < dayTimeLimit;
}