import LiveMirror, { getLiveMetadata } from "@/components/LiveMirror";

export const dynamic = "force-dynamic";

export const generateMetadata = () => getLiveMetadata("/about");

export default function AboutPage() {
  return <LiveMirror path="/about" />;
}
