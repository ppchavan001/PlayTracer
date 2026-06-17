import DatasetInfoPanel
    from "@/components/DatasetInfoPanel";

import FilterPanel
    from "@/components/FilterPanel";

import { DatasetInfo }
    from "@/types/dataset";

import { Filters }
    from "@/types/filters";

interface Props
{
    info: DatasetInfo | null;

    dates: string[];

    matches: string[];

    filters: Filters;

    onFiltersChange: (
        filters: Filters
    ) => void;
}

export default function LeftSidebar({
    info,
    dates,
    matches,
    filters,
    onFiltersChange,
}: Props)
{
    return (
        <aside
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                padding: "1rem",
                borderRight:
                    "1px solid #1e232d",
            }
            }
        >
            <h2
                style={
                    {
                        margin: 0,
                        fontSize: 24,
                    }
                }
            >
                PlayTracer
            </h2>

            < FilterPanel
                filters={filters}
                dates={dates}
                matches={matches}
                onChange={
                    onFiltersChange
                }
            />

            <div
                style={
                    {
                        marginTop: "auto",
                    }
                }
            >
                <DatasetInfoPanel
                    info={info}
                />
            </div>
        </aside>
    );
}
