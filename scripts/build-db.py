# Builds a DuckDB database from telemetry parquet files.
# Output: public/telemetry.db
#
# Setup:
# pip install duckdb pyarrow

import re
import duckdb
import tkinter as tk

from pathlib import Path
from tkinter import filedialog

import pyarrow.parquet as pq

OUTPUT_DB = Path("public/telemetry.db")


def select_folder() -> Path:
    root = tk.Tk()
    root.withdraw()

    folder = filedialog.askdirectory(title="Select player_data folder")

    if not folder:
        raise RuntimeError("No folder selected")

    return Path(folder)


def folder_to_date(folder_name: str) -> str:
    match = re.match(r"([A-Za-z]+)_(\d+)", folder_name)

    if not match:
        raise ValueError(f"Invalid folder name: {folder_name}")

    _, day = match.groups()

    return f"2026-02-{int(day):02d}"


def main():
    dataset_dir = select_folder()

    parquet_files: list[tuple[str, str]] = []

    for file in dataset_dir.rglob("*"):
        if not file.is_file():
            continue

        try:
            pq.read_schema(file)

            folder_name = file.parent.name
            match_date = folder_to_date(folder_name)

            parquet_files.append(
                (
                    str(file).replace("\\", "/"),
                    match_date,
                )
            )

        except Exception:
            print(f"Skipping {file}")

    if not parquet_files:
        raise RuntimeError("No parquet files found")

    OUTPUT_DB.parent.mkdir(
        parents=True,
        exist_ok=True,
    )

    if OUTPUT_DB.exists():
        OUTPUT_DB.unlink()

    con = duckdb.connect(str(OUTPUT_DB))

    print(f"Found {len(parquet_files)} parquet files")

    con.execute("""
        CREATE TABLE events (
            user_id VARCHAR,
            match_id VARCHAR,
            map_id VARCHAR,
            x FLOAT,
            y FLOAT,
            z FLOAT,
            ts TIMESTAMP,
            event VARCHAR,
            match_date DATE
        );
    """)

    for idx, (file_path, match_date) in enumerate(
        parquet_files,
        start=1,
    ):
        # print(f"[{idx}/{len(parquet_files)}] {Path(file_path).name}")

        con.execute(f"""
            INSERT INTO events
            SELECT
                user_id,
                match_id,
                map_id,
                x,
                y,
                z,
                ts,
                CAST(event AS VARCHAR) AS event,
                DATE '{match_date}' AS match_date
            FROM read_parquet('{file_path}');
            """)

    con.execute("""
        CREATE INDEX idx_match
        ON events(match_id);
    """)

    con.execute("""
        CREATE INDEX idx_map
        ON events(map_id);
    """)

    count = con.execute("""
        SELECT COUNT(*)
        FROM events
    """).fetchone()[0]

    print(f"\nImported {count:,} rows")

    min_date, max_date = con.execute("""
        SELECT
            strftime(MIN(match_date), '%d-%m-%Y'),
            strftime(MAX(match_date), '%d-%m-%Y')
        FROM events
    """).fetchone()

    print(f"\nDate Range: {min_date} → {max_date}")

    print(f"\nCreated {OUTPUT_DB}")

    con.close()


if __name__ == "__main__":
    main()
