Elm-React ![travis](https://travis-ci.org/KtorZ/elm-react-component.svg?style=flat-square) ![license](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)
=========

This component allows you to easily integrate an `Elm` module into an existing `React`
application. This can be useful to slightly refactor a legacy code base or simply to just run
some part of an application using `Elm`.

## Installation

```
npm install --save elm-react-component
```

## Usage

The component is a plain `React` component which means that it can be integrated as any other
component. 

```js
  ReactDOM.render(
    <ElmReact name="Main" />,
    document.getElementById('app')
  );
```

The component requires at least one property `name` which is the name of your `Elm` module. So
far, there's no dynamic loading; you have to include your `Elm` module and make the `Elm`
object be available ine the global scope. 

Then, for each `out-port`, from `Elm` to `React`), you may pass as many `on[PortName]`
properties as you need. Those properties should be functions -- or callback, triggered when a
new message is spits out by the signal. 

Any other property will be used as `in-port` from `React` to `Elm` to communicate. Each time a
property is set with a new value, that value is sent to the corresponding port to the `Elm`
module. 

Check out the examples for more details, but basically:

property      |      type      |     description
--------------|----------------|------------------------
name          | string         | `Elm` module's name
on[OutPort]   | function       | Subscriber / Handler for the given out port
[inPort]      | any            | Value to be sent through the module in port

## Example

**Elm module 'Main'**
```elm
import Graphics.Element exposing (..)
import Signal
import Mouse

main : Signal Element
main =
  Signal.map (\i -> flow right [show "in:", show i]) inPort

port inPort : Signal Int

port outPort : Signal Int
port outPort =
  Signal.map fst Mouse.position
```

**React application**
```js
import React from 'react';
import ReactDOM from 'react-dom';

let App = React.createClass({
  getInitialState() {
    return { inPort: 0 }
  },

  log(e) {
    console.log("onOutPort:", e)
  },

  render() {
    setTimeout(() => {
      this.setState({ inPort: Date.now() })
    }, 50)

    return (
      <ElmReact
        name="Main"
        onOutPort={this.log}
        inPort={this.state.inPort}
      />
    )
  }
})

ReactDOM.render(
    <App />,
    document.getElementById('app')
)
```

## TODO

- Allow id, class and html attributes to be passed to the div container

## Change log

#### 0.2.0 (2016-01-27)

- Add binding for in-port through properties
- Remove the need of an internal id

#### 0.1.0 (2016-01-26)

- First version, display an existing module and allow binding from `Elm` to `React`
