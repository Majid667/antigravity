#!/usr/bin/env python3
"""
Generate a 5-second demo video showcasing video editing features
"""
import subprocess
import os

# Create a simple MP4 demo video using ffmpeg
# This creates a video with text overlays showing the app features

output_path = '/vercel/share/v0-project/public/demo-video.mp4'

# Create frames showing different features
# We'll use ffmpeg to create a video with text and color transitions

cmd = [
    'ffmpeg',
    '-f', 'lavfi',
    '-i', 'color=c=1a1a2e:s=1920x1080:d=1.25',  # Dark background, 1.25s
    '-vf', "text=text='One Long Video':fontsize=80:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2-100:enable='between(t,0,1.25)'",
    '-y',
    '/tmp/frame1.mp4'
]

# Frame 1: "One Long Video"
subprocess.run([
    'ffmpeg', '-f', 'lavfi', '-i', 'color=c=1a1a2e:s=1920x1080:d=1',
    '-vf', "drawtext=text='One Long Video':fontsize=80:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2:box=1:boxcolor=0000ff@0.3:boxborderw=10",
    '-y', '/tmp/frame1.mp4'
], check=False)

# Frame 2: "10 Viral Clips"
subprocess.run([
    'ffmpeg', '-f', 'lavfi', '-i', 'color=c=16213e:s=1920x1080:d=1',
    '-vf', "drawtext=text='10 Viral Clips':fontsize=80:fontcolor=00ff00:x=(w-text_w)/2:y=(h-text_h)/2:box=1:boxcolor=00ff00@0.2:boxborderw=10",
    '-y', '/tmp/frame2.mp4'
], check=False)

# Frame 3: "AI Powered Reframing"
subprocess.run([
    'ffmpeg', '-f', 'lavfi', '-i', 'color=c=0f3460:s=1920x1080:d=1',
    '-vf', "drawtext=text='AI Powered Reframing':fontsize=80:fontcolor=ff00ff:x=(w-text_w)/2:y=(h-text_h)/2:box=1:boxcolor=ff00ff@0.2:boxborderw=10",
    '-y', '/tmp/frame3.mp4'
], check=False)

# Frame 4: "Create 10x Faster"
subprocess.run([
    'ffmpeg', '-f', 'lavfi', '-i', 'color=c=1a1a2e:s=1920x1080:d=1.2',
    '-vf', "drawtext=text='Create 10x Faster':fontsize=80:fontcolor=ffff00:x=(w-text_w)/2:y=(h-text_h)/2:box=1:boxcolor=ffff00@0.2:boxborderw=10",
    '-y', '/tmp/frame4.mp4'
], check=False)

# Combine all frames
subprocess.run([
    'ffmpeg',
    '-i', '/tmp/frame1.mp4',
    '-i', '/tmp/frame2.mp4',
    '-i', '/tmp/frame3.mp4',
    '-i', '/tmp/frame4.mp4',
    '-filter_complex', '[0][1][2][3]concat=n=4:v=1:a=0',
    '-c:v', 'libx264',
    '-preset', 'fast',
    '-crf', '23',
    '-y',
    output_path
], check=False)

# Clean up temp files
for f in ['/tmp/frame1.mp4', '/tmp/frame2.mp4', '/tmp/frame3.mp4', '/tmp/frame4.mp4']:
    if os.path.exists(f):
        os.remove(f)

print(f"Demo video created at: {output_path}")
