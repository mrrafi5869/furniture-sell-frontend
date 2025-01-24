/* eslint-disable react/prop-types */
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        status,
        title,
        description,
        route,
        action,
        ...props
      }) {
        return (
          <Toast
            key={id}
            {...props}
            className="pl-5 py-4 pr-1 shadow-2xl rounded-lg"
          >
            <div className="grid gap-1 z-30 items-center">
              {title && <ToastTitle>{title}</ToastTitle>}
              <div className="flex gap-x-3 items-center">
                {status === "success" ? (
                  <SuccessSVG className="w-10 h-10" />
                ) : status === "error" ? (
                  <ErrorSVG className="w-10 h-10" />
                ) : status === "warning" ? (
                  <ErrorSVG className="w-10 h-10" />
                ) : null}

                {description && route ? (
                  <ToastDescription className="text-md w-full max-w-[270px]">
                    <Link to={route}>{description}</Link>
                  </ToastDescription>
                ) : (
                  description && (
                    <ToastDescription className="text-md w-full max-w-[270px]">
                      {description}
                    </ToastDescription>
                  )
                )}
                <ToastClose className="top-5 focus:ring-0 " />
              </div>
            </div>
            {action}
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}

function SuccessSVG({ className }) {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <mask
        id="mask0_2929_2195"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="1"
        y="1"
        width="34"
        height="34"
      >
        <path
          d="M18.0001 3L21.9399 5.874L26.8171 5.865L28.3149 10.506L32.2659 13.365L30.7501 18L32.2659 22.635L28.3149 25.494L26.8171 30.135L21.9399 30.126L18.0001 33L14.0604 30.126L9.18313 30.135L7.68537 25.494L3.73438 22.635L5.25012 18L3.73438 13.365L7.68537 10.506L9.18313 5.865L14.0604 5.874L18.0001 3Z"
          fill="white"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.75 18L16.5 21.75L24 14.25"
          stroke="black"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </mask>
      <g mask="url(#mask0_2929_2195)">
        <path d="M0 0H36V36H0V0Z" fill="#D7FF7B" />
      </g>
    </svg>
  );
}

function ErrorSVG({ className }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M17.3337 17.3337H14.667V9.33366H17.3337M17.3337 22.667H14.667V20.0003H17.3337M16.0003 2.66699C14.2494 2.66699 12.5156 3.01187 10.8979 3.68193C9.2802 4.35199 7.81035 5.33412 6.57223 6.57223C4.07175 9.07272 2.66699 12.4641 2.66699 16.0003C2.66699 19.5365 4.07175 22.9279 6.57223 25.4284C7.81035 26.6665 9.2802 27.6487 10.8979 28.3187C12.5156 28.9888 14.2494 29.3337 16.0003 29.3337C19.5365 29.3337 22.9279 27.9289 25.4284 25.4284C27.9289 22.9279 29.3337 19.5365 29.3337 16.0003C29.3337 14.2494 28.9888 12.5156 28.3187 10.8979C27.6487 9.2802 26.6665 7.81035 25.4284 6.57223C24.1903 5.33412 22.7204 4.35199 21.1028 3.68193C19.4851 3.01187 17.7513 2.66699 16.0003 2.66699Z"
        fill="#F96D4F"
      />
    </svg>
  );
}
