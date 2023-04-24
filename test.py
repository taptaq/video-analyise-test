# import openai
# import ffmpeg
# from pydub import AudioSegment
# from pydub.utils import mediainfo

# input_file = "aaa.mp4"
# output_file = "output.mp3"

# # 使用FFmpeg读取视频文件
# probe = ffmpeg.probe(input_file)
# video_info = next(s for s in probe['streams'] if s['codec_type'] == 'video')
# duration = float(video_info['duration'])
# audio_stream = next((s for s in probe['streams'] if s['codec_type'] == 'audio'), None)

# # 使用pydub将视频转换为音频
# if audio_stream is not None:
#     audio_bitrate = int(audio_stream['bit_rate'])
#     audio_codec = audio_stream['codec_name']
#     audio_sample_rate = int(audio_stream['sample_rate'])
#     audio_channels = int(audio_stream['channels'])
#     input_audio = AudioSegment.from_file(input_file, format="mp4", start_seconds=0, duration=duration*1000)
#     output_audio = input_audio.set_channels(audio_channels).set_sample_width(2).set_frame_rate(audio_sample_rate)
#     output_audio.export(output_file, format="mp3", bitrate=str(audio_bitrate // 1000) + "k")
# else:
#     print("No audio stream found in the input file.")


# openai.api_key='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'
# audio_file= open("./output.mp3", "rb")
# transcript = openai.Audio.transcribe("whisper-1", audio_file)
# print(transcript.text, '----tran')

# with open("outPutsrt.txt", "w") as file:
#     file.write(transcript.text)


try:
   import Image
except ImportError:
   from PIL import Image
import pytesseract

tex = pytesseract.image_to_string(Image.open('./frames/thumbnail-at-1.832871287128713-seconds.png'), lang='chi_sim')
print(tex);