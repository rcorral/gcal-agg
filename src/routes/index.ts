import * as moment from 'moment-timezone'

import configuration from '../configuration'
import { Request, Response, Next } from '../../typings/global.types'
import { Event, getGCalEvents } from '../importers/gcal'

const getAllEvents = (): Promise<Array<Event>> => {
  const start = moment()
    .date(1)
    .hour(0)
    .minute(0)
    .second(0)
    .millisecond(0)
    .toISOString(true)
    .replace('.000', '')
  const end = moment()
    .date(moment().daysInMonth())
    .hour(0)
    .minute(0)
    .second(0)
    .millisecond(0)
    .toISOString(true)
    .replace('.000', '')

  const promises = configuration.calendars.map((cal) => {
    const path = configuration.calendarTypes.gcal.path(cal.path, cal.calendarId, start, end)
    return getGCalEvents(path)
  })

  return Promise.all(promises).then((results) => {
    return results.reduce((memo, events) => {
      return memo.concat(events)
    }, [] as Event[])
  })
}

export const indexRoute = async (_: Request, res: Response, next: Next) => {
  const events = await getAllEvents()

  res.render('index', { events })

  next()
}
