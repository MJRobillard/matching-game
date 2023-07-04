export default function Combo(props) {
  return (
    <div className="relative w-48 h-72">
      <div className="h-full flex items-center justify-center bg-zinc-100 bg-opacity-5 rounded-t-lg">
        <div className="mb-5 text-white text-8xl">
          {props.selectedNo}
        </div>
      </div>

      <button onClick={props.handleReset} className="absolute inset-x-0 bottom-0 bg-emerald-600 py-2 hover:bg-emerald-500 text-white">
        Reset🔄️
      </button>
    </div>
  );
}
