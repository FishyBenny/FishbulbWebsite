import LiveMirror, { getLiveMetadata } from "@/components/LiveMirror";

export const dynamic = "force-dynamic";

export const generateMetadata = () => getLiveMetadata("/services/software-development");

export default function SoftwareDevelopmentPage() {
  return <LiveMirror path="/services/software-development" />;
}
