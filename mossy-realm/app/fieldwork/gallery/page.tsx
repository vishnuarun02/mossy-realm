import RetroBox from "@/components/RetroBox";

export default function GalleryPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <RetroBox title="{ gallery }" variant="alt">
        <div className="text-center space-y-4">
          <p className="font-accent text-mossy-header text-lg">
            ~ visual field notes ~
          </p>
          <p className="text-mossy-text">
            Photos I&apos;ve taken, treated as documentation of moments.
            A masonry collection of visual fragments from the field.
          </p>
          <p className="text-mossy-text-muted text-sm italic">
            images loading from r2...
          </p>
        </div>

        <div className="border-t-2 border-mossy-border my-6"></div>

        {/* Placeholder for masonry gallery */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="aspect-square bg-mossy-bg-box border-2 border-mossy-border flex items-center justify-center"
            >
              <span className="text-mossy-text-muted text-sm">image {i}</span>
            </div>
          ))}
        </div>
      </RetroBox>
    </div>
  );
}

