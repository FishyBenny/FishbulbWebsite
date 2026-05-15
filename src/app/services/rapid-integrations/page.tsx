import LiveMirror, { getLiveMetadata } from "@/components/LiveMirror";

export const dynamic = "force-dynamic";

export const generateMetadata = () => getLiveMetadata("/services/rapid-integrations");

export default function RapidIntegrationsPage() {
  return <LiveMirror path="/services/rapid-integrations" />;
}
