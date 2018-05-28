const canvas = document.getElementById('tetris')
const context = canvas.getContext('2d')

context.fillStyle = '#000'
context.scale(20,20)
context.fillRect(0, 0, canvas.width, canvas.height)

var allMatris = []
var matrisCurrentIndex = 0
var contextTable = []
var deformIndex = 0

for(let i = 0 ; i < 20 ; i++){
  contextTable[i] = []
  for(let j = 0 ; j < 12 ; j++){
    contextTable[i][j] = 0
  }
}
const matrisL = {
  point:{
    x: 5,
    y: 0
  },
  shapeTypeIndex:0,
  shape:[[
    [1, 0, 0],
    [1, 0, 0],
    [1, 1, 0],
  ],[
    [1, 1, 1],
    [1, 0, 0],
    [0, 0, 0],
  ],[
    [0, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
  ],[
    [0, 0, 0],
    [0, 0, 1],
    [1, 1, 1],
  ]]
}
const matrisJ = {
  point:{
    x: 5,
    y: 0
  },
  shapeTypeIndex:0,
  shape:[[
    [0, 0, 1],
    [0, 0, 1],
    [0, 1, 1],
  ],[
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 0],
  ],[
    [1, 1, 0],
    [1, 0, 0],
    [1, 0, 0],
  ],[
    [0, 0, 0],
    [1, 0, 0],
    [1, 1, 1],
  ]]
}
const matrisI = {
  point:{
    x: 5,
    y: 0
  },
  shapeTypeIndex:0,
  shape:[[
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  ],[
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0]
  ]]
}
const matrisT = {
  point:{
    x: 5,
    y: 0
  },
  shapeTypeIndex:0,
  shape:[[
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
  ],[
    [0, 1, 0],
    [1, 1, 0],
    [0, 1, 0],
  ],[
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],[
    [0, 1, 0],
    [0, 1, 1],
    [0, 1, 0],
  ]]
}

const matrisS = {
  point:{
    x: 5,
    y: 0
  },
  shapeTypeIndex:0,
  shape:[[
    [0, 0, 0],
    [0, 1, 1],
    [1, 1, 0],
  ],[
    [1, 0, 0],
    [1, 1, 0],
    [0, 1, 0],
  ]]
}

const matrisZ = {
  point:{
    x: 5,
    y: 0
  },
  shapeTypeIndex:0,
  shape:[[
    [0, 0, 0],
    [1, 1, 0],
    [0, 1, 1],
  ],[
    [0, 1, 0],
    [0, 1, 1],
    [0, 0, 1],
  ]]
}
const matrisO = {
  point:{
    x: 5,
    y: 0
  },
  shapeTypeIndex:0,
  shape:[[
    [1, 1],
    [1, 1]
  ]]
}

matris = matrisI

function deform(matris) {
  if(matris.shapeTypeIndex === matris.shape.length-1){
    matris.shapeTypeIndex = 0
  }
  else {
    matris.shapeTypeIndex ++
  }
}
function moveRow(fullRowIndex) {
  // console.log('moveRow');
  let contextTableTemp = JSON.parse(JSON.stringify(contextTable))
  fullRowIndex.some((index) => {
    // contextTable.some((row, y) => {
      for(let i = index ; i >= 0 ; i--){
        if(i === 0){
          contextTableTemp[0] = [0,0,0,0,0,0,0,0,0,0,0,0]
        }
        else {
          contextTableTemp[i] = JSON.parse(JSON.stringify(contextTableTemp[i-1]))
        }
      }
    // })

  })
  // console.log(contextTableTemp);
  contextTable = JSON.parse(JSON.stringify(contextTableTemp))
  fullRowIndex.some((index) => {
    console.log(index);
    context.fillStyle = '#000'
    context.fillRect(0, index, 1,1)
  })
  // matrixFillTable
}

function clearFullRow() {
  let fullRowIndex = []
  contextTable.some((row , y) => {
    let isFull = true
    row.some((value, x) => {
      if(value === 0){
        isFull = false
      }
    })
    if(isFull){
      fullRowIndex.push(y)
    }
  })
  if(fullRowIndex.length !== 0){
    moveRow(fullRowIndex)
  }
  // console.log(fullRowIndex);

}

