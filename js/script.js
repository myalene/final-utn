const menu = document.querySelector('.menu')
const navbar = document.querySelector('nav')

const navChange = () => {
  if (window.innerHeight * 0.35 < window.scrollY) {
    navbar.classList.add('fondoNav')
  } else {
    navbar.classList.remove('fondoNav')
  }
}

const manejarVideo = () => {
  const video = document.querySelector('video')
  const playButton = document.getElementById('play')
  const pauseButton = document.getElementById('pause')
  const showTime = document.getElementById('showTime')

  playButton.addEventListener('click', () => {
    video.play()
  })

  pauseButton.addEventListener('click', () => {
    video.pause()
  })

  video.addEventListener('timeupdate', () => {
    const minutes = Math.floor(video.currentTime / 60)
    const seconds = Math.floor(video.currentTime % 60)
    showTime.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  })
}

const cajas = [
  document.getElementById('cajasoltar'),
  document.getElementById('cajasoltar2'),
  document.getElementById('cajasoltar3'),
]

let contador = 0
const arrastrado = (e) => {
  e.dataTransfer.setData('text', e.target.id)
}

const soltado = (e) => {
  e.preventDefault()
  const id = e.dataTransfer.getData('text')
  const imagen = document.getElementById(id)

  if (
    e.target.tagName === 'DIV' &&
    e.target.classList.contains('caja') &&
    !e.target.querySelector('img')
  ) {
    e.target.innerHTML = `<img src="${imagen.src}" alt="Imagen Rompecabezas" style="height: 100%; width: 100%; object-fit: cover;">`
    imagen.style.display = 'none'
    contador++
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const imagenes = document.querySelectorAll('#cajaimagenes img')
  imagenes.forEach((imagen) => {
    imagen.setAttribute('draggable', 'true')
    imagen.addEventListener('dragstart', arrastrado)
  })

  cajas.forEach((caja) => {
    caja.addEventListener('dragenter', (e) => e.preventDefault())
    caja.addEventListener('dragover', (e) => e.preventDefault())
    caja.addEventListener('drop', soltado)
  })
})

const reinicio = () => {
  window.location.reload()
}

manejarVideo()
