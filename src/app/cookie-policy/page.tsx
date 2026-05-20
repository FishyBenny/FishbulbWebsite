import LiveMirror, { getLiveMetadata } from "@/components/LiveMirror";
export const generateMetadata = () => getLiveMetadata("/cookie-policy");

export default function CookiePolicyPage() {
  return <LiveMirror path="/cookie-policy" />;
}
