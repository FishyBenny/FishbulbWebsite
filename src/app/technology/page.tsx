import LiveMirror, { getLiveMetadata } from "@/components/LiveMirror";
export const generateMetadata = () => getLiveMetadata("/technology");

export default function TechnologyPage() {
  return <LiveMirror path="/technology" />;
}
