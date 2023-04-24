// // import getVideoId from 'get-video-id';

// // const videoUrl = 'https://www.bilibili.com/video/?spm_id_from=&vd_source=871000c2486e7a9fa5f599dc3bee889b&v=BV1H7411o7KD';
// // const videoId = getVideoId(videoUrl).id;
// // console.log(`Video ID: ${videoId}`);

// // const fs = require('fs')
// import fs from 'fs'
// import Ffmpeg from 'fluent-ffmpeg'
// import Subtitle from 'subtitle';

// const url = './333.mp4'

// Ffmpeg(fs.createReadStream(url)).output('outputSrt.srt')
//     .on('end', function () {
//       // 读取字幕文件
//       const srt = fs.readFileSync('subtitles.srt', 'utf-8');
//       const subtitles = Subtitle.parse(srt);
//       console.log(subtitles, '----subtitles');
//     }).run()

// const { Configuration, OpenAIApi } = require("openai");
// const ffmpeg = require('fluent-ffmpeg');
// const path = require('path');
// // const Ocrad = require('./ocard');
// const fs = require('fs');

// const inputPath = path.join(__dirname, 'aaa.mp4');
// const audioFilePath = path.join(__dirname, 'audio.mp3');
// const subtitlePath = path.join(__dirname, 'subtitle.srt');

// const API_KEY = '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';
// const configuration = new Configuration({
//     apiKey: API_KEY,
//   });

// ffmpeg(inputPath)
// .noVideo()
// .audioCodec('libmp3lame')
// .output(audioFilePath)
// .on('end', function() {
//         // 读取音频文件内容
//         const audioData = fs.readFileSync(audioFilePath);
//         const openai = new OpenAIApi(configuration);
//         // openai.api_key = API_KEY;
//         openai.speechToText({
//             audio: audioData,
//             model: 'davinci',
//             language: 'en-US',
//             contentType: 'audio/mp3',
//           }).then(response => {
//             console.log(response);
//           }).catch(error => {
//             console.log(error);
//           });
//         // // 使用Ocrad.js识别音频中的文字
//         // const recognizedText = Ocrad(audioData);
//         // console.log('Recognized text:', recognizedText);
//         // const subtitleContent = `${recognizedText}`;
//         // fs.writeFileSync(subtitlePath, subtitleContent);
//         // 删除临时音频文件
//         // fs.unlinkSync(audioFilePath);
// })
// .run();

// const fs = require('fs')
// const ffmpeg = require('fluent-ffmpeg');
// const path = require('path');
// // const tesseract = require('node-tesseract');
// const Tesseract = require('tesseract.js');


// const inputPath = path.join(__dirname, 'aaa.mp4');
// const outputPath = path.join(__dirname, 'frames');

// ffmpeg(inputPath)
//   .on('filenames', (filenames) => {
//     console.log(`Will generate ${filenames.length} frames`);
//   })
//   .on('end', () => {
//     console.log('Frames generated');
//   })
//   .screenshots({
//     count: 30,
//     folder: outputPath,
//     filename: 'frame-%i.png'
//   });


// fs.readdir(outputPath, (err, files) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   files.forEach(file => {
//     const fullPath = path.join(outputPath, file);
//     fs.stat(fullPath, async (err, stats) => {
//       if (err) {
//         console.error(err);
//         return;
//       }
//       if (stats.isFile()) {
//         try {
//             const res = await Tesseract.recognize(fullPath, 'chi_sim', {})
//             console.info(res.data.text, '---data')
//         } catch (error) {
//             console.info(error, '---error')
//         }
//       } else if (stats.isDirectory()) {
//         traverseFolder(fullPath);
//       }
//     });
//   });
// });


// tesseract.process('./frames/frame-1.png', {}, function (err, text) {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log(text, '---text');
//     }
//   });

// const {
//   createWorker
// } = require('tesseract.js');
// const path = require('path');

// (async () => {
//   const worker = await createWorker({
//     langPath: path.join(__dirname, 'chi_sim.traineddata'),
//     lang: 'chi_sim',
//     logger: m => console.log(m),
//   });
//   await worker.load();
//   await worker.loadLanguage('chi_sim');
//   await worker.initialize('chi_sim');
//   const {
//     data: {
//       text
//     }
//   } = await worker.recognize(path.join(__dirname, 'text.png'));
//   console.log(text);
//   await worker.terminate();
// })();


// const speech = require('@google-cloud/speech');
// const fs = require('fs');

// const client = new speech.SpeechClient();

// const fileName = './audio.mp3';
// const file = fs.readFileSync(fileName);
// const audioBytes = file.toString('base64');

// const request = {
//   audio: {
//     content: audioBytes,
//   },
//   config: {
//     encoding: 'LINEAR16',
//     sampleRateHertz: 16000,
//     languageCode: 'en-US',
//   },
// };

// async function recognize() {
//   const [response] = await client.recognize(request);
//   const transcription = response.results
//     .map(result => result.alternatives[0].transcript)
//     .join('\n');
//   console.log(`Transcription: ${transcription}`);
// }

