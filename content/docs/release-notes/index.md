---
title: Release Notes
description: Latest updates and improvements to Parseable
---

# Release Notes

## Version 2.1.0 (May 26, 2025)

### New Features

- **Advanced Analytics Dashboard**: A completely redesigned analytics dashboard with customizable widgets and real-time data visualization.
- **Multi-factor Authentication**: Enhanced security with optional MFA support for all user accounts.
- **API Rate Limiting Controls**: New controls to manage and monitor API usage with customizable rate limits.

### Improvements

- Improved query performance for large datasets
- Enhanced UI responsiveness on mobile devices
- Updated documentation with more examples and tutorials

### Bug Fixes

- Fixed an issue where exports would fail for datasets larger than 1GB
- Resolved authentication token refresh problems
- Fixed display issues in dark mode for charts and graphs

## Version 2.0.1 (April 15, 2025)

### Performance Improvements

- Optimized query execution for complex joins, resulting in up to 40% faster response times
- Reduced memory usage for large dataset processing
- Improved caching mechanism for frequently accessed data

### Bug Fixes

- Fixed an issue with date range filters not working correctly in certain timezones
- Resolved a problem with CSV exports missing column headers
- Fixed UI layout issues on smaller screens

## Version 2.0.0 (March 1, 2025)

### Major Features

- **New Integrations**: Added support for Elasticsearch, Prometheus, and Grafana
- **Enhanced Monitoring**: Real-time system monitoring with customizable alerts
- **Distributed Tracing**: End-to-end tracing capabilities for complex workflows

### Improvements

- Completely redesigned user interface with improved accessibility
- Expanded API capabilities with new endpoints for advanced queries
- Enhanced documentation with interactive examples

### Breaking Changes

- Deprecated legacy API endpoints (v1.x) - see migration guide
- Changed configuration file format - automatic migration tool provided
- Updated minimum requirements for server deployments
