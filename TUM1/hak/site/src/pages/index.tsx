import { useEffect, useMemo, useState } from "react";
import { SearchResult } from "../refinitiv";
import { LoadingPage, Spinner } from "../spinner";
import { usePasswordProtection } from "../password";
import Link from "next/link";
import { PieChart } from "react-feather";
import { SEO } from "../head";
import { fetchRetry } from "../fetch";

export function useDebounce<T>(value: T, delay: number): T {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}

export default function Home() {
  const { View, isUnlocked } = usePasswordProtection();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [loadingDetails, setLoadingDetails] = useState(false);

  const debouncedValue = useDebounce(query, 500);

  const memoizedValue = useMemo(() => debouncedValue, [debouncedValue]);

  useEffect(() => {
    if (memoizedValue.length < 1) {
      return;
    }

    setIsLoading(true);

    (async () => {
      const res = await fetchRetry(`/api/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: memoizedValue,
        }),
      });
      if (!res.ok) {
        console.error(await res.text());
        return;
      }

      const data = await res.json();
      setResults(data);
      setIsLoading(false);
    })();
  }, [memoizedValue]);

  if (loadingDetails) {
    return <LoadingPage />;
  }

  if (!isUnlocked) {
    return View;
  }

  return (
    <>
      <SEO />

      <div className={"grid grid-cols-12 w-screen h-screen"}>
        <div className={"hidden md:block col-span-3"} />

        <div className={"col-span-12 md:col-span-6 w-full flex flex-col"}>
          <div className={"flex flex-col w-full space-y-2 grow p-8 md:p-0"}>
            <div className={"mt-24"}>
              <Link
                href={"/portfolio"}
                className={
                  "px-2 py-1 rounded-md shadow-md border border-neutral-200 inline-flex items-center space-x-1 print:hidden"
                }
              >
                <PieChart size={14} />
                <span>Portfolio</span>
              </Link>
            </div>

            <h2 className={"md:mt-48 text-4xl font-semibold"}>ESG Pitchbook</h2>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={"p-2 border border-neutral-200 shadow-md rounded"}
              placeholder={"Apple Inc."}
            />

            {isLoading ? (
              <div className={"flex justify-center items-center space-x-2 p-4"}>
                <Spinner size={4} />
                <span>Loading...</span>
              </div>
            ) : null}

            <ul className={"flex flex-col space-y-2"}>
              {results.map((result, idx) => {
                return (
                  <a
                    href={`/organization/${result.RIC}`}
                    key={result.PermID || idx}
                    className={"p-2 border rounded-md border-neutral-200"}
                    onClick={() => setLoadingDetails(true)}
                  >
                    {result.DocumentTitle || ""}
                  </a>
                );
              })}
            </ul>
          </div>

          <div className={"flex justify-center grow-0 p-8"}>
            <a
              href={"https://www.refinitiv.com/en"}
              className={"flex items-center space-x-4"}
            >
              <span className={"font-medium text-neutral-800"}>powered by</span>
              <svg width={198} height={40} xmlns="http://www.w3.org/2000/svg">
                <g fill="none">
                  <path
                    d="M197.752 40h-6.348l-22.199-22.198h25.374v4.44h-14.586L197.752 40zm-3.176-40h-40v40h4.447V4.443h35.553V0z"
                    fill="#001EFF"
                  />
                  <path
                    d="M10.834 29.863h3.939L10.4 21l.147-.043c2.291-.652 3.58-2.481 3.562-5.013-.032-3.684-2.316-5.796-6.265-5.796H0v19.728h3.58v-8.15h3.506l3.748 8.139v-.002zM3.58 18.884V12.98h3.617c2.201 0 3.369 1.02 3.369 2.954 0 2.094-1.171 2.95-4.032 2.95H3.58zm25.743 2.18V18.11H22.47v-5.013h9.395v-2.96H18.908v19.727h13.276V26.91H22.47v-5.847h6.853v.001zm17.938-2.953h-6.66v-5.013h8.912v-2.96H37.04v19.727h3.58v-8.8h6.642V18.11l-.001.001zm6.513-7.974v19.728h3.562V10.136h-3.562v.001zm30.866 0v19.728h3.563V10.136H84.64v.001zm21.94 0H92.568v2.954h5.231v16.774h3.58V13.09h5.231l-.028-2.954-.002.001zm4.33 0v19.728h3.562V10.136h-3.563l.001.001zm-35.625 0v13.981h-.054l-8.067-13.963h-3.773v19.728h3.34V15.274h.054l4.404 7.68 3.967 6.91h3.48V10.136h-3.351v.001zm56.058 0-4.598 16h-.032l-4.622-16h-3.49l6.086 19.728h4.07l6.087-19.728h-3.501z"
                    fill="#000"
                  />
                </g>
              </svg>
            </a>
          </div>
        </div>

        <div className={"hidden md:block col-span-3"} />
      </div>
    </>
  );
}
