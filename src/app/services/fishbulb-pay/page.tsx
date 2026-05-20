import LiveMirror, { getLiveMetadata } from "@/components/LiveMirror";
export const generateMetadata = () => getLiveMetadata("/services/fishbulb-pay");

export default function FishbulbPayPage() {
  return <LiveMirror path="/services/fishbulb-pay" />;
}
