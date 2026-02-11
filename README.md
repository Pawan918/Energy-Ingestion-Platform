# High-Scale Energy Ingestion Engine

Backend system built with **NestJS + PostgreSQL** to ingest, process,
and analyze high-frequency telemetry data from Smart Meters and EV
Fleets.


## Executive Summary

This system simulates a high-scale IoT ingestion platform where:

-   10,000+ Smart Meters send AC energy telemetry every 60 seconds.
-   10,000+ EVs send DC battery telemetry every 60 seconds.
-   The backend:
    -   Ingests polymorphic telemetry streams
    -   Separates operational (hot) and historical (cold) data
    -   Provides fast analytical insights for fleet operators

The system is designed to handle write-heavy ingestion workloads and
read-heavy analytical queries efficiently.


# Architecture Overview

    Smart Meter Stream  --->  Ingestion API  --->  Cold Store (History)
    Vehicle Stream      --->                 --->  Hot Store (Live)

                                             --->  Analytics API

### Key Architectural Decisions

-   Append-only historical store for auditability
-   Upsert-based live store for fast dashboard reads
-   24-hour bounded analytical queries
-   SQL-level aggregation (no in-memory loops)
-   Indexed time-series queries
-   Monorepo structure for clean separation of services


# 📦 Project Structure (Monorepo)

    energy-ingestion-platform/
    │
    ├── apps/
    │   ├── ingestion-api/
    │   └── analytics-api/
    │
    ├── libs/
    │   ├── database/
    │   ├── common/
    │   └── domain/
    │
    ├── docker-compose.yml
    └── README.md

# Ingestion Engine

## Endpoint

POST /v1/ingest

## Supported Payloads

### Meter Telemetry

{ "meterId": "M-101", "kwhConsumedAc": 14.6, "voltage": 230,
"timestamp": "2026-02-10T00:55:12Z" }

### Vehicle Telemetry

{ "vehicleId": "V-201", "soc": 75, "kwhDeliveredDc": 11.2,
"batteryTemp": 36, "timestamp": "2026-02-10T00:55:12Z" }


# Data Strategy

## Cold Store (Historical -- Append Only)

Tables: - meter_telemetry_history - vehicle_telemetry_history

Used for: - 24-hour analytics - Long-term reporting - Audit trail

Persistence strategy: repository.insert()

## Hot Store (Operational -- Upsert)

Tables: - meter_live_status - vehicle_live_status

Used for: - Dashboard current status - Latest SoC - Active charging
metrics

Persistence strategy: repository.save()

# Analytics Engine

## Endpoint

GET /v1/analytics/performance/:vehicleId

## Returns (Last 24 Hours)

-   Total AC energy consumed
-   Total DC energy delivered
-   Efficiency ratio (DC / AC)
-   Average battery temperature

# Indexing Strategy

Composite indexes: (vehicleId, timestamp) (meterId, timestamp)

Ensures: - Fast time-bounded queries - No full table scans - Efficient
aggregation


# Docker Setup

Start services:

docker compose up -d

Services: - PostgreSQL 15 - pgAdmin 4

Database: - Name: energy_db - User: energy_user


# Requirement Mapping

  Requirement             Implementation
  ----------------------- ----------------------------------------
  Polymorphic ingestion   Single endpoint with payload detection
  Hot vs Cold storage     Separate live and history tables
  Insert vs Upsert        insert() for history, save() for live
  Analytical endpoint     24-hour SQL aggregation
  No full table scan      Indexed time-window filtering
  Docker environment      docker-compose with Postgres

------------------------------------------------------------------------

# Author

Pawan Kumar\
Backend Developer (Node.js / NestJS)

------------------------------------------------------------------------

# Conclusion

This project demonstrates:

-   High-throughput ingestion design
-   Time-series data modeling
-   Performance-aware SQL analytics
-   Operational vs analytical data separation
-   Modular NestJS architecture
