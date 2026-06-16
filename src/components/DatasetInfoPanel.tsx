import { DatasetInfo } from "@/types/dataset";

interface Props
{
    info: DatasetInfo | null;
}

export default function DatasetInfoPanel({
    info,
}: Props)
{
    if (!info)
    {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h3>Dataset Info</h3>

            <div>Rows: {info.rows.toLocaleString()}</div>
            <div>Matches: {info.matches}</div>
            <div>Players: {info.players}</div>
            <div>Humans: {info.humans}</div>
            <div>Bots: {info.bots}</div>
            <div>Maps: {info.maps}</div>
            <div>Event Types: {info.eventTypes}</div>
        </div>
    );
}
