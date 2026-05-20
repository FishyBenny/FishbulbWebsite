import LiveMirror, { getLiveMetadata } from "@/components/LiveMirror";
export const generateMetadata = () => getLiveMetadata("/our-work");

export default function OurWorkPage() {
  return <LiveMirror path="/our-work" />;
}
