#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';

const ROOT = process.cwd();
const CATEGORIES_DIR = path.join(ROOT, 'src', 'data', 'categories');

async function listTsFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  let files = [];
  for (const e of entries) {
    const res = path.join(dir, e.name);
    if (e.isDirectory()) files = files.concat(await listTsFiles(res));
    else if (e.isFile() && res.endsWith('.ts')) files.push(res);
  }
  return files;
}

function pickEmoji(text) {
  const s = text.toLowerCase();

  const keywordMap = [
    [['sopa', 'soup', 'caldo', 'pho', 'tom yum'], '🥣'],
    [['salada', 'salad'], '🥗'],
    [['frango', 'chicken', 'pollo'], '🍗'],
    [['carne', 'beef', 'steak', 'filet', 'mignon', 'wagyu', 'bife'], '🥩'],
    [['porco', 'pork', 'puerco'], '🍖'],
    [['peixe', 'fish', 'salm', 'salmon', 'pescado'], '🐟'],
    [['camar', 'shrimp', 'camaron', 'crab', 'scallop', 'vieira'], '🍤'],
    [['massa', 'macarr', 'spaghetti', 'pasta', 'penne', 'gnocchi'], '🍝'],
    [['arroz', 'rice', 'risot', 'risotto'], '🍚'],
    [['pizza'], '🍕'],
    [['taco', 'tacos'], '🌮'],
    [['sanduíche', 'sandwich', 'panini', 'bauru'], '🥪'],
    [['ovo', 'omelet', 'omelete'], '🍳'],
    [['panqueca', 'pancake'], '🥞'],
    [['doce', 'dessert', 'sobremesa', 'pudim', 'cake'], '🍰'],
    [['veg', 'vegetar', 'vegan', 'tofu'], '🌱'],
    [['churrasco', 'barbecue', 'bbq', 'grill'], '🍖'],
  ];

  for (const [keys, emoji] of keywordMap) {
    for (const k of keys) {
      if (s.includes(k)) return emoji;
    }
  }
  return '🍽️';
}

function pickRegion(text) {
  const s = text.toLowerCase();
  if (s.includes('brasileira') || s.includes('brasil')) return 'BR';
  if (
    s.includes('mexic') ||
    s.includes('peru') ||
    s.includes('venezuela') ||
    s.includes('argentin') ||
    s.includes('latam') ||
    s.includes('centro-americana') ||
    s.includes('colomb')
  )
    return 'LATAM';
  if (s.includes('american') || s.includes('texan') || s.includes('usa')) return 'US';
  return 'INT';
}

function pickEstimatedCost(objText) {
  const s = objText.toLowerCase();
  const expensive = ['lagosta', 'truffle', 'wagyu', 'vieira', 'saffron', 'caviar', 'pinoli', 'porcini'];
  for (const w of expensive) if (s.includes(w)) return 'high';
  const ingMatch = objText.match(/ingredients\s*:\s*\[((?:.|\n)*?)\]/i);
  let ingCount = 0;
  if (ingMatch) {
    const inner = ingMatch[1];
    const quotes = inner.match(/(['"]).*?\1/g);
    if (quotes) ingCount = quotes.length;
    else ingCount = (inner.split(',').filter(Boolean).length);
  }
  if (ingCount >= 10) return 'high';
  if (ingCount >= 6) return 'medium';
  return 'low';
}

async function augmentFile(file) {
  let txt = await fs.readFile(file, 'utf8');
  const original = txt;
  let index = 0;
  let updated = 0;

  while (true) {
    const nameIdx = txt.indexOf('name:', index);
    if (nameIdx === -1) break;
    const objStart = txt.lastIndexOf('{', nameIdx);
    if (objStart === -1) { index = nameIdx + 5; continue; }
    let objEnd = txt.indexOf('},', nameIdx);
    if (objEnd === -1) objEnd = txt.indexOf('\n}', nameIdx);
    if (objEnd === -1) objEnd = txt.indexOf('}', nameIdx);
    if (objEnd === -1) break;

    const objSlice = txt.slice(objStart, objEnd + 1);
    if (/\bemoji\s*:/i.test(objSlice)) { index = objEnd + 1; continue; }

    const namePropMatch = objSlice.match(/name\s*:\s*(["'`])([\s\S]*?)\1\s*,/);
    if (!namePropMatch) { index = objEnd + 1; continue; }

    const emoji = pickEmoji(objSlice);
    const region = pickRegion(objSlice);
    const cost = pickEstimatedCost(objSlice);

    const nameProp = namePropMatch[0];
    const insertion = `${nameProp} emoji: "${emoji}", region: "${region}", estimatedCost: "${cost}", `;
    const newObj = objSlice.replace(nameProp, insertion);
    txt = txt.slice(0, objStart) + newObj + txt.slice(objEnd + 1);
    updated++;
    index = objStart + newObj.length;
  }

  if (updated > 0 && txt !== original) {
    await fs.writeFile(file, txt, 'utf8');
    console.log(`Updated ${file} (+${updated})`);
  }
  return updated;
}

async function main() {
  try {
    const files = await listTsFiles(CATEGORIES_DIR);
    let total = 0;
    for (const f of files) {
      const count = await augmentFile(f);
      total += count;
    }
    console.log('Done. Total augmented objects:', total);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

main();
