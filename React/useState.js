log = console.log

// <<<<<<<<<<<<<<<<<<< Step 1 >>>>>>>>>>>>>>>>>>>>
log("<< Step 1 >>")
/*
Problem:
The problem is that foo is global, we can change the foo in every place.
*/
let foo = 0
function add() {
	foo += 1
  return foo
}

log(add()) /// 1
log(add()) /// 2 
log(add()) /// 3
log(add()) /// 4

// <<<<<<<<<<<<<<<<<<< Step 2 >>>>>>>>>>>>>>>>>>>>
log("<< Step 2 >>")
/**
Solution: 
The solution is to use closure to make it locally.
*/

function getAdd() {
  let foo = 0
  return function () {
    foo += 1
    return foo
  }
}


var add = getAdd()

log(add()) /// 1
log(add()) /// 2
log(add()) /// 3
log(add()) /// 4
log(add()) /// 5

// <<<<<<<<<<<<<<<<<<< Step 3 >>>>>>>>>>>>>>>>>>>>
log("<< Step 3 >>")
function useState(initialValue) {
	let _value = initialValue
	const setState = (value) => {
		_value = value
  }
  return [_value,setState]
}

const [count,setCount] = useState(1)

log(count) /// 1
setCount(12)
log(count) /// 1, Oppps!!

// <<<<<<<<<<<<<<<<<<< Step 4 >>>>>>>>>>>>>>>>>>>>

/**
we add a getter for it
*/
log("<< Step 4 >>")
function useState(initialValue) {
	let _value = initialValue
  const state = () => _value
	const setState = (newValue) => {
		_value = newValue
  }
  return [state,setState]
}

const [counter,setCounter] = useState(1)

log(counter()) /// 1
setCounter(12)
log(counter()) /// 12

// <<<<<<<<<<<<<<<<<<< Step 5 >>>>>>>>>>>>>>>>>>>>
/**
We add React and render function to get component and render it.
*/
log("<< Step 5 >>")

var React = (function () {
  function useState(initialValue) {
  	let _value = initialValue
    let state = () => _value
    const setState = (newValue) => {
      _value = newValue
    }
    return [state,setState]
  }
  
  function render(Component) {
  	const C = Component()
    C.render()
    return C
  }
  return { useState , render }
})()

function Component() {
	const [count,setCount] = React.useState(1)
  return {
  	render: () => console.log(count),
    click: () => setCount(count + 1)
  }
}

var App = React.render(Component)
App.click()
var App = React.render(Component)

// <<<<<<<<<<<<<<<<<<< Step 6 >>>>>>>>>>>>>>>>>>>>

/**
Problem:
The problem is we should call the state to get value, so we lift up the variable
*/
log("<< Step 6 >>")

var React = (function () {
	let _value
  function useState(initialValue) {
    let state = _value || initialValue
    const setState = (newValue) => {
      _value = newValue
    }
    return [state,setState]
  }
  
  function render(Component) {
  	const C = Component()
    C.render()
    return C
  }
  return { useState , render }
})()

function Component() {
	const [count,setCount] = React.useState(1)
  return {
  	render: () => console.log(count),
    click: () => setCount(count + 1)
  }
}

var App = React.render(Component)
App.click()
var App = React.render(Component)
App.click()
var App = React.render(Component)
App.click()
var App = React.render(Component)
App.click()
var App = React.render(Component)

// <<<<<<<<<<<<<<<<<<< Step 7 >>>>>>>>>>>>>>>>>>>>

/**
what was the Problem:
The problem was that we just handle one state, now we add an array then we push the 
states in that array.
*/
log("<< Step 7 >>")

var React = (function () {
	let hooks = []
  let idx = 0
  
  function useState(initialValue) {
    let state = hooks[idx] || initialValue
    const _idx = idx
    
    const setState = (newValue) => {
      hooks[_idx] = newValue
    }
    idx++
    return [state,setState]
  }
  
  function render(Component) {
  	idx = 0 /// in each render, we reset it
  	const C = Component()
    C.render()
    return C
  }
  
  return { useState , render }
})()

function Component() {
	const [count,setCount] = React.useState(1)
  const [text, setText] = React.useState("Apple")
  
  return {
  	render: () => console.log({ count, text }),
    click: () => setCount(count + 1),
    type: (word) => setText(word)
  }
}

var App = React.render(Component)
App.click()
var App = React.render(Component)
App.type("Orange")
var App = React.render(Component)
App.click()
var App = React.render(Component)

