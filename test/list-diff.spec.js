/* global it, describe */
var diff = require('../lib/diff.js')
var chai = require('chai')
chai.should()

function assertListEqual (after, before) {
  after.forEach(function (item, i) {
    after[i].should.be.deep.equal(before[i])
  })
}
function perform (list, moves) {
  moves.forEach(function (move) {
    if (move.type === 1) {
      list.splice(move.index , 0, move.ele)
    } else if (move.type === -1) {
      list.splice(move.index, 1)
    } else {
      list.splice(move.index, 1, move.ele)
    }
    // console.log(list)
  })
  return list
}

describe('List diff', function () {
  it('add', function () {
    var oldList = [{id: "a"}]
    var newList = [{id: "a"}, {id: "a"}]


    var moves = diff(oldList, newList, "id")
    // console.log(moves)
    assertListEqual(perform (oldList, moves), newList)
  })

  it('remove', function () {
    var oldList = [{id: "a"}, {id: "b"}]
    var newList = [{id: "a"}]


    var moves = diff(oldList, newList, "id")
    // console.log(moves)
    assertListEqual(perform (oldList, moves), newList)
  })

  it('replace', function () {
    var oldList = [{id: "a"}, {id: "b"}]
    var newList = [{id: "a"}, {id: "d"}]


    var moves = diff(oldList, newList, "id")
    // console.log(moves)
    assertListEqual(perform (oldList, moves), newList)
  })

  it('add and remove with two', function () {
    var oldList = [{id: "a"}, {id: "b"}]
    var newList = [{id: "c"}, {id: "a"}]


    var moves = diff(oldList, newList, "id")
    // console.log(moves)
    assertListEqual(perform (oldList, moves), newList)
  })

  it('add and replace with two', function () {
    var oldList = [{id: "a"}, {id: "d"}]
    var newList = [{id: "c"}, {id: "a"}]


    var moves = diff(oldList, newList, "id")
    // console.log(moves)
    assertListEqual(perform (oldList, moves), newList)
  })

  it('remove and replace', function () {
    var oldList = [{id: "e"}, {id: "e"}, {id: "c"}]
    var newList = [{id: "c"}, {id: "a"}]


    var moves = diff(oldList, newList, "id")
    console.log(moves)
    // console.log(perform (oldList, moves))
    assertListEqual(perform (oldList, moves), newList)
  })

  it('remove and replace', function () {
    var oldList = [{id: "e"}, {id: "e"}, {id: "c"}]
    var newList = [{id: "c"}, {id: "a"}]


    var moves = diff(oldList, newList, "id")
    console.log(moves)
    // console.log(perform (oldList, moves))
    assertListEqual(perform (oldList, moves), newList)
  })
})