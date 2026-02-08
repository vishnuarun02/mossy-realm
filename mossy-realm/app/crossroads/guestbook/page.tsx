import RetroBox from "@/components/RetroBox";

export default function GuestbookPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <RetroBox title="{ guestbook }" variant="alt">
        <div className="text-center space-y-4">
          <p className="font-accent text-mossy-header text-lg">
            ~ leave a mark on the moss ~
          </p>
          <p className="text-mossy-text">
            A classic guestbook for visitors to sign.
            Say hi, leave a note, or just let me know you were here.
          </p>
          <p className="text-mossy-text-muted text-sm italic">
            the most 90s feature of them all
          </p>
        </div>

        <div className="border-t-2 border-mossy-border my-6"></div>

        <div className="space-y-4 text-center">
          <p className="text-mossy-text-muted">
            guestbook widget coming soon...
          </p>
        </div>
      </RetroBox>
    </div>
  );
}

