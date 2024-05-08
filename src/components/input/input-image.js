import imageExample from "src/assets/logo.svg";

export function InputImage({
  label,
  name,
  value,
  preview,
  handleChange,
  required = false,
  size = "md",
  type = "image/png, image/jpeg",
  color = "primary",
}) {
  return (
    <div className="flex flex-col">
      <label className="f-p1-r mb-1 text-neutral-1000">{label}</label>

      <input
        className={`f-p1-r w-full border rounded-lg px-3 py-3 outline-none mt-2 ${
          color == "dark" ? "border-black" : "border-primary-main"
        }`}
        type="file"
        name={name}
        id={name}
        required={required}
        onChange={handleChange}
        size={size}
        itemType={type}
      />
      {preview ? (
        <div className="rounded-md mt-4">
          <img src={preview} alt={name} />
        </div>
      ) : (
        <img src={imageExample} alt="image-example" className="w-20" />
      )}
    </div>
  );
}
