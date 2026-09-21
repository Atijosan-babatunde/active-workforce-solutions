"use client";

import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

// swagger-ui-react touches browser-only globals at import time, so it must
// be dynamically imported with SSR disabled rather than imported normally.
const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

export default function ApiDocsPage() {
  return (
    <div className="bg-white">
      <SwaggerUI url="/api/openapi.json" />
    </div>
  );
}