function matrixFillTable(matris){

  matris.shape[matris.shapeTypeIndex].some((row, y) => {
    row.some((value ,x) => {
      if(value === 1){
        contextTable[y+matris.point.y][x+matris.point.x] = 1
      }
    })
  })
  clearFullRow()
}
//偵測底部有沒有撞到
function isCollision(matris) {
  let isCollision = false
  matris.shape[matris.shapeTypeIndex].some((row, y) => {
    row.some((value, x) => {
      if(value === 1){
        try {
          if(contextTable[y+matris.point.y+1][x+matris.point.x] !== 0){
            matrixFillTable(matris)
            isCollision = true
            return isCollision
          }
        } catch (e) {

          isCollision = true
          matrixFillTable(matris)
          return isCollision
        } finally {

        }

      }
    })
  })
  return isCollision
}

//偵測左右碰撞
function horizontalCollision(matris, offsetX) {
  let isCollision = false
  matris.shape[matris.shapeTypeIndex].some((row, y) => {
    row.some((value, x) => {
      if(value === 1){
        try {

          if(contextTable[y+matris.point.y][x+matris.point.x + offsetX] !== 0){

            isCollision = true
            return isCollision
          }
        } catch (e) {
          isCollision = true
          return isCollision
        } finally {

        }

      }
    })
  })
  return isCollision
}

function drawMatris(matris) {
  // allMatris.some((matris, index) => {
    matris.shape[matris.shapeTypeIndex].some((row, y) => {
      row.some((value, x) => {
        if(value === 1){
          context.fillStyle = 'red'
          context.fillRect(x+matris.point.x,y+matris.point.y,1,1)
        }
      })
    })
  // })
  contextTable.some((row , y) => {
    row.some((value, x) => {
      if(value === 1){
        context.fillStyle = 'red'
        context.fillRect(x,y,1,1)
      }
    })
  })
}


function matrisHorizontalMove(matris,offsetX){
  context.fillStyle = '#000'
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = 'red'
  matris.point.x = matris.point.x + offsetX
  drawMatris(matris)
}




document.addEventListener('keydown', function(e) {
  switch (e.keyCode) {
    case 38:
      deform(allMatris[matrisCurrentIndex])
      break;
    case 40:
      break;
    case 37:
      if(!horizontalCollision(allMatris[matrisCurrentIndex],-1)){
        matrisHorizontalMove(allMatris[matrisCurrentIndex],-1)
      }
      break;
    case 39:
      if(!horizontalCollision(allMatris[matrisCurrentIndex],1)){
        matrisHorizontalMove(allMatris[matrisCurrentIndex],1)
      }
      break;
    default:

  }
})

function isTouchBottom(matris) {
  if(matris.point.y === 17){
    return true
  }
  else {
    return false
  }
}
allMatris.push(JSON.parse(JSON.stringify(matris)))
drawMatris(allMatris[matrisCurrentIndex])


function step(timestamp) {
  stepTime = new Date().getTime()
  if(stepTime - now > 100){
    if(!isCollision(allMatris[matrisCurrentIndex])){
      context.fillStyle = '#000'
      context.fillRect(0, 0, canvas.width, canvas.height)
      context.fillStyle = 'red'
      allMatris[matrisCurrentIndex].point.y ++
      drawMatris(allMatris[matrisCurrentIndex])
      now = new Date().getTime()
      requestAnimationFrame(step)
    }
    else {
      let randTypeIndex = Math.floor(Math.random() * (7 - 1 + 1)) + 1;
      // randTypeIndex = 2
      switch (randTypeIndex) {
        case 1:
          allMatris.push(JSON.parse(JSON.stringify(matrisO)))
          break;
        case 2:
          allMatris.push(JSON.parse(JSON.stringify(matrisI)))
          break;
        case 3:
          allMatris.push(JSON.parse(JSON.stringify(matrisS)))
          break;
        case 4:
          allMatris.push(JSON.parse(JSON.stringify(matrisZ)))
          break;
        case 5:
          allMatris.push(JSON.parse(JSON.stringify(matrisL)))
          break;
        case 6:
          allMatris.push(JSON.parse(JSON.stringify(matrisJ)))
          break;
        case 7:
          allMatris.push(JSON.parse(JSON.stringify(matrisT)))
          break;
        default:

      }
      // allMatris.push(JSON.parse(JSON.stringify(matris)))
      matrisCurrentIndex ++
      requestAnimationFrame(step)
    }
  }
  else {
    requestAnimationFrame(step)

  }
}
var now = new Date().getTime()
requestAnimationFrame(step);
