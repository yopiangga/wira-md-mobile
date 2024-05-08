import { Toaster } from "react-hot-toast";

export function UserLayout({ children }) {
  return (
    <div className="bg-white w-full min-h-screen flex justify-center">
      <div className="bg-white max-w-screen-sm w-full">
        <Toaster position="bottom-right" reverseOrder={false} />
        {children}
      </div>
    </div>
  );
}
