import MatchInfoPanel
    from "@/components/MatchInfoPanel";

import { MatchInfo }
    from "@/types/matchInfo";

interface Props
{
    matchInfo:
    | MatchInfo
    | null;
}

export default function RightSidebar({
    matchInfo,
}: Props)
{
    return (
        <aside
            style={{
                padding: "1rem",
                borderLeft:
                    "1px solid #1e232d",
            }}
        >
            <MatchInfoPanel
                info={matchInfo}
            />
        </aside>
    );
}
