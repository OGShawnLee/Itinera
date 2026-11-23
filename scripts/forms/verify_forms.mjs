import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const ROOT = process.cwd();
const PATH_A = path.join(ROOT, 'scripts/forms/create_instrument_a_b2c.gs');
const PATH_B = path.join(ROOT, 'scripts/forms/create_instrument_b_b2b.gs');
const PATH_ESTUDIO = path.join(ROOT, 'deliverables/ESTUDIO_DE_MERCADO.md');

const codeA = fs.readFileSync(PATH_A, 'utf8');
const codeB = fs.readFileSync(PATH_B, 'utf8');
const estudioText = fs.readFileSync(PATH_ESTUDIO, 'utf8');

// =========================================================================
// CHECK 2: Forbidden tokens and shared global scope
// =========================================================================
for (const [label, src] of [['A', codeA], ['B', codeB]]) {
  for (const forbidden of ['import ', 'export ', 'require(', 'setRequireLogin']) {
    assert(!src.includes(forbidden), `File ${label} contains forbidden token: ${forbidden}`);
  }
}

function createMockEnvironment() {
  const forms = [];
  const logs = [];
  const driveCalls = [];

  const PageNavigationType = Object.freeze({
    CONTINUE: 'CONTINUE',
    SUBMIT: 'SUBMIT',
    RESTART: 'RESTART',
    GO_TO_PAGE: 'GO_TO_PAGE'
  });

  const Alignment = Object.freeze({
    LEFT: 'LEFT',
    CENTER: 'CENTER',
    RIGHT: 'RIGHT'
  });

  class MockItem {
    constructor(type, index) {
      this.type = type;
      this.index = index;
      this.title = '';
      this.helpText = '';
      this.required = false;
    }
    setTitle(t) { this.title = String(t); return this; }
    setHelpText(h) { this.helpText = String(h); return this; }
    setRequired(r) { this.required = Boolean(r); return this; }
  }

  class MockPageBreakItem extends MockItem {
    constructor(index) {
      super('PageBreak', index);
      this.goToPageTarget = null;
    }
    setGoToPage(target) {
      this.goToPageTarget = target;
      return this;
    }
  }

  class MockChoice {
    constructor(value, navigationTarget = null) {
      this.value = String(value);
      this.navigationTarget = navigationTarget;
    }
  }

  class MockChoiceItem extends MockItem {
    constructor(type, index) {
      super(type, index);
      this.choices = [];
      this.hasOtherOption = false;
      this.validation = null;
      this._usedSetChoiceValues = false;
      this._usedSetChoices = false;
    }
    createChoice(value, navigationTarget = null) {
      return new MockChoice(value, navigationTarget);
    }
    setChoices(choices) {
      assert(!this._usedSetChoiceValues, `Cannot mix setChoiceValues and setChoices on "${this.title}"`);
      this._usedSetChoices = true;
      this.choices = Array.from(choices, c => {
        assert(c instanceof MockChoice, `Choice on "${this.title}" must be created via createChoice`);
        return c;
      });
      return this;
    }
    setChoiceValues(values) {
      assert(!this._usedSetChoices, `Cannot mix setChoices and setChoiceValues on "${this.title}"`);
      this._usedSetChoiceValues = true;
      this.choices = Array.from(values, v => new MockChoice(v, null));
      return this;
    }
    showOtherOption(enabled) {
      assert(this.type !== 'List', 'ListItem does not support showOtherOption');
      this.hasOtherOption = Boolean(enabled);
      return this;
    }
    setValidation(v) {
      this.validation = v;
      return this;
    }
  }

  class MockGridItem extends MockItem {
    constructor(index) {
      super('Grid', index);
      this.rows = [];
      this.columns = [];
    }
    setRows(rows) { this.rows = Array.from(rows, String); return this; }
    setColumns(cols) { this.columns = Array.from(cols, String); return this; }
  }

  class MockImageItem extends MockItem {
    constructor(index) {
      super('Image', index);
      this.blob = null;
      this.alignment = null;
      this.width = null;
    }
    setImage(blob) { this.blob = blob; return this; }
    setAlignment(a) { this.alignment = a; return this; }
    setWidth(w) { this.width = Number(w); return this; }
  }

  class MockForm {
    constructor(title) {
      this.title = String(title);
      this.description = '';
      this.settings = {
        progressBar: false,
        collectEmail: null,
        limitOneResponsePerUser: null,
        allowResponseEdits: null,
        publishingSummary: null,
        showLinkToRespondAgain: null,
        confirmationMessage: ''
      };
      this.items = [];
      this.editUrlCalled = false;
      this.publishedUrlCalled = false;
    }
    setDescription(d) { this.description = String(d); return this; }
    setProgressBar(v) { this.settings.progressBar = Boolean(v); return this; }
    setCollectEmail(v) { this.settings.collectEmail = Boolean(v); return this; }
    setLimitOneResponsePerUser(v) { this.settings.limitOneResponsePerUser = Boolean(v); return this; }
    setAllowResponseEdits(v) { this.settings.allowResponseEdits = Boolean(v); return this; }
    setPublishingSummary(v) { this.settings.publishingSummary = Boolean(v); return this; }
    setShowLinkToRespondAgain(v) { this.settings.showLinkToRespondAgain = Boolean(v); return this; }
    setConfirmationMessage(m) { this.settings.confirmationMessage = String(m); return this; }
    getEditUrl() {
      this.editUrlCalled = true;
      return `https://docs.google.com/forms/d/mock-${forms.indexOf(this)}/edit`;
    }
    getPublishedUrl() {
      this.publishedUrlCalled = true;
      return `https://docs.google.com/forms/d/e/mock-${forms.indexOf(this)}/viewform`;
    }

    _push(item) {
      this.items.push(item);
      return item;
    }
    addPageBreakItem() { return this._push(new MockPageBreakItem(this.items.length)); }
    addMultipleChoiceItem() { return this._push(new MockChoiceItem('MultipleChoice', this.items.length)); }
    addListItem() { return this._push(new MockChoiceItem('List', this.items.length)); }
    addCheckboxItem() { return this._push(new MockChoiceItem('Checkbox', this.items.length)); }
    addGridItem() { return this._push(new MockGridItem(this.items.length)); }
    addTextItem() { return this._push(new MockItem('Text', this.items.length)); }
    addParagraphTextItem() { return this._push(new MockItem('ParagraphText', this.items.length)); }
    addSectionHeaderItem() { return this._push(new MockItem('SectionHeader', this.items.length)); }
    addImageItem() { return this._push(new MockImageItem(this.items.length)); }
  }

  const FormApp = {
    PageNavigationType,
    Alignment,
    create(title) {
      const f = new MockForm(title);
      forms.push(f);
      return f;
    },
    createCheckboxValidation() {
      const state = { type: 'CheckboxValidation', rule: null, count: null, helpText: '' };
      return {
        setHelpText(t) { state.helpText = String(t); return this; },
        requireSelectAtMost(n) { state.rule = 'AT_MOST'; state.count = Number(n); return this; },
        requireSelectExactly(n) { state.rule = 'EXACTLY'; state.count = Number(n); return this; },
        requireSelectAtLeast(n) { state.rule = 'AT_LEAST'; state.count = Number(n); return this; },
        build() { return { ...state }; }
      };
    }
  };

  const DriveApp = {
    getFileById(id) {
      driveCalls.push(String(id));
      return {
        getBlob() {
          return { fakeBlobForId: String(id) };
        }
      };
    }
  };

  const Logger = {
    log(msg) {
      logs.push(String(msg));
    }
  };

  return { FormApp, DriveApp, Logger, forms, logs, driveCalls, MockPageBreakItem };
}

