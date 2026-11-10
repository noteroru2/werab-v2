/**
 * Staging-only, EXACT additive page-copy guard.
 * Used to validate owner-authorized FieldInspectionCases blocks while keeping
 * the original P0/P3 production approval hashes immutable.
 * Never use to waive unrelated changes, redirects, or original content mutations.
 */
import crypto from 'node:crypto';
const authorized = new Map([
  ['/','home'],
  ['/รับซื้อโน๊ตบุ๊ค/','notebook'],
  ['/รับซื้อคอม/','pc'],
  ['/รับซื้อแมคบุ๊ค/','macbook'],
  ['/รับซื้อไอโฟน/','iphone'],
  ['/รับซื้อไอแพด/','ipad'],
  ['/รับซื้อกล้อง/','camera']
]);
function sha(s) { return crypto.createHash('sha256').update(String(s).replace(/\r\n/g,'\n').replace(/\r/g,'\n')).digest('hex'); }
function removeOnce(source, needle) {
  if(source.split(needle).length!==2) return null;
  return source.replace(needle,'');
}
export function isApprovedStagingAddition(route, currentSource, baselineSha) {
  if(process.env.SEO_REBUILD_STAGING!=='1') return false;
  const topic=authorized.get(route);
  if(!topic || !baselineSha) return false;
  const line="import FieldInspectionCases from '../components/FieldInspectionCases.astro';\n";
  const marker='  <FieldInspectionCases topic="'+topic+'" />\n\n';
  const withoutImport=removeOnce(currentSource,line);
  if(withoutImport===null)return false;
  const original=removeOnce(withoutImport,marker);
  return original!==null && sha(original)===baselineSha;
}
export const STAGING_BATCH1_ROUTES = Object.freeze([...authorized.keys()]);
