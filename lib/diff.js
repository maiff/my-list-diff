function diff (arr1, arr2, key) {
  let len1 = arr1.length
  let len2 = arr2.length

  let dp = []

  for (let i = 0; i <= len1; i++) {
    dp[i] = []
    dp[i][0] = i
  }
  dp[0] = []
  for (let j = 0; j <= len2; j++) {
    dp[0][j] = j
  }
  let map = {}
  let moves = []
  for (let i = 1; i <= len1; i++) {
    for(let j = 1; j <= len2; j++) {
      let insertion = dp[i][j-1] + 1
      let deletion = dp[i-1][j] + 1
      let replace = dp[i-1][j-1] + (arr1[i-1][key] === arr2[j-1][key] ? 0 : 1)

      let min = dp[i][j] = Math.min(insertion, deletion, replace)
      
      //存下每次的路径
      if (min === insertion) {
        map[`${i}||${j}`] = {
          type: 1,
          pre: `${i}||${j - 1}`,
          ele: {[key]: arr2[j-1][key]}
        }
      } else if (min === deletion) {
        map[`${i}||${j}`] = {
          type: -1,
          pre: `${i - 1}||${j}`
        }
      } else if (min === replace) {
        map[`${i}||${j}`] = {
          type: 0,
          pre: `${i - 1}||${j - 1}`,
          isEqual: arr1[i-1][key] === arr2[j-1][key]
        }
      }
      //end
    }
  }
  
  // console.log(map)
  // 解析路径
  let k = len1
  let j = len2
  while (k > 0 && j >0) {
    let info = map[`${k}||${j}`]
    let move = {}
    move.type = info.type
    info.type === 1 ? move.index = k : move.index = k - 1
    if (info.type === 1) move.ele = info.ele
    if (info.type === 0)
      if (!info.isEqual) move.ele = {[key]: arr2[j - 1][key]}
      else {
        k = + info.pre.split('||')[0]
        j = + info.pre.split('||')[1]
        continue
      }
    moves.push(move)
    k = + info.pre.split('||')[0]
    j = + info.pre.split('||')[1]
  }
  //单独判断其中为0的可能
  if (k === 0 ^ j === 0) {
    if (k === 0) {
      while (j--) {
        let move = {}
        move.type = 1
        move.index = 0
        move.ele = {[key]: arr2[0][key]}
        moves.push(move)
      }
    } else if (j === 0) {
       while (k--) {
         let move = {}
         move.type = -1
         move.index = 0
         moves.push(move)
      }
    }
  }

  return moves
}

var oldList = [{id: "a"}, {id: "a"}, {id: "c"}]
var newList = [{id: "c"}, {id: "a"}, {id: "c"}]

var moves = diff(oldList, newList, "id")

console.log(moves)