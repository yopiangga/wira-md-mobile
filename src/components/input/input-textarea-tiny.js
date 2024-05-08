import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

export function InputTextareaTiny({ label, name, value, handleChange }) {
  const editorRef = useRef(null);
  const handleEditorChange = (content, editor) => {
    handleChange({
      target: {
        name: name,
        value: content,
      },
    });
  };
  return (
    <div className="flex flex-col">
      <label className="f-p1-r mb-1 text-neutral-1000">{label}</label>
      <Editor
        apiKey="tizkwpq2tbnkm9tv0rzep7jc5l0jalupv6qf0ktc7ovucf5v"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={value}
        onEditorChange={handleEditorChange}
        textareaName={name}
        init={{
          plugins:
            "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
        }}
      />
    </div>
  );
}
