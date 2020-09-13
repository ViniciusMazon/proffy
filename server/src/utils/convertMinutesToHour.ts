export default function convertMinutesToHour(time: number): string {

  const hour = time / 60;
  const minutes = time - (hour * 60);
  const timeInHours = `${hour}:${minutes}`;
  return timeInHours;
}
