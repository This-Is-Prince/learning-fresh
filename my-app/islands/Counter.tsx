/** @jsx h */
import { h , Fragment} from "preact";
import { useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { tw } from "@twind";

interface CounterProps {
  start: number;
}

export default function Counter(props: CounterProps) {
  const [count, setCount] = useState(props.start);
  const [joke, setJoke]=useState("");
  const btn = tw`px-2 py-1 border(gray-100 1) hover:bg-gray-200`;
  return (
    <Fragment>
      <div class={tw`flex gap-2 w-full`}>
        <p class={tw`flex-grow-1 font-bold text-xl`}>{count}</p>
        <button
          class={btn}
          onClick={() => setCount(count - 1)}
          disabled={!IS_BROWSER}
        >
          -1
        </button>
        <button
          class={btn}
          onClick={() => setCount(count + 1)}
          disabled={!IS_BROWSER}
        >
          +1
        </button>
      </div>
      <div class={tw`flex flex-col items-center gap-y-5`}>
        <button onClick={async ()=>{
          const res = await fetch(`http://localhost:8000/api/joke`)
          const data = await res.text()
          setJoke(data);
          console.log(res,data)
        }} class={tw`bg-blue-500 px-8 py-2 rounded-md text-white text-bold text-lg`}>
          Get Joke
        </button>
        <p>{joke}</p>
      </div>
    </Fragment>
  );
}
