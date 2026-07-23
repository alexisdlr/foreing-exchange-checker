import { TOAST_POSITION } from "@/lib/constants";
import { CheckIcon, XIcon } from "lucide-react";
import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return (
    <Toaster
      position={TOAST_POSITION}
      toastOptions={{
        success: {
          style: {
            background: "transparent",
            boxShadow: "none",
            padding: 0,
            color: "inherit",
            border: "1px solid #cef739",
          },
          className:
            "bg-neutral-900/50 backdrop-blur-sm text-neutral-50! px-4! py-3! rounded-md!",
          icon: (
            <div className="flex items-center justify-center w-8 h-8 bg-lime-500/10 rounded-full">
              <CheckIcon className="w-4 h-4 text-lime-500" />
            </div>
          ),
        },
        error: {
          style: {
            background: "transparent",
            boxShadow: "none",
            padding: 0,
            color: "inherit",
            border: "1px solid #ff4141",
          },
          className:
            "bg-neutral-900/50 backdrop-blur-sm  text-neutral-50! px-4! py-3! rounded-md!",
          icon: (
            <div className="flex items-center justify-center w-8 h-8 bg-red-500/10 rounded-full">
              <XIcon className="w-4 h-4 text-red-500" />
            </div>
          ),
        },
      }}
    />
  );
};

export default ToasterProvider;
