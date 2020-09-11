import db from '../../database/connections';
import convertMinutesToHour from '../../utils/convertMinutesToHour';

class Classes {
  async getClassScheduleById(id: number) {
    const classData = await db('classes').where('user_id', id).first();
    const scheduleData = await db('class_schedule').where('class_id', classData.id);
    const schedule = scheduleData.map(scheduleItem => {
      return {
        id,
        week_day: scheduleItem.week_day,
        from: convertMinutesToHour(scheduleItem.from),
        to: convertMinutesToHour(scheduleItem.to)
      };
    });

    const data = {
      ...classData,
      schedule
    }
    return data;
  }
}


export default new Classes();
