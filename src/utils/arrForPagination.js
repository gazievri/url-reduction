export const range = (current, pages) => {

  let resArr = [1,current - 1, current, current + 1, pages];

  if (current - resArr[0] >= 3) {
      resArr.splice(1, 0, '...')
  } else if (current - resArr[0] === 2) {
      resArr.splice(0, 4, ...[1, 2, 3, 4] )
  } else { resArr.splice(0, 4, ...[1, 2, 3] ) }

  if (pages - current >= 3) {
      resArr.splice(resArr.length - 1, 0, '...')
  } else if (pages - current === 2) {
      resArr.splice(-4, 4, ...[current - 1, current, current + 1, pages])
  } else {
      resArr.splice(-4, 4, ...[pages - 2, pages - 1, pages])
  }

  return resArr;
}

