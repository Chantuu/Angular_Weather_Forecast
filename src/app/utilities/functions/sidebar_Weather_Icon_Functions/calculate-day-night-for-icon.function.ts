/**
 * This helper function is used to calculate, if it is night or day based on the current time and return boolean value,
 * where true represents night and false day. Using this, parent function/method will choose corresponding icon.
 *
 * @return Boolean - Boolean, where true represents night and false day.
 */
export function calculateDayNightForIcon() {
    // Setup current time and limits for correct calculation
    const currentTime = new Date(Date.now());
    const nightTimeLimit = new Date(Date.now());
    const dayTimeLimit = new Date(Date.now());

    // Set time limit for night
    nightTimeLimit.setHours(20);
    nightTimeLimit.setMinutes(0);
    nightTimeLimit.setSeconds(0);

    // Set time limit for day
    dayTimeLimit.setDate(dayTimeLimit.getDate() + 1); // This line is for below comparison operation to work properly, as dayTimeLimit must be next day for correct time calculation
    dayTimeLimit.setHours(6);
    dayTimeLimit.setMinutes(0);
    dayTimeLimit.setSeconds(0);

    // This condition is checks if current time is within night range. If true, it's night. Otherwise, it's day.
    return currentTime >= nightTimeLimit && currentTime < dayTimeLimit;
}