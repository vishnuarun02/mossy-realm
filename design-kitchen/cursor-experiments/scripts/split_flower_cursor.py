#!/usr/bin/env python3
"""
Split the flower cursor image into closed and open versions,
crop out the text, and resize for cursor use.
"""

from PIL import Image
import os

def split_and_process_cursor(input_path, output_dir):
    """Split the combined image into two cursor images."""
    
    print(f"Loading: {input_path}")
    img = Image.open(input_path).convert('RGBA')
    
    width, height = img.size
    print(f"Original size: {width}x{height}")
    
    # The image has two flowers side by side with text below
    # We need to:
    # 1. Split into left (closed) and right (open) halves
    # 2. Crop out the text at the bottom
    # 3. Trim to just the flower content
    
    mid_x = width // 2
    
    # Crop top portion (above the text - roughly top 70% of image)
    text_cutoff = int(height * 0.72)  # Cut off bottom 28% where text is
    
    # Left half (closed flower)
    left_crop = img.crop((0, 0, mid_x, text_cutoff))
    
    # Right half (open flower) 
    right_crop = img.crop((mid_x, 0, width, text_cutoff))
    
    print(f"After text crop - Left: {left_crop.size}, Right: {right_crop.size}")
    
    # Find bounding box of actual content (non-transparent/non-white pixels)
    def get_content_bbox(image):
        """Get bounding box of non-background content."""
        # Convert to check for non-white, non-transparent pixels
        pixels = image.load()
        w, h = image.size
        
        min_x, min_y = w, h
        max_x, max_y = 0, 0
        
        for y in range(h):
            for x in range(w):
                r, g, b, a = pixels[x, y]
                # Check if pixel is not white/near-white and has some opacity
                if a > 20 and (r < 250 or g < 250 or b < 250):
                    min_x = min(min_x, x)
                    min_y = min(min_y, y)
                    max_x = max(max_x, x)
                    max_y = max(max_y, y)
        
        # Add small padding
        padding = 5
        min_x = max(0, min_x - padding)
        min_y = max(0, min_y - padding)
        max_x = min(w, max_x + padding)
        max_y = min(h, max_y + padding)
        
        return (min_x, min_y, max_x, max_y)
    
    # Crop to content
    left_bbox = get_content_bbox(left_crop)
    right_bbox = get_content_bbox(right_crop)
    
    print(f"Content bbox - Left: {left_bbox}, Right: {right_bbox}")
    
    left_content = left_crop.crop(left_bbox)
    right_content = right_crop.crop(right_bbox)
    
    print(f"Content size - Closed: {left_content.size}, Open: {right_content.size}")
    
    # Make background truly transparent (remove white background)
    def make_transparent(image, threshold=245):
        """Make white/near-white pixels transparent."""
        pixels = image.load()
        w, h = image.size
        
        for y in range(h):
            for x in range(w):
                r, g, b, a = pixels[x, y]
                # If pixel is white/near-white, make transparent
                if r > threshold and g > threshold and b > threshold:
                    pixels[x, y] = (r, g, b, 0)
        
        return image
    
    left_transparent = make_transparent(left_content.copy())
    right_transparent = make_transparent(right_content.copy())
    
    # Resize for cursor use (32x32 is standard, but we'll keep aspect ratio)
    cursor_size = 32
    
    def resize_for_cursor(image, target_size):
        """Resize image to fit within target size while maintaining aspect ratio."""
        w, h = image.size
        ratio = min(target_size / w, target_size / h)
        new_w = int(w * ratio)
        new_h = int(h * ratio)
        
        # Use LANCZOS for high-quality downscaling
        resized = image.resize((new_w, new_h), Image.LANCZOS)
        
        # Create square canvas and center the image
        canvas = Image.new('RGBA', (target_size, target_size), (0, 0, 0, 0))
        paste_x = (target_size - new_w) // 2
        paste_y = (target_size - new_h) // 2
        canvas.paste(resized, (paste_x, paste_y), resized)
        
        return canvas
    
    # Create cursor-sized versions
    closed_cursor = resize_for_cursor(left_transparent, cursor_size)
    open_cursor = resize_for_cursor(right_transparent, cursor_size)
    
    # Also create larger preview versions for the cursor gallery
    closed_preview = resize_for_cursor(left_transparent, 64)
    open_preview = resize_for_cursor(right_transparent, 64)
    
    # Ensure output directory exists
    os.makedirs(output_dir, exist_ok=True)
    
    # Save cursor files
    closed_path = os.path.join(output_dir, 'flower-closed.png')
    open_path = os.path.join(output_dir, 'flower-open.png')
    
    closed_cursor.save(closed_path, 'PNG')
    open_cursor.save(open_path, 'PNG')
    
    print(f"\n✓ Saved: {closed_path} ({cursor_size}x{cursor_size})")
    print(f"✓ Saved: {open_path} ({cursor_size}x{cursor_size})")
    
    # Save preview files
    closed_preview_path = os.path.join(output_dir, 'flower-closed-preview.png')
    open_preview_path = os.path.join(output_dir, 'flower-open-preview.png')
    
    closed_preview.save(closed_preview_path, 'PNG')
    open_preview.save(open_preview_path, 'PNG')
    
    print(f"✓ Saved: {closed_preview_path} (64x64 preview)")
    print(f"✓ Saved: {open_preview_path} (64x64 preview)")
    
    return True

if __name__ == '__main__':
    input_image = "/Users/vishnuarun/Downloads/ChatGPT Image Jan 16, 2026, 07_05_23 PM.png"
    output_directory = "/Users/vishnuarun/Documents/projects_repository/mossyrealm/mossy-realm/public/cursors"
    
    split_and_process_cursor(input_image, output_directory)
    
    print("\n🌸 Flower cursors ready for MossyRealm!")

