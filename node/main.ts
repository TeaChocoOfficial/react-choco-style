//-Path: "react-choco-style/node/main.ts"
import * as path from 'path';
import * as fs from 'fs-extra';
import * as chokidar from 'chokidar';

// กำหนด path ต้นทางและปลายทาง
const destDirs = ['view', 'next'].map((dir) =>
    path.join(__dirname, '..', dir, 'lib'),
);
const sourceDir = path.join(__dirname, '..', 'lib', 'src');

// สร้างโฟลเดอร์ปลายทางทั้งสองถ้ายังไม่มี
destDirs.forEach((destDir) => fs.ensureDirSync(destDir));

// ตั้งค่า chokidar เพื่อตรวจจับการเปลี่ยนแปลง
const watcher = chokidar.watch(sourceDir, {
    persistent: true,
    ignoreInitial: false, // คัดลอกไฟล์ทั้งหมดเมื่อเริ่มต้น
    ignored: ['**/node_modules/**', '**/.git/**'], // ละเว้นโฟลเดอร์ที่ไม่ต้องการ
});

// เมื่อมีการเปลี่ยนแปลงไฟล์
watcher
    .on('add', (filePath) => {
        const relativePath = path.relative(sourceDir, filePath);
        destDirs.forEach((destDir) => {
            const destPath = path.join(destDir, relativePath);
            fs.copy(filePath, destPath, { overwrite: true }, (err) => {
                if (err) console.error(`เกิดข้อผิดพลาดที่ ${filePath}:`, err);
                else console.log(`คัดลอกไป ${destPath}`);
            });
        });
    })
    .on('change', (filePath) => {
        const relativePath = path.relative(sourceDir, filePath);
        destDirs.forEach((destDir) => {
            const destPath = path.join(destDir, relativePath);
            fs.copy(filePath, destPath, { overwrite: true }, (err) => {
                if (err) console.error(`เกิดข้อผิดพลาดที่ ${filePath}:`, err);
                else console.log(`อัปเดตไป ${destPath}`);
            });
        });
    })
    .on('unlink', (filePath) => {
        const relativePath = path.relative(sourceDir, filePath);
        destDirs.forEach((destDir) => {
            const destPath = path.join(destDir, relativePath);
            fs.remove(destPath, (err) => {
                if (err) console.error(`ลบ ${destPath} ล้มเหลว:`, err);
                else console.log(`ลบ ${destPath}`);
            });
        });
    })
    .on('error', (error) => {
        console.error('เกิดข้อผิดพลาดใน watcher:', error);
    });

console.log(`กำลังตรวจจับการเปลี่ยนแปลงใน ${sourceDir}...`);
