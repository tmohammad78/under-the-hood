
// <<<<<<<<<<<<<<<<<<< Step 1 >>>>>>>>>>>>>>>>>>>>

/**
Custom useEffect 
*/
log("<< Step 1 >>")
{
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
  
	function useEffect(cb,depArray) {
    const oldDeps = hooks[idx]
    console.log(oldDeps,hooks)
    let hasChanged = true
    if(oldDeps) {
      hasChanged = depArray.some((dep,i) => !Object.is(dep,oldDeps[i]))
    }
    if(hasChanged) {
    	cb()
    }
    hooks[idx] = depArray;
    idx++
  } 
  
  return { useState , render, useEffect }
})()

function Component() {
	const [count,setCount] = React.useState(1)
  const [text, setText] = React.useState("Apple")
  
	React.useEffect(() => console.log("dDDDD"), [count])
  
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

}
