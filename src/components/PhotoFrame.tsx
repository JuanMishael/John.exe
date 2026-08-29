import Image from "next/image";

export default function PhotoFrame({ width, height }: { width: number; height: number }) {
  return (
    <div className="photo-frame">
      <div style={{ width, height, position: "relative", overflow: "hidden" }}>
        <Image src="/john-photo.jpg" alt="John Calimoso" fill sizes={`${width}px`} style={{ objectFit: "cover" }} />
      </div>
      <span className="photo-date">&apos;26 08 14</span>
    </div>
  );
}
