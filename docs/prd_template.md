# Product Requirements Document (PRD)
*Template optimized for a Solo Developer / Indie Hacker*

## 1. Meta
- **Project Name:** [e.g., IoT Telemetry Dashboard]
- **Status:** [Draft | Active | Completed]
- **Last Updated:** YYYY-MM-DD

## 2. Problem Statement & Value Proposition
*Why are you building this? What specific pain point does it solve?*
- **Problem:** [e.g., Users lack real-time visibility into edge device connectivity drops.]
- **Value:** [e.g., Provides sub-second alerts, reducing mean time to recovery (MTTR).]

## 3. Target Audience
*Who is the end user? Keep it strictly defined to avoid feature creep.*
- **Persona:** [e.g., Infrastructure Operations Engineer]

## 4. Scope (The "Contract with Myself")
*Crucial for solo developers to prevent endless tinkering.*
### In Scope (Must Haves)
- [ ] Feature A: [e.g., Real-time data ingestion]
- [ ] Feature B: [e.g., Basic user authentication]

### Out of Scope (Strictly Forbidden for v1)
- [ ] [e.g., Complex RBAC (Role-Based Access Control) - defer to v2]
- [ ] [e.g., Multi-region deployment]

## 5. Use Cases & User Journey
*Step-by-step narrative of the core loop.*
1. User logs in.
2. User navigates to the dashboard.
3. System displays live metrics via WebSockets.

## 6. Success Metrics
*How do you know it's "done" and successful?*
- Technical: [e.g., p99 latency < 200ms]
- Product: [e.g., 10 daily active users in the first month]
