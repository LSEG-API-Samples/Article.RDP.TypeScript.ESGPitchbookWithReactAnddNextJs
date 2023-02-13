import { ControversyData, DataResult } from "./refinitiv";
import { formatDistanceToNowStrict, parseISO } from "date-fns";

export function ControversiesSection({
  data,
}: {
  data: { company: DataResult; controversies: ControversyData[] };
}) {
  return (
    <section className={"flex flex-col space-y-4 my-4"}>
      <div>
        <h2 className={"text-2xl font-semibold"}>Controversies</h2>

        <span className={"text-neutral-500"}>
          Controversies highlight risks that may affect the ESG performance of a
          company.
        </span>
      </div>

      <div className={"grid grid-cols-1 md:grid-cols-3 gap-4"}>
        {data.controversies.map((c) => (
          <a
            className={
              "bg-neutral-50 hover:bg-neutral-100 active:bg-neutral-200 rounded-md p-4 flex flex-col space-y-1"
            }
            href={c.url}
            key={c.url}
          >
            <div className={"flex items-center space-x-2 text-neutral-500"}>
              <span className={"text-sm"}>
                {c.date
                  ? formatDistanceToNowStrict(parseISO(c.date), {
                      addSuffix: true,
                    })
                  : "Unknown"}
              </span>

              <div className={"w-1 h-1 rounded-full bg-neutral-500"} />

              <span className={"text-sm"}>{c.publisher}</span>
            </div>
            <span className={"font-medium"}>{c.title}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
