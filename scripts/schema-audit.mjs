/**
 * scripts/schema-audit.mjs
 * Phase 27: Structured Data Validation Audit.
 * Validates JSON-LD schema generation for syntax, completeness, and ID standards.
 */

import { generateSchemaGraph } from '../src/lib/seo/schema.ts';
import { resolveSeo } from '../src/lib/seo/resolve.ts';

console.log(`\n=== STRUCTURED DATA SCHEMA AUDIT ===`);

const testRoutes = [
  { path: '/', expectedTypes: ['Organization', 'WebSite', 'FAQPage'] },
  { path: '/รับซื้อโน๊ตบุ๊ค/', expectedTypes: ['Organization', 'WebSite', 'BreadcrumbList', 'Service', 'FAQPage'] },
  { path: '/รับซื้อลำโพง-อุดรธานี/', expectedTypes: ['Organization', 'WebSite', 'BreadcrumbList', 'Service'] }
];

let totalTests = 0;
let passedTests = 0;

for (const test of testRoutes) {
  totalTests++;
  const seo = resolveSeo(test.path);
  const jsonString = generateSchemaGraph({
    seo,
    breadcrumbs: [{ name: 'หน้าแรก', url: '/' }, { name: 'โน๊ตบุ๊ค', url: test.path }],
    faqs: [{ question: 'ทดสอบ?', answer: 'คำตอบ' }]
  });

  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed['@context'] || !parsed['@graph']) {
      throw new Error(`Missing @context or @graph`);
    }

    const types = parsed['@graph'].map(item => item['@type']);
    for (const expected of test.expectedTypes) {
      if (!types.includes(expected)) {
        throw new Error(`Expected schema type '${expected}' missing for ${test.path}`);
      }
    }

    // Verify Organization ID
    const org = parsed['@graph'].find(i => i['@type'] === 'Organization');
    if (!org['@id'] || !org['@id'].endsWith('#organization')) {
      throw new Error(`Invalid Organization @id: ${org['@id']}`);
    }

    passedTests++;
    console.log(`✅ Schema valid for ${test.path} (Types: ${types.join(', ')})`);
  } catch (err) {
    console.error(`❌ Schema failure on ${test.path}:`, err.message);
  }
}

if (passedTests === totalTests) {
  console.log(`✅ All ${totalTests} schema tests passed successfully.`);
  process.exit(0);
} else {
  console.error(`❌ ${totalTests - passedTests} schema tests failed.`);
  process.exit(1);
}
