const canvas = document.getElementById('tetris')
const context = canvas.getContext('2d')

context.fillStyle = '#000'
context.scale(20,20)
context.fillRect(0, 0, canvas.width, canvas.height)

var allMatris = []
var matrisCurrentIndex = 0
var contextTable = []
for(let i = 0 ; i < 20 ; i++){
  contextTable[i] = []
  for(let j = 0 ; j < 12 ; j++){
    contextTable[i][j] = 0
  }
}
const matris = {
  point:{
    x: 5,
    y: 0
  },
  shape:[
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
  ]
}
 function matrixFillTable(matris){

  matris.shape.forEach((row, y) => {
    row.forEach((value ,x) => {
      if(value === 1){
        contextTable[y+matris.point.y][x+matris.point.x] = 1
      }
    })
  })
}
//偵測底部有沒有撞到
function isCollision(matris) {
  let isCollision = false
  matris.shape.forEach((row, y) => {
    row.forEach((value, x) => {
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
  matris.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if(value === 1){
        try {
          console.log(y+matris.point.y,x+matris.point.x + offsetX);
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
  console.log(isCollision);
  return isCollision
}

function drawMatris(matris) {
  allMatris.forEach((matris, index) => {
    matris.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if(value === 1){
          context.fillStyle = 'red'
          context.fillRect(x+matris.point.x,y+matris.point.y,1,1)
        }
      })
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
      allMatris.push(JSON.parse(JSON.stringify(matris)))
      matrisCurrentIndex ++
      requestAnimationFrame(step)
    }
  }
  else {
    requestAnimationFrame(step)

  }

  // if(!isCollision(allMatris[matrisCurrentIndex])){
  //   stepTime = new Date().getTime()
  //   if(stepTime - now > 100){
  //     context.fillStyle = '#000'
  //     context.fillRect(0, 0, canvas.width, canvas.height)
  //     context.fillStyle = 'red'
  //     allMatris[matrisCurrentIndex].point.y ++
  //     drawMatris(allMatris[matrisCurrentIndex])
  //     now = new Date().getTime()
  //     requestAnimationFrame(step)
  //   }
  //   else {
  //     requestAnimationFrame(step)
  //   }
  // }
  // else {
  //   allMatris.push(JSON.parse(JSON.stringify(matris)))
  //   matrisCurrentIndex ++
  //   requestAnimationFrame(step)
  // }
}
var now = new Date().getTime()
requestAnimationFrame(step);
