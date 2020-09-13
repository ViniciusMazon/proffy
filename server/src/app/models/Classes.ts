import db from '../../database/connections';
import convertMinutesToHour from '../../utils/convertMinutesToHour';

class Classes {
  async getClassScheduleByUserId(id: number) {
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

  async getClassScheduleByClassId(id: number) {
    const classData = await db('classes').where('id', id).first();
    if (classData) {
      const scheduleData = await db('class_schedule').where('class_id', id);
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

    return;
  }

  async destroy(week_day: number) {
    await db('class_schedule').where('week_day', week_day).delete();
  }
}


export default new Classes();
