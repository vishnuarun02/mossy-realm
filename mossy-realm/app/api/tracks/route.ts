import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { NextResponse } from 'next/server';

// Next.js route segment config
export const revalidate = 300; // 5 minutes

const AUDIO_EXTENSIONS = ['.mp3', '.m4a', '.wav', '.ogg', '.flac', '.aac'];

const r2 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

function isAudioFile(key: string): boolean {
  const lower = key.toLowerCase();
  return AUDIO_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

function formatTitle(filename: string): string {
  // Remove extension, replace dashes/underscores with spaces, capitalize words
  return filename
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function getExtension(filename: string): string {
  const match = filename.match(/\.([^.]+)$/);
  return match ? match[1].toLowerCase() : '';
}

export async function GET() {
  const bucket = process.env.R2_BUCKET_NAME;
  const publicBase = process.env.R2_PUBLIC_BASE?.replace(/\/+$/, ''); // strip trailing slashes
  const prefix = process.env.R2_PREFIX || 'music/';

  if (!bucket || !publicBase) {
    return NextResponse.json(
      { error: 'R2 not configured', tracks: [] },
      { status: 500 }
    );
  }

  try {
    const allObjects: {
      key: string;
      lastModified: Date | undefined;
      size: number | undefined;
    }[] = [];

    let continuationToken: string | undefined;

    // Handle pagination (R2 can return max 1000 objects per request)
    do {
      const command = new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: prefix,
        ContinuationToken: continuationToken,
      });

      const response = await r2.send(command);

      if (response.Contents) {
        for (const obj of response.Contents) {
          if (obj.Key && isAudioFile(obj.Key)) {
            allObjects.push({
              key: obj.Key,
              lastModified: obj.LastModified,
              size: obj.Size,
            });
          }
        }
      }

      continuationToken = response.IsTruncated
        ? response.NextContinuationToken
        : undefined;
    } while (continuationToken);

    // Stable ordering: sort by filename alphabetically
    allObjects.sort((a, b) => a.key.localeCompare(b.key));

    const tracks = allObjects.map((obj) => {
      const key = obj.key; // e.g. music/foo-bar.mp3
      const filename = key.replace(new RegExp(`^${prefix}`), '');
      const id = filename.replace(/\.[^.]+$/, ''); // strip extension for id

      return {
        id,
        title: formatTitle(filename),
        url: `${publicBase}/${encodeURI(key)}`,
        format: getExtension(filename),
        size: obj.size,
        lastModified: obj.lastModified?.toISOString(),
      };
    });

    return NextResponse.json(
      { tracks, count: tracks.length },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (error) {
    console.error('R2 list error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tracks', tracks: [] },
      { status: 500 }
    );
  }
}

