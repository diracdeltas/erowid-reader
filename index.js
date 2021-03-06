'use strict'

// Picks an integer at random from a range, excluding max
function randRange (max, min) {
  min = min || 0
  const rand = Math.floor(Math.random() * (max - min))
  return min + rand
}

// Picks an item at random from an array
function uniform (array) {
  return array[randRange(array.length)]
}

// put a random text in so that it doesn't fail before the list is loaded
let list = ['erowid_33369.txt']

window.fetch('/reports.txt').then(async (resp) => {
  const text = await resp.text()
  list = text.split('\n')
})

window.onload = () => {
  const synth = window.speechSynthesis
  const start = document.querySelector('#start')
  const say = (text) => {
    const phrase = new window.SpeechSynthesisUtterance(text)
    phrase.volume = 1
    phrase.pitch = randRange(0, 2)
    synth.speak(phrase)
  }
  start.addEventListener('click', (e) => {
    start.innerText = 'Next'
    synth.cancel()
    window.fetch('/reports/' + uniform(list)).then(async (resp) => {
      const text = await resp.text()
      say(text)
    })
  })
}
