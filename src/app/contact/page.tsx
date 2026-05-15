import LiveMirror, { getLiveMetadata } from "@/components/LiveMirror";

export const dynamic = "force-dynamic";

export const generateMetadata = () => getLiveMetadata("/contact");

export default function ContactPage() {
  return <LiveMirror path="/contact" />;
}
