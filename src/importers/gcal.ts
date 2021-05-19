import axios, { AxiosResponse } from 'axios'

import configuration from '../configuration'

export interface GCalResponse {
  kind: string
  etag: string
  summary: string
  updated: Date
  timeZone: string
  accessRole: string
  defaultReminders: any[]
  nextSyncToken: string
  items: GCalEvent[]
}

export interface GCalEvent {
  kind: string
  etag: string
  id: string
  status: string
  htmlLink: string
  updated: Date
  start: GCalEventDate
  end: GCalEventDate
  visibility: string
  iCalUID: string
}

export interface GCalEventDate {
  dateTime: Date
  timeZone?: string
}

export interface Event {
  start: GCalEventDate
  end: GCalEventDate
}

const DEFAULT_HEADERS = {
  Accept: '*/*',
  'Accept-Encoding': 'gzip',
  'Accept-Language': 'en-US',
}

const request = axios.create({
  baseURL: configuration.calendarTypes.gcal.baseUrl,
  timeout: 3000,
  headers: DEFAULT_HEADERS,
})

export const getGCalEvents = async (path: string): Promise<Array<Event>> => {
  return request(path)
    .then((response: AxiosResponse<GCalResponse>) => {
      if (!response.data) {
        throw new Error('Response is invalid')
      }

      return response.data.items.map((event) => {
        return {
          start: event.start,
          end: event.end,
        }
      })
    })
    .catch((e) => {
      console.log(e)
      throw e
    })
}
