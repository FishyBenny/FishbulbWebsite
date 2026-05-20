import LiveMirror, { getLiveMetadata } from "@/components/LiveMirror";
export const generateMetadata = () => getLiveMetadata("/services/ux-ui");

export default function UxUiPage() {
  return <LiveMirror path="/services/ux-ui" />;
}
