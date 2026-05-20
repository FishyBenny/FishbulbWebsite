import LiveMirror, { getLiveMetadata } from "@/components/LiveMirror";
export const generateMetadata = () => getLiveMetadata("/about");

export default function AboutPage() {
  return <LiveMirror path="/about" />;
}
