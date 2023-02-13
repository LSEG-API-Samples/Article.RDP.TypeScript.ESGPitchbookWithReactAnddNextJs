import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "react-feather";
import { forwardRef, PropsWithChildren } from "react";
import classNames from "classnames";

export const SelectInput = ({
  items,
  value,
  setValue,
  name,
  placeholder,
  width,
}: {
  items: Array<{ label: string; id: string }>;
  value: string | null;
  setValue: (value: string | null) => void;
  placeholder?: string;
  name?: string;
  width?: string;
}) => (
  <Select.Root value={value || undefined} onValueChange={setValue}>
    <Select.Trigger
      className="flex items-center justify-center bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300 p-2 rounded-md "
      aria-label={name}
    >
      <Select.Value asChild>
        <span
          className={classNames("whitespace-nowrap truncate ", width || "w-24")}
        >
          {value
            ? items.find((i) => i.id === value)!.label
            : placeholder || "Select"}
        </span>
      </Select.Value>
      <Select.Icon className="text-neutral-800">
        <ChevronDown />
      </Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content className="overflow-hidden bg-white/70 backdrop-blur-xl rounded-md shadow-lg z-20">
        <Select.ScrollUpButton className="flex items-center justify-center h-8 bg-white">
          <ChevronUp />
        </Select.ScrollUpButton>
        <Select.Viewport className="p-4">
          <Select.Group>
            <Select.Label className="p-2 text-neutral-500 font-medium">
              {name}
            </Select.Label>
            {items.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.label}
              </SelectItem>
            ))}
          </Select.Group>
        </Select.Viewport>
        <Select.ScrollDownButton className="flex items-center justify-center h-8 bg-white">
          <ChevronDown />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
);

// eslint-disable-next-line react/display-name
const SelectItem = forwardRef<
  HTMLDivElement,
  PropsWithChildren<{ className?: string; value: string; disabled?: boolean }>
>(({ children, className, ...props }, forwardedRef) => {
  return (
    <Select.Item
      className={classNames(
        "rounded flex items-center p-2 cursor-pointer select-none",
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      <Select.ItemText className={"whitespace-nowrap"}>
        {children}
      </Select.ItemText>
      <Select.ItemIndicator className="ml-auto">
        <Check />
      </Select.ItemIndicator>
    </Select.Item>
  );
});
