import { PropsWithChildren } from "react";
import classNames from "classnames";

export function DollarAmount({
  value,
  children,
}: PropsWithChildren<{ value: number | null }>) {
  let displayValue = "N/A";
  if (value) {
    if (value >= 1000000000) {
      displayValue = `$${(value / 1000000000).toFixed(1)}B`;
    } else if (value > 1000000 && value < 1000000000) {
      displayValue = `$${(value / 1000000).toFixed(1)}M`;
    } else {
      displayValue = `$${value}`;
    }
  }

  return <Card label={children}>{displayValue}</Card>;
}

export function Card({
  label,
  children,
}: PropsWithChildren<{ label: React.ReactNode }>) {
  return (
    <div
      className={classNames(
        "rounded-md  px-16 print:px-8 py-8 print:py-4 flex flex-col space-y-2 items-center text-center bg-neutral-100"
      )}
    >
      <span className={"font-extrabold text-xl"}>{children}</span>

      <span className={classNames("font-medium text-base text-neutral-800")}>
        {label}
      </span>
    </div>
  );
}

export function BigNumber({
  value,
  children,
}: PropsWithChildren<{ value: number | null }>) {
  return (
    <div
      className={classNames(
        "rounded-md  px-16 print:px-8 py-8 print:py-4 flex flex-col space-y-2 items-center text-center",
        {
          "bg-white": value === null,
          "bg-green-100": value !== null && value > 70,
          "bg-yellow-100": value !== null && value > 50 && value <= 70,
          "bg-amber-100": value !== null && value > 30 && value <= 50,
          "bg-red-100": value !== null && value <= 30,
        }
      )}
    >
      <span className={"font-extrabold text-xl"}>
        {value ? value.toFixed(2) : "N/A"}%
      </span>

      <span
        className={classNames(
          "font-medium text-base print:text-neutral-800 whitespace-nowrap",
          {
            "text-neutral-800": value === null,
            "text-green-800": value !== null && value > 70,
            "text-yellow-800": value !== null && value > 50 && value <= 70,
            "text-amber-800": value !== null && value > 30 && value <= 50,
            "text-red-800": value !== null && value <= 30,
          }
        )}
      >
        {children}
      </span>
    </div>
  );
}

export function MissingData() {
  return <span className={"text-neutral-500"}>-</span>;
}

export function PercentNumber({ value }: { value: number | null }) {
  let displayValue = value ? value.toFixed(2) : "N/A";
  // if value has no decimal places, use integer
  if (value && value % 1 === 0) {
    displayValue = value.toFixed(0);
  }
  return <span>{value ? displayValue : <MissingData />}%</span>;
}

function optionalFraction(num: number) {
  return num % 1 === 0 ? num.toFixed(0) : num.toFixed(2);
}

export function Number({ value }: { value: number | null }) {
  let displayValue = "N/A";
  if (value) {
    if (value >= 1_000_000 && value < 1_000_000_000) {
      displayValue = `${optionalFraction(value / 1_000_000)}M`;
    } else if (value >= 1_000_000_000) {
      displayValue = `${optionalFraction(value / 1_000_000_000)}B`;
    } else if (value < 1_000_000 && value >= 1_000) {
      displayValue = `${optionalFraction(value / 1_000)}K`;
    } else if (value < 1_000) {
      displayValue = `${optionalFraction(value)}`;
    }
  }
  return <span>{value ? displayValue : <MissingData />}</span>;
}
