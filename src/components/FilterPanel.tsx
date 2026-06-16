import { Filters } from "@/types/filters";

interface Props
{
    filters: Filters;
    dates: string[];
    matches: string[];
    onChange: (filters: Filters) => void;
}

export default function FilterPanel({
    filters,
    dates,
    matches,
    onChange,
}: Props)
{
    return (
        <div>
            <h3>Filters</h3>

            <div>
                <label>Start Date</label>

                <select
                    value={filters.startDate}
                    onChange={(e) =>
                        onChange({
                            ...filters,
                            startDate: e.target.value,
                        })
                    }
                >
                    {dates.map((date) => (
                        <option
                            key={date}
                            value={date}
                        >
                            {date}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>End Date</label>

                <select
                    value={filters.endDate}
                    onChange={(e) =>
                        onChange({
                            ...filters,
                            endDate: e.target.value,
                        })
                    }
                >
                    {dates.map((date) => (
                        <option
                            key={date}
                            value={date}
                        >
                            {date}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>Match</label>

                <select
                    value={filters.matchId}
                    onChange={(e) =>
                        onChange({
                            ...filters,
                            matchId: e.target.value,
                        })
                    }
                >
                    <option value="">
                        Select Match
                    </option>

                    {matches.map((match) => (
                        <option
                            key={match}
                            value={match}
                        >
                            {match}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
