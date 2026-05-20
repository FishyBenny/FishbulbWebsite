import LiveMirror, { getLiveMetadata } from "@/components/LiveMirror";
export const generateMetadata = () => getLiveMetadata("/");

export default function Home() {
  return <LiveMirror path="/" />;
}
