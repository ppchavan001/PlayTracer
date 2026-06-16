import duckdb
from pathlib import Path

DB_PATH = Path("public/telemetry.db")


def print_query(title: str, con, query: str):
    print(f"\n=== {title} ===")

    rows = con.execute(query).fetchall()

    for row in rows:
        print(row)


def main():
    if not DB_PATH.exists():
        raise FileNotFoundError(DB_PATH)

    con = duckdb.connect(str(DB_PATH))

    print(f"Database: {DB_PATH}")

    total_rows = con.execute("""
        SELECT COUNT(*)
        FROM events
    """).fetchone()[0]

    print(f"\nTotal Rows: {total_rows:,}")

    min_date, max_date = con.execute("""
        SELECT
            strftime(MIN(match_date), '%d-%m-%Y'),
            strftime(MAX(match_date), '%d-%m-%Y')
        FROM events
    """).fetchone()

    print(f"Date Range: {min_date} → {max_date}")

    print_query(
        "Dates",
        con,
        """
        SELECT
            strftime(match_date, '%d-%m-%Y'),
            COUNT(*) AS rows
        FROM events
        GROUP BY match_date
        ORDER BY match_date
        """,
    )

    print_query(
        "Maps, Event Count",
        con,
        """
        SELECT map_id, COUNT(*)
        FROM events
        GROUP BY map_id
        ORDER BY COUNT(*) DESC
        """,
    )

    print_query(
        "Matches Per Date",
        con,
        """
        SELECT
            strftime(match_date, '%d-%m-%Y'),
            COUNT(DISTINCT match_id)
        FROM events
        GROUP BY match_date
        ORDER BY match_date
        """,
    )

    print_query(
        "Event Types",
        con,
        """
        SELECT event, COUNT(*)
        FROM events
        GROUP BY event
        ORDER BY COUNT(*) DESC
        """,
    )

    print_query(
        "Unique Counts",
        con,
        """
        SELECT
            COUNT(DISTINCT user_id),
            COUNT(DISTINCT match_id)
        FROM events
        """,
    )

    print_query(
        "Humans vs Bots",
        con,
        """
        SELECT
            CASE
                WHEN regexp_matches(user_id, '^[0-9]+$')
                THEN 'Bot'
                ELSE 'Human'
            END AS player_type,
            COUNT(DISTINCT user_id)
        FROM events
        GROUP BY player_type
        ORDER BY player_type
        """,
    )

    print_query(
        "Timestamp Range",
        con,
        """
        SELECT
            MIN(ts),
            MAX(ts)
        FROM events
        """,
    )

    print_query(
        "Rows Per Match",
        con,
        """
        SELECT
            MIN(cnt),
            ROUND(AVG(cnt), 2),
            MAX(cnt)
        FROM (
            SELECT
                match_id,
                COUNT(*) cnt
            FROM events
            GROUP BY match_id
        )
        """,
    )

    print_query(
        "Sample Row",
        con,
        """
        SELECT *
        FROM events
        LIMIT 1
        """,
    )

    print_query(
        "Top 10 Matches",
        con,
        """
        SELECT
            match_id,
            COUNT(*) AS row_count
        FROM events
        GROUP BY match_id
        ORDER BY row_count DESC
        LIMIT 10
        """,
    )

    print_query(
        "Top 10 Matches by player count",
        con,
        """        
        SELECT
            match_id,
            COUNT(DISTINCT user_id) AS player_count,
            match_date
        FROM events
        GROUP BY match_id, match_date
        ORDER BY player_count DESC
        LIMIT 10
        """,
    )

    print_query(
        "match_id = 'fbbc5d02-dd79-42fb-bba5-d768023891c8.nakama-0' players",
        con,
        """        
        SELECT
            match_id,
            user_id,
            match_date
        FROM events
        where match_id = 'fbbc5d02-dd79-42fb-bba5-d768023891c8.nakama-0'
        GROUP BY match_id, match_date, user_id
        """,
    )

    con.close()


if __name__ == "__main__":
    main()