// Verify shared global scope & exact top-level bindings
{
  const env = createMockEnvironment();
  const baseKeys = ['FormApp', 'DriveApp', 'Logger'];
  const ctx = vm.createContext({
    FormApp: env.FormApp,
    DriveApp: env.DriveApp,
    Logger: env.Logger
  });

  new vm.Script(codeA, { filename: 'create_instrument_a_b2c.gs' }).runInContext(ctx);
  new vm.Script(codeB, { filename: 'create_instrument_b_b2b.gs' }).runInContext(ctx);

  const checkTopA = vm.createContext({ FormApp: env.FormApp, DriveApp: env.DriveApp, Logger: env.Logger });
  new vm.Script(codeA + '\n;globalThis.__topA = { CAPTURAS_A_DRIVE_IDS, crearEncuestaMotociclistasItinera };').runInContext(checkTopA);
  const topNamesA = Object.keys(checkTopA).filter(k => !baseKeys.includes(k) && k !== '__topA');
  assert.deepEqual(topNamesA, ['crearEncuestaMotociclistasItinera'], `Unexpected top-level var/function declarations in A: ${topNamesA}`);
  assert.equal(typeof checkTopA.__topA.CAPTURAS_A_DRIVE_IDS, 'object');
  assert.equal(typeof checkTopA.__topA.crearEncuestaMotociclistasItinera, 'function');

  const checkTopB = vm.createContext({ FormApp: env.FormApp, DriveApp: env.DriveApp, Logger: env.Logger });
  new vm.Script(codeB + '\n;globalThis.__topB = { CAPTURAS_B_DRIVE_IDS, crearFormularioTalleresItinera };').runInContext(checkTopB);
  const topNamesB = Object.keys(checkTopB).filter(k => !baseKeys.includes(k) && k !== '__topB');
  assert.deepEqual(topNamesB, ['crearFormularioTalleresItinera'], `Unexpected top-level var/function declarations in B: ${topNamesB}`);
  assert.equal(typeof checkTopB.__topB.CAPTURAS_B_DRIVE_IDS, 'object');
  assert.equal(typeof checkTopB.__topB.crearFormularioTalleresItinera, 'function');

  // Verify no extraneous const/let at top level by matching top-level declarations
  const topDeclRegex = /^(?:const|let|var|function)\s+([A-Za-z0-9_$]+)/gm;
  const declsA = [...codeA.matchAll(topDeclRegex)].map(m => m[1]);
  const declsB = [...codeB.matchAll(topDeclRegex)].map(m => m[1]);
  assert.deepEqual(declsA, ['CAPTURAS_A_DRIVE_IDS', 'crearEncuestaMotociclistasItinera']);
  assert.deepEqual(declsB, ['CAPTURAS_B_DRIVE_IDS', 'crearFormularioTalleresItinera']);
}

function runBothForms(withFakeDriveIds = false) {
  const env = createMockEnvironment();
  const ctx = vm.createContext({
    FormApp: env.FormApp,
    DriveApp: env.DriveApp,
    Logger: env.Logger
  });
  new vm.Script(codeA, { filename: 'create_instrument_a_b2c.gs' }).runInContext(ctx);
  new vm.Script(codeB, { filename: 'create_instrument_b_b2b.gs' }).runInContext(ctx);

  if (withFakeDriveIds) {
    new vm.Script(`
      CAPTURAS_A_DRIVE_IDS[1] = 'FAKE_ID_A1';
      CAPTURAS_A_DRIVE_IDS[2] = 'FAKE_ID_A2';
      CAPTURAS_A_DRIVE_IDS[3] = 'FAKE_ID_A3';
      CAPTURAS_A_DRIVE_IDS[4] = 'FAKE_ID_A4';
      CAPTURAS_A_DRIVE_IDS[5] = 'FAKE_ID_A5';
      CAPTURAS_B_DRIVE_IDS[2] = 'FAKE_ID_B2';
      CAPTURAS_B_DRIVE_IDS[5] = 'FAKE_ID_B5';
      CAPTURAS_B_DRIVE_IDS[6] = 'FAKE_ID_B6';
    `).runInContext(ctx);
  }

  new vm.Script('crearEncuestaMotociclistasItinera(); crearFormularioTalleresItinera();').runInContext(ctx);
  assert.equal(env.forms.length, 2, 'Expected exactly 2 forms created');
  return { formA: env.forms[0], formB: env.forms[1], logs: env.logs, driveCalls: env.driveCalls, MockPageBreakItem: env.MockPageBreakItem };
}

const QUESTION_TYPES = new Set(['MultipleChoice', 'List', 'Grid', 'Checkbox', 'Text', 'ParagraphText']);

function splitIntoPages(form) {
  const pages = [
    { pageNumber: 1, title: '(first page)', helpText: '', pageBreak: null, items: [], questionItems: [] }
  ];
  for (const item of form.items) {
    if (item.type === 'PageBreak') {
      pages.push({
        pageNumber: pages.length + 1,
        title: item.title,
        helpText: item.helpText,
        pageBreak: item,
        items: [],
        questionItems: []
      });
    } else {
      const current = pages[pages.length - 1];
      current.items.push(item);
      if (QUESTION_TYPES.has(item.type)) {
        current.questionItems.push(item);
      }
    }
  }
  return pages;
}

