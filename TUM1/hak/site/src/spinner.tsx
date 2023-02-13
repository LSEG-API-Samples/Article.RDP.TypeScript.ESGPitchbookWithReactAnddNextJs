import classNames from "classnames";
import { SEO } from "./head";

export function Spinner({ size }: { size: 4 | 6 | 8 }) {
  return (
    <svg
      className={classNames("animate-spin", {
        "h-8 w-8": size === 8,
        "h-6 w-6": size === 6,
        "h-4 w-4": size === 4,
      })}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25 stroke-neutral-400"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75 fill-black"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export function LoadingPage() {
  return (
    <>
      <SEO />

      <div className={"w-screen h-screen grid place-items-center select-none"}>
        <div className={"flex flex-col items-center space-y-6"}>
          <Spinner size={8} />
          <div className={"flex flex-col space-y-1 items-center"}>
            <span className={"font-medium text-xl"}>Loading</span>
            <p className={"text-center font-regular text-neutral-700"}>
              We&apos;re assembling all the data to help <br /> you make the
              best investment decisions. <br />
              This may take a few seconds.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
