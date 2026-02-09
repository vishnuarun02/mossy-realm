import RetroBox from "@/components/RetroBox";
import UnderConstruction from "@/components/UnderConstruction";

export default function GuestbookPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <RetroBox title="{ guestbook }" variant="alt">
        <div className="text-center space-y-4">
          <p className="font-accent text-mossy-header text-lg">
            ~ leave your mark ~
          </p>
          <p className="text-mossy-text">
            Sign in, say hi, let me know you were here.
          </p>
        </div>

        <div className="border-t-2 border-mossy-border my-6"></div>

        <UnderConstruction />
      </RetroBox>
    </div>
  );
}
