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