// =========================================================================
// PARSE ESTUDIO_DE_MERCADO.md FOR CHECK 6 TEXT PARITY
// =========================================================================
function parseEstudioDeMercado(md) {
  const lines = md.split(/\r?\n/);
  const items = new Map();
  const textosA = [];
  const textosB = [];
  let currentInstrument = null;

  const routingParenRegex = /\s*\([^)]*(?:\bpasa\b|\bpasan\b|\btermina\b|\bdespués\b|\bcon No\b)[^)]*\)/gi;
  const dropHintParenRegex = /\s*\((?:opcional|respuesta corta[^)]*|párrafo[^)]*)\)/gi;
  const helpHintParenRegex = /\s*\((puedes marcar varias|puede marcar varios|máximo tres)\)/i;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (line.startsWith('### Instrumento A:')) {
      currentInstrument = 'A';
      continue;
    }
    if (line.startsWith('### Instrumento B:')) {
      currentInstrument = 'B';
      continue;
    }
    if (line.startsWith('## ') && !line.startsWith('## Instrumentos')) {
      if (currentInstrument === 'B') currentInstrument = null;
    }
    if (!currentInstrument) continue;

    if (line.startsWith('Texto: ')) {
      const txt = line.slice('Texto: '.length).trim();
      if (currentInstrument === 'A') textosA.push(txt);
      else textosB.push(txt);
      continue;
    }

    const match = line.match(/^([AB]\d+[a-c]?)\.\s+(.+)$/);
    if (!match) continue;
    const code = match[1];
    const rest = match[2];

    // Special rules from task.md:
    if (code === 'A14' || code === 'A16') {
      const firstSentence = rest.split('?')[0] + '?';
      items.set(code, { code, title: firstSentence.trim(), choices: [], hasOther: false, helpText: '' });
      continue;
    }
    if (code === 'A37') {
      const dotIdx = rest.indexOf('.');
      const firstSentence = rest.slice(0, dotIdx + 1).trim();
      items.set(code, {
        code,
        title: firstSentence,
        choices: [],
        hasOther: false,
        helpText: 'Solo lo usaremos para invitarte a la prueba piloto.'
      });
      continue;
    }
    if (code === 'B18') {
      const beforeBox = rest.split('☐')[0].trim();
      items.set('B18', { code: 'B18', title: beforeBox, choices: ['Sí', 'No'], hasOther: false, helpText: '' });
      items.set('Comentarios', { code: 'Comentarios', title: 'Comentarios', choices: [], hasOther: false, helpText: '' });
      continue;
    }

    const parts = rest.split('☐');
    let rawTitle = parts[0].trim();
    let helpText = '';
    const helpMatch = rawTitle.match(helpHintParenRegex);
    if (helpMatch) {
      helpText = helpMatch[1];
      rawTitle = rawTitle.replace(helpHintParenRegex, '');
    }
    rawTitle = rawTitle.replace(routingParenRegex, '').replace(dropHintParenRegex, '').trim();

    const rawChoices = parts.slice(1).map(c => c.replace(routingParenRegex, '').replace(dropHintParenRegex, '').trim());
    const choices = [];
    let hasOther = false;
    for (const c of rawChoices) {
      if (/^Otro(?::\s*_+)?$/i.test(c)) {
        hasOther = true;
      } else {
        choices.push(c);
      }
    }

    items.set(code, { code, title: rawTitle, choices, hasOther, helpText });
  }

  return { items, textosA, textosB };
}

const parsedEstudio = parseEstudioDeMercado(estudioText);

// =========================================================================
// RUN 1 (Empty IDs -> Placeholders) & Verify Checks 3, 4, 5, 6, 7
// =========================================================================
const runEmpty = runBothForms(false);
const pagesA = splitIntoPages(runEmpty.formA);
const pagesB = splitIntoPages(runEmpty.formB);

// --- CHECK 3: Instrument A Structure ---
assert.equal(runEmpty.formA.title, 'Cuidado y mantenimiento de motocicletas en Xalapa');

const expectedPageTitlesA = [
  'Tu zona y tu edad',
  'Sobre ti',
  'Tu moto y cómo la usas',
  'Cómo cuidas tu moto hoy',
  'Conoce Itinera',
  'Por qué no la usarías',
  'Avisos y semáforo',
  'Anticipación del aviso',
  'Otra forma de aviso',
  'Bitácora y resumen',
  'Tu taller y promociones',
  'Pago',
  'Cuánto pagarías',
  'Si no pagarías',
  'Promociones a cambio de usarla gratis',
  'Cómo conocer la app y recibir ayuda',
  'Tu celular'
];

const actualPageBreaksA = runEmpty.formA.items.filter(i => i.type === 'PageBreak');
assert.equal(actualPageBreaksA.length, 17, 'Instrument A must have exactly 17 PageBreakItems');
assert.deepEqual(actualPageBreaksA.map(p => p.title), expectedPageTitlesA);

const expectedPageItemsA = [
  ['A0'],
  ['A1', 'A2'],
  ['A3', 'A4', 'A5'],
  ['A6', 'A7', 'A8', 'A9', 'A10', 'A11', 'A12', 'A13'],
  ['A14', 'A15', 'A16', 'A17', 'A18', 'A19', 'A20'],
  ['A21'],
  ['A21b'],
  ['A22', 'A22b', 'A23'],
  ['A24'],
  ['A23b'],
  ['A25', 'A25b', 'A26'],
  ['A27', 'A28'],
  ['A29'],
  ['A30', 'A30b'],
  ['A31a', 'A31b'],
  ['A32'],
  ['A33', 'A34'],
  ['A35', 'A36', 'A37']
];

const questionMapA = new Map();
assert.equal(pagesA.length, 18);
pagesA.forEach((p, idx) => {
  const codes = expectedPageItemsA[idx];
  assert.equal(p.questionItems.length, codes.length, `Page ${idx + 1} (${p.title}) question count mismatch`);
  p.questionItems.forEach((qItem, qIdx) => {
    const code = codes[qIdx];
    qItem.code = code;
    questionMapA.set(code, qItem);
  });
});

