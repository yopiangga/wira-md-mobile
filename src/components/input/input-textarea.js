export function InputTextarea({
  label,
  name,
  value,
  handleChange,
  type = "text",
  required = false,
  placeholder = "",
  rows = 3,
  color,
}) {
  return (
    <div className="flex flex-col">
      <label className="f-p1-r mb-1 text-neutral-1000">{label}</label>
      <textarea
        rows={rows}
        placeholder={placeholder}
        className={`f-p1-r w-full border rounded-lg px-3 py-3 outline-none mt-2 ${
          color == "dark" ? "border-black" : "border-primary-main"
        }`}
        onChange={handleChange}
        value={value}
        type={type}
        name={name}
        required={required}
      />
    </div>
  );
}
