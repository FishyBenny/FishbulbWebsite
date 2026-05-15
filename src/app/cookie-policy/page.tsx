import LiveMirror, { getLiveMetadata } from "@/components/LiveMirror";

export const dynamic = "force-dynamic";

export const generateMetadata = () => getLiveMetadata("/cookie-policy");

export default function CookiePolicyPage() {
  return <LiveMirror path="/cookie-policy" />;
}