const allQuestionsA = [...questionMapA.values()];
assert.equal(allQuestionsA.length, 44, 'Instrument A must have 44 question items');

const countByTypeA = {};
for (const q of allQuestionsA) {
  countByTypeA[q.type] = (countByTypeA[q.type] || 0) + 1;
}
assert.deepEqual(countByTypeA, {
  MultipleChoice: 33,
  List: 1,
  Grid: 2,
  Checkbox: 3,
  Text: 4,
  ParagraphText: 1
});

const optionalCodesA = allQuestionsA.filter(q => !q.required).map(q => q.code);
assert.deepEqual(optionalCodesA, ['A8', 'A15', 'A22b', 'A25b', 'A26', 'A37']);

const otherCodesA = allQuestionsA.filter(q => q.hasOtherOption).map(q => q.code);
assert.deepEqual(otherCodesA, ['A3', 'A5', 'A6', 'A9', 'A10', 'A20', 'A21b', 'A22b', 'A33']);
for (const code of otherCodesA) {
  const q = questionMapA.get(code);
  assert(!q.choices.some(c => /^Otro/i.test(c.value)), `Item ${code} has literal Otro choice along with showOtherOption(true)`);
}
assert(questionMapA.get('A8').choices.some(c => c.value === 'Otra'), 'A8 must include literal choice "Otra"');

const expectedGridRows = [
  'Cambio de aceite',
  'Cadena (ajuste o lubricación) o banda (revisión), según tu moto',
  'Frenos o balatas',
  'Bujía',
  'Llantas (revisión o cambio)'
];
assert.deepEqual(questionMapA.get('A14').rows, expectedGridRows);
assert.deepEqual(questionMapA.get('A14').columns, [
  'Cada mes o antes',
  'Cada 2 o 3 meses',
  'Cada 4 a 6 meses',
  'Más de 6 meses',
  'Solo cuando falla',
  'No sé'
]);
assert.deepEqual(questionMapA.get('A16').rows, expectedGridRows);
assert.deepEqual(questionMapA.get('A16').columns, [
  'Yo mismo(a)',
  'Un taller',
  'La agencia',
  'Un familiar o conocido',
  'No se le hace'
]);

assert.deepEqual(
  questionMapA.get('A4').choices.map(c => c.value),
  [
    'Menos de $4,800 (menos de medio salario mínimo)',
    '$4,800 a $9,599 (hasta 1 salario mínimo)',
    '$9,600 a $19,199 (1 a 2 salarios mínimos)',
    '$19,200 a $28,799 (2 a 3 salarios mínimos)',
    '$28,800 o más (más de 3 salarios mínimos)',
    'Prefiero no decirlo'
  ]
);

// --- CHECK 4: Instrument A Navigation & Walks ---
function describeNavTarget(target, MockPageBreakItem) {
  if (target === null) return null;
  if (typeof target === 'string') return target;
  if (target instanceof MockPageBreakItem) return target.title;
  return String(target);
}

const navTableA = [];
for (const q of allQuestionsA) {
  if (!q.choices) continue;
  const hasNav = q.choices.some(c => c.navigationTarget !== null);
  if (hasNav) {
    for (const c of q.choices) {
      assert(c.navigationTarget !== null, `Branching item ${q.code} choice "${c.value}" missing explicit navigation target`);
      navTableA.push({ item: q.code, choice: c.value, target: describeNavTarget(c.navigationTarget, runEmpty.MockPageBreakItem) });
    }
  }
}

assert.deepEqual(navTableA, [
  { item: 'A0', choice: 'Sí', target: 'CONTINUE' },
  { item: 'A0', choice: 'No', target: 'SUBMIT' },
  { item: 'A2', choice: 'Menor de 18 años', target: 'SUBMIT' },
  { item: 'A2', choice: '18 a 24', target: 'CONTINUE' },
  { item: 'A2', choice: '25 a 34', target: 'CONTINUE' },
  { item: 'A2', choice: '35 a 44', target: 'CONTINUE' },
  { item: 'A2', choice: '45 a 59', target: 'CONTINUE' },
  { item: 'A2', choice: '60 o más', target: 'CONTINUE' },
  { item: 'A21', choice: 'Definitivamente sí', target: 'Avisos y semáforo' },
  { item: 'A21', choice: 'Probablemente sí', target: 'Avisos y semáforo' },
  { item: 'A21', choice: 'No estoy seguro(a)', target: 'Avisos y semáforo' },
  { item: 'A21', choice: 'Probablemente no', target: 'Por qué no la usarías' },
  { item: 'A21', choice: 'Definitivamente no', target: 'Por qué no la usarías' },
  { item: 'A23', choice: 'Sí', target: 'Anticipación del aviso' },
  { item: 'A23', choice: 'No', target: 'Otra forma de aviso' },
  { item: 'A29', choice: 'Sí', target: 'Cuánto pagarías' },
  { item: 'A29', choice: 'Depende del precio', target: 'Cuánto pagarías' },
  { item: 'A29', choice: 'No', target: 'Si no pagarías' }
]);

const goToPageTableA = actualPageBreaksA
  .filter(pb => pb.goToPageTarget !== null)
  .map(pb => ({ pageBreak: pb.title, target: describeNavTarget(pb.goToPageTarget, runEmpty.MockPageBreakItem) }));

assert.deepEqual(goToPageTableA, [
  { pageBreak: 'Avisos y semáforo', target: 'Tu celular' },
  { pageBreak: 'Otra forma de aviso', target: 'Bitácora y resumen' },
  { pageBreak: 'Si no pagarías', target: 'Promociones a cambio de usarla gratis' }
]);

