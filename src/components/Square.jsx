export default function Square(props) {
  let styles = props.enabled
    ? "bg-emerald-600 border border-emerald-500"
    : props.isClickable
    ? "bg-zinc-700 border border-zinc-600 hover:bg-emerald-600 hover:bg-opacity-10 hover:border-emerald-600"
    : "bg-zinc-700 border border-zinc-600 hover:bg-red-600 hover:bg-opacity-10 hover:border-red-600";
  // let rounded = props.isRounded ?

  let roundedClass;
  if (props.loc === 0) {
    roundedClass = "rounded-tl-sm";
  } else if (props.loc === 2) {
    roundedClass = "rounded-tr-sm";
  } else if (props.loc === 6) {
    roundedClass = "rounded-bl-sm";
  } else if (props.loc === 8) {
    roundedClass = "rounded-br-sm";
  } else {
    roundedClass = "";
  }

  return (
    <div
      onClick={props.handleToggle}
      className={`${styles} ${roundedClass} first-letter:h-24 w-24 flex items-center justify-center text-4xl text-white cursor-pointer`}
    >
      {props.number}
    </div>
  );
}
