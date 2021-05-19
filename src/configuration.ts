export default {
  calendarTypes: {
    gcal: {
      baseUrl: 'https://clients6.google.com',
      // Timestart example: "2021-06-07T00:00:00-05:00"
      path: (path: string, calendarId: string, timeStart: string, timeEnd: string): string => {
        return `/calendar/v3/calendars/${path}/events?calendarId=${calendarId}&singleEvents=true&timeZone=GMT-5%3A0&maxAttendees=1&maxResults=250&sanitizeHtml=true&timeMin=${timeStart}&timeMax=${timeEnd}&key=AIzaSyBNlYH01_9Hc5S1J9vuFmu2nUqBZJNAXxs`
      },
    },
  },
  calendars: JSON.parse(process.env.CALENDARS),
}
