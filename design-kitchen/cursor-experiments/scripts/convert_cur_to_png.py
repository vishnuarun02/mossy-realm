#!/usr/bin/env python3
"""
Convert .cur static cursor files to .png format for web display.
"""

import os
from PIL import Image

def convert_cur_to_png(cur_path, png_path):
    """Convert a single CUR file to PNG."""
    print(f"Converting: {os.path.basename(cur_path)}")
    
    try:
        # Open CUR file (PIL supports ICO/CUR format)
        img = Image.open(cur_path)
        
        # Convert to RGBA
        img = img.convert('RGBA')
        
        print(f"  Size: {img.width}x{img.height}")
        
        # Save as PNG
        img.save(png_path, 'PNG')
        print(f"  ✓ Saved: {os.path.basename(png_path)}")
        return True
        
    except Exception as e:
        print(f"  Error: {e}")
        return False

def main():
    cursors_dir = os.path.join(os.path.dirname(__file__), 'cursors')
    
    # Find all .cur files
    cur_files = [f for f in os.listdir(cursors_dir) if f.lower().endswith('.cur')]
    
    print(f"Found {len(cur_files)} CUR files to convert\n")
    
    success_count = 0
    for cur_file in cur_files:
        cur_path = os.path.join(cursors_dir, cur_file)
        png_path = os.path.join(cursors_dir, cur_file[:-4] + '.png')
        
        if convert_cur_to_png(cur_path, png_path):
            success_count += 1
        print()
    
    print(f"Done! Converted {success_count}/{len(cur_files)} files successfully.")

if __name__ == '__main__':
    main()

