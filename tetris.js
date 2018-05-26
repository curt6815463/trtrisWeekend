const canvas = document.getElementById('tetris')
const context = canvas.getContext('2d')

context.fillStyle = '#000'
context.scale(20,20)
context.fillRect(0, 0, canvas.width, canvas.height)

allMatris = []
matrisCurrentIndex = 0

const matris = {
  point:{
    x: 0,
    y: 0
  },
  shape:[
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
  ]
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
function matrisHorizontalMoveCondition(matris,offsetX) {
  switch (isTouchBoundary(matris)) {
    case 'left side':
      if(offsetX === 1){
        matrisHorizontalMove(matris,offsetX)
      }
      break;
    case 'right side':
      if(offsetX === -1){
        matrisHorizontalMove(matris,offsetX)
      }
      break;
    case 'no touch':
      matrisHorizontalMove(matris,offsetX)
      break;
    default:

  }
}

function isTouchBoundary(matris) {
  if(matris.point.x === 0){
    return 'left side'
  }
  else if(matris.point.x === 9){
    return 'right side'
  }
  else {
    return 'no touch'
  }
}

document.addEventListener('keydown', function(e) {
  switch (e.keyCode) {
    case 38:
      console.log('up');
      break;
    case 40:
      console.log('down');
      break;
    case 37:
      matrisHorizontalMoveCondition(allMatris[matrisCurrentIndex],-1)
      break;
    case 39:
      matrisHorizontalMoveCondition(allMatris[matrisCurrentIndex],1)
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
  if(!isTouchBottom(allMatris[matrisCurrentIndex])){
    stepTime = new Date().getTime()
    if(stepTime - now > 100){
      context.fillStyle = '#000'
      context.fillRect(0, 0, canvas.width, canvas.height)
      context.fillStyle = 'red'
      allMatris[matrisCurrentIndex].point.y ++
      drawMatris(allMatris[matrisCurrentIndex])
      now = new Date().getTime()
      requestAnimationFrame(step)
    }
    else {
      requestAnimationFrame(step)
    }
  }
  else {
    allMatris.push(JSON.parse(JSON.stringify(matris)))
    matrisCurrentIndex ++
    requestAnimationFrame(step)
  }
}
var now = new Date().getTime()
requestAnimationFrame(step);
