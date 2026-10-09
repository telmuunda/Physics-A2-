/**
 * Advanced Semantic & Lexical Physics Marking Evaluator
 * Aware of word configurations, synonyms, passive/active voice,
 * flexible word order, grammatical variations, and typos.
 * Tailored to Cambridge CIE 9702 Paper 4 & Paper 5 marking schemes.
 */

import { CIEDefinition } from '../data/cieDefinitions';
import { QuestionPart } from '../data/paper4Types';

export interface RequirementCriterion {
  id: string;
  name: string;
  markType: 'B1' | 'B2' | 'M1' | 'A1' | 'C1';
  patterns: (string | RegExp)[];
  negativePatterns?: (string | RegExp)[];
  explanation: string;
}

export interface DefinitionEvaluation {
  score: number;
  maxMarks: number;
  isVerbatim: boolean;
  percentage: number;
  matchedGroups: { criterion: string; matchedWord: string }[];
  missedGroups: { criterion: string; requiredPhrase: string; note: string }[];
  detectedTraps: string[];
  feedback: string;
}

export interface StructuredPartEvaluation {
  score: number;
  maxMarks: number;
  isCorrect: boolean;
  numericMatched?: boolean;
  numericDetails?: {
    candidateValue?: number;
    expectedValue: string;
    unitCorrect: boolean;
    sfCorrect: boolean;
    note: string;
  };
  keyPointsMatched: string[];
  keyPointsMissed: string[];
  feedback: string;
}

/**
 * Common English & Physics Stemming / Synonyms Map
 */
const CANONICAL_REPLACEMENTS: [RegExp, string][] = [
  // Physics concepts & equivalents
  [/\b(perpendicularly|at right angles|at 90 degrees|normal to)\b/gi, 'perpendicular'],
  [/\b(directly proportional to|is proportional to|varies directly as|varies as)\b/gi, 'proportional to'],
  [/\b(inversely proportional to|varies inversely as|is inversely related to)\b/gi, 'inversely proportional'],
  [/\b(centre|center of circle|center of mass|centre of sphere)\b/gi, 'center'],
  [/\b(equilibrium position|fixed point|mean position|rest position)\b/gi, 'equilibrium position'],
  [/\b(per unit mass|divided by mass|per kilogram|per kg|for unit mass|upon unit mass)\b/gi, 'per unit mass'],
  [/\b(per unit charge|divided by charge|per coulomb|for unit charge|upon unit positive charge)\b/gi, 'per unit charge'],
  [/\b(from infinity|from an infinite distance|from infinite separation|starting at infinity)\b/gi, 'from infinity'],
  [/\b(work done|work is done|energy required|energy needed|work that is done|energy transferred)\b/gi, 'work done'],
  [/\b(point mass|small test mass|isolated mass|test mass|small mass)\b/gi, 'point mass'],
  [/\b(rate of change of|rate at which .+ changes|change in .+ per unit time|time rate of change of)\b/gi, 'rate of change of'],
  [/\b(magnetic flux linkage|flux linkage|n\s*[×*]?\s*phi|n\s*phi)\b/gi, 'magnetic flux linkage'],
  [/\b(electromotive force|emf|e\.m\.f\.)\b/gi, 'emf'],
  [/\b(potential difference|pd|p\.d\.|voltage)\b/gi, 'potential difference'],
  [/\b(simple harmonic motion|shm|s\.h\.m\.)\b/gi, 'simple harmonic motion'],
  [/\b(root mean square|rms|r\.m\.s\.)\b/gi, 'rms'],
  [/\b(alternating current|ac|a\.c\.)\b/gi, 'alternating current'],
  [/\b(kinetic energy|ke|k\.e\.)\b/gi, 'kinetic energy'],
  [/\b(potential energy|pe|p\.e\.)\b/gi, 'potential energy'],
  [/\b(loss of energy|energy dissipated|energy loss|amplitude decays|amplitude decreases)\b/gi, 'reduction in amplitude'],
  [/\b(resistive forces|friction|viscous drag|air resistance|drag forces)\b/gi, 'resistive forces'],
  [/\b(maximum amplitude|peak amplitude|largest amplitude)\b/gi, 'maximum amplitude'],
  [/\b(forcing frequency|driving frequency|applied frequency)\b/gi, 'driving frequency'],
  [/\b(natural frequency|eigenfrequency|resonant frequency)\b/gi, 'natural frequency'],
  [/\b(random distribution of|random energies of|sum of microscopic)\b/gi, 'random distribution of'],
  [/\b(microscopic kinetic and potential|kinetic and potential energies)\b/gi, 'kinetic and potential energies'],
  [/\b(recession speed|recession velocity|speed of recession|speed at which galaxies move away)\b/gi, 'recession velocity'],
  [/\b(known luminosity|luminosity is known|constant known luminosity)\b/gi, 'known luminosity'],
  [/\b(piezoelectric effect|piezoelectric transducer|piezo-electric)\b/gi, 'piezoelectric effect'],
  [/\b(acoustic impedance|specific acoustic impedance)\b/gi, 'acoustic impedance'],
  [/\b(linear attenuation coefficient|attenuation coefficient|linear absorption coefficient)\b/gi, 'linear attenuation coefficient'],
  [/\b(half[- ]value thickness|half value thickness|hvt)\b/gi, 'half value thickness'],
];

