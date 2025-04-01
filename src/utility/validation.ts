export function isInputEmpty(value: string) {
  if (value == '') {
    return {msg: '', success: false};
  } else {
    return {msg: '', success: true};
  }
}
export function isDropDownEmpty(value: Record<string, string>) {
  if (value == undefined || Object.keys(value).length === 0) {
    return {msg: '', success: false};
  } else {
    return {msg: '', success: true};
  }
}
