/**
 * This type represents city, which contains necessary information.
 */
export type CityData = {
  /**
   * Id of the city object, used to differentiate this object from other objects.
   */
  id: string;

  /**
   * Name of the city
   */
  cityName: string;

  /**
   * Latitude of the city
   */
  latitude: string;

  /**
   * Longitude of the city
   */
  longitude: string;
}