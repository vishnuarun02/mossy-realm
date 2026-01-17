#!/usr/bin/env python3
"""
Convert .ani animated cursor files to .gif format for web use.
ANI files are RIFF containers with ICO frames inside.
"""

import struct
import os
from PIL import Image
import io

def read_ani_file(filepath):
    """Parse an ANI file and extract frames."""
    with open(filepath, 'rb') as f:
        data = f.read()
    
    # ANI files start with RIFF header
    if data[:4] != b'RIFF':
        raise ValueError("Not a valid RIFF file")
    
    # Skip RIFF header (4 bytes) + size (4 bytes) + ACON (4 bytes)
    if data[8:12] != b'ACON':
        raise ValueError("Not a valid ANI file")
    
    frames = []
    frame_rate = 60  # Default jiffies (1/60th second)
    
    pos = 12
    while pos < len(data):
        if pos + 8 > len(data):
            break
            
        chunk_type = data[pos:pos+4]
        chunk_size = struct.unpack('<I', data[pos+4:pos+8])[0]
        chunk_data = data[pos+8:pos+8+chunk_size]
        
        if chunk_type == b'anih':
            # Animation header - contains rate info
            if len(chunk_data) >= 16:
                # anih structure: size, frames, steps, width, height, bits, planes, rate, flags
                num_frames = struct.unpack('<I', chunk_data[4:8])[0]
                frame_rate = struct.unpack('<I', chunk_data[16:20])[0] if len(chunk_data) >= 20 else 60
        
        elif chunk_type == b'LIST':
            # LIST chunk can contain 'fram' with icon frames
            list_type = chunk_data[:4]
            if list_type == b'fram':
                # Parse frames
                frame_pos = 4
                while frame_pos < len(chunk_data):
                    if frame_pos + 8 > len(chunk_data):
                        break
                    sub_type = chunk_data[frame_pos:frame_pos+4]
                    sub_size = struct.unpack('<I', chunk_data[frame_pos+4:frame_pos+8])[0]
                    if sub_type == b'icon':
                        icon_data = chunk_data[frame_pos+8:frame_pos+8+sub_size]
                        frames.append(icon_data)
                    frame_pos += 8 + sub_size
                    # Align to word boundary
                    if sub_size % 2:
                        frame_pos += 1
        
        pos += 8 + chunk_size
        # Align to word boundary
        if chunk_size % 2:
            pos += 1
    
    return frames, frame_rate

def ico_to_image(ico_data):
    """Convert ICO/CUR data to PIL Image."""
    try:
        # Try to open as ICO
        img = Image.open(io.BytesIO(ico_data))
        return img.convert('RGBA')
    except Exception as e:
        print(f"  Warning: Could not parse frame: {e}")
        return None

def create_gif_from_frames(frames, output_path, frame_delay_ms=100):
    """Create an animated GIF from a list of PIL Images."""
    if not frames:
        return False
    
    # Filter out None frames
    valid_frames = [f for f in frames if f is not None]
    if not valid_frames:
        return False
    
    # Find the largest frame size
    max_width = max(f.width for f in valid_frames)
    max_height = max(f.height for f in valid_frames)
    
    # Resize all frames to match (center them)
    resized_frames = []
    for frame in valid_frames:
        new_frame = Image.new('RGBA', (max_width, max_height), (0, 0, 0, 0))
        x = (max_width - frame.width) // 2
        y = (max_height - frame.height) // 2
        new_frame.paste(frame, (x, y))
        resized_frames.append(new_frame)
    
    # Convert to palette mode for GIF (with transparency)
    gif_frames = []
    for frame in resized_frames:
        # Create a version with white background for better visibility
        bg = Image.new('RGBA', frame.size, (255, 255, 255, 0))
        bg.paste(frame, mask=frame.split()[3] if len(frame.split()) == 4 else None)
        # Convert to palette
        gif_frame = bg.convert('P', palette=Image.ADAPTIVE, colors=255)
        gif_frames.append(gif_frame)
    
    # Save as animated GIF
    gif_frames[0].save(
        output_path,
        save_all=True,
        append_images=gif_frames[1:],
        duration=frame_delay_ms,
        loop=0,
        transparency=0,
        disposal=2
    )
    return True

def convert_ani_to_gif(ani_path, gif_path):
    """Convert a single ANI file to GIF."""
    print(f"Converting: {os.path.basename(ani_path)}")
    
    try:
        frames_data, frame_rate = read_ani_file(ani_path)
        print(f"  Found {len(frames_data)} frames, rate: {frame_rate} jiffies")
        
        if not frames_data:
            print(f"  Error: No frames found")
            return False
        
        # Convert ICO data to PIL Images
        images = []
        for i, frame_data in enumerate(frames_data):
            img = ico_to_image(frame_data)
            if img:
                images.append(img)
                print(f"  Frame {i+1}: {img.width}x{img.height}")
        
        if not images:
            print(f"  Error: Could not convert any frames")
            return False
        
        # Calculate frame delay (jiffies are 1/60th second)
        # Default to reasonable animation speed
        frame_delay_ms = max(50, min(200, (frame_rate * 1000) // 60))
        print(f"  Frame delay: {frame_delay_ms}ms")
        
        success = create_gif_from_frames(images, gif_path, frame_delay_ms)
        if success:
            print(f"  ✓ Saved: {os.path.basename(gif_path)}")
        return success
        
    except Exception as e:
        print(f"  Error: {e}")
        return False

def main():
    cursors_dir = os.path.join(os.path.dirname(__file__), 'cursors')
    
    # Find all .ani files
    ani_files = [f for f in os.listdir(cursors_dir) if f.lower().endswith('.ani')]
    
    print(f"Found {len(ani_files)} ANI files to convert\n")
    
    success_count = 0
    for ani_file in ani_files:
        ani_path = os.path.join(cursors_dir, ani_file)
        gif_path = os.path.join(cursors_dir, ani_file[:-4] + '.gif')
        
        if convert_ani_to_gif(ani_path, gif_path):
            success_count += 1
        print()
    
    print(f"Done! Converted {success_count}/{len(ani_files)} files successfully.")

if __name__ == '__main__':
    main()

