export class DateUtils {
  /**
   * Gets relative time description
   */
  static getRelativeTime(date: Date): string {
    const days = this.daysSince(date);
    
    if (days === 0) return 'Heute';
    if (days === 1) return 'Gestern';
    if (days <= 7) return `vor ${days} Tagen`;
    if (days <= 30) return `vor ${Math.floor(days / 7)} Wochen`;
    
    return `vor ${Math.floor(days / 30)} Monaten`;
  }

  /**
   * Determines if plant needs watering based on last watering date
   */
  static needsWatering(lastWateredDate: Date | undefined, daysBetweenWatering = 7): boolean {
    if (!lastWateredDate) return true;
    return this.daysSince(lastWateredDate) >= daysBetweenWatering;
  }

  /**
   * Determines if plant needs watering today
   */
  static needsWateringToday(lastWateredDate: Date | undefined, daysBetweenWatering = 7): boolean {
    if (!lastWateredDate) return true;
    return this.daysSince(lastWateredDate) >= daysBetweenWatering;
  }

  /**
   * Determines if plant needs watering tomorrow
   */
  static needsWateringTomorrow(lastWateredDate: Date | undefined, daysBetweenWatering = 7): boolean {
    if (!lastWateredDate) return false;
    return this.daysSince(lastWateredDate) === (daysBetweenWatering - 1);
  }

  /**
   * Determines if plant hasn't been watered for more than the specified interval
   */
  static notWateredForMoreThanInterval(lastWateredDate: Date | undefined, daysBetweenWatering = 7): boolean {
    if (!lastWateredDate) return true;
    return this.daysSince(lastWateredDate) > daysBetweenWatering;
  }

  /**
   * Determines if plant hasn't been watered for more than a week
   * @deprecated Use notWateredForMoreThanInterval instead
   */
  static notWateredForMoreThanWeek(lastWateredDate: Date | undefined): boolean {
    return this.notWateredForMoreThanInterval(lastWateredDate, 7);
  }

  /**
   * Calculates days since a given date (based on calendar days, not exact time)
   */
  private static daysSince(date: Date): number {
    const now = new Date();
    const givenDate = new Date(date);
    
    // Reset time to midnight for both dates to compare only calendar days
    now.setHours(0, 0, 0, 0);
    givenDate.setHours(0, 0, 0, 0);
    
    const diffTime = now.getTime() - givenDate.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  }
}
