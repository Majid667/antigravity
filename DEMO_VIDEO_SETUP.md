# How to Add Your Demo Video

To add your 5-second demo video to the website:

## Option 1: Upload Your Own Video File (Recommended)

1. Create or record a 5-second video showcasing your app features
2. Export it as **MP4** format (H.264 codec recommended)
3. Optimize the file size:
   - Recommended: 10-20MB for best performance
   - Use tools like HandBrake or FFmpeg to compress if needed
4. Place the video file at: `public/demo-video.mp4`
5. The video will automatically play in fullscreen when users click "Watch Demo"

## Option 2: Use an Online Video Service

If you don't want to store the video locally:
1. Upload your demo video to a service like:
   - Vimeo (recommended)
   - YouTube
   - Mux
   - AWS S3

2. Update `src/components/DemoVideoModal.jsx`:
   ```jsx
   <source src="https://your-video-url-here.mp4" type="video/mp4" />
   ```

## Creating Your Demo Video

### What to Show:
- Upload a long video
- AI automatically creating clips
- Reframing in action
- Download multiple viral clips
- Platform-ready exports

### Specifications:
- **Duration**: 5 seconds
- **Format**: MP4 (H.264 + AAC)
- **Resolution**: 1920x1080 (or higher)
- **Frame Rate**: 30fps or 60fps
- **File Size**: 10-30MB
- **Codec**: H.264 (video), AAC (audio, optional)

### Tools to Create the Video:
- Adobe Premiere Pro
- DaVinci Resolve (Free)
- Final Cut Pro
- FFmpeg (Command line)

## FFmpeg Command Example

If you have FFmpeg installed, you can convert your video:

```bash
ffmpeg -i input.mov -c:v libx264 -preset medium -crf 23 -c:a aac demo-video.mp4
```

## Current Status

- Demo video modal is fully functional
- Fallback video is available if local video isn't found
- Thumbnail generated at: `public/demo-thumbnail.jpg`

Once you add your video to `public/demo-video.mp4`, it will automatically display in the demo modal!
