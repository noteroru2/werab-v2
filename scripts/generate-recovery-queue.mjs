import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const rows = [
  'path,priority,recommended_cluster,recommended_parent,content_status,search_intent,notes'
];

// The 13 Authoritative REBUILD_INDEX items:
const rebuildItems = [
  { path: '/รับซื้อลำโพง-อุดรธานี/', priority: 'high', cluster: 'audio', parent: '/รับซื้อลำโพง/', status: 'READY', intent: 'local', notes: 'Approved historical survivor rewritten page' },
  { path: '/รับซื้อลำโพง-สารคาม/', priority: 'high', cluster: 'audio', parent: '/รับซื้อลำโพง/', status: 'READY', intent: 'local', notes: 'Approved historical survivor preserved slug' },
  { path: '/รับซื้อลำโพง-ร้อยเอ็ด-jbl-marshall/', priority: 'high', cluster: 'audio', parent: '/รับซื้อลำโพง/', status: 'CONTENT_REQUIRED', intent: 'local', notes: 'REBUILD_INDEX survivor candidate - awaiting unique local speaker content' },
  { path: '/รับซื้อลำโพง-ยโสธร/', priority: 'high', cluster: 'audio', parent: '/รับซื้อลำโพง/', status: 'CONTENT_REQUIRED', intent: 'local', notes: 'REBUILD_INDEX survivor candidate - awaiting unique local speaker content' },
  { path: '/รับซื้อไอแพด-ยโสธร-ipad/', priority: 'high', cluster: 'ipad', parent: '/รับซื้อไอแพด/', status: 'CONTENT_REQUIRED', intent: 'local', notes: 'REBUILD_INDEX survivor candidate - awaiting unique local iPad content' },
  { path: '/รับซื้อ-server/', priority: 'high', cluster: 'b2b', parent: '/รับซื้อ/', status: 'CONTENT_REQUIRED', intent: 'buyback', notes: 'REBUILD_INDEX survivor candidate - awaiting B2B server content' },
  { path: '/รับซื้อไอโฟน-ขอนแก่น/', priority: 'high', cluster: 'iphone', parent: '/รับซื้อไอโฟน/', status: 'CONTENT_REQUIRED', intent: 'local', notes: 'REBUILD_INDEX survivor candidate - awaiting unique local iPhone content' },
  { path: '/รับซื้อไอโฟน-จังหวัดอุด/', priority: 'high', cluster: 'iphone', parent: '/รับซื้อไอโฟน/', status: 'CONTENT_REQUIRED', intent: 'local', notes: 'REBUILD_INDEX survivor candidate - awaiting unique local iPhone content' },
  { path: '/รับซื้อไอโฟน-iphone-ร้อยเอ็ด/', priority: 'high', cluster: 'iphone', parent: '/รับซื้อไอโฟน/', status: 'CONTENT_REQUIRED', intent: 'local', notes: 'REBUILD_INDEX survivor candidate - awaiting unique local iPhone content' },
  { path: '/รับซื้อไอโฟน-ยโสธร/', priority: 'high', cluster: 'iphone', parent: '/รับซื้อไอโฟน/', status: 'CONTENT_REQUIRED', intent: 'local', notes: 'REBUILD_INDEX survivor candidate - awaiting unique local iPhone content' },
  { path: '/รับซื้อกล้องมือสองสุร/', priority: 'high', cluster: 'camera', parent: '/รับซื้อกล้อง/', status: 'CONTENT_REQUIRED', intent: 'local', notes: 'REBUILD_INDEX survivor candidate - awaiting unique local camera content' },
  { path: '/buy-camera-mahasarakam/', priority: 'high', cluster: 'camera', parent: '/รับซื้อกล้อง/', status: 'CONTENT_REQUIRED', intent: 'local', notes: 'REBUILD_INDEX survivor candidate - awaiting unique local camera content' },
  { path: '/รับซื้อกล้องมือสองมุก/', priority: 'high', cluster: 'camera', parent: '/รับซื้อกล้อง/', status: 'CONTENT_REQUIRED', intent: 'local', notes: 'REBUILD_INDEX survivor candidate - awaiting unique local camera content' }
];

for (const item of rebuildItems) {
  rows.push(`"${item.path}","${item.priority}","${item.cluster}","${item.parent}","${item.status}","${item.intent}","${item.notes}"`);
}

// Planned architecture pages
const plannedItems = [
  { path: '/รุ่น/', priority: 'low', cluster: 'general', parent: '/', status: 'DRAFT', intent: 'guide', notes: 'Planned device model directory' },
  { path: '/สภาพ/', priority: 'low', cluster: 'general', parent: '/', status: 'DRAFT', intent: 'guide', notes: 'Planned device condition grading guide' },
  { path: '/ก่อนขาย/', priority: 'medium', cluster: 'general', parent: '/', status: 'DRAFT', intent: 'guide', notes: 'Planned pre-sale checklist hub' },
  { path: '/คู่มือ/', priority: 'medium', cluster: 'general', parent: '/', status: 'DRAFT', intent: 'guide', notes: 'Planned comprehensive user guides' },
  { path: '/ผลงานรับซื้อ/', priority: 'medium', cluster: 'general', parent: '/', status: 'DRAFT', intent: 'trust', notes: 'Planned proof of work transaction archive' },
  { path: '/รับซื้อแรม/', priority: 'low', cluster: 'pc', parent: '/รับซื้อคอมประกอบ/', status: 'DRAFT', intent: 'buyback', notes: 'Planned RAM buyback hub' },
  { path: '/รับซื้อการ์ดจอ/', priority: 'low', cluster: 'pc', parent: '/รับซื้อคอมประกอบ/', status: 'DRAFT', intent: 'buyback', notes: 'Planned GPU buyback hub' }
];

for (const item of plannedItems) {
  rows.push(`"${item.path}","${item.priority}","${item.cluster}","${item.parent}","${item.status}","${item.intent}","${item.notes}"`);
}

const reportDir = path.join(rootDir, 'reports/seo');
if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true });
fs.writeFileSync(path.join(reportDir, 'recovery-queue.csv'), rows.join('\n'), 'utf8');
console.log(`Generated reports/seo/recovery-queue.csv with ${rows.length - 1} entries (${rebuildItems.length} REBUILD_INDEX + ${plannedItems.length} PLANNED DRAFT).`);
