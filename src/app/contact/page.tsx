import LiveMirror, { getLiveMetadata } from "@/components/LiveMirror";
export const generateMetadata = () => getLiveMetadata("/contact");

export default function ContactPage() {
  return <LiveMirror path="/contact" />;
}
