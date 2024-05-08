export function InputDefault({
  label,
  name,
  value,
  handleChange,
  type = "text",
  required = false,
  placeholder = "",
  color = "primary",
}) {
  return (
    <div className="flex flex-col">
      <label
        className={`f-p1-r ${
          color == "dark" ? "text-black" : "text-primary-main"
        }`}
        htmlFor="email"
      >
        {label}
      </label>
      <input
        className={`f-p1-r w-full border rounded-lg px-3 py-3 focus:border-primary-main outline-none mt-2 ${
          color == "dark" ? "border-slate-400" : "border-primary-main"
        }`}
        name={name}
        value={value}
        onChange={handleChange}
        type={type}
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
}
