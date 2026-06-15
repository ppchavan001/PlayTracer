# Builds a DuckDB database from the telemetry parquet files.
# The database is saved to public/telemetry.db and can be used by the API.
# The script will prompt you to select the folder containing the parquet files.
# Note: The parquet files must be in the format produced by the telemetry export tool.
# Setup : pip install duckdb pandas pyarrow

import duckdb
import tkinter as tk
from tkinter import filedialog
from pathlib import Path
import pyarrow.parquet as pq

OUTPUT_DB = Path("public/telemetry.db")


def select_folder() -> Path:
    root = tk.Tk()
    root.withdraw()

    folder = filedialog.askdirectory(title="Select player_data folder")

    if not folder:
        raise RuntimeError("No folder selected")

    return Path(folder)


def main():
    dataset_dir = select_folder()
    parquet_files = []

    for file in dataset_dir.rglob("*"):
        if not file.is_file():
            continue

        try:
            pq.read_schema(file)
            parquet_files.append(str(file).replace("\\", "/"))
        except Exception:
            print(f"Skipping {file}")

    if not parquet_files:
        raise RuntimeError("No files found")

    # for file in parquet_files:
    #     print(f"Processing {file}...")
    # return

    OUTPUT_DB.parent.mkdir(
        parents=True,
        exist_ok=True,
    )

    con = duckdb.connect(str(OUTPUT_DB))

    file_list = ",".join(f"'{file}'" for file in parquet_files)

    print(f"Found {len(parquet_files)} files")

    con.execute(f"""
        CREATE OR REPLACE TABLE events AS
        SELECT
            user_id,
            match_id,
            map_id,
            x,
            y,
            z,
            ts,
            CAST(event AS VARCHAR) AS event
        FROM read_parquet([{file_list}]);
        """)

    con.execute("""
        CREATE INDEX idx_match
        ON events(match_id);
    """)

    con.execute("""
        CREATE INDEX idx_map
        ON events(map_id);
    """)

    count = con.execute("SELECT COUNT(*) FROM events").fetchone()[0]

    print(f"Imported {count:,} rows")
    print(f"Created {OUTPUT_DB}")

    con.close()


if __name__ == "__main__":
    main()
