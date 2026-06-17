import { Filters } from "@/types/filters";

interface Props
{
    filters: Filters;
    dates: string[];
    matches: string[];
    onChange: (filters: Filters) => void;
}

const selectStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #2b2f36",
    background: "#0f1115",
    color: "#fff",
    fontSize: 14,
};

const labelStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 600,
    opacity: 0.8,
};

export default function FilterPanel({
    filters,
    dates,
    matches,
    onChange,
}: Props)
{
    return (
        <div
            style={{
                padding: "1rem",
                borderRadius: 12,
                border: "1px solid #222",
                background: "#151922",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem",
                }}
            >
                <h3
                    style={{
                        margin: 0,
                        fontSize: 16,
                    }}
                >
                    Filters
                </h3>

                <span
                    style={{
                        padding: "4px 10px",
                        borderRadius: 999,
                        background: "#222834",
                        fontSize: 12,
                        fontWeight: 600,
                    }}
                >
                    {matches.length} Matches
                </span>
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}
            >
                <div>
                    <label style={labelStyle}>
                        Start Date
                    </label>

                    <select
                        value={filters.startDate}
                        style={selectStyle}
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
                    <label style={labelStyle}>
                        End Date
                    </label>

                    <select
                        value={filters.endDate}
                        style={selectStyle}
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
                    <label style={labelStyle}>
                        Match
                    </label>

                    <select
                        value={filters.matchId}
                        style={selectStyle}
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
        </div>
    );
}
