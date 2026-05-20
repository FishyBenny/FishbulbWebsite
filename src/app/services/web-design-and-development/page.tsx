import LiveMirror, { getLiveMetadata } from "@/components/LiveMirror";
export const generateMetadata = () => getLiveMetadata("/services/web-design-and-development");

export default function WebDesignPage() {
  return <LiveMirror path="/services/web-design-and-development" />;
}
