export function getRandomString() {
  // eslint-disable-next-line no-unused-vars
  let r = (Math.random() + 1).toString(36).substring(7)
  return r
}
export function copyTextToClipboard(TextToCopy) {
  try {
    // let text =  TextToCopy.replace(/\n/g, "<br />");
    navigator.clipboard.writeText(TextToCopy)
    return true
  } catch (ex) {
    return false
  }
}
export function getUserNameInitials(first_name, last_name) {
  let initialLetters =
    first_name.trim().charAt(0).toUpperCase() +
    last_name.trim().charAt(0).toUpperCase()
  return initialLetters
}