function simulateWalk(pages, answersByCode, MockPageBreakItem) {
  const visited = [];
  let pageIdx = 0;

  while (pageIdx >= 0 && pageIdx < pages.length) {
    const page = pages[pageIdx];
    visited.push(page.pageNumber === 1 ? '1' : page.title);

    let choiceTarget = null;
    for (const q of page.questionItems) {
      if (q.choices && q.choices.some(c => c.navigationTarget !== null)) {
        const answer = answersByCode[q.code];
        const chosen = q.choices.find(c => c.value === answer) || q.choices[0];
        if (chosen && chosen.navigationTarget !== null) {
          choiceTarget = chosen.navigationTarget;
        }
      }
    }

    if (choiceTarget === 'SUBMIT') {
      visited.push('submit');
      break;
    } else if (choiceTarget instanceof MockPageBreakItem) {
      pageIdx = pages.findIndex(p => p.pageBreak === choiceTarget);
      assert(pageIdx !== -1, 'Target page break not found');
      continue;
    } else if (choiceTarget === 'CONTINUE' || choiceTarget === null) {
      const nextIdx = pageIdx + 1;
      if (nextIdx >= pages.length) {
        visited.push('submit');
        break;
      }
      const nextBreak = pages[nextIdx].pageBreak;
      if (choiceTarget === null && nextBreak && nextBreak.goToPageTarget) {
        if (nextBreak.goToPageTarget === 'SUBMIT') {
          visited.push('submit');
          break;
        } else if (nextBreak.goToPageTarget instanceof MockPageBreakItem) {
          pageIdx = pages.findIndex(p => p.pageBreak === nextBreak.goToPageTarget);
          continue;
        }
      }
      pageIdx = nextIdx;
    }
  }
  return visited;
}

const walkNonRider = simulateWalk(pagesA, { A0: 'No' }, runEmpty.MockPageBreakItem);
assert.deepEqual(walkNonRider, ['1', 'submit']);

const walkMinor = simulateWalk(pagesA, { A0: 'Sí', A2: 'Menor de 18 años' }, runEmpty.MockPageBreakItem);
assert.deepEqual(walkMinor, ['1', 'Tu zona y tu edad', 'submit']);

const walkRejecter = simulateWalk(pagesA, { A0: 'Sí', A2: '18 a 24', A21: 'Definitivamente no' }, runEmpty.MockPageBreakItem);
assert.deepEqual(walkRejecter, [
  '1',
  'Tu zona y tu edad',
  'Sobre ti',
  'Tu moto y cómo la usas',
  'Cómo cuidas tu moto hoy',
  'Conoce Itinera',
  'Por qué no la usarías',
  'Tu celular',
  'submit'
]);

const walkAdopterYes = simulateWalk(pagesA, { A0: 'Sí', A2: '25 a 34', A21: 'Definitivamente sí', A23: 'Sí', A29: 'Sí' }, runEmpty.MockPageBreakItem);
assert.deepEqual(walkAdopterYes, [
  '1',
  'Tu zona y tu edad',
  'Sobre ti',
  'Tu moto y cómo la usas',
  'Cómo cuidas tu moto hoy',
  'Conoce Itinera',
  'Avisos y semáforo',
  'Anticipación del aviso',
  'Bitácora y resumen',
  'Tu taller y promociones',
  'Pago',
  'Cuánto pagarías',
  'Promociones a cambio de usarla gratis',
  'Cómo conocer la app y recibir ayuda',
  'Tu celular',
  'submit'
]);

const walkAdopterNo = simulateWalk(pagesA, { A0: 'Sí', A2: '25 a 34', A21: 'Probablemente sí', A23: 'No', A29: 'No' }, runEmpty.MockPageBreakItem);
assert.deepEqual(walkAdopterNo, [
  '1',
  'Tu zona y tu edad',
  'Sobre ti',
  'Tu moto y cómo la usas',
  'Cómo cuidas tu moto hoy',
  'Conoce Itinera',
  'Avisos y semáforo',
  'Otra forma de aviso',
  'Bitácora y resumen',
  'Tu taller y promociones',
  'Pago',
  'Si no pagarías',
  'Promociones a cambio de usarla gratis',
  'Cómo conocer la app y recibir ayuda',
  'Tu celular',
  'submit'
]);

// --- CHECK 5: Instrument B Structure & Navigation ---
assert.equal(runEmpty.formB.title, 'Itinera: formulario para talleres y refaccionarias de Xalapa');

const expectedPageTitlesB = [
  'Clientes y servicios',
  'Cómo se reparten sus clientes',
  'Servicios y temporadas',
  'Recordatorios a sus clientes',
  'Su forma de recordar',
  'Regreso de clientes',
  'Conozca Itinera',
  'Forma de pago',
  'Por qué no',
  'Formas de pago',
  'Cuota fija al mes',
  'Pago por cliente',
  'Descuento y prueba',
  'Dar a conocer la app',
  'Prueba de un mes',
  'Cierre'
];

const actualPageBreaksB = runEmpty.formB.items.filter(i => i.type === 'PageBreak');
assert.equal(actualPageBreaksB.length, 16, 'Instrument B must have exactly 16 PageBreakItems');
assert.deepEqual(actualPageBreaksB.map(p => p.title), expectedPageTitlesB);

const expectedPageItemsB = [
  ['B1', 'B2', 'B3', 'B4', 'B5'],
  ['B6', 'B7'],
  ['B8'],
  ['B9', 'B10', 'B11', 'B12', 'B13'],
  ['B14'],
  ['B15', 'B16'],
  ['B17'],
  ['B18', 'Comentarios'],
  ['B19'],
  ['B20'],
  ['B21'],
  ['B22'],
  ['B23'],
  ['B24', 'B25'],
  ['B26', 'B27'],
  ['B28', 'B29', 'B30'],
  ['B31']
];

const questionMapB = new Map();
assert.equal(pagesB.length, 17);
pagesB.forEach((p, idx) => {
  const codes = expectedPageItemsB[idx];
  assert.equal(p.questionItems.length, codes.length, `Instrument B Page ${idx + 1} (${p.title}) question count mismatch`);
  p.questionItems.forEach((qItem, qIdx) => {
    const code = codes[qIdx];
    qItem.code = code;
    questionMapB.set(code, qItem);
  });
});

const allQuestionsB = [...questionMapB.values()];
assert.equal(allQuestionsB.length, 32, 'Instrument B must have 32 question items');

const countByTypeB = {};
for (const q of allQuestionsB) {
  countByTypeB[q.type] = (countByTypeB[q.type] || 0) + 1;
}
assert.deepEqual(countByTypeB, {
  MultipleChoice: 24,
  Checkbox: 4,
  Text: 4
});

const optionalCodesB = allQuestionsB.filter(q => !q.required).map(q => q.code);
assert.deepEqual(optionalCodesB, ['B10', 'Comentarios']);

const otherCodesB = allQuestionsB.filter(q => q.hasOtherOption).map(q => q.code);
assert.deepEqual(otherCodesB, ['B9', 'B15', 'B24', 'B27']);
for (const code of otherCodesB) {
  const q = questionMapB.get(code);
  assert(!q.choices.some(c => /^Otro/i.test(c.value)), `Item ${code} has literal Otro choice along with showOtherOption(true)`);
}

