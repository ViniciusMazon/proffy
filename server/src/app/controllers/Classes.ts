import { Request, Response } from 'express';
import db from '../../database/connections';
import classesModel from '../models/Classes';
import convertHourToMinutes from '../../utils/convertHourToMinutes';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

class Classes {
  async store(req: Request, res: Response) {
    const {
      id: user_id,
      name,
      surname,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule
    } = req.body;

    const trx = await db.transaction();

    try {
      await trx('users').where('id', '=', user_id).update({
        name,
        surname,
        avatar,
        whatsapp,
        bio
      });

      const classExists = await trx('classes').where('user_id', user_id);
      if (classExists.length) {
        await trx('classes').where('user_id', '=', user_id).update({ subject, cost });
      } else {
        await trx('classes').insert({ subject, cost, user_id });
      }

      const { id: class_id } = await trx.select('id').from('classes').where('user_id', user_id).first();

      await trx('class_schedule').where('class_id', class_id).del();

      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to)
        };
      });

      await trx('class_schedule').insert(classSchedule);
      await trx.commit();
      return res.status(201).send();
    } catch (err) {
      await trx.rollback();
      return res.status(400).json({
        error: 'Unexpected error while creating a new class'
      });
    }
  }

  async index(req: Request, res: Response) {
    const filters = req.query;

    const week_day = filters.week_day as string;
    const subject = filters.subject as string;
    const time = filters.time as string;

    if (!filters.week_day || !filters.subject || !filters.time) {
      return res.status(400).json({
        error: 'Missing filters to search classes'
      });
    }

    const timeInMinutes = convertHourToMinutes(time);
    const classes = await db('classes')
      .whereExists(function () {
        this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
          .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
          .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
      })
      .where('classes.subject', '=', subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.name', 'users.avatar', 'users.whatsapp', 'users.bio']);
    return res.json(classes);
  }

  async show(req: Request, res: Response) {
    try {
      const classes = await classesModel.getClassScheduleByUserId(Number(req.params.id));
      return res.status(200).json(classes);
    } catch (error) {
      return res.status(400).json({ message: 'Ocorreu um erro inesperado, tente novamente mais tarde!' })
    }
  }

  async delete(req: Request, res: Response) {
    const { classId, weekDay } = req.params;
    const classSchedule = await classesModel.getClassScheduleByClassId(Number(classId));
    if (classSchedule) {
      classSchedule.schedule.map(async (scheduleItem) => {
        if (Number(scheduleItem.week_day) === Number(weekDay)) {
          await classesModel.destroy(Number(weekDay));
        }
      });
      return res.status(200).send();
    }
    return res.status(400).json({ message: 'Não foi possível encontrar uma classe' });
  }
}

export default new Classes();
