import LiveMirror, { getLiveMetadata } from "@/components/LiveMirror";
export const generateMetadata = () => getLiveMetadata("/services/filemaker-development");

export default function FilemakerDevelopmentPage() {
  return <LiveMirror path="/services/filemaker-development" />;
}