const validationsA = allQuestionsA.filter(q => q.validation).map(q => ({ item: q.code, ...q.validation }));
assert.deepEqual(validationsA, []);

const validationsB = allQuestionsB.filter(q => q.validation).map(q => ({ item: q.code, ...q.validation }));
assert.deepEqual(validationsB, [
  { item: 'B9', type: 'CheckboxValidation', rule: 'AT_MOST', count: 3, helpText: 'Elija máximo tres.' },
  { item: 'B28', type: 'CheckboxValidation', rule: 'EXACTLY', count: 3, helpText: 'Elija exactamente tres.' }
]);

const navTableB = [];
for (const q of allQuestionsB) {
  if (!q.choices) continue;
  const hasNav = q.choices.some(c => c.navigationTarget !== null);
  if (hasNav) {
    for (const c of q.choices) {
      assert(c.navigationTarget !== null, `Branching item ${q.code} choice "${c.value}" missing explicit navigation target`);
      navTableB.push({ item: q.code, choice: c.value, target: describeNavTarget(c.navigationTarget, runEmpty.MockPageBreakItem) });
    }
  }
}

assert.deepEqual(navTableB, [
  { item: 'B7', choice: 'Sí', target: 'Cómo se reparten sus clientes' },
  { item: 'B7', choice: 'No', target: 'Servicios y temporadas' },
  { item: 'B14', choice: 'Sí', target: 'Su forma de recordar' },
  { item: 'B14', choice: 'No', target: 'Regreso de clientes' },
  { item: 'B19', choice: 'Sí', target: 'Formas de pago' },
  { item: 'B19', choice: 'Tal vez', target: 'Formas de pago' },
  { item: 'B19', choice: 'No', target: 'Por qué no' },
  { item: 'B21', choice: 'Cuota fija al mes', target: 'Cuota fija al mes' },
  { item: 'B21', choice: 'Pagar por cada cliente que llegue y compre', target: 'Pago por cliente' },
  { item: 'B21', choice: 'Ninguna', target: 'Descuento y prueba' },
  { item: 'B21', choice: 'No sé', target: 'Descuento y prueba' }
]);

const goToPageTableB = actualPageBreaksB
  .filter(pb => pb.goToPageTarget !== null)
  .map(pb => ({ pageBreak: pb.title, target: describeNavTarget(pb.goToPageTarget, runEmpty.MockPageBreakItem) }));

assert.deepEqual(goToPageTableB, [
  { pageBreak: 'Formas de pago', target: 'Dar a conocer la app' },
  { pageBreak: 'Pago por cliente', target: 'Descuento y prueba' }
]);

const walkB19No = simulateWalk(pagesB, { B7: 'No', B14: 'No', B19: 'No' }, runEmpty.MockPageBreakItem);
assert.deepEqual(walkB19No, [
  '1',
  'Clientes y servicios',
  'Servicios y temporadas',
  'Recordatorios a sus clientes',
  'Regreso de clientes',
  'Conozca Itinera',
  'Forma de pago',
  'Por qué no',
  'Dar a conocer la app',
  'Prueba de un mes',
  'Cierre',
  'submit'
]);

const walkB21Cuota = simulateWalk(pagesB, { B7: 'Sí', B14: 'Sí', B19: 'Sí', B21: 'Cuota fija al mes' }, runEmpty.MockPageBreakItem);
assert.deepEqual(walkB21Cuota, [
  '1',
  'Clientes y servicios',
  'Cómo se reparten sus clientes',
  'Servicios y temporadas',
  'Recordatorios a sus clientes',
  'Su forma de recordar',
  'Regreso de clientes',
  'Conozca Itinera',
  'Forma de pago',
  'Formas de pago',
  'Cuota fija al mes',
  'Descuento y prueba',
  'Dar a conocer la app',
  'Prueba de un mes',
  'Cierre',
  'submit'
]);

const walkB21PagoCliente = simulateWalk(pagesB, { B7: 'No', B14: 'No', B19: 'Tal vez', B21: 'Pagar por cada cliente que llegue y compre' }, runEmpty.MockPageBreakItem);
assert.deepEqual(walkB21PagoCliente, [
  '1',
  'Clientes y servicios',
  'Servicios y temporadas',
  'Recordatorios a sus clientes',
  'Regreso de clientes',
  'Conozca Itinera',
  'Forma de pago',
  'Formas de pago',
  'Pago por cliente',
  'Descuento y prueba',
  'Dar a conocer la app',
  'Prueba de un mes',
  'Cierre',
  'submit'
]);

const walkB21NoSe = simulateWalk(pagesB, { B7: 'No', B14: 'No', B19: 'Sí', B21: 'No sé' }, runEmpty.MockPageBreakItem);
assert.deepEqual(walkB21NoSe, [
  '1',
  'Clientes y servicios',
  'Servicios y temporadas',
  'Recordatorios a sus clientes',
  'Regreso de clientes',
  'Conozca Itinera',
  'Forma de pago',
  'Formas de pago',
  'Descuento y prueba',
  'Dar a conocer la app',
  'Prueba de un mes',
  'Cierre',
  'submit'
]);

// --- CHECK 6: Text Parity & Forbidden Patterns in Visible Text ---
const textMismatches = [];

for (const q of [...allQuestionsA, ...allQuestionsB]) {
  const expected = parsedEstudio.items.get(q.code);
  if (!expected) {
    textMismatches.push({ code: q.code, error: 'Missing from parsed ESTUDIO_DE_MERCADO.md' });
    continue;
  }
  if (q.title !== expected.title) {
    textMismatches.push({ code: q.code, field: 'title', expected: expected.title, actual: q.title });
  }
  if (q.helpText !== expected.helpText) {
    textMismatches.push({ code: q.code, field: 'helpText', expected: expected.helpText, actual: q.helpText });
  }
  if (q.type === 'MultipleChoice' || q.type === 'List' || q.type === 'Checkbox') {
    const actualChoices = q.choices.map(c => c.value);
    if (JSON.stringify(actualChoices) !== JSON.stringify(expected.choices)) {
      textMismatches.push({ code: q.code, field: 'choices', expected: expected.choices, actual: actualChoices });
    }
    if (Boolean(q.hasOtherOption) !== Boolean(expected.hasOther)) {
      textMismatches.push({ code: q.code, field: 'hasOtherOption', expected: expected.hasOther, actual: q.hasOtherOption });
    }
  }
}

