# Technical Design Document (TDD)
*Template optimized for solo execution, focusing on system boundaries and implementation blueprints.*

## 1. Meta
- **Feature/Component:** [e.g., Telemetry Ingestion API]
- **Related PRD/ADR:** [Link to PRD] | [Link to ADR-001]

## 2. Architecture & Design Patterns
*What structural patterns are applied here?*
- **Pattern:** [e.g., Clean Architecture / Hexagonal Architecture]
- **Explanation:** The domain logic (metric validation) will be strictly isolated from the infrastructure layer (Kafka publisher, HTTP framework).

## 3. System Context & Boundaries
*How does this piece fit into the larger puzzle?*
- **Input:** POST request from Edge Device.
- **Output:** Avro-serialized event published to `device-telemetry-v1` topic.

## 4. Data Model / Schema
*Define the exact contract.*
```json
// Example Payload
{
  "device_id": "uuid",
  "timestamp": "iso-8601",
  "metrics": {
    "cpu_temp": 45.5,
    "status": "active"
  }
}
```

## 5. Implementation Steps (The Blueprint)
*A checklist to follow so you don't have to hold the whole architecture in your head while coding.*
- [ ] 1. Define the Domain Entities (`DeviceMetric`).
- [ ] 2. Implement the Use Case / Application Service (Validation logic).
- [ ] 3. Create the Infrastructure Adapter (Kafka Producer implementation).
- [ ] 4. Wire the HTTP Controller (Framework routing).
- [ ] 5. Write integration test (Controller -> Kafka topic).

## 6. Infrastructure & Deployment
*How does this get to production?*
- **Hosting:** [e.g., AWS ECS / Digital Ocean Droplet]
- **CI/CD:** [e.g., GitHub Actions building a Docker image and pushing to registry]
- **Environment Variables Required:** `KAFKA_BROKERS`, `API_SECRET_KEY`
