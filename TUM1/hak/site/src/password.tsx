import { useEffect, useState } from "react";
import { LoadingPage } from "./spinner";
import { SEO } from "./head";
export const expectedPassword = "refinitiv2022";

export function usePasswordProtection() {
  const [isUnlocked, setIsUnlockedState] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const value = localStorage.getItem("refinitiv:unlocked");
    setIsUnlockedState(value ? JSON.parse(value) : false);
  }, []);

  const setIsUnlocked = (isUnlocked: boolean) => {
    setIsUnlockedState(isUnlocked);
    localStorage.setItem("refinitiv:unlocked", JSON.stringify(isUnlocked));
  };

  return {
    isUnlocked,
    View: (
      <PasswordView isUnlocked={isUnlocked} setIsUnlocked={setIsUnlocked} />
    ),
  };
}

export function PasswordView({
  isUnlocked,
  setIsUnlocked,
}: {
  isUnlocked: boolean | null;
  setIsUnlocked: (isUnlocked: boolean) => void;
}) {
  const [password, setPassword] = useState("");

  if (isUnlocked === null) {
    return <LoadingPage />;
  }

  return (
    <>
      <SEO />
      <div className={"grid place-items-center h-screen"}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();

            if (password === expectedPassword) {
              setIsUnlocked(true);
            }
          }}
          className={
            "p-8 flex flex-col space-y-2 bg-white rounded-md shadow-md"
          }
        >
          <p className={"text-sm font-medium"}>Please enter your password</p>
          <input
            className={"p-2 border border-neutral-200 rounded-md"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={"password"}
          />
          <button
            className={
              "bg-neutral-100 p-2 rounded-md hover:bg-neutral-200 active:bg-neutral-300"
            }
            onClick={() => {
              if (password === expectedPassword) {
                setIsUnlocked(true);
              }
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
