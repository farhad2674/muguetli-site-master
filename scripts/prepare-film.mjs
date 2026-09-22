import { spawnSync } from 'node:child_process';
import ffmpeg from 'ffmpeg-static';
const master = process.argv[2];
if (!master) throw new Error('Usage: node scripts/prepare-film.mjs <path-to-16738.mp4>');
const out = 'public/media/four-mothers/';
const run = args => { const r=spawnSync(ffmpeg,['-hide_banner','-loglevel','error','-y',...args],{stdio:'inherit'});if(r.status)process.exit(r.status); };
// Approved order: Water > Fire > Earth > Air. Preserve the master's organic
// transitions; trim only the opening overview so Water is the first composition.
run(['-i',master,'-vf','trim=start=0.9,setpts=PTS-STARTPTS,fps=24,format=yuv420p','-an','-c:v','libx264','-preset','fast','-crf','21','-g','3','-keyint_min','3','-sc_threshold','0','-movflags','+faststart',out+'continuous-film.mp4']);
for (const [name,time] of [['water',1.7],['fire',3.3],['earth',6.8],['air',9.7]]) run(['-ss',String(time),'-i',master,'-frames:v','1','-c:v','libwebp','-quality','88',out+name+'-key.webp']);

