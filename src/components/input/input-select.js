export function InputSelect({
  label,
  name,
  value,
  handleChange,
  required = false,
  size = "md",
  placeholder = "",
  options = [],
  color = "primary",
}) {
  return (
    <div className="flex flex-col">
      <label className="f-p1-r mb-1 text-neutral-1000">{label}</label>
      <select
        value={value}
        onChange={handleChange}
        name={name}
        required={required}
        size={size}
        className={`f-p1-r w-full border rounded-lg px-3 py-3 outline-none mt-2 ${
          color == "dark" ? "border-black" : "border-primary-main"
        }`}
      >
        <option key={"d"} value={"default"} disabled>
          {placeholder}
        </option>
        {options.map((item, index) => {
          return (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}