// recognize();

// const { exec } = require('child_process');

// exec('python3 ./test.py', (error, stdout, stderr) => {
//   if (error) {
//     console.error(`执行错误： ${error}`);
//     return;
//   }
//   console.log(`输出： ${stdout}`);
//   console.error(`错误输出： ${stderr}`);
// });


// const fs = require('fs');
// const ffmpeg = require('fluent-ffmpeg');
// const vosk = require('vosk');

// async function extractAudioFromVideo(videoPath, audioPath) {
//   return new Promise((resolve, reject) => {
//     ffmpeg(videoPath)
//       .format('mp3')
//       .on('end', resolve)
//       .on('error', reject)
//       .save(audioPath);
//   });
// }

// async function transcribeAudioFile(audioPath) {
//   if (!fs.existsSync(audioPath)) {
//     throw new Error('Audio file does not exist');
//   }

//   vosk.setLogLevel(-1);
//   const model = new vosk.Model('./vosk-model-cn-0.22');
//   const recognizer = new vosk.Recognizer({model: model, sampleRate: 16000});

//   console.info(recognizer.result(), '------')

// //   recognizer.on('result', event => {
// //     const result = JSON.parse(event);
// //     console.log(result.text);
// //   });

//   const stream = fs.createReadStream(audioPath, {highWaterMark: 4096});
//   stream.on('data', data => recognizer.acceptWaveform(data));
//   stream.on('end', () => recognizer.finalResult());
// }

// async function main() {
//   const videoPath = './333.mp4';
//   const audioPath = './text1.mp3';

//   try {
//     // await extractAudioFromVideo(videoPath, audioPath);
//     await transcribeAudioFile(audioPath);
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//   }
// }

// main();

const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const Tesseract = require('tesseract.js');

const inputUrl = 'https://v26-web.douyinvod.com/d6e5cd39195bc8fc5b57ea6f229f8bb7/6444ed72/video/tos/cn/tos-cn-ve-15/osw9X1DdFIsrpaNeAXAURTghnbAe8ACORBXjpR/?a=6383&ch=5&cr=3&dr=0&lr=all&cd=0%7C0%7C0%7C3&cv=1&br=1508&bt=1508&cs=0&ds=4&ft=bvTKJbQQqUYqfJEZao0OW_EklpPiXe1dAMVJEmdqqD0PD-I&mime_type=video_mp4&qs=0&rc=OzhlOTs4N2k3PDZlZTRpM0BpM204azg6Zjg8aTMzNGkzM0BgYV4uYV82NTExYjE2X2IwYSNqNWJxcjQwLV9gLS1kLWFzcw%3D%3D&l=20230423153048E42B4F7BD73930889761&btag=28000';
const outputFolder = './frames/';
// const screenshotFrequency = 1; // 1截图一张图片，2则为每2张截图一张图片

// 打开视频URL
// const command = ffmpeg(inputUrl);

// ffmpeg.ffprobe(inputUrl, function(err, metadata) {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     const duration = metadata.format.duration;
//     // 按帧截图
//     command.screenshots({
//     count: duration, // 截图数量，此处为100张
//     folder: outputFolder, // 输出文件夹
//     size: '320x240', // 截图大小
//     filename: 'thumbnail-at-%s-seconds.png', // 文件名格式
//   //   timemarks: [`1/${screenshotFrequency}`, `2/${screenshotFrequency}`, `3/${screenshotFrequency}`, `4/${screenshotFrequency}`], // 按时间戳截图
//   });
  
//   // 处理完成后的回调函数
//   command.on('end', function() {
//     console.log('截图完成');
//   });
//     console.log(`视频时长为 ${duration} 秒`);
//   });


// fs.readdir(outputFolder, (err, files) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   files.forEach(file => {
//     const fullPath = path.join(outputPath, file);
//     fs.stat(fullPath, async (err, stats) => {
//       if (err) {
//         console.error(err);
//         return;
//       }
//       if (stats.isFile()) {
//         try {
//             const res = await Tesseract.recognize(fullPath, 'chi_sim', {})
//             console.info(res.data.text, '---data')
//         } catch (error) {
//             console.info(error, '---error')
//         }
//       } else if (stats.isDirectory()) {
//         traverseFolder(fullPath);
//       }
//     });
//   });
// });

// const { createWorker } = Tesseract;
// const image = `${__dirname}/output.png`;
// console.info(image, '---image');
// (async () => {
//     const worker = await createWorker({
//         logger: m => console.log(m)
//     });
//     // await worker.load();
//     await worker.loadLanguage('chi_sim+chi_tra');
//     await worker.initialize('chi_sim+chi_tra');
//     const { data: { text } } = await worker.recognize(image);
//     console.log(text);
// })()


const Jimp = require('jimp');

Jimp.read(`${__dirname}/frames/thumbnail-at-1.832871287128713-seconds.png`, (err, image) => {
  if (err) throw err;
  image.threshold({ max: 200, replace: 255 }); // 进行二值化处理
  image.write('output.png'); // 将处理后的图像保存到文件
});