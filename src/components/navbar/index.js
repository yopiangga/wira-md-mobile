export function NavbarComponent(props) {
  return (
    <div
      className={`w-full py-4 items-center text-center relative flex gap-4 justify-center shadow-sm ${
        props.type == "dark" ? "text-slate-900" : "text-white"
      }`}
    >
      {props.leftIcon != null ? (
        <button
          type="button"
          onClick={props.handleLeft}
          className="flex justify-end items-center absolute left-5"
        >
          <props.leftIcon size={24} />
        </button>
      ) : (
        <></>
      )}
      <h1 className="font-semibold f-h4">{props.title}</h1>
      {props.rightIcon != null ? (
        <button
          type="button"
          onClick={props.handleRight}
          className="flex justify-start items-center absolute right-5"
        >
          <props.rightIcon size={24} />
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