assert.equal(textMismatches.length, 0, `Text parity mismatches found: ${JSON.stringify(textMismatches, null, 2)}`);

// Verify each "Texto:" paragraph appears verbatim
assert.equal(parsedEstudio.textosA.length, 4);
assert.equal(pagesA.find(p => p.title === 'Conoce Itinera').helpText, parsedEstudio.textosA[0]);
assert.equal(pagesA.find(p => p.title === 'Avisos y semáforo').helpText, parsedEstudio.textosA[1]);
assert.equal(pagesA.find(p => p.title === 'Bitácora y resumen').helpText, parsedEstudio.textosA[2]);
const pageTallerPromo = pagesA.find(p => p.title === 'Tu taller y promociones');
const promoHeaderItem = pageTallerPromo.items.find(i => i.type === 'SectionHeader' && i.title === '');
assert(promoHeaderItem, 'Missing promotion SectionHeaderItem with empty title on "Tu taller y promociones"');
assert.equal(promoHeaderItem.helpText, parsedEstudio.textosA[3]);

assert.equal(parsedEstudio.textosB.length, 2);
assert.equal(pagesB.find(p => p.title === 'Conozca Itinera').helpText, parsedEstudio.textosB[0]);
assert.equal(pagesB.find(p => p.title === 'Formas de pago').helpText, parsedEstudio.textosB[1]);