/**
 * Normalizes input text while preserving semantic technical tokens
 */
export function normalizePhysicsText(text: string): string {
  if (!text) return '';
  let cleaned = text
    .toLowerCase()
    .replace(/['’]s\b/g, '') // remove possessives
    .replace(/[–—−]/g, '-')
    .replace(/[,\.;:!?"'()\[\]{}]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Apply canonical replacements
  for (const [pattern, replacement] of CANONICAL_REPLACEMENTS) {
    cleaned = cleaned.replace(pattern, replacement);
  }

  return cleaned.replace(/\s+/g, ' ').trim();
}

/**
 * Calculates token similarity / subset matching (word order invariant)
 */
function matchTokensFlexible(phraseTokens: string[], textTokens: string[]): boolean {
  if (phraseTokens.length === 0) return true;
  // Check if every meaningful token in phraseTokens exists or matches fuzzy
  const meaningfulPhraseTokens = phraseTokens.filter((t) => t.length > 2 && !['the', 'and', 'for', 'with', 'which', 'that'].includes(t));
  if (meaningfulPhraseTokens.length === 0) return true;

  let matchedCount = 0;
  for (const pt of meaningfulPhraseTokens) {
    const found = textTokens.some((tt) => {
      if (tt === pt) return true;
      if (tt.startsWith(pt) || pt.startsWith(tt)) {
        if (Math.min(tt.length, pt.length) >= 4) return true;
      }
      // Simple edit distance for typos on long technical words (length >= 6)
      if (pt.length >= 6 && Math.abs(pt.length - tt.length) <= 1) {
        if (levenshteinDistance(pt, tt) <= 1) return true;
      }
      return false;
    });
    if (found) matchedCount++;
  }

  return matchedCount >= meaningfulPhraseTokens.length;
}

/**
 * Levenshtein distance for typo tolerance
 */
function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

/**
 * Checks for common examiner traps based on candidate input
 */
function checkExaminerTraps(userText: string, def: CIEDefinition): string[] {
  const norm = normalizePhysicsText(userText);
  const traps: string[] = [];

  // Gravitation & Electric field traps
  if (def.id.startsWith('grav_') || def.id.startsWith('elec_')) {
    if (def.term.includes('Potential') && !norm.includes('infinity')) {
      traps.push("Fatal Omission: You must specify 'from infinity' (or work done from infinity).");
    }
    if ((def.term.includes('Field Strength') || def.term.includes('Potential')) && norm.includes('force') && !norm.includes('per unit')) {
      traps.push("Fatal Error: Wrote 'force' instead of 'force per unit mass / charge'.");
    }
  }

  // Astronomy traps
  if (def.id.includes('standard_candle')) {
    if (norm.includes('brightness') && !norm.includes('luminosity')) {
      traps.push("Examiner Trap: Do not write 'known brightness' (brightness depends on distance). Cambridge requires 'known luminosity'.");
    }
  }

  // Thermal traps
  if (def.id.includes('internal_energy')) {
    if (!norm.includes('random')) {
      traps.push("Mark Penalty: Cambridge mark schemes strictly award B1 for 'random distribution' of energies.");
    }
  }

  // Oscillations
  if (def.id.includes('shm')) {
    if (norm.includes('proportional') && !norm.includes('opposite') && !norm.includes('equilibrium') && !norm.includes('center')) {
      traps.push("Mark Penalty: Must state acceleration is directed TOWARDS fixed point / OPPOSITE to displacement.");
    }
  }

  // Induction
  if (def.id.includes('faraday')) {
    if (norm.includes('flux') && !norm.includes('linkage') && !norm.includes('change')) {
      traps.push("Precision Note: Cambridge requires 'rate of change of magnetic flux linkage' (not just flux).");
    }
  }

  return traps;
}

/**
 * Smartly evaluates a definition answer
 */
export function smartEvaluateDefinition(
  userAnswer: string,
  def: CIEDefinition
): DefinitionEvaluation {
  if (!userAnswer || !userAnswer.trim()) {
    return {
      score: 0,
      maxMarks: def.marks,
      isVerbatim: false,
      percentage: 0,
      matchedGroups: [],
      missedGroups: def.requiredKeywords.map((g) => ({
        criterion: g[0],
        requiredPhrase: g.join(' OR '),
        note: 'Not attempted',
      })),
      detectedTraps: [],
      feedback: 'No answer provided.',
    };
  }

  const normalized = normalizePhysicsText(userAnswer);
  const userTokens = normalized.split(' ').filter(Boolean);

  const matchedGroups: { criterion: string; matchedWord: string }[] = [];
  const missedGroups: { criterion: string; requiredPhrase: string; note: string }[] = [];

  def.requiredKeywords.forEach((synonyms) => {
    let groupMatched = false;
    let matchedWord = '';

    for (const syn of synonyms) {
      const normSyn = normalizePhysicsText(syn);
      // Direct substring match
      if (normalized.includes(normSyn)) {
        groupMatched = true;
        matchedWord = syn;
        break;
      }

      // Flexible token set match (word-order invariant)
      const synTokens = normSyn.split(' ').filter(Boolean);
      if (matchTokensFlexible(synTokens, userTokens)) {
        groupMatched = true;
        matchedWord = syn;
        break;
      }
    }

    if (groupMatched) {
      matchedGroups.push({ criterion: synonyms[0], matchedWord });
    } else {
      missedGroups.push({
        criterion: synonyms[0],
        requiredPhrase: synonyms.join(' / '),
        note: `Examiner requires this key concept: "${synonyms[0]}"`,
      });
    }
  });

  const traps = checkExaminerTraps(userAnswer, def);

  const fraction = matchedGroups.length / def.requiredKeywords.length;
  let awarded = 0;

  if (def.marks === 1) {
    awarded = fraction >= 0.75 ? 1 : 0;
  } else if (def.marks === 2) {
    if (fraction >= 0.85) awarded = 2;
    else if (fraction >= 0.45) awarded = 1;
    else awarded = 0;
  } else {
    awarded = Math.round(fraction * def.marks);
  }

  const isVerbatim = fraction >= 0.95 && traps.length === 0;
  const percentage = Math.round((awarded / def.marks) * 100);

  let feedback = '';
  if (awarded === def.marks && traps.length === 0) {
    feedback = '🌟 Full marks awarded! All essential technical phrases and conditions satisfied according to the official Cambridge mark scheme.';
  } else if (awarded > 0) {
    feedback = `Partial credit awarded (${awarded}/${def.marks} marks). You captured key concepts, but review the missed criteria below to secure full marks on Paper 4.`;
  } else {
    feedback = 'Zero marks awarded. Essential technical conditions, relationships, or units were omitted.';
  }

  return {
    score: awarded,
    maxMarks: def.marks,
    isVerbatim,
    percentage,
    matchedGroups,
    missedGroups,
    detectedTraps: traps,
    feedback,
  };
}

/**
 * Smartly evaluates a structured question part (written derivation or numerical answer)
 */
export function smartEvaluateStructuredPart(
  userAnswer: string,
  part: QuestionPart
): StructuredPartEvaluation {
  if (!userAnswer || !userAnswer.trim()) {
    return {
      score: 0,
      maxMarks: part.marks,
      isCorrect: false,
      keyPointsMatched: [],
      keyPointsMissed: part.keyPoints,
      feedback: 'No answer provided.',
    };
  }

  const normalized = normalizePhysicsText(userAnswer);
  const userTokens = normalized.split(' ').filter(Boolean);

  // 1. Check qualitative key points
  const matchedPoints: string[] = [];
  const missedPoints: string[] = [];

  part.keyPoints.forEach((kp) => {
    const normKp = normalizePhysicsText(kp);
    const kpTokens = normKp.split(' ').filter(Boolean);

    if (normalized.includes(normKp) || matchTokensFlexible(kpTokens, userTokens)) {
      matchedPoints.push(kp);
    } else {
      missedPoints.push(kp);
    }
  });

  // 2. Check numerical answer if part has calculatedAnswer
  let numericMatched = false;
  let numericDetails: StructuredPartEvaluation['numericDetails'] | undefined;

  if (part.calculatedAnswer) {
    // Extract numbers from candidate text
    const numberMatches = userAnswer.match(/[-+]?[0-9]*\.?[0-9]+(?:[eE][-+]?[0-9]+)?/g);
    const expectedNum = parseFloat(part.calculatedAnswer.value);
    let bestCandidate: number | undefined;
    let withinTol = false;

    if (numberMatches) {
      for (const rawNum of numberMatches) {
        const val = parseFloat(rawNum);
        if (!isNaN(val)) {
          const diff = Math.abs(val - expectedNum) / (Math.abs(expectedNum) || 1);
          if (diff <= part.calculatedAnswer.tolerance) {
            withinTol = true;
            bestCandidate = val;
            break;
          }
        }
      }
    }

    // Check unit
    const expectedUnit = part.calculatedAnswer.unit.toLowerCase().replace(/[\s⁻¹²³⁴]/g, '');
    const candidateUnitClean = userAnswer.toLowerCase().replace(/[\s⁻¹²³⁴]/g, '');
    const unitCorrect = candidateUnitClean.includes(expectedUnit) || candidateUnitClean.includes(part.calculatedAnswer.unit.toLowerCase());

    numericMatched = withinTol;
    numericDetails = {
      candidateValue: bestCandidate,
      expectedValue: `${part.calculatedAnswer.value} ${part.calculatedAnswer.unit}`,
      unitCorrect,
      sfCorrect: true, // evaluated leniently for candidates
      note: withinTol
        ? unitCorrect
          ? 'Numerical value and units correct within tolerance!'
          : 'Numerical value correct, but ensure correct standard SI unit is written.'
        : 'Numerical value does not match expected result within tolerance.',
    };
  }

  // Scoring logic
  let awarded = 0;
  const keyPointsFraction = part.keyPoints.length > 0 ? matchedPoints.length / part.keyPoints.length : 1;

  if (part.calculatedAnswer) {
    if (numericMatched && numericDetails?.unitCorrect) {
      awarded = part.marks;
    } else if (numericMatched) {
      awarded = Math.max(1, part.marks - 1);
    } else if (keyPointsFraction >= 0.5) {
      awarded = Math.min(part.marks - 1, Math.round(keyPointsFraction * (part.marks - 1)));
    }
  } else {
    awarded = Math.round(keyPointsFraction * part.marks);
  }

  const isCorrect = awarded === part.marks;
  let feedback = '';

  if (isCorrect) {
    feedback = '🌟 Full marks awarded! Excellent method, accuracy, and technical phrasing.';
  } else if (awarded > 0) {
    feedback = `Awarded ${awarded}/${part.marks} marks. You earned method / partial marks. Check the official solution for final precision.`;
  } else {
    feedback = 'Zero marks awarded. Review the Cambridge mark scheme and key points below.';
  }

  return {
    score: awarded,
    maxMarks: part.marks,
    isCorrect,
    numericMatched,
    numericDetails,
    keyPointsMatched: matchedPoints,
    keyPointsMissed: missedPoints,
    feedback,
  };
}
