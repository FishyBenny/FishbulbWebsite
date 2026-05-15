import LiveMirror, { getLiveMetadata } from "@/components/LiveMirror";

export const dynamic = "force-dynamic";

export const generateMetadata = () => getLiveMetadata("/services/ai-automations");

export default function AIAutomationsPage() {
  return <LiveMirror path="/services/ai-automations" />;
}