// Check forbidden substrings/patterns in all visible strings
const forbiddenPatterns = [
  /\bA(?:[0-9]|[12][0-9]|3[0-7])[a-c]?\./,
  /\bB(?:[1-9]|[12][0-9]|3[01])\./,
  /\b\d{1,2}[a-f]\b/,
  /pauta/i,
  /redimid/i,
  /ticket promedio/i,
  /núcleo básico/i,
  /\bMAU\b/,
  /125–250/,
  /125-250/,
  /km\/día/i,
  /\(pasa/i,
  /\(termina/i,
  /\(después/i
];

function collectVisibleStrings(form) {
  const strings = [
    { where: 'form.title', text: form.title },
    { where: 'form.description', text: form.description },
    { where: 'form.confirmationMessage', text: form.settings.confirmationMessage }
  ];
  for (const item of form.items) {
    if (item.title) strings.push({ where: `${item.type}[${item.index}].title`, text: item.title });
    if (item.helpText) strings.push({ where: `${item.type}[${item.index}].helpText`, text: item.helpText });
    if (item.choices) {
      for (const c of item.choices) {
        strings.push({ where: `${item.type}[${item.index}].choice`, text: c.value });
      }
    }
    if (item.rows) {
      for (const r of item.rows) strings.push({ where: `Grid[${item.index}].row`, text: r });
    }
    if (item.columns) {
      for (const col of item.columns) strings.push({ where: `Grid[${item.index}].column`, text: col });
    }
    if (item.validation && item.validation.helpText) {
      strings.push({ where: `${item.type}[${item.index}].validation.helpText`, text: item.validation.helpText });
    }
  }
  return strings;
}

for (const [label, form] of [['A', runEmpty.formA], ['B', runEmpty.formB]]) {
  for (const entry of collectVisibleStrings(form)) {
    for (const pat of forbiddenPatterns) {
      assert(!pat.test(entry.text), `Forbidden pattern ${pat} matched in Form ${label} ${entry.where}: "${entry.text}"`);
    }
  }
}

// --- CHECK 7: Captures and Settings ---
const expectedCaptions = {
  1: 'La configuras en menos de 30 segundos, sin saber de mecánica ni contar kilómetros.',
  2: 'El semáforo te dice qué está bien, para qué ir juntando y qué ya toca.',
  3: 'Un toque por semana y un solo aviso cuando se acerca un servicio.',
  4: 'Tu historial queda guardado y puedes compartirlo gratis.',
  5: 'Más adelante: promociones de negocios cercanos cuando te toca servicio.',
  6: 'Desde su celular comprueba cada cliente y ve cuántos llegaron por la app.'
};

function findCaptures(pages) {
  const list = [];
  for (const p of pages) {
    p.items.forEach((item, idxOnPage) => {
      const mPlaceholder = item.type === 'SectionHeader' && item.title.match(/^\[Insertar Captura (\d+) del prototipo aquí\]$/);
      if (mPlaceholder) {
        const n = Number(mPlaceholder[1]);
        list.push({
          n,
          mode: 'placeholder',
          pageNumber: p.pageNumber,
          pageTitle: p.title,
          indexOnPage: idxOnPage,
          title: item.title,
          helpText: item.helpText
        });
      } else if (item.type === 'Image') {
        const nEntry = Object.entries(expectedCaptions).find(([, cap]) => cap === item.title);
        const n = nEntry ? Number(nEntry[0]) : null;
        list.push({
          n,
          mode: 'image',
          pageNumber: p.pageNumber,
          pageTitle: p.title,
          indexOnPage: idxOnPage,
          title: item.title,
          width: item.width,
          alignment: item.alignment
        });
      }
    });
  }
  return list;
}

const capturesEmptyA = findCaptures(pagesA);
const capturesEmptyB = findCaptures(pagesB);

assert.equal(capturesEmptyA.length, 5);
assert.deepEqual(capturesEmptyA.map(c => c.n), [1, 2, 3, 4, 5]);
for (const c of capturesEmptyA) {
  assert.equal(c.mode, 'placeholder');
  assert.equal(c.helpText, `${expectedCaptions[c.n]} Archivo: prototype/captures/captura-${c.n}.png`);
}
// Exact page & indexOnPage checks for A:
// Page 6 (Conoce Itinera): Captura 1 (idx 0), Captura 2 (idx 1), A21 (idx 2)
// Page 8 (Avisos y semáforo): Captura 3 (idx 0), A22 (idx 1), A22b (idx 2), A23 (idx 3)
// Page 11 (Bitácora y resumen): Captura 4 (idx 0), A25 (idx 1), A25b (idx 2), A26 (idx 3)
// Page 12 (Tu taller y promociones): A27 (idx 0), SectionHeader promo (idx 1), Captura 5 (idx 2), A28 (idx 3)
assert.deepEqual(
  capturesEmptyA.map(c => ({ n: c.n, pageTitle: c.pageTitle, indexOnPage: c.indexOnPage })),
  [
    { n: 1, pageTitle: 'Conoce Itinera', indexOnPage: 0 },
    { n: 2, pageTitle: 'Conoce Itinera', indexOnPage: 1 },
    { n: 3, pageTitle: 'Avisos y semáforo', indexOnPage: 0 },
    { n: 4, pageTitle: 'Bitácora y resumen', indexOnPage: 0 },
    { n: 5, pageTitle: 'Tu taller y promociones', indexOnPage: 2 }
  ]
);

assert.equal(capturesEmptyB.length, 3);
assert.deepEqual(capturesEmptyB.map(c => c.n), [2, 5, 6]);
for (const c of capturesEmptyB) {
  assert.equal(c.mode, 'placeholder');
  assert.equal(c.helpText, `${expectedCaptions[c.n]} Archivo: prototype/captures/captura-${c.n}.png`);
}
// Exact page & indexOnPage checks for B:
// Page 8 (Conozca Itinera): Captura 2 (idx 0), Captura 5 (idx 1), Captura 6 (idx 2), B18 (idx 3), Comentarios (idx 4)
assert.deepEqual(
  capturesEmptyB.map(c => ({ n: c.n, pageTitle: c.pageTitle, indexOnPage: c.indexOnPage })),
  [
    { n: 2, pageTitle: 'Conozca Itinera', indexOnPage: 0 },
    { n: 5, pageTitle: 'Conozca Itinera', indexOnPage: 1 },
    { n: 6, pageTitle: 'Conozca Itinera', indexOnPage: 2 }
  ]
);

// Run 2: With fake IDs injected
const runImages = runBothForms(true);
const pagesImgA = splitIntoPages(runImages.formA);
const pagesImgB = splitIntoPages(runImages.formB);

const capturesImgA = findCaptures(pagesImgA);
const capturesImgB = findCaptures(pagesImgB);

assert.equal(capturesImgA.length, 5);
for (const c of capturesImgA) {
  assert.equal(c.mode, 'image');
  assert.equal(c.width, 300);
  assert.equal(c.alignment, 'CENTER');
  assert.equal(c.title, expectedCaptions[c.n]);
}
assert.deepEqual(
  capturesImgA.map(c => ({ n: c.n, pageTitle: c.pageTitle, indexOnPage: c.indexOnPage })),
  capturesEmptyA.map(c => ({ n: c.n, pageTitle: c.pageTitle, indexOnPage: c.indexOnPage }))
);

assert.equal(capturesImgB.length, 3);
for (const c of capturesImgB) {
  assert.equal(c.mode, 'image');
  assert.equal(c.width, 300);
  assert.equal(c.alignment, 'CENTER');
  assert.equal(c.title, expectedCaptions[c.n]);
}
assert.deepEqual(
  capturesImgB.map(c => ({ n: c.n, pageTitle: c.pageTitle, indexOnPage: c.indexOnPage })),
  capturesEmptyB.map(c => ({ n: c.n, pageTitle: c.pageTitle, indexOnPage: c.indexOnPage }))
);

assert.deepEqual(runImages.driveCalls, [
  'FAKE_ID_A1',
  'FAKE_ID_A2',
  'FAKE_ID_A3',
  'FAKE_ID_A4',
  'FAKE_ID_A5',
  'FAKE_ID_B2',
  'FAKE_ID_B5',
  'FAKE_ID_B6'
]);

// Verify settings on both forms
assert.deepEqual(runEmpty.formA.settings, {
  progressBar: true,
  collectEmail: false,
  limitOneResponsePerUser: false,
  allowResponseEdits: false,
  publishingSummary: false,
  showLinkToRespondAgain: null,
  confirmationMessage: 'Gracias. Tus respuestas nos ayudan a diseñar Itinera.'
});

assert.deepEqual(runEmpty.formB.settings, {
  progressBar: true,
  collectEmail: false,
  limitOneResponsePerUser: false,
  allowResponseEdits: false,
  publishingSummary: false,
  showLinkToRespondAgain: true,
  confirmationMessage: 'Gracias. Sus respuestas nos ayudan a diseñar Itinera.'
});

assert(runEmpty.formA.editUrlCalled && runEmpty.formA.publishedUrlCalled, 'Instrument A must log getEditUrl() and getPublishedUrl()');
assert(runEmpty.formB.editUrlCalled && runEmpty.formB.publishedUrlCalled, 'Instrument B must log getEditUrl() and getPublishedUrl()');
assert(runEmpty.logs.some(l => l.includes('mock-0/edit')) && runEmpty.logs.some(l => l.includes('mock-0/viewform')));
assert(runEmpty.logs.some(l => l.includes('mock-1/edit')) && runEmpty.logs.some(l => l.includes('mock-1/viewform')));

// Print JSON summary
const summary = {
  status: 'PASS',
  instrumentA: {
    title: runEmpty.formA.title,
    pageCount: pagesA.length,
    pageBreakTitles: actualPageBreaksA.map(p => p.title),
    questionCount: allQuestionsA.length,
    itemCountsByType: countByTypeA,
    requiredItems: allQuestionsA.filter(q => q.required).map(q => q.code),
    optionalItems: optionalCodesA,
    showOtherOptionItems: otherCodesA,
    navigationTable: navTableA,
    goToPageTable: goToPageTableA,
    validations: validationsA,
    capturePositions: capturesEmptyA.map(c => ({ n: c.n, pageNumber: c.pageNumber, pageTitle: c.pageTitle, indexOnPage: c.indexOnPage }))
  },
  instrumentB: {
    title: runEmpty.formB.title,
    pageCount: pagesB.length,
    pageBreakTitles: actualPageBreaksB.map(p => p.title),
    questionCount: allQuestionsB.length,
    itemCountsByType: countByTypeB,
    requiredItems: allQuestionsB.filter(q => q.required).map(q => q.code),
    optionalItems: optionalCodesB,
    showOtherOptionItems: otherCodesB,
    navigationTable: navTableB,
    goToPageTable: goToPageTableB,
    validations: validationsB,
    capturePositions: capturesEmptyB.map(c => ({ n: c.n, pageNumber: c.pageNumber, pageTitle: c.pageTitle, indexOnPage: c.indexOnPage }))
  },
  textMismatches
};

console.log(JSON.stringify(summary, null, 2));
