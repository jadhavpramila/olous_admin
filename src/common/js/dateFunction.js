export function calculateNoOfDaysFromTodayToGivenDate(till_date) {
  var currentDate = new Date().toISOString().split('.')[0] + 'Z'
  const d2 = new Date(currentDate)
  const d1 = new Date(till_date)
  var Difference_In_Time = d1.getTime() - d2.getTime()
  var Difference_In_Days = Math.round(
    Difference_In_Time / (24 * 60 * 60 * 1000)
  )
  return Difference_In_Days
}
